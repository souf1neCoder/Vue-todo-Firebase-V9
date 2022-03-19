<template>
  <nav class="navbar navbar-expand-lg">
      <div class="container">
            <router-link class="navbar-brand logo_link"  title="DODO" to="/"><span>DO</span>DO<i class="fas fa-stream"></i></router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <a class="nav-link" href="https://www.linkedin.com/in/soufiane-m-channa-8165b61a1/">
            <i class="fab fa-linkedin-in"></i>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="https://github.com/souf1neCoder">
            <i class="fab fa-github"></i>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="https://twitter.com/Soufianemchanna">
            <i class="fab fa-twitter"></i>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="mailto:mchanna.soufiane@gmail.com"><i class="fas fa-envelope"></i></a>
        </li>
        <li class="nav-item" v-if="id">
         <button @click="logout" class="btn btn-dark">Logout</button>
        </li>
      </ul>
    </div>
      </div>
  
  </nav>
</template>
<script>
import { auth } from "@/firebase.js";
import { signOut} from "firebase/auth";
import router from "@/router";

export default {
  data(){
    return{
      id:""
    }
  },
  mounted(){
    if(auth.currentUser){
      this.id = auth.currentUser.uid
    }
  },
  methods:{
    logout(){
      signOut(auth).then(()=>{
          router.push("/auth");
      })
    }
  }
}
</script>
