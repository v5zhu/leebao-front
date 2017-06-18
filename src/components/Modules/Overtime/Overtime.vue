<!--suppress ALL -->
<template>
  <div class="list" id="overtimeApp">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-button type="primary" @click='openDialog'>录入加班记录</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="pageable.list" border style="width: 100%" align='center'
              @filter-change="filterChange"
              @sort-change="sortChange">
      <el-table-column type="expand">
        <template scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="加班事由:">
              <span>{{ props.row.reason }}</span>
            </el-form-item>
            <el-form-item label="加班费:">
              <span>{{ props.row.cost }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        :prop="fields.startTime.info.prop"
        :label="fields.startTime.info.label"
        :align="fields.startTime.style.align"
        :sortable="fields.startTime.info.sortable">
      </el-table-column>
      <el-table-column
        :prop="fields.endTime.info.prop"
        :column-key="fields.endTime.info.prop"
        :sortable="fields.endTime.info.sortable"
        :label="fields.endTime.info.label"
        :align="fields.endTime.style.align"
        :formatter="formatType"
        :filters="fields.endTime.filter.list"
        :filter-method="filterType"
        :filter-multiple="fields.endTime.filter.multiple">
      </el-table-column>
      <el-table-column
        :prop="fields.week.info.prop"
        :column-key="fields.week.info.prop"
        :sortable="fields.week.info.sortable"
        :label="fields.week.info.label"
        :align="fields.week.style.align"
        :formatter="formatStar"
        :filters="fields.week.filter.list"
        :filter-method="filterStar"
        :filter-multiple="fields.week.filter.multiple">
      </el-table-column>
      <el-table-column
        :prop="fields.reason.info.prop"
        :label="fields.reason.info.label"
        :align="fields.reason.style.align"
        :sortable="fields.reason.info.sortable">
      </el-table-column>
      <el-table-column
        :prop="fields.people.info.prop"
        :label="fields.people.info.label"
        :min-width="'150'"
        :align="fields.people.style.align"
        :sortable="fields.people.info.sortable">
      </el-table-column>
      <el-table-column
        :prop="fields.clock.info.prop"
        :label="fields.clock.info.label"
        :min-width="fields.clock.style.width"
        :align="fields.clock.style.align"
        :sortable="fields.clock.info.sortable">
      </el-table-column>
      <el-table-column
        :prop="fields.taxi.info.prop"
        :label="fields.taxi.info.label"
        :min-width="fields.taxi.style.width"
        :align="fields.taxi.style.align"
        :sortable="fields.taxi.info.sortable">
      </el-table-column>
      <el-table-column
        :prop="fields.cost.info.prop"
        :label="fields.cost.info.label"
        :min-width="fields.cost.style.width"
        :align="fields.cost.style.align"
        :sortable="fields.cost.info.sortable">
      </el-table-column>
      <el-table-column
        :prop="fields.remark.info.prop"
        :label="fields.remark.info.label"
        :min-width="fields.remark.style.width"
        :align="fields.remark.style.align"
        :sortable="fields.remark.info.sortable">
      </el-table-column>
      <el-table-column
        :label="'操作'"
        :min-width="'120'">
        <template scope="scope">
         <!-- <el-button
            size="small"
            @click="forbidDetail(scope.row.id,'edit')">编辑
          </el-button>-->
         <!-- <el-button
            size="small"
            type="danger"
            @click="deleteForbid(scope.row.id)">删除
          </el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <template>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageable.pageNum"
          :page-sizes="pageSizes"
          :page-size="pageable.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageable.total">
        </el-pagination>
      </div>
    </template>
    <!--start新增模态框-->
    <el-dialog size="small"
               :title="dialog.title"
               v-model="dialog.visible">
      <el-form style="margin:20px;width:80%;"
               label-width="100px"
               :model="this.overtime"
               :rules="dialog.rules"
               ref='forbidForm'>
        <el-form-item class='edit-form'
                      label="加班事由"
                      prop='name'>
          <el-input v-model="overtime.reason" placeholder='加班事由'></el-input>
        </el-form-item>
        <el-form-item class='edit-form'
                      label="星期"
                      prop='week'>
          <!-- select,下拉框 -->
          <el-select v-model="overtime.week" placeholder="请选择">
            <el-option
              v-for="wk in [1,2,3,4,5,6,7]"
              :key="wk"
              :label="wk"
              :value="wk">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class='edit-form'
                      label="加班人员"
                      prop='feature'>
          <el-input type="textarea" v-model="overtime.people" placeholder='加班人员'></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
                <el-button @click="dialog.visible = false">取 消</el-button>
                <el-button type="primary" @click="saveForbid(overtime.id)">保 存</el-button>
            </span>
    </el-dialog>
    <!--end新增模态框-->
  </div>
</template>

<script>
  import {formatDate} from 'config/filters/format.js';
  module.exports = {
    name: 'list',
    data() {
      return {
        sortsJson: [],
        filtersJson: {},
        overtime: {
          id: '',
          reason: '',
          people: '',
          startTime: '',
          endTime: '',
          week: '',
          clock: '',
          taxi: '',
          cost: '',
          remark: '',
          createTime: '',
          updateTime: ''
        },
        dialog: {
          visible: false,
          title: '添加孕期禁忌项',
          rules: {
            name: [
              {required: true, message: '请输入禁忌源名称', trigger: 'blur'}
            ],
            type: [
              {required: true, message: '请选择类型', trigger: 'blur'}
            ],
            star: [
              {required: true, message: '请选择伤害指数', trigger: 'blur'}
            ],
            feature: [
              {required: true, message: '请输入禁忌源的特征', trigger: 'blur'}
            ],
            harm: [
              {required: true, message: '请输入伤害关键字', trigger: 'blur'},
              {min: 2, max: 10, message: '关键字2-10位字符', trigger: 'blur'}
            ],
            harmDetail: [
              {required: true, message: '请输入伤害关键字', trigger: 'blur'}
            ],
          }
        },
        pageable: {
          pageNum: 1,
          pageSize: 5,
          pages: 0,
          size: 0,
          total: 0,
          hasNextPage: false,
          hasPreviousPage: false,
          list: []
        },
        pageSizes: [5, 10, 20, 50, 100],
        fields: {
          startTime: {
            info: {
              prop: 'startTime',
              label: '开始时间',
              sortable: true
            },
            filter: {},
            style: {
              width: '110',
              align: 'center'
            }
          },
          endTime: {
            info: {
              prop: 'endTime',
              label: '结束时间',
              sortable: true
            },
            filter: {
              list: [],
              multiple: true
            },
            style: {
              width: '150',
              align: 'center'
            }
          },
          week: {
            info: {
              prop: 'week',
              label: '星期',
              sortable: true
            },
            filter: {
              list: [],
              multiple: true
            },
            style: {
              width: '150',
              align: 'center'
            }
          },
          reason: {
            info: {
              prop: 'reason',
              label: '加班事由',
              sortable: true
            },
            filter: {
              list: [],
              multiple: true
            },
            style: {
              width: '150',
              align: 'center'
            }
          },
          people: {
            info: {
              prop: 'people',
              label: '加班人员',
              sortable: true
            },
            filter: {},
            style: {
              width: '170',
              align: 'center'
            }
          },
          clock: {
            info: {
              prop: 'clock',
              label: '是否打卡',
              sortable: true
            },
            filter: {},
            style: {
              width: '250',
              align: 'center'
            }
          },
          taxi: {
            info: {
              prop: 'taxi',
              label: '是否打车',
              sortable: true
            },
            filter: {},
            style: {
              width: '250',
              align: 'center'
            }
          },
          cost: {
            info: {
              prop: 'cost',
              label: '加班费',
              sortable: false
            },
            filter: {},
            style: {
              width: '170',
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
              width: '200',
              align: 'center'
            }
          }
        }
      }
    },
    created(){
      this.overtimeList();
    },
    filters: {
      formatDate1(time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy年MM月dd日');
      }
    },
    methods: {
      resetForm(formName) {
        this.$nextTick(function () {
          if (this.$refs[formName]) {
            this.$refs[formName].resetFields();
          }
        })
      },
      sortChange(s){
        if (s && s.prop && s.order) {
          this.sortsJson.pushSortJson({
            prop: s.prop,
            order: s.order
          });
          this.pageList();
        }
      },
      filterChange(f){
        for (var k in f) {
          this.filtersJson[k] = f[k];
        }
        this.pageList();
      },
      formatType(row)
      {
        return row.typeName;
      },
      filterType(type, item)
      {
        return item.type == type;
      },
      formatStar(row)
      {
        return row.starName;
      },
      filterStar(star, item)
      {
        return item.star == star;
      },
      openDialog()
      {
        this.resetForm('forbidForm');
        this.dialog.visible = true;
        this.dialog.title = '添加禁忌项';
      },
      handleSizeChange(val)
      {
        this.pageable.pageSize = val;
        this.pageList();
      },
      handleCurrentChange(val)
      {
        this.pageable.pageNum = val;
        this.pageList();
      },
      saveForbid(id)
      {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (id === '') {
              this.$$api_forbid_saveForbid(this.forbid, (data) => {
                this.dialog.visible = false;
                this.pageList();
              });
            } else if (id != '') {
              this.$$api_forbid_updateForbid(this.forbid, (data) => {
                this.dialog.visible = false;
                this.pageList();
              });
            }
          }
          else {
            return false;
          }
        })
      },
      overtimeList()
      {
        this.$$api_overtime_list({
          pageNum: this.pageable.pageNum,
          pageSize: this.pageable.pageSize,
          sorts: this.sortsJson,
          filters: this.filtersJson
        }, (data) => {
          this.pageable = data.obj;
          this.dialog.visible = false;
        });
      }
    }
  }
</script>
<style scoped>
  * {
    font-size: 12px;
  }

  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 120px;
    color: #0a08bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%;
  }
</style>
