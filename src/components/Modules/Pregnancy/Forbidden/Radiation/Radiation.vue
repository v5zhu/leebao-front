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
        <el-button type="primary" @click='setDialogInfo'>添加新的孕期禁忌项</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" border fit style="width: 100%" align='center'>
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
        <template scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>核心词: {{ scope.row.harm.key }}</p>
            <p>具体损伤: {{ scope.row.harm.detail }}</p>
            <div slot="reference" class="name-wrapper" style="word-break: break-all">
              <el-tag v-if="scope.row.harm.key!=''">{{ scope.row.harm.key }}</el-tag>
            </div>
          </el-popover>
        </template>
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
                <span class="fa fa-at" style="color:yellowgreen"></span>
                {{ scope.row.author.nickname }}









              </el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <template>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="pageSizes"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </template>
    <ul type="circle" style="margin-left: 20px">
      <li>挑选正规厂家生产的合格家电产品</li>
      <li>不要把家用电器摆的过于集中</li>
      <li>缩短使用电器的时间</li>
      <li>有条件的孕妈咪可使用产品质量合格,有相关检测证明的防辐射服装、电视防辐射屏、防辐射窗帘等</li>
    </ul>

    <!--start新增模态框-->
    <el-dialog size="small" :title="dialog.title"
               v-model="dialog.show_pass">
      <el-form style="margin:20px;width:80%;"
               label-width="100px"
               :model="dialog.user_info"
               :rules="dialog.user_info_rules"
               ref='user_info'>
        <el-form-item class='edit-form'
                      label="禁忌源名称"
                      prop='name'>
          <el-input v-model="forbid.name" placeholder='禁忌源名称'></el-input>
        </el-form-item>
        <el-form-item class='edit-form'
                      label="类型"
                      prop='type'>
          <!-- select,下拉框 -->
          <el-select v-model="forbid.type" placeholder="请选择">
            <el-option
              v-for="item in typeItem"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class='edit-form'
                      label="伤害指数"
                      prop='star'>
          <!-- select,下拉框 -->
          <el-select v-model="forbid.star" placeholder="请选择">
            <el-option
              v-for="item in starItem"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class='edit-form'
                      label="禁忌源特征"
                      prop='feature'>
          <el-input type="textarea" v-model="forbid.feature" placeholder='禁忌源特征'></el-input>
        </el-form-item>
        <el-form-item class='edit-form'
                      label="损害"
                      prop='harm'>
          <el-input type="textarea" v-model="forbid.harm" placeholder='损害概要'></el-input>
        </el-form-item>
        <el-form-item class='edit-form'
                      label="具体损伤"
                      prop='harmDetail'>
          <el-input
            type="textarea"
            placeholder='具体损伤'
            auto-complete='off'
            v-model="forbid.harmDetail"></el-input>
        </el-form-item>
        <el-form-item class='edit-form'
                      label="如何防范"
                      prop='defense'>
          <el-input
            type="textarea"
            placeholder='如何防范'
            auto-complete='off'
            v-model="forbid.defense"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
                <el-button @click="dialog.show_pass = false">取 消</el-button>
                <el-button type="primary" @click="saveForbid">确 定</el-button>
            </span>
    </el-dialog>
    <!--end新增模态框-->
  </div>
</template>

