<template>
  <v-app>
    <v-layout justify-center align-center>
      <h1>Workshop 4</h1>
    </v-layout>

    <v-main>
      <v-container>
        <Form> </Form>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Form from "./components/Form";

export default {
  name: "App",

  components: {
    Form,
  },

  data: () => ({
    //
  }),
};
</script>
