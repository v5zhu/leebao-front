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
          label: '单选',
          key: 'radio',
          type: 'radio',
          desc: 'radio',
          value: {
            default: '2',
            list: [{
              text: '不限',
              value: '1'
            }, {
              text: '男',
              value: '2'
            }, {
              text: '女',
              value: '3'
            }]
          }
        }]
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
