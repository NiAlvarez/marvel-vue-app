<template>
  <NavbarCommon :onCreation="false"/>
  <div class="gridBg">
    <div
      class="container d-flex justify-content-center align-items-center pt-5 animate__animated animate__backInUp animate__slow"
    >
      <div class="row">
        <div class="col-md-12">
          <div class="centered mb-5">
          Edition and Creation Mode!
        </div> 
          <div>
            <div v-if="!creation" class="card" >
              <div class="card-body">
                <div
                  class="cardDivision d-flex flex-row justify content-center align-items-center"
                >
                  <div class="textCard">
                    <h5 class="card-title">{{ character.name }}</h5>
                    <h4 class="card-text" v-if="character.description !== ''">
                      {{ character.description }}
                    </h4>
                    <h4 class="card-text" v-else>
                      No description listed for this character.
                    </h4>
                    <p>Last modified on:{{ character.modified }}</p>
                  </div>
                  <img
                    :src="character.image"
                    alt="imageCharacter"
                    class="char-img mx-5"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="container d-flex justify-content-center align-items-center pt-5 animate__animated animate__backInUp animate__slow"
    >
      <div class="row">
        <div class="col-md-12">
          <div class="card" style="width: 18rem">
            <div class="card-body">
              <div
                class="cardDivision d-flex flex-row justify content-center align-items-center"
              >
                <div class="textCard">
                  <form @submit.prevent>
                    <div class="col-md-12">
                      <input
                        v-model="name"
                        placeholder="New Hero Name"
                        type="text"
                        class="form-control my-2"
                      />
                      <input
                        v-model="description"
                        placeholder="New Hero Description"
                        type="text"
                        class="form-control my-2"
                      />
                    </div>
                    <button class="btn btn-dark mt-2" @click="updateHero()">
                      Save changes
                    </button>
                  </form>
                </div>
                <div
                  class="thumbnailUplaoder d-flex flex-column justify-content-center align-item-start mx-4"
                >
                  <div
                    v-if="previewImage"
                    class="imagePreviewWrapper"
                    :style="{ 'background-image': `url(${previewImage})` }"
                    @click="selectImage"
                  ></div>
                  <p>Load new Thumbnail:</p>
                  <input
                    @input="uploadImage"
                    ref="fileInput"
                    class="form-control my-2"
                    type="file"
                  />
                </div>
              </div>
            </div>
          </div>
          <router-link to="/">
            <button type="button" name="button" class="btn btn-dark mt-5">
              Back
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import NavbarCommon from "@/common/components/NavbarCommon.vue";
export default {
  components: { NavbarCommon },
  data() {
    return {
      creation: false,
      previewImage: null,
      name: "",
      description: "",
    };
  },
  mounted() {
    if(this.$route.params.id){
      this.$store.dispatch("getCharacterById", this.$route.params.id);
    }
    else{
      this.$store.dispatch("newCharacter")
      this.creation = true;
    }
  },
  computed: mapGetters([
    'character', 'loading'
  ]),
  methods: {
    updateHero() {
      const newCharacter = {}
      if(this.name){
        newCharacter.name = this.name
      }
      if(this.description){
        newCharacter.description = this.description
      }
      if(this.previewImage){
        newCharacter.image = this.previewImage
      }
      this.$store.dispatch("editCharacter", {
        ...newCharacter,
        modified: Date(),
        id: this.character.id
      }) 
    },
    selectImage() {
      this.$refs.fileInput.click();
    },
    uploadImage() {
      const file = document.querySelector("input[type=file]").files[0];
      this.previewImage = URL.createObjectURL(file);
    },
  },
};
</script>

<style scoped>
* {
  font-family: "Bangers", cursive;
}
.gridBg {
  background-image: url(@/assets/bgHomePage.jpg);
  background-position: center;
  background-size: auto;
}
.cardAlign {
  margin-top: 5rem;
}
.card {
  border: 5px solid #000000;
  min-width: 40rem;
}
.imagePreviewWrapper {
  width: 250px;
  height: 250px;
  display: block;
  cursor: pointer;
  margin: 0 auto 30px;
  background-size: cover;
  background-position: center center;
}
.centered {    
  color: #000;
  margin: 30px 0 -1em 0;
  text-shadow: -1px -1px yellow, 1px 1px orange, 2px 2px orange;
  -webkit-transform: rotate(-5deg) skew(-10deg, 0);
  -moz-transform: rotate(-5deg) skew(-10deg, 0);
  -ms-transform: rotate(-5deg) skew(-10deg, 0);
  -o-transform: rotate(-5deg) skew(-10deg, 0);
  transform: rotate(-5deg) skew(-10deg, 0);
  padding-bottom: 0px;
  width: 100%;
  font-size: 95px;
  font-family: "Bangers", cursive;
}
</style>
