<script>
import { mapActions } from 'pinia';
import { useCustomerStore } from '../stores/customer'
export default {
    data(){
        return {
            username: '',
            email: '',
            password: '',
            phoneNumber: '',
            address: ''
        }
    },
    methods: {
        ...mapActions(useCustomerStore, ['register']),
        handleRegister(){
            this.register(this.username, this.email, this.password, this.phoneNumber, this.address)
        }
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
  
                  <form @submit.prevent="handleRegister">
  
                    <div class="d-flex align-items-center mb-3 pb-1">
                      <span class="h1 fw-bold mb-0" style="color: #FF8F9C;">Yuniclo</span>
                    </div>
  
                    <h5 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Sign up your account</h5>
                    <div class="form-outline mb-4">
                      <input v-model="username" type="text" class="form-control form-control-lg" />
                      <label class="form-label">Username</label>
                    </div>
                    <div class="form-outline mb-4">
                      <input v-model="email" type="email" class="form-control form-control-lg" />
                      <label class="form-label">Email address</label>
                    </div>
                    <div class="form-outline mb-4">
                      <input v-model="password" type="password" class="form-control form-control-lg" />
                      <label class="form-label">Password</label>
                    </div>
                    <div class="form-outline mb-4">
                      <input v-model="phoneNumber" type="text" class="form-control form-control-lg" />
                      <label class="form-label">phoneNumber</label>
                    </div>
                    <div class="form-outline mb-4">
                      <input v-model="address" type="text" class="form-control form-control-lg" />
                      <label class="form-label">Address</label>
                    </div>
  
                    <div class="pt-1 mb-4">
                      <button class="btn btn-dark btn-lg btn-block" type="submit">Sign Up</button>
                    </div>
  
                    <p class="mb-5 pb-lg-2" style="color: #393f81;">Do you have an account? <RouterLink to="/login">Sign In</RouterLink></p>
                  </form>
  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>