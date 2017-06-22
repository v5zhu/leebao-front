<!--suppress ALL -->
<template>
  <div class="list" id="studentApp">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-button type="primary" @click='openDialog'>添加学生</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="pageable.list" border style="width: 100%" align='center'
              @filter-change="filterChange"
              @sort-change="sortChange">
      <el-table-column type="expand">
        <template scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="信息录入时间:">
              <span>{{ props.row.createTime | formatFullDate }}</span>
            </el-form-item>
            <el-form-item label="最后更新时间:">
              <span>{{ props.row.updateTime | formatFullDate}}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        :prop="fields.name.info.prop"
        :column-key="fields.name.info.prop"
        :label="fields.name.info.label"
        :min-width="fields.name.style.width"
        :align="fields.name.style.align"
        :sortable="fields.name.info.sortable">
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
        :prop="fields.age.info.prop"
        :column-key="fields.age.info.prop"
        :sortable="fields.age.info.sortable"
        :label="fields.age.info.label"
        :min-width="fields.age.style.width"
        :align="fields.age.style.align">
      </el-table-column>
      <el-table-column
        :prop="fields.grade.info.prop"
        :label="fields.grade.info.label"
        :min-width="fields.grade.style.width"
        :align="fields.grade.style.align"
        :sortable="fields.grade.info.sortable">
      </el-table-column>
      <el-table-column
        :prop="fields.phone.info.prop"
        :label="fields.phone.info.label"
        :min-width="fields.phone.style.width"
        :align="fields.phone.style.align"
        :sortable="fields.phone.info.sortable">
      </el-table-column>
      <el-table-column
        :prop="fields.address.info.prop"
        :label="fields.address.info.label"
        :min-width="fields.address.style.width"
        :align="fields.address.style.align"
        :sortable="fields.address.info.sortable">
      </el-table-column>
      <el-table-column
        :prop="fields.remark.info.prop"
        :label="fields.remark.info.label"
        :min-width="fields.remark.style.width"
        :align="fields.remark.style.align">
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
               :model="this.student"
               :rules="dialog.rules"
               ref='studentForm'>
        <el-form-item class='edit-form'
                      label="机构名称"
                      prop='organization.id'>
          <!-- select,下拉框 -->
          <el-select v-model="student.organization.id" placeholder="机构名称">
            <el-option
              v-for="item in fields.organization.filter.list"
              :key="item.value"
              :label="item.text"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class='edit-form'
                      label="学生姓名"
                      prop='name'>
          <el-input v-model="student.name" placeholder='学生姓名'></el-input>
        </el-form-item>
        <el-form-item class='edit-form'
                      label="年龄"
                      prop='age'>
          <el-input v-model="student.age" placeholder='年龄'></el-input>
        </el-form-item>
        <el-form-item class='edit-form'
                      label="年级段"
                      prop='grade'>
          <el-input v-model="student.grade" placeholder='年级段'></el-input>
        </el-form-item>
        <el-form-item class='edit-form'
                      label="联系电话"
                      prop='grade'>
          <el-input v-model="student.phone" placeholder='联系电话'></el-input>
        </el-form-item>
        <el-form-item class='edit-form'
                      label="家庭住址"
                      prop='address'>
          <el-input v-model="student.address" placeholder='家庭住址'></el-input>
        </el-form-item>
        <el-form-item class='edit-form'
                      label="备注"
                      prop='remark'>
          <el-input v-model="student.remark" placeholder='请填写其他备注信息'></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
                <el-button @click="dialog.visible = false">取 消</el-button>
                <el-button type="primary" @click="saveStudent">保 存</el-button>
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
        student: {
          id: '',
          organization: {id: ''},
          name: '',
          age: '',
          grade: '',
          phone: '',
          remark: '',
          createTime: '',
          updateTime: ''
        },
        dialog: {
          visible: false,
          title: '添加学生',
          rules: {
            organization: {
              id: [
                {required: true, message: '请选择学生所在机构', trigger: 'blur'}
              ]
            },
            name: [
              {required: true, message: '请填写学生姓名', trigger: 'blur'}
            ],
            grade: [
              {required: true, message: '请选择学生年级段', trigger: 'blur'}
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
          name: {
            info: {
              prop: 'name',
              label: '学生姓名',
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
          organization: {
            info: {
              prop: 'orgId',
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
          age: {
            info: {
              prop: 'age',
              label: '年龄',
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
          grade: {
            info: {
              prop: 'grade',
              label: '年级段',
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
          phone: {
            info: {
              prop: 'phone',
              label: '联系电话',
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
          address: {
            info: {
              prop: 'address',
              label: '家庭住址',
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
      this.studentList();
      this.organizationDropdown();
    },
    filters: {
      formatFullDate(time) {
        if (!time) {
          return;
        }
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
      sortChange(s){
        if (s && s.prop && s.order) {
          this.sortsJson.pushSortJson({
            prop: s.prop,
            order: s.order
          });
          this.studentList();
        }
      },
      formatOrgName(row){
        return row.organization.name;
      },
      filterOrgName(org, item)
      {
        return item.name == org;
      },
      filterChange(f){
        for (var k in f) {
          this.filtersJson[k] = f[k];
        }
        this.studentList();
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
        this.resetForm('studentForm');
        this.dialog.visible = true;
        this.dialog.title = '添加学生';
      },
      handleSizeChange(val)
      {
        this.pageable.pageSize = val;
        this.studentList();
      },
      handleCurrentChange(val)
      {
        this.pageable.pageNum = val;
        this.studentList();
      },
      saveStudent()
      {
        this.$refs['studentForm'].validate((valid) => {
          if (valid) {
            this.$$api_student_save(this.student, (data) => {
              this.dialog.visible = false;
              this.studentList();
            });
          }
          else {
            return false;
          }
        })
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
      studentList()
      {
        this.$$api_student_list({
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
