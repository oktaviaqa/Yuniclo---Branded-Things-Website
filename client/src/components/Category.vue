<script>
import { mapState, mapActions } from 'pinia';
import { useCategoryStore } from '../stores/category';
import { useProductStore } from '../stores/product'

export default {
    data(){
      return {
        categoryId: ''
      }
    },
    computed: {
        ...mapState(useCategoryStore, ['categories']),
        ...mapState(useProductStore, ['products'])

    },
    methods: {
      ...mapActions(useCategoryStore, ['fetchCategories']),
      ...mapActions(useProductStore, ['fetchProducts']),
      handleFilter(category){
        this.categoryId = category.id
        this.fetchProducts(1, this.categoryId)
      }
    },
    created() {
      this.fetchCategories()
    },
}
</script>
<template>
     <div class="category">
        <div class="container">
          <div class="category-item-container has-scrollbar">
            <div class="category-item" v-for="category in categories" :key="category.id">
              <div class="category-img-box">
                <img
                  src="https://iili.io/JFZdOZP.png"
                  alt="dress & frock"
                  width="35"
                />
              </div>

              <div class="category-content-box">
                <div  class="category-content-flex">
                  <h3 class="category-item-title">{{ category.name }}</h3>
                </div>

                <a @click.prevent="handleFilter(category)" href="#" class="category-btn">Show all</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
</template>