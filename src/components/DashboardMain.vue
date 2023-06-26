<template>
    <div class="dashboard">
      <nav class="navbar navbar-expand" style="background-color:#394867">
        <div class="container-fluid">
          <router-link :to="{name: 'main'}" class="nav-link" style="color:white"><b> GoFIT.com </b></router-link>    
          <div class="position">
              <ul class="nav">
                  <li >
                    <router-link :to="{ name: 'login' }" class="btn btn-outline-info me-2">Login</router-link>
                  </li>
                </ul>
                
            </div>
        </div>
      </nav>
    </div>
      <router-view></router-view>
    <div class ="main" style="margin-top: 50px;">
      <div id="carouselExampleIndicators" class="carousel slide" data-mdb-ride="carousel">
        <ol class="carousel-indicators">
          <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
          <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
          <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
        </ol>
  
        <div class="carousel-inner">
  
          <div class="carousel-item active">
            <img class="d-block rounded w-75" style="margin-left:150px" src="https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2/800x400?auto=yes&bg=666&fg=444&text=Second-slide" alt="First slide"/>
            <div class="carousel-caption rounded d-none d-md-block" style="background-color:rgba(0, 0, 0, 0.5)">
                <h5 style="font-size:100px">GoFit</h5>
                <p style="font-size:20px">Tunggu apa lagi? Yuk segera mulai melangkah dan dapatkan tubuh ideal mu</p>
            </div>
        </div>
  
          <div class="carousel-item">
            <img class="d-block rounded w-75" style="margin-left:150px" src="https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2/800x400?auto=yes&bg=666&fg=444&text=Second-slide" alt="Second slide"/>
          </div>
  
          <div class="carousel-item">
            <img class="d-block rounded w-75" style="margin-left:150px" src="https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2/800x400?auto=yes&bg=666&fg=444&text=Second-slide" alt="Third slide"/>
          
        </div>
  
        </div>
      </div>
    </div>
    <!-- Footer -->
    <footer class="text-center text-lg-start bg-light text-muted" style="margin-top:70px">
  
      <!-- Section: Links  -->
      <section class="d-flex justify-content-lg-between">
  
        <div class="container text-center text-md-start mt-5">
  
          <!-- Grid row -->
          <div class="row mt-3">
            
            <!-- Grid column -->
            <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <!-- Content -->
                <h6 class="text-uppercase fw-bold mb-4"> <i class="fas fa-gem me-3"></i>Projek P3L</h6>
                <p>Andreas Noah Jati Sesoca 200710610</p>
            </div>
            <!-- Grid column -->
  
            <!-- Grid column -->
            <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <!-- Links -->
                <h6 class="text-uppercase fw-bold mb-4"> Products </h6>
                <p> <a href="#!" class="text-reset">Bootstap</a> </p>
                <p> <a href="#!" class="text-reset">Axios </a> </p>
                <p> <a href="#!" class="text-reset">Vue Js</a> </p>
                <p>  <a href="#!" class="text-reset">Laravel</a> </p>
            </div>
            <!-- Grid column -->
  
            
            <!-- Grid column -->
            <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <!-- Links -->
              <h6 class="text-uppercase fw-bold mb-4">Useful link </h6>
              <p> <a href="#!" class="text-reset">Pricing</a> </p>
              <p> <a href="#!" class="text-reset">Settings</a> </p>
              <p> <a href="#!" class="text-reset">Orders</a> </p>
              <p> <a href="#!" class="text-reset">Help</a> </p>
            </div>
            <!-- Grid column -->
  
            <!-- Grid column -->
            <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <!-- Links -->
              <h6 class="text-uppercase fw-bold mb-4">Contact</h6>
              <p> <i class="fas fa-home me-3"> </i> Universitas Atma Jaya Yogyakarta</p>
              <p> <i class="fas fa-envelope me-3"></i> atmaJaya@uajy.ac.id </p>
              <p> <i class="fas fa-phone me-3"></i> + 01 234 567 88 </p>
              <p> <i class="fas fa-print me-3"></i> + 01 234 567 89 </p>
            </div>
  
            <!-- Grid column -->
          </div>
  
          <!-- Grid row -->
        </div>
        
      </section>
      <!-- Section: Links  -->
  
      <!-- Copyright -->
      <div class=" text-white text-center p-4" style="background-color: #394867;">
        © 2021 Template:
        <a class="text-white mb-3 mb-md-0" href="https://mdbootstrap.com/">MDBootstrap.com</a>
      </div>
      <!-- Copyright -->
    </footer>
    <!-- Footer -->
  </template>
  
  <script>
  export default {
    data(){
      return {
        data : {
                //state loggedIn with localStorage
                loggedIn: localStorage.getItem('loggedIn'),
                //state token
                token: localStorage.getItem('token'),
                route: localStorage.getItem('route'),
        },
      }
    },
    setup(){
      localStorage.setItem("loggedIn", "false")
      localStorage.setItem("route", "-")
    }
  };
  </script>