<template>
  <div>
    <h1>[Productos]</h1>
    <v-btn color="info" @click="showMessage(snackbar)">mostrar snackbar</v-btn>
  </div>
</template>


<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      snackbar: {
        message: "desde productos",
        timout: 2000
      }
    };
  },
  methods: {
    ...mapMutations(["showMessage"])
  }
};
</script>