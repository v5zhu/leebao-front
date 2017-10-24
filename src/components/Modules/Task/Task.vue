<!--suppress ALL -->
<template>
  <div class="list" id="taskApp">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-button type="primary" @click='openDialog'>添加新任务</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="pageInfo.list" border style="width: 100%" align='center'
              @filter-change="filterChange"
              @sort-change="sortChange">
      <el-table-column type="expand">
        <template scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="job id:">
              <span>{{ props.row.jobId }}</span>
            </el-form-item>
            <el-form-item label="job group:">
              <span>{{ props.row.jobGroup }}</span>
            </el-form-item>
            <el-form-item label="job status:">
              <span>{{ props.row.jobStatus }}</span>
            </el-form-item>
            <el-form-item label="description:">
              <span>{{ props.row.description }}</span>
            </el-form-item>
            <el-form-item label="create time:">
              <span>{{ props.row.createTime | formatFullDate }}</span>
            </el-form-item>
            <el-form-item label="update time:">
              <span>{{ props.row.updateTime | formatFullDate }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column :prop="'jobName'" :sortable="true" :label="'name'" :min-width="80" :align="'center'">
      </el-table-column>
      <el-table-column :prop="'cronExpression'" :sortable="true" :label="'cron'" :min-width="120" :align="'center'">
      </el-table-column>
      <el-table-column :label="'status'" :min-width="80" :align="'center'">
        <template scope="scope">
          <i v-show="scope.row.jobStatus==0" class="el-icon-star-off"></i>
          <i v-show="scope.row.jobStatus==1" class="el-icon-loading"></i>
          <i v-show="scope.row.jobStatus==2" class="el-icon-time"></i>
          <i v-show="scope.row.jobStatus==3" class="el-icon-minus"></i>
        </template>
      </el-table-column>
      <el-table-column :prop="'beanId'" :label="'bean'" :min-width="80" :align="'center'" :sortable="true">
      </el-table-column>
      <el-table-column :prop="'beanClass'" :label="'class'" :min-width="250" :align="'center'" :sortable="true">
      </el-table-column>
      <el-table-column :prop="'methodName'" :label="'method'" :min-width="100" :align="'center'" :sortable="true">
      </el-table-column>
      <el-table-column label="操作" :min-width="250">
        <template scope="scope">
          <el-button
            size="small" type="info" class="icon-play" :disabled="scope.row.jobStatus==1"
            @click="handleEdit(scope.$index, scope.row)"><i class="el-icon-caret-right"></i>
          </el-button>
          <el-button
            size="small" type="success" :disabled="scope.row.jobStatus!=1"
            @click="handleEdit(scope.$index, scope.row)"><i class="el-icon-time"></i>
          </el-button>
          <el-button
            size="small" type="warning" :disabled="scope.row.jobStatus!=1 && scope.row.jobStatus!=2"
            @click="handleEdit(scope.$index, scope.row)"><i class="el-icon-minus"></i>
          </el-button>
          <el-button
            size="small" type="info" :disabled="scope.row.jobStatus!=3 && scope.row.jobStatus!=0"
            @click="handleEdit(scope.$index, scope.row)"><i class="el-icon-edit"></i>
          </el-button>
          <el-button
            size="small"
            type="danger" :disabled="scope.row.jobStatus!=3 && scope.row.jobStatus!=0"
            @click="handleDelete(scope.$index, scope.row)"><i class="el-icon-delete"></i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <template>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageInfo.pageNum"
          :page-sizes="pageSizes"
          :page-size="pageInfo.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageInfo.total">
        </el-pagination>
      </div>
    </template>
    <!--start新增模态框-->
    <el-dialog size="small"
               :title="dialog.title"
               v-model="dialog.visible">
      <el-form style="margin:20px;width:80%;"
               label-width="100px"
               :model="this.task"
               :rules="dialog.rules"
               ref='taskForm'>
        <el-form-item class='edit-form'
                      label="任务名称"
                      prop='jobName'>
          <el-input v-model="task.jobName" placeholder='任务名称'></el-input>
        </el-form-item>
        <el-form-item class='edit-form'
                      label="任务分组"
                      prop='jobGroup'>
          <el-input v-model="task.jobGroup" placeholder='任务分组'></el-input>
        </el-form-item>
        <el-form-item class='edit-form'
                      label="任务状态"
                      prop='jobStatus'>
          <!-- select,下拉框 -->
          <el-select v-model="task.jobStatus" placeholder="任务状态">
            <el-option
              v-for="item in jobStatus"
              :key="item.value"
              :label="item.text"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class='edit-form'
                      label="时间表达式"
                      prop='cronExpression'>
          <el-input v-model="task.cronExpression" placeholder='请输入时间表达式'></el-input>
        </el-form-item>
        <el-form-item class='edit-form'
                      label="是否并发"
                      prop='isConcurrent'>
          <!-- select,下拉框 -->
          <el-select v-model="task.isConcurrent" placeholder="是否并发">
            <el-option
              v-for="item in yesOrNo"
              :key="item.value"
              :label="item.text"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item class='edit-form'
                      label="Bean Id"
                      prop='beanId'>
          <!-- select,下拉框 -->
          <el-select v-model="task.beanId" placeholder="请选择Bean Id" @change="getClassFullname(task.beanId)">
            <el-option
              v-for="item in beanNames"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class='edit-form'
                      label="Bean Class"
                      prop='beanClass'>
          <el-input v-model="task.beanClass" placeholder='Bean Class' readonly></el-input>
        </el-form-item>
        <el-form-item class='edit-form'
                      label="执行方法"
                      prop='methodName'>
          <!-- select,下拉框 -->
          <el-select v-model="task.methodName" placeholder="请选择要执行的方法">
            <el-option
              v-for="item in methodNames"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class='edit-form'
                      label="描述"
                      prop='description'>
          <el-input v-model="task.description" placeholder='描述'></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
                <el-button @click="dialog.visible = false">取 消</el-button>
                <el-button type="primary" @click="save">保 存</el-button>
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
        jobStatus: [
          {value: '0', text: '初创'},
          {value: '1', text: '运行'},
          {value: '2', text: '暂停'},
          {value: '3', text: '停止'}
        ],
        yesOrNo: [
          {value: '0', text: '否'},
          {value: '1', text: '是'}
        ],
        task: {
          jobId: '',
          jobName: '',
          jobGroup: '',
          jobStatus: '',
          cronExpression: '',
          isConcurrent: '',
          beanId: '',
          beanClass: '',
          methodName: '',
          description: '',
          createTime: '',
          updateTime: ''
        },
        dialog: {
          visible: false,
          title: '添加新任务',
          rules: {
            jobName: [
              {required: true, message: '请输入任务名称', trigger: 'blur'}
            ],
            jobGroup: [
              {required: true, message: '请输入任务组', trigger: 'blur'}
            ],
            jobStatus: [
              {required: true, message: '请选择任务运行状态', trigger: 'blur'}
            ],
            cronExpression: [
              {required: true, message: '请输入cron表达式', trigger: 'change'}
            ],
            isConcurrent: [
              {required: true, message: '请选择是否支持并发', trigger: 'change'}
            ],
            beanId: [
              {required: true, message: '请选择bean id', trigger: 'blur'}
            ],
            beanClass: [
              {required: true, message: '请选择bean class', trigger: 'blur'}
            ],
            methodName: [
              {required: true, message: '请选择执行方法', trigger: 'blur'}
            ]
          }
        },
        beanNames: [],
        methodNames: [],
        pageInfo: {
          pageNum: 1,
          pageSize: 5,
          pages: 0,
          size: 0,
          total: 0,
          hasNextPage: false,
          hasPreviousPage: false,
          list: []
        },
        pageSizes: [5, 10, 20, 50, 100]
      }
    },
    created() {
      this.taskList();
      this.listBeanNames();
    },
    filters: {
      formatDate1(time) {
        var date = new Date(time);
        return formatDate(date, 'MM-dd hh:mm');
      },
      formatFullDate(time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
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
      sortChange(s) {
        if (s && s.prop && s.order) {
          this.sortsJson.pushSortJson({
            prop: s.prop,
            order: s.order
          });
          this.taskList();
        }
      },
      filterChange(f) {
        for (var k in f) {
          this.filtersJson[k] = f[k];
        }
        this.taskList();
      },
      formatJobStatus(clock) {
        if (clock.jobStatus == '1') {
          return '运行中';
        } else if (clock.jobStatus == '0') {
          return '暂停中';
        } else if (clock.jobStatus == '-1') {
          return '已停止';
        }
      },
      formatConcurrent(row) {
        console.log(row)
        if (row.concurrent == 1) {
          return '并发执行';
        } else if (row.concurrent == 0) {
          return '排队执行';
        }
      },
      resetForm(formName) {
        this.$nextTick(function () {
          if (this.$refs[formName]) {
            this.$refs[formName].resetFields();
          }
        })
      },
      openDialog() {
        this.resetForm('taskForm');
        this.dialog.visible = true;
        this.dialog.title = '添加新任务';
      },
      handleSizeChange(val) {
        this.pageable.pageSize = val;
        this.taskList();
      },
      handleCurrentChange(val) {
        this.pageInfo.pageNum = val;
        this.taskList();
      },
      save() {
        this.$refs['taskForm'].validate((valid) => {
          if (valid) {
            this.$$api_task_addTask(this.task, (data) => {
              this.dialog.visible = false;
              this.taskList();
            });
          }
          else {
            return false;
          }
        })
      },
      handleEdit(index, row) {

      },
      handleDelete(index, row) {

      },
      taskList() {
        this.$$api_task_taskList({
          pageNum: this.pageInfo.pageNum,
          pageSize: this.pageInfo.pageSize,
          sorts: this.sortsJson,
          filters: this.filtersJson
        }, (data) => {
          this.pageInfo = data.data;
          this.dialog.visible = false;
        });
      },
      listBeanNames() {
        this.$$api_bean_names({
          pageNum: this.pageInfo.pageNum,
          pageSize: this.pageInfo.pageSize,
          sorts: this.sortsJson,
          filters: this.filtersJson
        }, (data) => {
          this.beanNames = data.data;
          this.dialog.visible = false;
        });
      },
      getClassFullname(beanId) {
        this.$$api_bean_fullname({
          beanName: beanId
        }, (data) => {
          this.task.beanClass = data.data;
          this.listMethods(beanId);
        });
      },
      listMethods(beanId) {
        this.$$api_bean_methods({
          beanName: beanId
        }, (data) => {
          this.methodNames = data.data;
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
