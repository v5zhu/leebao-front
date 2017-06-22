<!--suppress ALL -->
<template>
  <div class="list" id="trainApp">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-button type="primary" @click='openDialog'>添加培训记录</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="pageable.list" border style="width: 100%" align='center'
              show-summary
              :summary-method="getSummaries"
              @filter-change="filterChange"
              @sort-change="sortChange">
      <el-table-column type="expand">
        <template scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="教师姓名:">
              <span>{{ props.row.teacher }}</span>
            </el-form-item>
            <el-form-item label="是否登记:">
              <span>{{ props.row.clock | formatYesOrNo }}</span>
            </el-form-item>
            <el-form-item label="上课时长:">
              <span>{{ props.row.hours}}</span>
            </el-form-item>
            <el-form-item label="上课时间:">
              <span>{{ props.row.startTime | formatFullDate }}</span>
            </el-form-item>
            <el-form-item label="下课时间:">
              <span>{{ props.row.endTime | formatFullDate}}</span>
            </el-form-item>
            <el-form-item label="录入时间:">
              <span>{{ props.row.createTime | formatFullDate }}</span>
            </el-form-item>
            <el-form-item label="更新时间:">
              <span>{{ props.row.updateTime | formatFullDate}}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        :prop="fields.month.info.prop"
        :column-key="fields.month.info.prop"
        :label="fields.month.info.label"
        :min-width="fields.month.style.width"
        :align="fields.month.style.align"
        :sortable="fields.month.info.sortable"
        :formatter="formatMonth"
        :filters="fields.month.filter.list"
        :filter-method="filterMonth"
        :filter-multiple="fields.month.filter.multiple">
      </el-table-column>
      <el-table-column
        :prop="fields.day.info.prop"
        :column-key="fields.day.info.prop"
        :label="fields.day.info.label"
        :min-width="fields.day.style.width"
        :align="fields.day.style.align"
        :sortable="fields.day.info.sortable"
        :formatter="formatDay">
      </el-table-column>
      <el-table-column
        :prop="fields.week.info.prop"
        :column-key="fields.week.info.prop"
        :sortable="fields.week.info.sortable"
        :label="fields.week.info.label"
        :min-width="fields.week.style.width"
        :align="fields.week.style.align"
        :formatter="formatWeek"
        :filters="fields.week.filter.list"
        :filter-method="filterWeek"
        :filter-multiple="fields.week.filter.multiple">
      </el-table-column>
      <el-table-column
        :prop="fields.type.info.prop"
        :column-key="fields.type.info.prop"
        :sortable="fields.type.info.sortable"
        :label="fields.type.info.label"
        :min-width="fields.type.style.width"
        :align="fields.type.style.align"
        :formatter="formatType"
        :filters="fields.type.filter.list"
        :filter-method="filterType"
        :filter-multiple="fields.type.filter.multiple">
      </el-table-column>
      <el-table-column
        :prop="fields.time.info.prop"
        :label="fields.time.info.label"
        :min-width="fields.time.style.width"
        :align="fields.time.style.align"
        :sortable="fields.time.info.sortable">
        <template scope="scope">
          <el-icon name="time"></el-icon>
          <span
            style="margin-left: 10px">{{ scope.row.startTime | formatDate1}}~{{ scope.row.endTime | formatDate1}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :prop="fields.hours.info.prop"
        :label="fields.hours.info.label"
        :min-width="fields.hours.style.width"
        :align="fields.hours.style.align"
        :sortable="fields.hours.info.sortable">
      </el-table-column>
      <el-table-column
        :prop="fields.student.info.prop"
        :column-key="fields.student.info.prop"
        :label="fields.student.info.label"
        :min-width="fields.student.style.width"
        :align="fields.student.style.align"
        :sortable="fields.student.info.sortable"
        :formatter="formatStudentName"
        :filters="fields.student.filter.list"
        :filter-method="filterStudentName"
        :filter-multiple="fields.student.filter.multiple">
      </el-table-column>
      <el-table-column
        :prop="fields.organization.info.prop"
        :column-key="fields.organization.info.prop"
        :label="fields.organization.info.label"
        :min-width="fields.organization.style.width"
        :align="fields.organization.style.align"
        :sortable="fields.organization.info.sortable"
        :formatter="formatOrgName"
        :filters="fields.organization.filter.list"
        :filter-method="filterOrgName"
        :filter-multiple="fields.organization.filter.multiple">
      </el-table-column>
      <el-table-column
        :prop="fields.salary.info.prop"
        :label="fields.salary.info.label"
        :min-width="fields.salary.style.width"
        :align="fields.salary.style.align"
        :sortable="fields.salary.info.sortable">
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
               :model="this.train"
               :rules="dialog.rules"
               ref='trainForm'>
        <el-form-item class='edit-form'
                      label="机构"
                      prop='organization.id'>
          <!-- select,下拉框 -->
          <el-select v-model="train.organization.id" placeholder="机构">
            <el-option
              v-for="item in fields.organization.filter.list"
              :key="item.value"
              :label="item.text"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class='edit-form'
                      label="学生"
                      prop='organization.id'>
          <!-- select,下拉框 -->
          <el-select v-model="train.student.id" placeholder="学生">
            <el-option
              v-for="item in fields.student.filter.list"
              :key="item.value"
              :label="item.text"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class='edit-form'
                      label="课程类型"
                      prop='type'>
          <!-- select,下拉框 -->
          <el-select v-model="train.type" placeholder="请选择上课的类型">
            <el-option
              v-for="item in fields.type.filter.list"
              :key="item.value"
              :label="item.text"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class='edit-form'
                      label="月份"
                      prop='month'>
          <!-- select,下拉框 -->
          <el-select v-model="train.month" placeholder="请选择月份">
            <el-option
              v-for="item in fields.month.filter.list"
              :key="item.value"
              :label="item.text"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class='edit-form'
                      label="号数"
                      prop='day'>
          <!-- select,下拉框 -->
          <el-select v-model="train.day" placeholder="请选择几号">
            <el-option
              v-for="item in fields.day.filter.list"
              :key="item.value"
              :label="item.text"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class='edit-form'
                      label="星期"
                      prop='week'>
          <!-- select,下拉框 -->
          <el-select v-model="train.week" placeholder="请选择星期">
            <el-option
              v-for="item in fields.week.filter.list"
              :key="item.value"
              :label="item.text"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class='edit-form'
                      label="是否打卡"
                      prop='clock'>
          <!-- select,下拉框 -->
          <el-select v-model="train.clock" placeholder="请选择是否有上班登记">
            <el-option
              v-for="item in yesOrNo"
              :key="item.value"
              :label="item.text"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class='edit-form'
                      label="时长"
                      prop='hours'>
          <!-- select,下拉框 -->
          <el-select v-model="train.hours" placeholder="请选择上课时间长度">
            <el-option
              v-for="item in hours"
              :key="item.value"
              :label="item.text"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class='edit-form'
                      label="工资"
                      prop='salary'>
          <el-input v-model="train.salary" placeholder='当次课程工资'></el-input>
        </el-form-item>
        <el-form-item class='edit-form'
                      label="上课时间"
                      prop='startTime'>
          <div class="block">
            <el-date-picker
              v-model="train.startTime"
              type="datetime"
              placeholder="选择上课时间">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item class='edit-form'
                      label="下课时间"
                      prop='endTime'>
          <div class="block">
            <el-date-picker
              v-model="train.endTime"
              type="datetime"
              placeholder="选择下课时间">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item class='edit-form'
                      label="备注"
                      prop='remark'>
          <el-input v-model="train.remark" placeholder='请填写其他备注信息'></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
                <el-button @click="dialog.visible = false">取 消</el-button>
                <el-button type="primary" @click="saveTrain">保 存</el-button>
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
        yesOrNo: [{value: '0', text: '否'}, {value: '1', text: '是'}],
        trainType: [{value: '上课', text: '上课'}, {value: '辅导', text: '辅导'}],
        hours: [{value: '0', text: '0小时'}, {value: '0.5', text: '半小时'}, {value: '1', text: '1小时'}, {
          value: '1.5',
          text: '1.5小时'
        }, {value: '2', text: '2小时'}, {value: '2.5', text: '2.5小时'}, {value: '3', text: '3小时'}, {
          value: '3.5',
          text: '3.5小时'
        }, {value: '4', text: '4小时'}],
        train: {
          id: '',
          student: {id: ''},
          organization: {id: ''},
          month: '',
          day: '',
          week: '',
          clock: '',
          type: '',
          startTime: '',
          endTime: '',
          hours: '',
          salary: '',
          teacher: '',
          remark: '',
          createTime: '',
          updateTime: ''
        },
        dialog: {
          visible: false,
          title: '添加培训记录',
          rules: {
            organization: {
              id: [
                {required: true, message: '请选择机构', trigger: 'blur'}
              ]
            },
            student: {
              id: [
                {required: true, message: '请选择学生', trigger: 'blur'}
              ]
            },
            month: [
              {required: true, message: '请选择月份', trigger: 'blur'}
            ],
            day: [
              {required: true, message: '请选择日期', trigger: 'blur'}
            ],
            week: [
              {required: true, message: '请选择星期', trigger: 'blur'}
            ],
            clock: [
              {required: true, message: '请选择是否有上班登记', trigger: 'blur'}
            ],
            type: [
              {required: true, message: '请选择是上课还是辅导课', trigger: 'blur'}
            ],
            hours: [
              {required: true, message: '请选择上课时长', trigger: 'blur'}
            ],
            salary: [
              {required: true, message: '请填写当次课工资', trigger: 'blur'}
            ]
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
          month: {
            info: {
              prop: 'month',
              label: '月份',
              sortable: true
            },
            filter: {
              list: [
                {value: '1', text: '1月'},
                {value: '2', text: '2月'},
                {value: '3', text: '3月'},
                {value: '4', text: '4月'},
                {value: '5', text: '5月'},
                {value: '6', text: '6月'},
                {value: '7', text: '7月'},
                {value: '8', text: '8月'},
                {value: '9', text: '9月'},
                {value: '10', text: '10月'},
                {value: '11', text: '11月'},
                {value: '12', text: '12月'}
              ],
              multiple: true
            },
            style: {
              width: '90',
              align: 'center'
            }
          },
          day: {
            info: {
              prop: 'day',
              label: '号数',
              sortable: true
            },
            filter: {
              list: [
                {value: '1', text: '1号'},
                {value: '2', text: '2号'},
                {value: '3', text: '3号'},
                {value: '4', text: '4号'},
                {value: '5', text: '5号'},
                {value: '6', text: '6号'},
                {value: '7', text: '7号'},
                {value: '8', text: '8号'},
                {value: '9', text: '9号'},
                {value: '10', text: '10号'},
                {value: '11', text: '11号'},
                {value: '12', text: '12号'},
                {value: '13', text: '13号'},
                {value: '14', text: '14号'},
                {value: '15', text: '15号'},
                {value: '16', text: '16号'},
                {value: '17', text: '17号'},
                {value: '18', text: '18号'},
                {value: '19', text: '19号'},
                {value: '20', text: '20号'},
                {value: '21', text: '21号'},
                {value: '22', text: '22号'},
                {value: '23', text: '23号'},
                {value: '24', text: '24号'},
                {value: '25', text: '25号'},
                {value: '26', text: '26号'},
                {value: '27', text: '27号'},
                {value: '28', text: '28号'},
                {value: '29', text: '29号'},
                {value: '30', text: '30号'},
                {value: '31', text: '31号'}
              ],
              multiple: true
            },
            style: {
              width: '90',
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
              list: [
                {value: '1', text: '星期一'},
                {value: '2', text: '星期二'},
                {value: '3', text: '星期三'},
                {value: '4', text: '星期四'},
                {value: '5', text: '星期五'},
                {value: '6', text: '星期六'},
                {value: '7', text: '星期天'}
              ],
              multiple: true
            },
            style: {
              width: '90',
              align: 'center'
            }
          },
          type: {
            info: {
              prop: 'type',
              label: '类型',
              sortable: true
            },
            filter: {
              list: [{value: '上课', text: '上课'}, {value: '辅导', text: '辅导'}],
              multiple: true
            },
            style: {
              width: '90',
              align: 'center'
            }
          },
          time: {
            info: {
              prop: 'start_time',
              label: '上课时间',
              sortable: true
            },
            filter: {},
            style: {
              width: '150',
              align: 'center'
            }
          },
          hours: {
            info: {
              prop: 'hours',
              label: '时长',
              sortable: true
            },
            filter: {},
            style: {
              width: '90',
              align: 'center'
            }
          },
          student: {
            info: {
              prop: 'studentId',
              label: '学生',
              sortable: true
            },
            filter: {
              list: [],
              multiple: true
            },
            style: {
              width: '90',
              align: 'center'
            }
          },
          organization: {
            info: {
              prop: 'organizationId',
              label: '机构',
              sortable: true
            },
            filter: {
              list: [],
              multiple: true
            },
            style: {
              width: '90',
              align: 'center'
            }
          },
          salary: {
            info: {
              prop: 'salary',
              label: '工资',
              sortable: true
            },
            filter: {
              list: [],
              multiple: false
            },
            style: {
              width: '90',
              align: 'center'
            }
          },
          remark: {
            info: {
              prop: 'remark',
              label: '备注',
              sortable: false
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
      this.studentDropdown();
      this.organizationDropdown();
      this.trainList();
    },
    filters: {
      formatDate1(time) {
        var date = new Date(time);
        return formatDate(date, 'hh:mm');
      },
      formatFullDate(time) {
        if (!time) {
          return;
        }
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      },
      formatYesOrNo(val){
        return val === 1 ? '是' : '否';
      }
    },
    methods: {
      getSummaries(param){
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总计';
          }else if(index===1||index===2||index===3||index===4||index==5||index==6){
            sums[index]='';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += ' 元';
          }
        });
        return sums;
      },
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
          this.trainList();
        }
      },
      formatMonth(row)
      {
        return row.month + '月';
      },
      formatDay(row)
      {
        return row.day + '号';
      },
      formatWeek(row)
      {
        switch (row.week) {
          case 1:
            return '星期一';
          case 2:
            return '星期二';
          case 3:
            return '星期三';
          case 4:
            return '星期四';
          case 5:
            return '星期五';
          case 6:
            return '星期六';
          case 7:
            return '星期天';
        }
      },
      formatOrgName(row){
        return row.organization.name;
      },
      formatStudentName(row){
        return row.student.name;
      },
      formatClock(clock){
        return clock === 1 ? '是' : "否"
      },
      filterWeek(week, item)
      {
        return item.week == week;
      },
      filterType(type, item)
      {
//        return item.type == type;
      },
      filterOrgName(org, item)
      {
        return item.name == org;
      },
      filterMonth(month, item)
      {
//        return item.month == month;
      },
      filterDay(day, item)
      {
//        return item.day == day;
      },
      filterStudentName(name, item)
      {
//        return item.day == day;
      },
      filterChange(f){
        for (var k in f) {
          this.filtersJson[k] = f[k];
        }
        this.trainList();
      },
      resetForm(formName) {
        this.$nextTick(function () {
          if (this.$refs[formName]) {
            this.$refs[formName].resetFields();
          }
        })
      },
      openDialog()
      {
        this.resetForm('trainForm');
        this.dialog.visible = true;
        this.dialog.title = '添加培训记录';
      },
      handleSizeChange(val)
      {
        this.pageable.pageSize = val;
        this.trainList();
      },
      handleCurrentChange(val)
      {
        this.pageable.pageNum = val;
        this.trainList();
      },
      saveTrain()
      {
        this.$refs['trainForm'].validate((valid) => {
          if (valid) {
            this.$$api_train_save(this.train, (data) => {
              this.dialog.visible = false;
              this.trainList();
            });
          }
          else {
            return false;
          }
        })
      },
      trainList()
      {
        this.$$api_train_list({
          pageNum: this.pageable.pageNum,
          pageSize: this.pageable.pageSize,
          sorts: this.sortsJson,
          filters: this.filtersJson
        }, (data) => {
          this.pageable = data.obj;
          this.dialog.visible = false;
        });
      },
      organizationDropdown(){
        this.$$api_school_organization_dropdown({}, (data) => {
          let orgNames = [];
          data.obj.forEach((item, index) => {
            orgNames.push({
              text: item.name,
              value: item.id
            })
          });
          this.fields.organization.filter.list = orgNames;
        });
      },
      studentDropdown()
      {
        this.$$api_student_dropdown({}, (data) => {
          let studentNames = [];
          data.obj.forEach((item, index) => {
            studentNames.push({
              text: item.name,
              value: item.id
            })
          });
          this.fields.student.filter.list = studentNames;
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
