import { defineStore } from 'pinia'
import axios from 'axios'
import { useToast } from "vue-toastification";
const toast = useToast()
export const useCustomerStore = defineStore('customer', {
    state: () => ({
        isLoggedIn: false,
        baseUrl: 'http://localhost:3000/pub/',
    }),
    actions: {
        async register(username, email, password, phoneNumber, address) {
            try {
                await axios.post(
                    this.baseUrl + 'register',
                    { username, email, password, phoneNumber, address }
                )
                this.$router.push('/login')
                toast.success('Account created successfully, Please log in to continue')
            } catch (error) {
                console.log(error);
                toast.error(error.response.data.message)
            }
        },
        async handleLogin(email, password) {
            // console.log(email, password);
            try {
                const { data } = await axios.post(
                    this.baseUrl + 'login',
                    { email, password }
                )
                localStorage.setItem('access_token', data.access_token)
                this.isLoggedIn = true
                this.$router.push('/')
                toast.success('Login successful!')
            } catch (error) {
                console.log(error);
                toast.error(error.response.data.message)
            }
        },
        async callback(response) {
            try {
                const googleLogin = await axios({
                    url: this.baseUrl + '/google-login',
                    method: 'post',
                    headers: { google_token: response.credential }
                })
                localStorage.setItem('access_token', googleLogin.data.access_token)
                toast.success("Logged in successfully")
                this.$router.push('/')
            } catch (error) {
                console.log(error);
            }
        },
    },
})