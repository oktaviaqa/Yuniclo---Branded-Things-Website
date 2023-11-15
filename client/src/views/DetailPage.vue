<script>
import Header from '../components/Header.vue'
import { mapState, mapActions } from 'pinia';
import { useProductStore } from '../stores/product';
import { useFavoriteStore } from '../stores/favorite';
export default {
    components: {
        Header
    },
    computed: {
        ...mapState(useProductStore, ['productById', 'qrCode'])
    },
    methods: {
        ...mapActions(useProductStore, ['fetchProductById', 'generateQrCode']),
        ...mapActions(useFavoriteStore, ['addFavorite'])
    },
    async created() {
        const productId = this.$route.params.id
        this.fetchProductById(productId)
        await this.generateQrCode(window.location.href)
    }
}
</script>
<template>
    <Header />
    <div class="product-featured">

        <h2 class="title">Detail Product</h2>
        <div class="showcase-wrapper has-scrollbar">
            <div class="showcase-container">

                <div class="showcase">

                    <div class="showcase-banner">
                        <img :src=productById.imgUrl alt="Rose Gold diamonds Earring" class="showcase-img">
                    </div>

                    <div class="showcase-content">

                        <div class="showcase-rating">
                            <ion-icon name="star"></ion-icon>
                            <ion-icon name="star"></ion-icon>
                            <ion-icon name="star"></ion-icon>
                            <ion-icon name="star-outline"></ion-icon>
                            <ion-icon name="star-outline"></ion-icon>
                        </div>

                        <h3 class="showcase-title">
                            <a href="#" class="showcase-title">{{ productById.name }}</a>
                        </h3>

                        <p class="showcase-desc">
                            {{ productById.description }}
                        </p>

                        <div class="price-box">
                            <p class="price">Rp. {{ productById.price }}</p>
                        </div>

                        <button @click.prevent="addFavorite(productById.id)" class="add-cart-btn">add to favorite</button>

                        <div class="showcase-status">
                            <div class="wrapper">
                                <p> available: <b>{{ productById.stock }}</b> </p>
                            </div>
                        </div>

                        <div class="countdown-box">
                            <p class="countdown-desc">Scan QR Code</p>
                            <div v-html="qrCode.data" style="width: 10rem; height: 10rem;" class="mb-2"></div>
                        </div>

                    </div>

                </div>

            </div>

        </div>

    </div>
</template>

<style>
.qr-code-img {
  max-width: 200px; /* Atur lebar maksimal sesuai kebutuhan Anda */
}

.generate-qr-btn {
  margin-top: 10px;
}
</style>