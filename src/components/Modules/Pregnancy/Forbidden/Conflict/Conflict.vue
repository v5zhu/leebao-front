<template>
  <div class="list">
    <el-table :data="tableData" border fit style="width: 100%" align='center'>
      <el-table-column
        :prop="fields.name.info.prop"
        :label="fields.name.info.label"
        :align="fields.name.style.align"
        :width="fields.name.style.width"
        :sortable="fields.name.info.sortable">
      </el-table-column>
      <el-table-column
        :prop="fields.feature.info.prop"
        :label="fields.feature.info.label"
        :align="fields.feature.style.align"
        :width="fields.feature.style.width"
        :sortable="fields.feature.info.sortable">
      </el-table-column>
      <el-table-column
        :prop="fields.harm.info.prop"
        :label="fields.harm.info.label"
        :align="fields.harm.style.align"
        :width="fields.harm.style.width"
        :sortable="fields.harm.info.sortable">
      </el-table-column>
      <el-table-column
        :prop="fields.defense.info.prop"
        :label="fields.defense.info.label"
        :align="fields.defense.style.align"
        :width="fields.defense.style.width"
        :sortable="fields.defense.info.sortable">
      </el-table-column>
      <el-table-column
        :prop="fields.date.info.prop"
        :label="fields.date.info.label"
        :align="fields.date.style.align"
        :width="fields.date.style.width"
        :sortable="fields.date.info.sortable">
        <template scope="scope">
          <el-icon name="time"></el-icon>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>

      <el-table-column
        :label="fields.author.info.label"
        :align="fields.author.style.align"
        :width="fields.author.style.width"
        :sortable="fields.author.info.sortable">
        <template scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.author.name }}</p>
            <p>微信: {{ scope.row.author.weixin }}</p>
            <p>Q Q: {{ scope.row.author.qq }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag>
                <el-icon name="time"></el-icon>&nbsp;&nbsp;{{ scope.row.author.nickname }}


              </el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  module.exports = {
    name: 'list',
    data() {
      return {
        tableData: [],
        selectData: {
          name: '',
          star: '',
          date: ''
        },
        fields: {
          name: {
            info: {
              prop: 'name',
              label: '食物名称',
              sortable: true
            },
            filter: {},
            style: {
              width: '130',
              align: 'center'
            }
          },
          feature: {
            info: {
              prop: 'feature',
              label: '食物特征',
              sortable: true
            },
            filter: {},
            style: {
              width: '170',
              align: 'center'
            }
          },
          harm: {
            info: {
              prop: 'harm',
              label: '使用后果',
              sortable: true
            },
            filter: {},
            style: {
              width: '250',
              align: 'center'
            }
          },
          defense: {
            info: {
              prop: 'defense',
              label: '防范措施',
              sortable: true
            },
            filter: {},
            style: {
              width: '170',
              align: 'center'
            }
          },
          author: {
            info: {
              prop: 'author.nickname',
              label: '作者',
              sortable: true
            },
            filter: {},
            style: {
              width: '150',
              align: 'center'
            }
          },
          date: {
            info: {
              prop: 'date',
              label: '日期',
              sortable: true
            },
            filter: {},
            style: {
              width: '180',
              align: 'center'
            }
          }
        }
      }
    },
    methods: {
      onSelectData() {

      }
    }
  }
</script>
<style scoped>
  * {
    font-size: 12px;
  }
</style>
