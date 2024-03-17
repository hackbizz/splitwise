<template>
    <div class="body">
        <!-- <div class="background_image"></div> -->
        <div class="container">
            <div>
                <h1>Sign Up</h1>
                <form @submit.prevent="generateOTP" class="register">
                    <input type="text" required v-model="name" placeholder="Enter Name">
                    <input type="text" v-model="email" placeholder="Enter Email">
                    <input type="text" v-model="number" placeholder="Enter Phone Number" pattern="[0-9]{10}" title="Please enter a 10-digit phone number without any alphabets.">
                    <input type="password" v-model="password" placeholder="Enter Password">
                    <button @click="generateOTP">Generate OTP</button>
                    <input type="text" v-if="showField" v-model="otpInput" placeholder="Enter One Time Password">
                    <button v-if="showField" @click="verifyOTP">Verify OTP</button>

                    <p>
                        Already have an account? 
                        <router-link to="/login">Login Here.</router-link>
                    </p>
                </form>
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
                    this.$router.push({name: 'Home'})
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
                this.$router.push({name: 'Home'});
            }
        },
    }
}
</script>

<style scoped>
.logo{
    width: 100px;
}
.container {
    display: flex;
    justify-content: flex-end; /* Align items to the right */
    margin-right: 100px; /* Adjust margin as needed */
    margin-top: 100px;
}
.register input{
    width: 300px;
    height: 40px;
    padding-left: 20px;
    display: block;
    margin-bottom: 30px;
    margin-right: auto;
    margin-left: auto;
    border: 1px solid skyblue;
}
.register button{
    width: 320px;
    height: 40px;
    margin-bottom: 30px;
    border: 1px solid wheat;
    background-color: skyblue;
    color: white;
    font-size: 18px;
    cursor: pointer;
}
.body {
    position: relative;
}
/* .background_image {
    top: 0;
    left: 0;
    width: 100vw;
    margin: 0;
    padding: 0;
    background-image: url('../assets/image1.png');
    background-size: cover; /* Cover the entire viewport */
    /* background-position: center; Center the background image */
    /* position: absolute;
    z-index: -1; */
    /* background-attachment: fixed; Keep the background image fixed while scrolling */
    /* Additional background styles can be added here */
    /* height: 100vh;
    opacity:  .5;
}  */
</style>