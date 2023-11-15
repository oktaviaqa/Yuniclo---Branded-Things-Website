<script>
import { mapState, mapActions } from 'pinia';
import { useProductStore } from '../stores/product';
import { useFavoriteStore } from '../stores/favorite';
import { useCustomerStore } from '../stores/customer';
import { RouterLink } from 'vue-router';
import { useToast } from "vue-toastification";
const toast = useToast()
export default {
  data() {
    return {
      search: ''
    };
  },
  methods: {
    ...mapActions(useProductStore, ['fetchProducts']),
    ...mapActions(useFavoriteStore, ['fetchFavorites']),
    handleSearch() {
      this.fetchProducts(1, '', this.search);
    },
    async changePageFav() {
      try {
        this.$router.push('/favorites')
      } catch (error) {
        console.log(error);
      }
    },
    async logOut() {
      try {
        localStorage.removeItem('access_token')
        toast.success("Logged out successfully")
        this.$router.push('/')
      } catch (error) {
        console.log(error);
      }
    }
  },
  computed: {
    ...mapState(useProductStore, ['products']),
    ...mapState(useFavoriteStore, ['favorites']),
    ...mapState(useCustomerStore, ['isLoggedIn']),
  },
  created() {
    this.fetchProducts();
    this.fetchFavorites();
  },
  components: { RouterLink }
}
</script>
<template>
  <header>
    <!-- headaer -->
    <div class="header-main">
      <div class="container">
        <RouterLink to="/" class="header-logo">
          <h2 style="color: #FF8F9C;">Yuniclo</h2>
        </RouterLink>

        <div class="header-search-container">
          <input v-model="search" type="search" name="search" class="search-field"
            placeholder="Enter your product name..." />

          <button class="search-btn" @click.prevent="handleSearch">
            <ion-icon name="search-outline"></ion-icon>
          </button>
        </div>

        <div class="header-user-actions">
          <div class="dropdown">
            <ion-icon class=" action-btn" name="person-outline"></ion-icon>
            <div class="dropdown-content">
              <RouterLink  to="/login" class="dropdown-item">Login</RouterLink>
              <a  @click.prevent="logOut" class="dropdown-item">Logout</a>
            </div>
          </div>
          <button class="action-btn" @click.prevent="changePageFav">
            <ion-icon name="heart-outline"></ion-icon>
            <span class="count">{{ favorites.length }}</span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

