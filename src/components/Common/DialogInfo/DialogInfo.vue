<template>
    <div class="">
        <el-dialog size="tiny"
            :title="dialog.title"
            v-model="show"
            @close='onClose'>
            <el-form style="margin:20px;width:60%;min-width:100%"
                label-width="100px">
                <el-form-item class='edit-form'
                    v-for='field in dialog.fields'
                    :label='field.label'>
                    {{dialog.data[field.key]}}
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="onClose">关 闭</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
  module.exports = {
    name: 'dialog-info',
    data() {
      return {
        dialog: this.Dialog || {}
      }
    },
    methods: {
      onClose() {
        this.dialog.show = false;
      }
    },

    computed: {
      show() {
        return this.dialog.show;
      }
    },

    mounted() {
      // console.log(this.Show);
    },

    /**
     * 接收参数
     * @type {Object}
     */
    props: {
      Dialog: {
        type: Object,
        validator: (v) => {
          return true;
        }
      }
    },


    /**
     * 监控参数
     * @type {Object}
     */
    watch: {

    }
  }
</script>
<style scoped lang='less'>
    .demo-form-inline{
        display: inline-block;
        float: right;
    }
    .btm-action{
        margin-top: 20px;
        text-align: center;
    }
    .actions-top{
        height: 46px;
    }
    .pagination{
        display: inline-block;
    }
</style>
