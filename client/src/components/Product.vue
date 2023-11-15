<script>
import { RouterLink } from 'vue-router'
import { mapState, mapActions } from 'pinia';
import { useProductStore } from '../stores/product';
import Card from './Card.vue'
export default {
  data(){
    return {
      page: 1,
      currentPage: 'product'
    }
  },
  components: {
    Card
  },
  computed: {
    ...mapState(useProductStore, ['products'])
  },
  methods: {
    ...mapActions(useProductStore, ['fetchProducts']),
  },
  created() {
    this.page = 1
    this.fetchProducts(this.page)
  }
}
</script>
<template>
  
  <div class="product-main">  
    <div class="product-grid" style="margin-right: 30px; margin-left: 30px;">
      <!-- card item -->
        <Card v-for="product in products" :key="product.id" :data="product" :currentPage="currentPage"/>
        
    </div>
    <br />

    <!-- PAGINATION -->

    <nav class="pagination-container">
      <ul class="pagination">
        <li class="page-item">
          <a v-if="page !== 1" class="page-link" aria-label="Previous" @click.prevent="fetchProducts(page -= 1)">
            <span aria-hidden="true">&laquo;</span>
          </a>
          <a v-else  class="page-link" aria-label="Previous" style="pointer-events: none; color: rgb(195, 193, 193);">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item">
          <a  class="page-link" href="#" @click.prevent="fetchProducts(page = 1)">1</a></li>
        <li  class="page-item">
          <a class="page-link" href="#" @click.prevent="fetchProducts(page = 2)">2</a></li>
        <li  class="page-item">
          <a  class="page-link" href="#" @click.prevent="fetchProducts(page = 3)">3</a></li>
        <li class="page-item">
          <a class="page-link" aria-label="Next" @click.prevent="fetchProducts(page += 1)">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>

  </div>
</template>