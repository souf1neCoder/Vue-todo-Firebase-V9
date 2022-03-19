<template>
<Nav />
<todoBox />
<Footer />
</template>

<script>

import Nav from "@/components/Nav.vue";
import Footer from "@/components/Footer.vue";
import todoBox from "@/components/todoBox.vue";
export default {
  name: 'Home',
  components: {
    Nav,todoBox,Footer
  },
}
</script>
