<template>
  <div class="bannerContainer">    
    <div class="centered">Hero Search</div>
  </div>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <router-link to="creation">
        <button
        v-if="!onCreation"
          class="navbar-brand animate__animated animate__bounceInLeft animate__slow btn btn-warning"         
          >Create your hero!</button>
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse d-flex justify-content-end"
        id="navbarSupportedContent"
      >
        <div class="animate__animated animate__bounceInRight animate__slow">
          <SearchCharacter />
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import SearchCharacter from "@/modules/searchCharacter/SearchCharacter.vue";
export default {
  props: {
    onCreation: {
      type: Boolean,
      default: true
    }
  },
  
  components: { SearchCharacter },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Bangers&display=swap");
img {
  height: auto;
  max-width: 100%;
  width: auto;
}
a {
  font-family: "Bangers", cursive;
  font-size: 32px;
  color: #000
  
}
.bannerContainer {
  color: white;
  position: relative;
  text-align: center;
  background-image: url("@/assets/bannerApp.png"),linear-gradient(to bottom, #163C52 0%,#4F4F47 30%,#C5752D 60%,#B7490F 80%, #2F1107 100%);
    background-size: contain,auto;
    background-position: bottom;
    background-repeat: repeat-x;
    min-height: 200px;
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
  float: left;
  width: 100%;
  font-size: 95px;
  font-family: "Bangers", cursive;
}
</style>
