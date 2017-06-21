<!--suppress ALL -->
<template>
  <div class="list" id="schoolOrganizationApp">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-button type="primary" @click='openDialog'>添加机构</el-button>
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
        :sortable="fields.name.info.sortable"
        :formatter="formatOrgName"
        :filters="fields.name.filter.list"
        :filter-method="filterOrgName"
        :filter-multiple="fields.name.filter.multiple">
      </el-table-column>
      <el-table-column
        :prop="fields.boss.info.prop"
        :column-key="fields.boss.info.prop"
        :sortable="fields.boss.info.sortable"
        :label="fields.boss.info.label"
        :min-width="fields.boss.style.width"
        :align="fields.boss.style.align">
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
               :model="this.organization"
               :rules="dialog.rules"
               ref='schoolOrganizationForm'>
        <el-form-item class='edit-form'
                      label="机构名称"
                      prop='name'>
          <el-input v-model="organization.name" placeholder='机构名称'></el-input>
        </el-form-item>
        <el-form-item class='edit-form'
                      label="机构老板"
                      prop='people'>
          <el-input v-model="organization.boss" placeholder='机构老板'></el-input>
        </el-form-item>
        <el-form-item class='edit-form'
                      label="机构地址"
                      prop='address'>
          <el-input v-model="organization.address" placeholder='机构地址'></el-input>
        </el-form-item>
        <el-form-item class='edit-form'
                      label="备注"
                      prop='remark'>
          <el-input v-model="organization.remark" placeholder='请填写其他备注信息'></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
                <el-button @click="dialog.visible = false">取 消</el-button>
                <el-button type="primary" @click="saveOrg">保 存</el-button>
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
        organization: {
          id: '',
          name: '',
          boss: '',
          address: '',
          remark: '',
          createTime: '',
          updateTime: ''
        },
        dialog: {
          visible: false,
          title: '添加机构',
          rules: {
            name: [
              {required: true, message: '请输入机构名称', trigger: 'blur'}
            ],
            boss: [
              {required: true, message: '请填写机构老板或负责人', trigger: 'blur'}
            ],
            address: [
              {required: true, message: '请填写机构所处地址', trigger: 'blur'}
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
              label: '机构名称',
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
          boss: {
            info: {
              prop: 'boss',
              label: '机构老板',
              sortable: true
            },
            filter: {},
            style: {
              width: '90',
              align: 'center'
            }
          },
          address: {
            info: {
              prop: 'address',
              label: '机构地址',
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
      this.orgList();
      this.organizationDropdown();
    },
    filters: {
      formatFullDate(time) {
        if (!time) {
          return ;
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
          this.orgList();
        }
      },
      formatOrgName(row){
        return row.name;
      },
      filterOrgName(org, item)
      {
        console.log(org)
        console.log(JSON.stringify(item))
        return item.name == org;
      },
      filterChange(f){
        for (var k in f) {
          this.filtersJson[k] = f[k];
        }
        this.orgList();
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
        this.resetForm('schoolOrganizationForm');
        this.dialog.visible = true;
        this.dialog.title = '添加机构';
      },
      handleSizeChange(val)
      {
        this.pageable.pageSize = val;
        this.orgList();
      },
      handleCurrentChange(val)
      {
        this.pageable.pageNum = val;
        this.orgList();
      },
      saveOrg()
      {
        this.$refs['schoolOrganizationForm'].validate((valid) => {
          if (valid) {
            this.$$api_school_organization_save(this.organization, (data) => {
              this.dialog.visible = false;
              this.orgList();
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
              value: item.name
            })
          });
          this.fields.name.filter.list = orgNames;
        });
      },
      orgList()
      {
        this.$$api_school_organization_list({
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
