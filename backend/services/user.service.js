import { getUserFromUsernameDb } from "../db/user.db.js";
import { ErrorHandler } from "../middlewares/error.js";

class UserService {
  static getUserFromUsername = async (data) => {
    try {
      return await getUserFromUsernameDb(data);
    } catch (error) {
      console.log(error);
      throw new ErrorHandler("Error While Database Operation", 401);
    }
  };
}

export default UserService;
