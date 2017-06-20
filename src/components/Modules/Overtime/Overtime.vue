<!--suppress ALL -->
<template>
  <div class="list" id="overtimeApp">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-button type="primary" @click='openDialog'>录入加班</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="pageable.list" border style="width: 100%" align='center'
              @filter-change="filterChange"
              @sort-change="sortChange">
      <el-table-column type="expand">
        <template scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="加班人员:">
              <span>{{ props.row.people }}</span>
            </el-form-item>
            <el-form-item label="是否打车:">
              <span>{{ props.row.taxi | formatTaxi}}</span>
            </el-form-item>
            <el-form-item label="备注信息:">
              <span>{{ props.row.remark }}</span>
            </el-form-item>
            <el-form-item label="开始时间:">
              <span>{{ props.row.startTime | formatFullDate }}</span>
            </el-form-item>
            <el-form-item label="结束时间:">
              <span>{{ props.row.endTime | formatFullDate }}</span>
            </el-form-item>
          </el-form>
        </template>
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
        :prop="fields.reason.info.prop"
        :label="fields.reason.info.label"
        :min-width="fields.reason.style.width"
        :align="fields.reason.style.align"
        :sortable="fields.reason.info.sortable">
      </el-table-column>
      <el-table-column
        :prop="fields.clock.info.prop"
        :label="fields.clock.info.label"
        :min-width="fields.clock.style.width"
        :align="fields.clock.style.align"
        :formatter="formatClock"
        :sortable="fields.clock.info.sortable">
      </el-table-column>
      <el-table-column
        :prop="fields.cost.info.prop"
        :label="fields.cost.info.label"
        :min-width="fields.cost.style.width"
        :align="fields.cost.style.align"
        :sortable="fields.cost.info.sortable">
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
               ref='overtimeForm'>
        <el-form-item class='edit-form'
                      label="加班事由"
                      prop='reason'>
          <el-input v-model="overtime.reason" placeholder='加班事由'></el-input>
        </el-form-item>
        <el-form-item class='edit-form'
                      label="人员名单"
                      prop='people'>
          <el-input v-model="overtime.people" placeholder='加班人员名单'></el-input>
        </el-form-item>
        <el-form-item class='edit-form'
                      label="开始时间"
                      prop='startTime'>
          <div class="block">
            <el-date-picker
              v-model="overtime.startTime"
              type="datetime"
              placeholder="选择加班开始时间">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item class='edit-form'
                      label="结束时间"
                      prop='endTime'>
          <div class="block">
            <el-date-picker
              v-model="overtime.endTime"
              type="datetime"
              placeholder="选择加班结束时间">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item class='edit-form'
                      label="星期"
                      prop='week'>
          <!-- select,下拉框 -->
          <el-select v-model="overtime.week" placeholder="请选择星期">
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
          <el-select v-model="overtime.clock" placeholder="请选择是否打卡">
            <el-option
              v-for="item in yesOrNo"
              :key="item.value"
              :label="item.text"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class='edit-form'
                      label="是否打车"
                      prop='taxi'>
          <!-- select,下拉框 -->
          <el-select v-model="overtime.taxi" placeholder="请选择是否打车">
            <el-option
              v-for="item in yesOrNo"
              :key="item.value"
              :label="item.text"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class='edit-form'
                      label="加班费"
                      prop='cost'>
          <el-input v-model="overtime.cost" placeholder='请填加班费'></el-input>
        </el-form-item>
        <el-form-item class='edit-form'
                      label="其他备注"
                      prop='remark'>
          <el-input v-model="overtime.remark" placeholder='请填写其他备注信息'></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
                <el-button @click="dialog.visible = false">取 消</el-button>
                <el-button type="primary" @click="saveOvertime">保 存</el-button>
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
          title: '录入加班',
          rules: {
            reason: [
              {required: true, message: '请输入加班原因', trigger: 'blur'}
            ],
            people: [
              {required: true, message: '请填写加班人员名单', trigger: 'blur'}
            ],
            week: [
              {required: true, message: '请选择星期', trigger: 'blur'}
            ],
            clock: [
              {required: true, message: '请选择是否打卡', trigger: 'change'}
            ],
            taxi: [
              {required: true, message: '请选择是否打车', trigger: 'change'}
            ],
            cost: [
              {required: true, message: '请输入此次加班费', trigger: 'blur'}
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
          time: {
            info: {
              prop: 'start_time',
              label: '加班时间',
              sortable: true
            },
            filter: {},
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
          reason: {
            info: {
              prop: 'reason',
              label: '加班事由',
              sortable: true
            },
            filter: {
              list: [],
              multiple: false
            },
            style: {
              width: '280',
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
              width: '90',
              align: 'center'
            }
          },
          cost: {
            info: {
              prop: 'cost',
              label: '加班费(元)',
              sortable: false
            },
            filter: {},
            style: {
              width: '90',
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
        return formatDate(date, 'MM-dd hh:mm');
      },
      formatFullDate(time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      },
      formatTaxi(taxi){
        return taxi === 1 ? '是' : "否"
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
          this.overtimeList();
        }
      },
      filterChange(f){
        for (var k in f) {
          this.filtersJson[k] = f[k];
        }
        this.overtimeList();
      },
      formatWeek(row)
      {
        switch (row.week) {
          case '1':
            return '星期一';
          case '2':
            return '星期二';
          case '3':
            return '星期三';
          case '4':
            return '星期四';
          case '5':
            return '星期五';
          case '6':
            return '星期六';
          case 7:
            return '星期天';
        }
      },
      formatClock(clock){
        return clock === 1 ? '是' : "否"
      },
      filterWeek(week, item)
      {
        return item.week == week;
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
        this.resetForm('overtimeForm');
        this.dialog.visible = true;
        this.dialog.title = '录入加班记录';
      },
      handleSizeChange(val)
      {
        this.pageable.pageSize = val;
        this.overtimeList();
      },
      handleCurrentChange(val)
      {
        this.pageable.pageNum = val;
        this.overtimeList();
      },
      saveOvertime()
      {
        this.$refs['overtimeForm'].validate((valid) => {
          if (valid) {
            this.$$api_overtime_save(this.overtime, (data) => {
              this.dialog.visible = false;
              this.overtimeList();
            });
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
