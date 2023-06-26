<template>
    <section>
        <div
        class="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5"
        style="background-color: #394867"
      >
        <a class="text-white" href="#">
            <router-link :to="{name: 'main'}" class="nav-link" style="color:white;">
                <img src="https://gofit.id/wp-content/uploads/2022/02/gofit-logos.png" width="100" height="30" class="d-inline-block align-top" alt="" style="padding-right:10px; ">
                <b> GoFIT.com </b>
            </router-link> 
        </a>
        <div class="text-white mb-3 mb-md-0">
          Login Page
        </div>
      </div>
      <div class="container-fluid h-custom">
        <div
          class="row d-flex justify-content-center align-items-center"
          style="height: 680px"
        >
          <div class="col-md-5 col-lg-5 ">
            <img style="border-radius: 10px; width: 100%;"
              src="https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2/800x400?auto=yes&bg=777&fg=555&text=First-slide"
              class="img-fluid"
              alt="Sample image"
            />
          </div>
  
          <div class="input" style="width: 80%;">
            <form @submit.prevent="login">
              <div v-if="loginFailed" class="alert alert-danger">
                Username atau Password Anda salah.
              </div>
              <!-- Email input -->
              <div>
                <input
                  type="text" style="width: 50%; margin-left: 25%;"
                  v-model="user.username"
                  id="form3Example3"
                  class="form-control form-control-lg"
                  placeholder="Enter a valid Username"
                />
                <label class="form-label" for="form3Example3" style="float:left; margin-top:10px; margin-left: 26%;">Username</label>
              </div>
  
              <!-- Password input -->
              <div>
                <input
                  type="password" style="width: 50%; margin-left: 25%; margin-top: 50px;"
                  v-model="user.password"
                  id="form3Example4"
                  class="form-control form-control-lg"
                  placeholder="Enter password"
                />
                <label class="form-label" for="form3Example4"  style="float:left; margin-top:10px; margin-left: 26%;">Password</label>
              </div>
  
              <div class=" mt-4 pt-4" style="margin-right: 100px;">
                <button
                  type="submit"
                  class="btn"
                  style="
                    padding-left: 2.5rem;
                    padding-right: 2.5rem;
                    background-color: #394867;
                    color: white;
                    margin-top:25px;
                    margin-left:100px;
                  ">
                  Login
                </button>
              </div>
  
             
            </form>
          </div>
        </div>
      </div>
  
      <div
        class="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5"
        style="background-color: #394867"
      >
        <!-- Copyright -->
        <div class="text-white mb-3 mb-md-0">
          Copyright © 2020. All rights reserved.
        </div>
        <!-- Copyright -->
  
        <!-- Right -->
      </div>
    </section>
  </template>
  
  <script>
  import { reactive, ref } from "vue";
  //import { useRouter } from "vue-router";
  import { createToaster } from "@meforma/vue-toaster";
  import axios from "axios";
  export default {
    data(){
      return {
        data : {
                //state loggedIn with localStorage
                loggedIn: localStorage.getItem('loggedIn'),
                //state token
                token: localStorage.getItem('token'),
                route: localStorage.getItem('route'),
                akun: localStorage.getItem('akun'),
                //state user
                user: [],
                //state validation
                validation: [],
                //state login failed
                loginFailed: null
        },
      }
    },
    setup() {
      //inisialisasi vue router on Composition API
      //const router = useRouter();
      //state user
      const user = reactive({
        username: "",
        password: "",
      });
      //state validation
      const validation = ref([]);
      //state loginFailed
      const loginFailed = ref(null);
    
      return {
        user, // <-- state user
        validation, // <-- state validation
        loginFailed, // <-- state loggedIn
      };
    },
    methods: {
      login() {
        const toastr = createToaster({})
                if(this.user.username.length === 0 && this.user.password.length === 0){
                  toastr.error('Username dan Password tidak boleh kosong!' , { position:"top-right" });
                  //set state login failed
                  //this.loginFailed = true
                  this.loggedIn = false
                } else if(this.user.username.length === 0){
                  toastr.error('Username tidak boleh kosong!' , { position:"top-right" });
                  //set state login failed
                  //this.loginFailed = true
                  this.loggedIn = false
                } else if (this.user.password.length === 0){
                  toastr.error('Password tidak boleh kosong!' , { position:"top-right" });
                  //set state login failed
                  //this.loginFailed = true
                  this.loggedIn = false
                }
                else if (this.user.username && this.user.password) {
                            axios.post('https://backend10610.gofit10603.site/api/login', {
                                username: this.user.username,
                                password: this.user.password
                            }).then(res => {
                                //debug user login
                                console.log(res)
                                if (res.data.success) {

                                    //set localStorage
                                    localStorage.setItem("loggedIn", "true")

                                    //set localStorage Token
                                    localStorage.setItem("token", res.data.token)

                                    //change state
                                    this.loggedIn = true

                                    if(res.data.user.JABATAN == "Admin"){
                                      localStorage.setItem("route", "Admin")
                                      return this.$router.push({ name: 'instruktur.index' })
                                    } else if (res.data.user.JABATAN == "Kasir"){
                                      localStorage.setItem("route", "Kasir")
                                      localStorage.setItem("akun", res.data.user.ID_USER)
                                      return this.$router.push({ name: 'member.index' })
                                    } else if(res.data.user.JABATAN == "Manager Operasional"){
                                      localStorage.setItem("route", "tes")
                                      let tes = localStorage.getItem("route")
                                      console.log(tes)
                                      return this.$router.push({ name: 'jadwalUmum.index'})
                                    } else {
                                      toastr.error('Username atau Password Salah!' , { position:"top-right" });
                                    }
                                } else {
                                    toastr.error('Username atau Password Salah!' , { position:"top-right" });
                                    //set state login failed
                                    //this.loginFailed = true
                                    this.loggedIn = false
                                }

                            })
                            .catch(error => {
                                console.log(error)
                            })
                }
            }
    }
  };
  </script>