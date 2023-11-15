import { defineStore } from 'pinia'
import axios from 'axios'
import { useToast } from "vue-toastification";
const toast = useToast()
export const useFavoriteStore = defineStore('favorite', {
    state: () => ({ 
        baseUrl: 'http://localhost:3000/pub/favorites/',
        favorites: [],
         }),
    actions: {
      async fetchFavorites(){
        try {
            const { data } = await axios.get(
                this.baseUrl,
                { headers: { accss_token: localStorage.getItem('access_token')}}
            )
            this.favorites = data
        } catch (error) {
            console.log(error);
        }
      },
      async deleteFavorite(favoriteId){
        try {
            await axios.delete(
                this.baseUrl + favoriteId,
                { headers: { access_token: localStorage.getItem('access_token')}}
            )
            toast.success('Item successfully deleted.')
            this.fetchFavorites()
        } catch (error) {
            console.log(error);
        }
      },
      async addFavorite(productId, dataFav){
            try {
                const { data } = await axios.post(
                    this.baseUrl + productId,
                    dataFav,
                    { headers: { access_token: localStorage.getItem('access_token')}}
                )
                toast.success('Item added to favorite')
                this.fetchFavorites()
            } catch (error) {
                console.log(error);
                toast.warning(error.response.data.message)
            }
      }
    },
  })