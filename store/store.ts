import { defineStore } from 'pinia';

const apiFetch = $fetch.create({
    baseURL: 'https://dog.ceo/api/'
})

export const useDogsStore = defineStore({
    id: 'dogs-store',
    state: () => {
        return {
            dogsList: [],
            dogsCount: 20,
            breeds: [],
            breedItem: {},
            sortByAlfa: false,
        }
    },
    actions: {
        async getDogsList() {
            try {
                const response = await apiFetch(`breeds/image/random/${this.dogsCount}`);
                if (response && response.message && Array.isArray(response.message)) {
                    this.dogsList = response.message;
                    return this.dogsList;
                } else {
                    this.dogsList = [];
                    return [];
                }
            } catch (error) {
                console.error('Error fetching dogs:', error);
                this.dogsList = [];
                return [];
            }
        },
        async getBreedsList() {
            try {
                const response = await apiFetch(`breeds/list/all`);
                this.breeds = response.message;
                return this.breeds;
            } catch (error) {
                console.error('Error fetching breeds:', error);
                this.breeds = [];
                return [];
            }
        },
        async getBreedsListItem(slug) {
            try {
                const response = await apiFetch(`breed/${slug}/images/random/50`);
                this.breedItem = response.message;
                return this.breedItem;
            } catch (error) {
                console.error(error);
            } finally {
                this.breedItem = {};
            }
        },
        setSortByAlfa(payload){
            this.sortByAlfa = payload;
        }
    },
    getters: {
        getSortByAlfa(state) {
            return state.sortByAlfa;
        }
    }
})