<template>
  <div class="container pt-5 animate__animated animate__backInUp animate__slow">
    <div class="row">
      <div
        class="col-sm-12 col-md-6 col-lg-3 cardGrid"
        v-for="character in characters"
        :key="character.id"
      >
        <div class="card h-100" style="width: 18rem">
          <img :src="character.image" alt="">
          <div class="card-body">
            <h1>{{character.name}}</h1>
            <p class="card-text">{{character.description}}</p>
            <p class="card-text">This character was last modified on: {{character.modified}} </p>
            <router-link :to="{ name: 'character', params: { id: character.id} }">
              <button type="button" name="button" class="btn btn-warning">Edit this Hero!</button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <button @click="getCharacters"  class="btn btn-dark my-5">Load more Heroes</button>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: mapGetters([
    'characters', 'loading'
  ]),
  mounted() {
    this.$store.dispatch('getCharacters')
  },
  methods:{
    getCharacters(){
      if(this.loading){
        return;
      }
      this.$store.dispatch('getCharacters')
    }
  }
};
</script>

<style scoped>
*{
  font-family: "Bangers", cursive;
}
.cardGrid {
  margin-bottom: 2em;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  align-items: center;
}

.card{
  border: 5px solid #000000;
  pointer-events: auto;    
    transform: scale(1);
    opacity: 1;
    transition: all 150ms ease-in-out; 
}
</style>
