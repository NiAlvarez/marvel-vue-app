<template>
  <div class="container-fluid bg">
    <div class="row">
      <NavbarCommon :onCreation="false" />
      <div
        class="container d-flex flex-row justify-content-center align-items-center"
      >
        <div
          class="col-md-6 d-flex flex-column justify-content-center align-items-center"
        >
          <h1>Page not found 404</h1>
          <h3>You make Hulk sad >:(</h3>
        </div>
        <div class="col-md-6 d-flex justify-content-center align-items-center">
          <img src="@/assets/hulkSad.jpg" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavbarCommon from "@/common/components/NavbarCommon.vue";

export default {
  components: { NavbarCommon },
};
</script>

<style>
* {
  font-family: "Bangers", cursive;
}
.bg {
  background-image: url(@/assets/bgHomePage.jpg);
  background-position: center;
  background-size: 100vw;
  height: 100vh;
}
</style>
