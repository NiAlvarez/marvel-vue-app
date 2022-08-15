<template>
  <div class="container ">
    <form class="d-flex flex-row justify-content-center" @submit.prevent
      @submit="handleSearch()">
        <div class="col-md-12">
          <input v-model="name"
            placeholder="Search your favorite character"
            type="text"
            class="form-control"/>
        </div>
        <button @click="handleSearch()" class="btn btn-warning mx-2">Search!</button>
    </form>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      name: ''
    }
  },
  methods: {
    handleSearch () {
      this.$store.dispatch('getCharacterByName', this.name)
    }
  }
}
</script>

<style scoped>
*{
  font-family: "Bangers", cursive;
}
.inputBar{
  min-width: 14rem;
}
</style>