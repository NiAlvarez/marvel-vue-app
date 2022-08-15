<template>
  <NavbarCommon :onCreation="false" />
  <div class="gridBg">
    <CharactersGrid />
  </div>
</template>

<script>
import NavbarCommon from "@/common/components/NavbarCommon.vue";
import CharactersGrid from "../../modules/character/CharactersGrid.vue";
export default {
  components: { NavbarCommon, CharactersGrid },
};
</script>

<style>
.gridBg {
  background-image: url(@/assets/bgHomePage.jpg);
  background-position: center;
}
</style>
