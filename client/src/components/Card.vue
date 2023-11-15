<script>
import { mapState, mapActions } from "pinia";
import { useProductStore } from "../stores/product";
import { useFavoriteStore } from "../stores/favorite";
export default {
    computed: {
        ...mapState(useProductStore, ['products']),
        ...mapState(useFavoriteStore, ['favorites'])
    },
    methods: {
        ...mapActions(useFavoriteStore, ['deleteFavorite']),
        ...mapActions(useFavoriteStore, ['addFavorite'])
    },
    props: ['data', 'currentPage'], 
}
</script>
<template>
    <div v-if="currentPage === 'product'" class="card">
        <div class="showcase-banner">
            <img class="product-img default" :src=data.imgUrl alt="Card image cap" />
            <button @click.prevent="addFavorite(data.id)" class="btn-action">
                <ion-icon name="heart-outline"></ion-icon>
            </button>
        </div>
        <div class="card-body" style="padding: 15px 20px 0">

            <!-- Title -->
            <div class="showcase-category">{{ data.name }}</div>
            <div class="showcase-title" style="color: rgb(165, 163, 163);">{{ data.Category.name }}</div>
            <!-- Text -->
            <h3 class="showcase-title">{{ data.description }}</h3>
            <div class="showcase-rating">
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star-outline"></ion-icon>
                <ion-icon name="star-outline"></ion-icon>
            </div>
            <div class="price-box">
                <p class="price">Rp.{{ data.price }}</p>
            </div>
            <!-- Button -->
            <RouterLink :to="'/products/' + data.id">
                <h3 class="showcase-button">Details</h3>
            </RouterLink>
        </div>
    </div>

    <div v-if="currentPage === 'favorite'" class="card">
        <div class="showcase-banner">
            <img class="product-img default" :src=data.Product.imgUrl alt="Card image cap" />
            <button @click.prevent="deleteFavorite(data.id)"  class="btn-action">
                <ion-icon name='trash-outline'></ion-icon>
            </button>
        </div>
        <div class="card-body" style="padding: 15px 20px 0">
          
            <!-- Title -->
            <div class="showcase-category">{{ data.Product.name }}</div>
            <!-- <div class="showcase-title" style="color: rgb(165, 163, 163);">{{ data.Category.name }}</div> -->
            <!-- Text -->
            <h3 class="showcase-title">{{ data.Product.description }}</h3>
            <div class="showcase-rating">
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star-outline"></ion-icon>
                <ion-icon name="star-outline"></ion-icon>
            </div>
            <div class="price-box">
                <p class="price">Rp.{{ data.Product.price }}</p>
            </div>
            <!-- Button -->
            <RouterLink :to="'/products/' + data.ProductId">
                <h3 class="showcase-button">Details</h3>
            </RouterLink>
        </div>
    </div>
</template>