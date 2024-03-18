<template>
    <div class="sign-up-container">
        <div class="sign-up-form">
            <div class="form-and-image">
                <div class="purple-section">
                    <img src="../assets/loginImage.jpg" alt="Login Image">
                </div>
                <div class="white-section">
                    <div class="title-container">
                        <h2>Welcome Back</h2>
                    </div>
                    <form @submit.prevent="generateOTP" class="form-elements">
                    <input type="text" required v-model="name" placeholder="Enter Name">
                    <input type="text" v-model="email" placeholder="Enter Email">
                    <input type="text" v-model="number" placeholder="Enter Phone Number" pattern="[0-9]{10}" title="Please enter a 10-digit phone number without any alphabets.">
                    <input type="password" v-model="password" placeholder="Enter Password">
                    <button @click="generateOTP">Generate OTP</button>
                    <input type="text" v-if="showField" v-model="otpInput" placeholder="Enter One Time Password">
                    <button v-if="showField" @click="verifyOTP">Register</button>

                    <p>
                        Already have an account? 
                        <router-link to="/login">Login Here.</router-link>
                    </p>
                </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

    export default {
        name: 'SignUp',
        data() {
            return {
                name: '',
                email: '',
                number: '',
                password: '',
                showField: false,
                otp: null,
                otpInput: '',
            }
        },
        methods: {
            async signUp(){
                let result = await axios.post("http://localhost:3000/users", {
                    name: this.name,
                    email: this.email,
                    number: this.number,
                    password: this.password
                })

                console.log(result)
                if (result.status == 201){
                    localStorage.setItem("user-info", JSON.stringify(result.data))
                    this.$router.push({name: 'Dashboard'})
                }
            },
            // sendOTP() {
            //     this.showField = true,
            //     alert('An OTP has been sent to your registered email')
            // },
            verifyOTP() {
                if (this.otpInput ==  this.otp){
                    // logged in the user here
                    this.signUp();
                    alert('Successfully Registered!')
                }else{
                    alert('Wrong OTP entered');
                }
            },
            generateOTP() {
                // Generate a random 6-digit OTP
                if (!this.name || !this.email || !this.number || !this.password) {
                    alert('All the fields are necessary.');
                    return;
                }
                const phoneNumberPattern = /^\d{10}$/; // Regular expression to match 10 digits
                if (!phoneNumberPattern.test(this.number)) {
                    alert('Please enter a valid 10-digit phone number without any alphabets.');
                    this.number = ''; // Clear the phone number field
                    return;
                    }
                const randomOTP = Math.floor(100000 + Math.random() * 900000);
                this.otp = randomOTP;
                console.log(randomOTP)
                this.showField = true,
                alert("An OTP has been sent to your email.")
            },
        mounted() {
            let user = localStorage.getItem( "user-info");
            if (user) {
                this.$router.push({name: 'Dashboard'});
            }
        },
    }
}
</script>

<style scoped>
.sign-up-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(to right, #8231e6, #5c1cda);
    font-family: "Barlow Semi Condensed", sans-serif;
    font-weight: 500;
    font-style: normal;
}

.sign-up-form {
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
    width: 60%;
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
    width: 50%;
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