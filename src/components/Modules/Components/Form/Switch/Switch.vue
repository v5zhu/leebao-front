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
          key: 'status',
          type: 'switch',
          value: {
            default: true,
            on: '启用',
            off: '禁用'
          },
          desc: '',
          label: 'Switch'
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
