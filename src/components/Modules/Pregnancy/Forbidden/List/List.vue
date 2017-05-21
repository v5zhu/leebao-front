<template>
  <div class="list">
    <el-form :inline="true" :model='selectData' class="demo-form-inline">
      <el-form-item>
        <el-input placeholder="辐射源" v-model='selectData.name'></el-input>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="指数" v-model='selectData.star'></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click='onSelectData'>查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border style="width: 100%" align='center'>
      <el-table-column
        :prop="fields.name.info.prop"
        :label="fields.name.info.label"
        :align="fields.name.style.align"
        :width="fields.name.style.width"
        :sortable="fields.name.info.sortable">
      </el-table-column>
      <el-table-column
        :prop="fields.star.info.prop"
        :sortable="fields.star.info.sortable"
        :label="fields.star.info.label"
        :align="fields.star.style.align"
        :width="fields.star.style.width"
        :formatter="formatterStar"
        :filters="fields.star.filter.list"
        :filter-method="filterStar"
        :filter-multiple="fields.star.filter.multiple">
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
      </el-table-column>
      <el-table-column
        :prop="fields.author.info.prop"
        :label="fields.author.info.label"
        :align="fields.author.style.align"
        :width="fields.author.style.width"
        :sortable="fields.author.info.sortable">
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
          name: 'X线',
          star: '5',
          feature: '波长短穿透性强,可能产生反射反应',
          harm: '怀孕前3个月胎儿处于器官形成关键期,X光可能导致细胞组织突变从而流产或先天畸形',
          defense: '医院X光照射腹部遮盖,尽量避免此类检查',
          date: '2017-05-20',
          author: 'Z.H',
        }, {
          name: '电热毯',
          star: '5',
          feature: '通电后产生电磁场,产生电磁辐射',
          harm: '容易导致胎儿细胞分裂,发生异常改变,骨骼对电磁辐射最为敏感,影响胎儿大脑、神经、骨骼和心脏',
          defense: '禁止使用电热毯',
          date: '2017-05-20',
          author: 'Z.H',
        }, {
          name: '电吹风',
          star: '4',
          feature: '开启和关闭时辐射最大,功率越大辐射越大',
          harm: '头晕、疲乏无力、记忆力减退、食欲减退、失眠、健忘等亚健康状态',
          defense: '尽量不要用,使用干发毛巾或干毛帽代替',
          date: '2017-05-20',
          author: 'Z.H',
        }, {
          name: '微波炉',
          star: '4',
          feature: '微波炉辐射小于12伏米才符合国家标准,使用请遵循说明书',
          harm: '',
          defense: '不要放卧室,人不要站旁边,不用时拔掉电源,停止运行时再过去处理食品,准妈妈勿用微波炉',
          date: '2017-05-20',
          author: 'Z.H',
        }],
        selectData: {
          name: '',
          star: '',
          date: ''
        },
        fields: {
          name: {
            info: {
              prop: 'name',
              label: '辐射源',
              sortable: true
            },
            filter: {},
            style: {
              width: '146',
              align: 'center'
            }
          },
          star: {
            info: {
              prop: 'star',
              label: '指数',
              sortable: true
            },
            filter: {
              list: [{
                text: '*',
                value: 1
              }, {
                text: '**',
                value: 2
              }, {
                text: '***',
                value: 3
              }, {
                text: '****',
                value: 4
              }, {
                text: '*****',
                value: 5
              }],
              multiple: false
            },
            style: {
              width: '150',
              align: 'center'
            }
          },
          feature: {
            info: {
              prop: 'feature',
              label: '辐射源特征',
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
              label: '辐射损害',
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
              prop: 'author',
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
      /**
       * 格式化辐射指数
       */
      formatterStar(item) {
        if (item.star == 1) {
          return '*';
        } else if (item.star == 2) {
          return '**';
        } else if (item.star == 3) {
          return '***';
        } else if (item.star == 4) {
          return '****';
        } else if (item.star == 5) {
          return '*****';
        }
      },
      filterStar(value, item) {
        return item.star == value;
      },
      onSelectData() {

      }
    }
  }
</script>
<style scoped>

</style>
