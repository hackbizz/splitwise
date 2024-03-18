import Dashboard from './components/Dashboard.vue';
import SignUp from './components/SignUp.vue'
// import SignUp from './components/TestSignUp.vue'
import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/Login.vue';

const routes = [
    {
        name: 'Dashboard',
        component: Dashboard,
        path: '/',
    },
    {
        name: 'SignUp',
        component: SignUp,
        path: '/sign-up',
    },
    {
        name: 'Login',
        component: Login,
        path: '/login',
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;