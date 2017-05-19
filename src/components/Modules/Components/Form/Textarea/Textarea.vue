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
          label: '文本框',
          key: 'textarea',
          type: 'textarea',
          value: 'textarea',
          desc: '请输入内容',
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
