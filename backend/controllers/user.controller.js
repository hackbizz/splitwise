import pool from "../config/db.config.js";
import { ErrorHandler } from "../middlewares/error.js";
import bcrypt from "bcrypt";
import { jwtTokens } from "../utils/cookie.js";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import UserService from "../services/user.service.js";
import multer from "multer";
import path from "path";


export const createUser = async (req, res, next) => {
  try {
    const { name, email, password, username } = req.body;
    const image = `${process.env.URL}/UserImage/${req.file.filename}`;
    const usernameExists = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    if (usernameExists.rows.length > 0) {
      throw new ErrorHandler("Username is already taken", 400);
    }
    if (!email?.trim()) {
      next(new ErrorHandler("Please Provide Email", 400));
    } else if (!name?.trim()) {
      next(new ErrorHandler("Please Provide Name", 400));
    } else if (!password?.trim()) {
      next(new ErrorHandler("Please Provide Password", 400));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result2 = await pool.query("SELECT user_id FROM users WHERE email = $1", [email]);

    if (result2.rows.length > 0) {
      next(new ErrorHandler("Same Email is Not Valid", 400));
    }
    const result = await pool.query(
      "INSERT INTO users ( name, email, password, username, image) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, email, hashedPassword, username, image]
    );

    res.status(201).json({
      success: true,
      message: `User Inserted successfully!`,
      userId: result.rows[0].id,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email?.trim()) {
      return next(new ErrorHandler("Please Provide Email", 400));
    } else if (!password?.trim()) {
      return next(new ErrorHandler("Please Provide Password", 400));
    }

    const result2 = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if (result2.rows.length === 0) {
      return next(new ErrorHandler("Email is Not Registered", 400));
    }

    const isPasswordValid = await bcrypt.compare(password, result2.rows[0].password);

    if (!isPasswordValid) {
      return next(new ErrorHandler("Password is Incorrect", 400));
    }

    let tokens = jwtTokens(result2.rows[0]);

    res.cookie("refresh_token", tokens.refreshToken, { httpOnly: true });
    res.status(201).json({
      success: true,
      message: `user login successfully`,
      tokens: tokens,
      userData: result2.rows[0],
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("refresh_token");
    res.status(201).json({
      success: true,
      message: "User Logout Sucessfully. RefereshToken Deleted.",
    });
  } catch (error) {
    next(error);
  }
};

export const getAccessFromRefresh = async (req, res, next) => {
  try {
    const cookies = cookie.parse(req.headers.cookie || "");

    const refreshToken = cookies.refresh_token;
    if (refreshToken == null) {
      next(new ErrorHandler("Please Provide Refresh_token", 401));
    }

    jwt.verify(
      refreshToken,
      process.env.REFRESH_JWT_SECRET,
      async (error, id) => {
        if (error) {
          next(error);
        }
        let tokens = jwtTokens(id);

        res.cookie("refresh_token", tokens.refreshToken, { httpOnly: true });
        res.status(201).json({
          success: true,
          message: `user login sucessfully`,
          tokens: tokens,
        });
      }
    );
  } catch (error) {
    next(error);
  }
};


const storage = multer.diskStorage({
  destination: "./upload/UserImage",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

export const upload = multer({
  storage: storage,
});