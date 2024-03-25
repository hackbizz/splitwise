<template>
    <div class="login-container">
        <div class="login-form">       
            <div class="form-and-image">
                <div class="purple-section">
                    <img src="../assets/loginImage.jpg" alt="Login Image">
                </div>
                <div class="white-section">
                    <div class="title-container">
                        <h2>Welcome Back</h2>
                    </div>
                    <div class="form-elements">
                        <input type="text" v-model="email" placeholder="Username" />
                        <input type="password" v-model="password" placeholder="Password" />
                        <button @click="login">Login</button>
                        <a href="#">Forgot Password?</a><br>
                        <p>
                        Don't have an account?
                        <router-link to="/sign-up">Create Account</router-link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';
  
  export default {
    name: 'LoginComponent',
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
      async login() {
        let result = await axios.post(
          `http://localhost:3000/api/user/login`, {
            email:this.email,
            password:this.password,
          }
        );
  
        if (result.status === 200 && result.data.length > 0) {
          localStorage.setItem("user-info", JSON.stringify(result.data[0]));
          this.$router.push({ name: 'Dashboard' });
        }
        console.log(result);
      },
    },
    mounted() {
      let user = localStorage.getItem('user-info');
      if (user) {
        this.$router.push({ name: 'Dashboard' });
      }
    },
};
</script>
  
<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(to right, #8231e6, #5c1cda);
    font-family: "Barlow Semi Condensed", sans-serif;
    font-weight: 500;
    font-style: normal;
}

.login-form {
    border-radius: 20px;
    padding: 30px;
    width: 50%;
    /* box-shadow: 0 10px 15px #1b8cefcc; */
}

.form-and-image {
    display: flex;
}

.purple-section {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60%;
    background-color: #8a55e3;
    border-radius: 20px 0 0 20px;
    box-shadow: 0 10px 15px #1b8cefcc;
    margin-left: -30px;
    margin-top: -30px;
    margin-bottom: -30px;
}

.purple-section img {
    width: 50%;
    height: 65%;
}

.white-section {
    width: 40%;
    background-color: #fff;
    border-radius: 0 20px 20px 0;
    padding: 20px;
    box-shadow: 0 10px 15px #1b8cefcc;
    margin-right: -30px;
    margin-top: -30px;
    margin-bottom: -30px;
}

.form-elements {
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
}

.form-elements input,
.form-elements button {
    margin-bottom: 20px;
    padding: 10px;
    border: none;
    outline: none;
    border-bottom: 1px solid #817edd;
    border-radius: 5px;
}

.form-elements input[type="text"],
.form-elements input[type="password"] {
    background-color: #fff;
    width: 90%;
}

.form-elements input::placeholder {
    color: #5146ae;
}

.form-elements button {
    background: linear-gradient(to right, #5c1cda,#a15af6);
    color: #fff;
    cursor: pointer;
    width: 40%;
}

.form-elements button:hover {
    background-color: #69327e;
}

.form-elements a {
    color: #2359c5d0;
    text-decoration: none;
}

.title-container {
    margin-left: -20px;
    margin-top: -20px;
    background-color: #8a55e3;
    border-radius: 0 20px 20px 0;
    width: 60%;
}

.title-container h2 {
  margin-bottom: 20px;
  color: #fff;
}
</style>
  