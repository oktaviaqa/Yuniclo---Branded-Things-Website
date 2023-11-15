import { defineStore } from 'pinia'
import axios from 'axios'
export const useProductStore = defineStore('product', {
    state: () => ({ 
        products: [],
        productById: {},
        qrCode: {}}),
    actions: {
      async fetchProducts(page = 1, categoryId, search){
        try {
          let options = 'http://localhost:3000/pub/products'
          if (page) {
            options += `?page=${page}`
          }
          if (categoryId) {
            options += `&filter=${categoryId}`
          }
          if (search) {
            options += `&search=${search}`
          }
            const { data } = await axios.get(
                options
            )
            this.products = data
        } catch (error) {
            console.log(error);
        }
      },
      async fetchProductById(productId){
        try {
          const { data } = await axios.get(
            `http://localhost:3000/pub/products/${productId}`,
          )
          this.productById = data
        } catch (error) {
          console.log(error);
        }
      },
      async generateQrCode(url){
        try {
          console.log(url);
          const { data } = await axios({
            url: 'http://localhost:3000/pub/generate-qr',
            method: 'post',
            data: {
              url
            }
          })
          this.qrCode = data
        } catch (error) {
          console.log(error);
        }
      }
    },
  })