<template>
    <div class="list">
        <el-form :inline="true" :model='selectData' class="demo-form-inline">
            <el-form-item>
                <el-input placeholder="姓名" v-model='selectData.name'></el-input>
            </el-form-item>
            <el-form-item>
                <el-input placeholder="地址" v-model='selectData.address'></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click='onSelectData'>查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData" border style="width: 100%" align='center'>
            <el-table-column
                :prop="fields.date.info.prop"
                :label="fields.date.info.label"
                :align="fields.date.style.align"
                :width="fields.date.style.width"
                :sortable="fields.date.info.sortable">
            </el-table-column>
            <el-table-column
                :prop="fields.name.info.prop"
                :label="fields.name.info.label"
                :align="fields.name.style.align"
                :width="fields.name.style.width"
                :sortable="fields.name.info.sortable">
            </el-table-column>
            <el-table-column
                :prop="fields.sex.info.prop"
                :sortable="fields.sex.info.sortable"
                :label="fields.sex.info.label"
                :align="fields.sex.style.align"
                :width="fields.sex.style.width"
                :formatter="formatterSex"
                :filters="fields.sex.filter.list"
                :filter-method="filterSex"
                :filter-multiple="fields.sex.filter.multiple">
            </el-table-column>
            <el-table-column
                :prop="fields.status.info.prop"
                :label="fields.status.info.label"
                :align="fields.status.style.align"
                :width="fields.status.style.width"
                :sortable="fields.status.info.sortable"
                :formatter="formatterStatus"
                :filters="fields.status.filter.list"
                :filter-method="filterStatus"
                :filter-multiple="fields.status.filter.multiple">
            </el-table-column>
            <el-table-column
                :prop="fields.address.info.prop"
                :label="fields.address.info.label"
                :align="fields.address.style.align">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
  module.exports = {
    name: 'list',
    data() {
      return {
        tableData: [{
          date: '1992-01-26',
          name: '赛冷思',
          sex: 1,
          status: 1,
          address: '北京苏州街',
        }, {
          date: '1996-05-02',
          name: '赛',
          sex: 1,
          status: 1,
          address: '西直河',
        }, {
          date: '1990-05-04',
          name: '冷',
          sex: 2,
          status: 2,
          address: '朝阳区',
        }, {
          date: '1998-05-01',
          name: '思',
          sex: 1,
          status: 1,
          address: '上海滩',
        }],
        selectData: {
          name: '',
          address: '',
          date: ''
        },
        fields: {
          sex: {
            info: {
              prop: 'sex',
              label: '性别',
              sortable: true
            },
            filter: {
              list: [{
                text: '男',
                value: 1
              }, {
                text: '女',
                value: 2
              }],
              multiple: false
            },
            style: {
              width: '130',
              align: 'center'
            }
          },
          status: {
            info: {
              prop: 'status',
              label: '状态',
              sortable: true
            },
            filter: {
              list: [{
                text: '启用',
                value: 1
              }, {
                text: '禁用',
                value: 2
              }],
              multiple: false
            },
            style: {
              width: '130',
              align: 'center'
            }
          },
          address: {
            info: {
              prop: 'address',
              label: '地址'
            },
            filter: {

            },
            style: {
              align: 'center'
            }
          },
          date: {
            info: {
              prop: 'date',
              label: '日期',
              sortable: true
            },
            filter: {

            },
            style: {
              width: '180',
              align: 'center'
            }
          },
          name: {
            info: {
              prop: 'name',
              label: '姓名',
              sortable: true
            },
            filter: {

            },
            style: {
              width: '150',
              align: 'center'
            }
          }
        }
      }
    },
    methods: {
      /**
       * 格式化性别
       */
      formatterSex(item) {
        return item.sex == 1 ? '男' : '女';
      },

      /**
       * 格式化状态
       */
      formatterStatus(item) {
        return item.status == 1 ? '启用' : '禁用';
      },

      filterSex(value, item) {
        return item.sex == value;
      },
      filterStatus(value, item) {
        return item.status == value;
      },

      onSelectData() {

      }
    }
  }
</script>
<style scoped>

</style>
