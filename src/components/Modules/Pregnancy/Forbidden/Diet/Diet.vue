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
        :prop="fields.harm.info.prop"
        :label="fields.harm.info.label"
        :align="fields.harm.style.align"
        :width="fields.harm.style.width"
        :sortable="fields.harm.info.sortable">
        <template scope="scope">
          <el-popover trigger="hover" placement="top">
              <p>核心词: {{ scope.row.harm.key }}</p>
              <p style="word-break: break-all;width:400px;">具体损伤: {{ scope.row.harm.detail }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag v-if="scope.row.harm.key!=''">{{ scope.row.harm.key }}</el-tag>
              </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        :prop="fields.consequence.info.prop"
        :label="fields.consequence.info.label"
        :align="fields.consequence.style.align"
        :width="fields.consequence.style.width"
        :sortable="fields.consequence.info.sortable">
      </el-table-column>
      <el-table-column
        :prop="fields.remark.info.prop"
        :label="fields.remark.info.label"
        :align="fields.remark.style.align"
        :width="fields.remark.style.width"
        :sortable="fields.remark.info.sortable">
      </el-table-column>
      <el-table-column
        :prop="fields.advice.info.prop"
        :label="fields.advice.info.label"
        :align="fields.advice.style.align"
        :width="fields.advice.style.width"
        :sortable="fields.advice.info.sortable">
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
        :prop="fields.author.info.prop"
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
                <span class="fa fa-at" style="color:yellowgreen"></span>
                {{ scope.row.author.nickname }}

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
        tableData: [{
          name: '辣椒',
          harm: {
            key: '便秘、血压高、中毒',
            detail: '1、吃辣椒太多易便秘,孕期本来就容易便秘，如果吃辣椒尤其是干辣椒太多，反而更易加重病情。便秘时用力屏气，腹压加大，使子宫、胎儿、血管局部受挤压致供血不足，易引起血压增高、流产、早产或胎儿畸形。\n2、对胎宝带来不利影响：辛辣物质会随着母亲的血液循环进入胎儿体内，可能会刺激到宝宝，给胎宝造成不良影响。\n3、过量吃辣也会中毒：辣椒辛热有毒，过食可使体内湿从热化，表现为皮肤痤疮，血压升高，痔疮加重，鼻出血等。长期大量食用辣椒，会引起中毒表现，如胃脘灼热感、腹胀、腹痛、恶心、呕吐、玄晕，甚至呕血、尿血、衄血、血压升高或下降。'
          },
          consequence: '易引起血压增高、流产、早产或胎儿畸形',
          remark: '1、临产前的准妈：准妈临产吃辣椒，可间接地引起子宫破裂、子痫等。\n2、前置胎盘的准妈：属于前置胎盘的妈妈要绝对禁止吃辣椒。',
          advice: '尽量少吃',
          date: '2017-05-20',
          author: {
            nickname: 'vvboot',
            name: '朱晓龙',
            'weixin': 'deeplover_baby',
            'qq': '2810010108'
          }
        }, {
          name: '花椒',
          harm: {
            key: '上火、便秘',
            detail: '孕妇本身易上火,花椒属于热性调料易导致便秘'
          },
          consequence: '便秘',
          remark: '...',
          advice: '尽量少吃',
          date: '2017-05-20',
          author: {
            nickname: 'vvboot',
            name: '朱晓龙',
            'weixin': 'deeplover_baby',
            'qq': '2810010108'
          }
        }, {
          name: '螃蟹',
          harm: {
            key: '阻断供给、流产',
            detail: '螃蟹中含有一种成分可以直接影响到胎盘,阻断胎盘的供给,特别是早孕期间,吃螃蟹,可以导致滑胎,先兆流产,尤其是蟹夹'
          },
          consequence: '流产',
          remark: '极少部分吃过也没事,但为安全忍一时平安健康',
          advice: '尽量不吃',
          date: '2017-05-20',
          author: {
            nickname: 'vvboot',
            name: '朱晓龙',
            'weixin': 'deeplover_baby',
            'qq': '2810010108'
          }
        }, {
          name: '海带',
          harm: {
            key: '少量有好处、过量功能障碍',
            detail: '好处:海带中的碘极为丰富，适量吃可以让胎儿获得必需的甲状腺素，促进宝宝大脑发育;坏处:孕妇不要多吃海带。这是因为海带中的碘可随血液循环进入胎儿体内，引起甲状腺功能障碍'
          },
          consequence: '甲状腺功能障碍',
          remark: '孕妇吃海带后不要马上喝茶（茶含鞣酸），也不要立刻吃酸涩的水果（酸涩水果含植物酸）。因为海带中含有丰富的铁，以上两种食物都会阻碍体内铁的吸收',
          advice: '少吃',
          date: '2017-05-20',
          author: {
            nickname: 'vvboot',
            name: '朱晓龙',
            'weixin': 'deeplover_baby',
            'qq': '2810010108'
          }
        }, {
          name: '甲鱼',
          harm: {
            key: '早期流产',
            detail: '早期不要吃,易导致流产,中后期少吃,注意吃法和量,最好是甲鱼汤'
          },
          consequence: '早期流产',
          remark: '不能与甲鱼一起吃的食物，例如桃子、黄鳝、芹菜等等。以免误食中毒。还有变质了、死了的甲鱼也不能吃',
          advice: '早期不吃,后期少吃',
          date: '2017-05-20',
          author: {
            nickname: 'vvboot',
            name: '朱晓龙',
            'weixin': 'deeplover_baby',
            'qq': '2810010108'
          }
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
              label: '食物',
              sortable: true
            },
            filter: {},
            style: {
              width: '100',
              align: 'center'
            }
          },
          harm: {
            info: {
              prop: 'harm.key',
              label: '害处',
              sortable: true
            },
            filter: {},
            style: {
              width: '180',
              align: 'center'
            }
          },
          consequence: {
            info: {
              prop: 'consequence',
              label: '食用后果',
              sortable: true
            },
            filter: {},
            style: {
              width: '216',
              align: 'center'
            }
          },
          remark: {
            info: {
              prop: 'remark',
              label: '备注',
              sortable: true
            },
            filter: {},
            style: {
              width: '350',
              align: 'center'
            }
          },
          advice: {
            info: {
              prop: 'advice',
              label: '强烈建议',
              sortable: true
            },
            filter: {},
            style: {
              width: '120',
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
              width: '100',
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
              width: '150',
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
