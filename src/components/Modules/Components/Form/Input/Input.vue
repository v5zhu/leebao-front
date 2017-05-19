<template>
    <div class="form">
        <form-data
            :FieldList='fields'
            @onSubmit='onSubmit'></form-data>
    </div>
</template>
<script>
  import {
    FormData
  } from 'common/';

  module.exports = {
    components: {
      FormData
    },
    data() {
      return {
        fields: [{
          label: 'Input',
          key: 'input',
          value: 'sailengsi',
          desc: '请输入标题'
        }],
      }
    },
    methods: {
      onSubmit(data) {
        this.$emit('onTest', data);
      }
    }
  }
</script>
<style scoped>

</style>
