<script>
import { RouterLink } from 'vue-router';
import { mapActions, mapState } from 'pinia';
import { useCustomerStore } from '../stores/customer'
import { GoogleLogin } from 'vue3-google-login'
export default {
    data(){
        return {
            email: '',
            password: ''
        }
    },
    components: {
      GoogleLogin
    },
    computed: {
        ...mapState(useCustomerStore, ['isLoggedIn'])
    },
    methods: {
        ...mapActions(useCustomerStore, ['handleLogin', 'callback']),
        login(){
            this.handleLogin(this.email, this.password)
        },
    }
}
</script>

<template>
     <section class="vh-100">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col col-xl-10">
          <div class="card" style="border-radius: 1rem;">
            <div class="row g-0">
              <div class="col-md-6 col-lg-5 d-none d-md-block">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                  alt="login form"
                  class="img-fluid" style="border-radius: 1rem 0 0 1rem;"
                />
              </div>
              <div class="col-md-6 col-lg-7 d-flex align-items-center">
                <div class="card-body p-4 p-lg-5 text-black">
  
                  <form @submit.prevent="login">
  
                    <div class="d-flex align-items-center mb-3 pb-1">
                      <span class="h1 fw-bold mb-0" style="color: #FF8F9C;">Yuniclo</span>
                    </div>
  
                    <h5 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Sign into your account</h5>
  
                    <div class="form-outline mb-4">
                      <input v-model="email" type="email" class="form-control form-control-lg" />
                      <label class="form-label">Email address</label>
                    </div>
  
                    <div class="form-outline mb-4">
                      <input v-model="password" type="password" class="form-control form-control-lg" />
                      <label class="form-label">Password</label>
                    </div>
  
                    <div class="pt-1 mb-4">
                      <button class="btn btn-dark btn-lg btn-block" type="submit">Sign in</button>
                      <hr>
                      <GoogleLogin :callback="callback" />
                    </div>
                    
                    <p class="mb-5 pb-lg-2" style="color: #393f81;">Don't have an account? <RouterLink to="/register">Sign Up</RouterLink></p>
                  </form>
  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- End your project here-->
</template>

