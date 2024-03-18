<template>
    <div class="sign-up-container">
        <div class="sign-up-form">
            <div class="form-and-image">
                <div class="purple-section">
                    <img src="../assets/loginImage.jpg" alt="Login Image">
                </div>
                <div class="white-section">
                    <div class="title-container">
                        <h2>Welcome</h2>
                    </div>
                    <form @submit.prevent="submitForm" class="form-elements" ref="signupForm">
                        <input type="text" required v-model="name" placeholder="Enter Name">
                        <input type="email" required v-model="email" placeholder="Enter Email">
                        <input type="tel" required v-model="number" placeholder="Enter Phone Number" pattern="[0-9]{10}" title="Please enter a 10-digit phone number without any alphabets.">
                        <input type="password" required v-model="password" placeholder="Enter Password">
                        <button @click.prevent="generateOTP" v-if="!otpInput">Generate OTP</button>
                        <input v-if="otpInput" type="text" v-model="enteredOtp" placeholder="Enter OTP">
                        <!-- Error message -->
                        <p v-if="errorMessage" class="error-message">
                            {{ errorMessage }}
                        </p>
                        <!-- Success message -->
                        <p v-if="successMessage" class="success-message">
                            {{ successMessage }}
                        </p>
                        <button v-if="otpInput" type="submit">Register</button>

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
            otpInput: false,
            otp: null,
            enteredOtp: '',
            errorMessage: '',
            successMessage: '',
        }
    },
    methods: {
        async generateOTP() {
            try {
            // Simulate sending OTP (in a real application, this would be handled by your backend)
            // For mock purposes, we'll simply log the OTP to the console
            const randomOTP = Math.floor(100000 + Math.random() * 900000);
            console.log('Generated OTP:', randomOTP);
            this.otpInput = true; // Show OTP input field
            this.otp = randomOTP; // Store generated OTP in component state for validation later on
            } catch (error) {
            this.errorMessage = 'Failed to generate OTP. Please try again later.';
            }
        },

        async submitForm() {
            try {
                // Validate OTP
                if (!this.enteredOtp) {
                    throw new Error('Please enter OTP.');
                }
                // Validate other form fields
                if (!this.name || !this.email || !this.number || !this.password) {
                    throw new Error('All fields are required.');
                }
                const phoneNumberPattern = /^\d{10}$/;
                if (!phoneNumberPattern.test(this.number)) {
                    throw new Error('Please enter a valid 10-digit phone number without any alphabets.');
                }
                if (this.enteredOtp != this.otp) {
                    throw new Error("The entered OTP doesn't match.");
                }
                if (this.enteredOtp == this.otp){
                    // Mock API request to register user (in a real application, this would be handled by your backend)
                    const newUser = {
                        name: this.name,
                        email: this.email,
                        number: this.number,
                        password: this.password,
                    };
                await axios.post('http://localhost:3000/users', newUser);
                this.clearMessages();
                // Show success message
                this.successMessage = 'Registration successful!';
                // Reset form
                this.$refs.signupForm.reset();
                // Redirect to login page
                this.$router.push({name: 'Login'});
                }
            } catch (error) {
                // Show error message
                this.errorMessage = error.message;
            }
        },
        clearMessages() {
            // Clear error and success messages
            this.errorMessage = '';
            this.successMessage = '';
        }
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
    outline: none;
    border-bottom: 1px solid #817edd;
    border-radius: 5px;
}

.form-elements input[type="text"],
.form-elements input[type="email"],
.form-elements input[type="tel"],
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

.error-message {
    color: red;
}

.success-message {
    color: green;
}
</style>