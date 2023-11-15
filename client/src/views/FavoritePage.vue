<script>
import Card from '../components/Card.vue'
import Header from '../components/Header.vue'
import { mapState, mapActions } from 'pinia';
import { useFavoriteStore } from '../stores/favorite'
export default {
    data(){
        return {
            currentPage: 'favorite'
        }
    },
    components: {
        Card,
        Header
    },
    computed: {
        ...mapState(useFavoriteStore, ['favorites'])
    },
    methods: {
        ...mapActions(useFavoriteStore, ['fetchFavorites'])
    },
    created(){
        this.fetchFavorites()
    }
}
</script>
<template>
    <Header />
    <h2 class="title">Your Favorite</h2>
      <div class="product-grid" style="margin-right: 70px; margin-left: 70px;">
      <!-- card item -->
      <Card v-for="favorite in favorites" :key="favorite.id" :data="favorite" :currentPage="currentPage"/>
        
    </div>
</template>