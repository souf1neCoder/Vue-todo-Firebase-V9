<template>
  <div
    class="loader d-flex justify-content-center align-items-center"
    v-if="loader"
  >
    <div class="lds-hourglass"></div>
  </div>
  <Nav />
  <todolist />
  <Footer />
</template>

<script>
import Nav from "@/components/Nav.vue";
import Footer from "@/components/Footer.vue";
import todolist from "@/components/todolist.vue";
import { ref } from "vue";

export default {
  components: {
    Nav,
    Footer,
    todolist,
  },
  setup() {
    let loader = ref(true);
    function setTimeLoader() {
      setTimeout(() => {
        loader.value = false;
      }, 3000);
    }
    setTimeLoader();
    return {
      loader,
    };
  },

}
</script>

<style></style>