<script>
  module.exports = {
    name: 'list',
    data() {
      return {
        typeItem: [{
          value: 'conflict',
          label: '食物相克'
        }, {
          value: 'radiation',
          label: '辐射禁忌'
        }, {
          value: 'diet',
          label: '饮食禁忌'
        }, {
          value: 'fruit',
          label: '水果禁忌'
        }, {
          value: 'life',
          label: '生活禁忌'
        }, {
          value: 'medicine',
          label: '用药禁忌'
        }, {
          value: 'clothing',
          label: '衣着禁忌'
        }, {
          value: 'sexual',
          label: '性生活禁忌'
        }, {
          value: 'sport',
          label: '运动禁忌'
        }, {
          value: 'lyingin',
          label: '月子禁忌'
        }, {
          value: 'work',
          label: '上班禁忌'
        }],
        starItem: [{
          value: '1',
          label: '★'
        }, {
          value: '2',
          label: '★★'
        }, {
          value: '3',
          label: '★★★'
        }, {
          value: '4',
          label: '★★★★'
        }, {
          value: '5',
          label: '★★★★★'
        }],
        forbid: {
          name: '',
          type: '',
          star: '',
          feature: '',
          harm: '',
          harmDetail: '',
          defense: ''
        },
        dialog: {
          show_pass: false,
          title: '添加孕期禁忌项',
          user_info: this.$store.state.user.userinfo,
          user_info_rules: {
            old_password: [{
              required: true,
              message: '旧密码不能为空！',
              trigger: 'blur'
            }],
            password: [{
              required: true,
              message: '新密码不能为空！',
              trigger: 'blur'
            }, {
              trigger: 'blur',
              validator: (rule, value, callback) => {
                if (value === '') {
                  callback(new Error('请再次输入密码'));
                } else {
                  if ('' !== this.dialog.user_info.password) {
                    this.$refs.user_info.validateField('password_confirm');
                  }
                  callback();
                }
              }
            }],
            password_confirm: [{
              required: true,
              message: '确认密码不能为空！',
              trigger: 'blur'
            }, {
              trigger: 'blur',
              validator: (rule, value, callback) => {
                if (value === '') {
                  callback(new Error('请再次输入密码'));
                } else if (value !== this.dialog.user_info.password) {
                  callback(new Error('两次输入密码不一致!'));
                } else {
                  callback();
                }
              }
            }],
          }
        },
        pageSizes: [5, 10, 20, 50, 100],
        pageSize: 5,
        total: 20,
        currentPage4: 4,
        tableData: [{
          name: 'X线',
          star: '5',
          feature: '波长短穿透性强,可能产生反射反应',
          harm: {
            key: '器官细胞变异、畸形',
            detail: '怀孕前3个月胎儿处于器官形成关键期,X光可能导致细胞组织突变从而流产或先天畸形'
          },
          defense: '医院X光照射腹部遮盖,尽量避免此类检查',
          date: '2017-05-20',
          author: {
            nickname: 'vvboot',
            name: '朱晓龙',
            'weixin': 'deeplover_baby',
            'qq': '2810010108'
          }
        }, {
          name: '电热毯',
          star: '5',
          feature: '通电后产生电磁场,产生电磁辐射',
          harm: {
            key: '细胞分裂异常、大脑、神经、骨骼、心脏',
            detail: '容易导致胎儿细胞分裂,发生异常改变,骨骼对电磁辐射最为敏感,影响胎儿大脑、神经、骨骼和心脏'
          },
          defense: '禁止使用电热毯',
          date: '2017-05-20',
          author: {
            nickname: 'vvboot',
            name: '朱晓龙',
            'weixin': 'deeplover_baby',
            'qq': '2810010108'
          }
        }, {
          name: '电吹风',
          star: '4',
          feature: '开启和关闭时辐射最大,功率越大辐射越大',
          harm: {
            key: '孕妈咪损伤',
            detail: '头晕、疲乏无力、记忆力减退、食欲减退、失眠、健忘等亚健康状态'
          },
          defense: '尽量不要用,使用干发毛巾或干毛帽代替',
          date: '2017-05-20',
          author: {
            nickname: 'vvboot',
            name: '朱晓龙',
            'weixin': 'deeplover_baby',
            'qq': '2810010108'
          }
        }, {
          name: '微波炉',
          star: '4',
          feature: '微波炉辐射小于12伏米才符合国家标准,使用请遵循说明书',
          harm: {
            key: '',
            detail: ''
          },
          defense: '不要放卧室,人不要站旁边,不用时拔掉电源,停止运行时再过去处理食品,准妈妈勿用微波炉',
          date: '2017-05-20',
          author: {
            nickname: 'vvboot',
            name: '朱晓龙',
            'weixin': 'deeplover_baby',
            'qq': '2810010108'
          }
        }, {
          name: '电脑',
          star: '3',
          feature: '开机时周边存在电磁辐射,包括X射线、紫外线、可见光、红外线和特高频、高频、中频及极低频电磁场;背面辐射最强,两侧其次,正面最弱',
          harm: {
            key: '影响胚胎发育、听力残疾',
            detail: '在细胞膜水平上干扰细胞的代谢和增殖,从而影响胚胎的发育,其次电脑辐射是导致宝宝听力残疾的头号危险因素'
          },
          defense: '保持安全距离,穿防辐射服,控制时间',
          date: '2017-05-20',
          author: {
            nickname: 'vvboot',
            name: '朱晓龙',
            'weixin': 'deeplover_baby',
            'qq': '2810010108'
          }
        }, {
          name: '手机',
          star: '2',
          feature: '工作状态时向基站传送无线电波,通话接通时比通话中辐射高20倍,信号不好电量低时,辐射更高',
          harm: {
            key: '改变人体组织',
            detail: '或多或少被人体吸收,从而改变人体组织'
          },
          defense: '专用耳机、麦克风接听电话,减少通话时间,电话未接通时避免靠近耳部',
          date: '2017-05-20',
          author: {
            nickname: 'vvboot',
            name: '朱晓龙',
            'weixin': 'deeplover_baby',
            'qq': '2810010108'
          }
        }, {
          name: '电视机',
          star: '2',
          feature: '传统电视电子束打在荧光粉上的瞬间会产生电磁辐射,产生X射线,液晶电视相对辐射小很多',
          harm: {
            key: '',
            detail: ''
          },
          defense: '保持2米以上距离,连续不能超过2小时,看完电视洗脸',
          date: '2017-05-20',
          author: {
            nickname: 'vvboot',
            name: '朱晓龙',
            'weixin': 'deeplover_baby',
            'qq': '2810010108'
          }
        }, {
          name: '复印机/打印机',
          star: '1',
          feature: '有电流就有电磁波即存在辐射,打印机的电子线圈和风扇部位辐射最大',
          harm: {
            key: '',
            detail: ''
          },
          defense: '办公一族保持30厘米以上或穿防辐射服',
          date: '2017-05-20',
          author: {
            nickname: 'vvboot',
            name: '朱晓龙',
            'weixin': 'deeplover_baby',
            'qq': '2810010108'
          }
        }, {
          name: '安检',
          star: '1',
          feature: '主要通过电磁场的辐射对金属物探测,电磁辐射小',
          harm: {
            key: '',
            detail: ''
          },
          defense: '不超过6分钟,减少乘飞机,准妈妈尽快通过安检',
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

      },
      setDialogInfo() {
        this.dialog.show_pass = true;
        this.dialog.title = '添加禁忌项';
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      saveForbid(){
          alert(JSON.stringify(this.forbid))
//        http://localhost:22222/api/v1/forbid/save
      }
    }
  }
</script>
<style scoped>
  * {
    font-size: 12px;
  }
</style>
