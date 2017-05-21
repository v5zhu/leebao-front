<template>
  <div class="list">
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
          author: 'vvboot',
        }, {
          name: '电热毯',
          star: '5',
          feature: '通电后产生电磁场,产生电磁辐射',
          harm: '容易导致胎儿细胞分裂,发生异常改变,骨骼对电磁辐射最为敏感,影响胎儿大脑、神经、骨骼和心脏',
          defense: '禁止使用电热毯',
          date: '2017-05-20',
          author: 'vvboot',
        }, {
          name: '电吹风',
          star: '4',
          feature: '开启和关闭时辐射最大,功率越大辐射越大',
          harm: '头晕、疲乏无力、记忆力减退、食欲减退、失眠、健忘等亚健康状态',
          defense: '尽量不要用,使用干发毛巾或干毛帽代替',
          date: '2017-05-20',
          author: 'vvboot',
        }, {
          name: '微波炉',
          star: '4',
          feature: '微波炉辐射小于12伏米才符合国家标准,使用请遵循说明书',
          harm: '',
          defense: '不要放卧室,人不要站旁边,不用时拔掉电源,停止运行时再过去处理食品,准妈妈勿用微波炉',
          date: '2017-05-20',
          author: 'vvboot',
        }, {
          name: '电脑',
          star: '3',
          feature: '开机时周边存在电磁辐射,包括X射线、紫外线、可见光、红外线和特高频、高频、中频及极低频电磁场;背面辐射最强,两侧其次,正面最弱',
          harm: '在细胞膜水平上干扰细胞的代谢和增殖,从而影响胚胎的发育,其次电脑辐射是导致宝宝听力残疾的头号危险因素',
          defense: '保持安全距离,穿防辐射服,控制时间',
          date: '2017-05-20',
          author: 'vvboot',
        }, {
          name: '手机',
          star: '2',
          feature: '工作状态时向基站传送无线电波,通话接通时比通话中辐射高20倍,信号不好电量低时,辐射更高',
          harm: '或多或少被人体吸收,从而改变人体组织',
          defense: '专用耳机、麦克风接听电话,减少通话时间,电话未接通时避免靠近耳部',
          date: '2017-05-20',
          author: 'vvboot',
        }, {
          name: '电视机',
          star: '2',
          feature: '传统电视电子束打在荧光粉上的瞬间会产生电磁辐射,产生X射线,液晶电视相对辐射小很多',
          harm: '...',
          defense: '保持2米以上距离,连续不能超过2小时,看完电视洗脸',
          date: '2017-05-20',
          author: 'vvboot',
        }, {
          name: '复印机/打印机',
          star: '1',
          feature: '有电流就有电磁波即存在辐射,打印机的电子线圈和风扇部位辐射最大',
          harm: '...',
          defense: '办公一族保持30厘米以上或穿防辐射服',
          date: '2017-05-20',
          author: 'vvboot',
        }, {
          name: '安检',
          star: '1',
          feature: '主要通过电磁场的辐射对金属物探测,电磁辐射小',
          harm: '...',
          defense: '不超过6分钟,减少乘飞机,准妈妈尽快通过安检',
          date: '2017-05-20',
          author: 'vvboot',
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
              width: '130',
              align: 'center'
            }
          },
          star: {
            info: {
              prop: 'star',
              label: '辐射指数',
              sortable: true
            },
            filter: {
              list: [{
                text: '★',
                value: 1
              }, {
                text: '★★',
                value: 2
              }, {
                text: '★★★',
                value: 3
              }, {
                text: '★★★★',
                value: 4
              }, {
                text: '★★★★★',
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
          return '★';
        } else if (item.star == 2) {
          return '★★';
        } else if (item.star == 3) {
          return '★★★';
        } else if (item.star == 4) {
          return '★★★★';
        } else if (item.star == 5) {
          return '★★★★★';
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
    *{
      font-size: 12px;
    }
</style>
