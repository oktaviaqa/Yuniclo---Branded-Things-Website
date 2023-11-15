<script >
import { RouterLink, RouterView } from 'vue-router'
import Header from '../components/Header.vue'
import Banner from '../components/Banner.vue'
import Category from '../components/Category.vue'
import Product from '../components/Product.vue'

export default {
  components: {
    Header,
    Banner,
    Category,
    Product
  }
}
</script>

<template>
  <!-- header -->
  <Header />
    <main>
      <!-- banner -->
      <Banner />

      <!-- category -->
      <Category />

      <!-- product -->
      <Product />
      
    </main>

  <RouterView />
</template>