import { defineStore } from 'pinia'
import axios from 'axios'
export const useCategoryStore = defineStore('category', {
    state: () => ({ 
        baseUrl: 'http://localhost:3000/pub/categories',
        categories: [] }),
    actions: {
      async fetchCategories(){
        try {
            const { data } = await axios.get(
                this.baseUrl 
            )
            this.categories = data
            // console.log(this.categories);
        } catch (error) {
            console.log(error);
        }
      }
    },
  })