<template>
  <Nav />

  <main class="sign"  style="padding-bottom:100px">
    <section class="forms row mt-5">
      <div class="register col-lg-6 col-md-6 col-xs-12 p-0">
        <form @submit.prevent="register" class="py-5">
          <h2 class="mb-4">Register</h2>
          <div class="form-group">
            <input
              type="email"
              required
              class="form-control"
              placeholder="Email"
              v-model="registerUser.email"
            />
          </div>
          <div class="form-group">
            <input
              type="password"
              required
              class="form-control"
              placeholder="Password"
              v-model="registerUser.password"
            />
          </div>
          <input type="submit" class="btn btn-light" value="Register" />
        </form>
      </div>
      <div class="login col-lg-6  col-md-6 col-xs-12 p-0">
        <form @submit.prevent="login" class="py-5">
          <h2 class="mb-4">Login</h2>
          <div class="form-group">
            <input
              type="email"
              required
              class="form-control"
              placeholder="Email"
              v-model="loginUser.email"
            />
          </div>
          <div class="form-group">
            <input
              type="password"
              placeholder="Password"
              class="form-control"
              v-model="loginUser.password"
              required
            />
          </div>
          <input type="submit" class="btn btn_add" value="Login" />
        </form>
      </div>
    </section>
  </main>

  <Footer />
</template>

<script>
import { auth } from "@/firebase.js";
import router from "@/router";
import Nav from "@/components/Nav.vue";
import Footer from "@/components/Footer.vue";
//
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
export default {
  components: {
    Nav,
    Footer,
  },
  data() {
    return {
      loginUser: {
        email: "",
        password: "",
      },
      registerUser: {
        email: "",
        password: "",
      },
    };
  },

  methods: {
    async register() {
      if (this.registerUser.email !== "" && this.registerUser.password !== "") {
        try {
          await createUserWithEmailAndPassword(
            auth,
            this.registerUser.email,
            this.registerUser.password
          )
        } catch (error) {
          switch (error.code) {
            case "auth/email-already-in-use":
              alert("Email already in use");
              break;
            case "auth/invalid-email":
              alert("Invalid Email");
              break;
            case "auth/operation-not-allowed":
              alert("Operation not allowed");
              break;
            case "auth/weak-password":
              alert("Weak password");
              break;
            default:
              alert("Something went wrong");
          }
          return;
        }

        router.push("/");
      }
    },
    async login() {
      if (this.loginUser.email !== "" && this.loginUser.password !== "") {
        try {
          await signInWithEmailAndPassword(
            auth,
            this.loginUser.email,
            this.loginUser.password
          );
        } catch (error) {
          switch (error.code) {
            case "auth/user-not-found":
              alert("User not found");
              break;
            case "auth/wrong-password":
              alert("Wrong Password");
              break;
            default:
              alert("Something went wrong");
          }
          return;
        }

        router.push("/");
      }
    },
  },
};
</script>

<style scoped>


form {
  width: 80%;
  margin:auto;
  overflow: hidden;
}
.form-control {
  border-radius: 1rem;
}
.login .form-control {
  background: var(--light);
}
.login h2 ,.register h2{
  color: var(--dark);
}
</style>
