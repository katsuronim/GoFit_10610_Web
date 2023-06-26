<template>
    <div class="confirm-dialog">
      <h2>{{ title }}</h2>
      <p>{{ message }}</p>
      <button @click="confirm(true)">OK</button>
      <button @click="confirm(false)">Cancel</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      title: String,
      message: String,
    },
    methods: {
      confirm(response) {
        this.$emit('confirmed', response);
      },
    },
  };
  </script>
  
  <style>
  .confirm-dialog {
    border: 1px solid black;
    padding: 10px;
  }
  </style>
  