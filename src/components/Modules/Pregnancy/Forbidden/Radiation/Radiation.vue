<!--suppress ALL -->
<template>
  <div class="list">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input placeholder="辐射源"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="指数"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
        <el-button type="primary" @click='openDialog(1)'>添加新的孕期禁忌项</el-button>
        <el-button type="primary" @click='openDialog(2)'>查看列表</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="pageable.list" border fit style="width: 100%" align='center'
              @filter-change="filterChange"
              @sort-change="sortChange">
      <el-table-column
        :prop="fields.name.info.prop"
        :label="fields.name.info.label"
        :align="fields.name.style.align"
        :width="fields.name.style.width"
        :sortable="fields.name.info.sortable">
      </el-table-column>
      <el-table-column
        :prop="fields.type.info.prop"
        :column-key="fields.type.info.prop"
        :sortable="fields.type.info.sortable"
        :label="fields.type.info.label"
        :align="fields.type.style.align"
        :width="fields.type.style.width"
        :formatter="formatType"
        :filters="fields.type.filter.list"
        :filter-method="filterType"
        :filter-multiple="fields.type.filter.multiple">
      </el-table-column>
      <el-table-column
        :prop="fields.star.info.prop"
        :column-key="fields.star.info.prop"
        :sortable="fields.star.info.sortable"
        :label="fields.star.info.label"
        :align="fields.star.style.align"
        :width="fields.star.style.width"
        :formatter="formatStar"
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
            <p>核心词: {{ scope.row.harm }}</p>
            <p>具体损伤: {{ scope.row.harmDetail }}</p>
            <div slot="reference" class="name-wrapper" style="word-break: break-all">
              <el-tag v-if="scope.row.harm!=''">{{ scope.row.harm }}</el-tag>
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
          <span style="margin-left: 10px">{{ scope.row.createTime | formatDate1}}</span>
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
    <ul type="circle" style="margin-left: 20px">
      <li>挑选正规厂家生产的合格家电产品</li>
      <li>不要把家用电器摆的过于集中</li>
      <li>缩短使用电器的时间</li>
      <li>有条件的孕妈咪可使用产品质量合格,有相关检测证明的防辐射服装、电视防辐射屏、防辐射窗帘等</li>
    </ul>

    <!--start新增模态框-->
    <el-dialog size="small"
               :title="dialog.title"
               v-model="dialog.visible">
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
              v-for="item in typeItems"
              :key="item.value"
              :label="item.text"
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
              v-for="item in starItems"
              :key="item.value"
              :label="item.text"
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
                <el-button @click="dialog.visible = false">取 消</el-button>
                <el-button type="primary" @click="saveForbid">确 定</el-button>
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
        tableData: [],
        typeItems: [],
        starItems: [],
        sortsJson: [],
        filtersJson: {},
        forbid: {
          id: '',
          name: '',
          type: '',
          star: '',
          feature: '',
          harm: '',
          harmDetail: '',
          defense: ''
        },
        dialog: {
          visible: false,
          title: '添加孕期禁忌项'
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
              label: '禁忌源',
              sortable: true
            },
            filter: {},
            style: {
              width: '110',
              align: 'center'
            }
          },
          type: {
            info: {
              prop: 'type',
              label: '禁忌类型',
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
          star: {
            info: {
              prop: 'star',
              label: '危害指数',
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
          feature: {
            info: {
              prop: 'feature',
              label: '禁忌源特征',
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
              label: '危害',
              sortable: true
            },
            filter: {},
            style: {
              width: '250',
              align: 'center'
            }
          },
          harmDetail: {
            info: {
              prop: 'harmDetail',
              label: '危害说明',
              sortable: false
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
          date: {
            info: {
              prop: 'createTime',
              label: '日期',
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
      this.pageList();
      this.typeDropdown();
      this.starDropdown();
    },
    filters: {
      formatDate1(time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy年MM月dd日');
      }
    },
    methods: {
      sortChange(s){
        if (s && s.prop && s.order) {
          var order;
          console.log(s.order)
          if (s.order === 'descending') {
            order = 'desc';
          } else if (s.order === 'ascending') {
            order = 'asc';
          }
          this.sortsJson.pushSortJson({
            prop: s.prop,
            order: order
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
      openDialog(type)
      {
        if (type === 1) {
          this.dialog.visible = true;
          this.dialog.title = '添加禁忌项';
        } else if (type === 2) {
          this.dialog.visible = true;
          this.dialog.title = '禁忌列表';
          this.pageList();
        }
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
      saveForbid()
      {
        this.$$api_forbid_saveForbid(this.forbid, (data) => {
          this.dialog.visible = false;
          this.pageList();
        });
      },
      updateForbid()
      {
        this.$$api_forbid_updateForbid(this.forbid, (data) => {
          this.dialog.visible = false;
          this.pageList();
        });
      },
      pageList(){
        this.$$api_forbid_pageList({
          pageNum: this.pageable.pageNum,
          pageSize: this.pageable.pageSize,
          sorts: this.sortsJson,
          filters: this.filtersJson
        }, (data) => {
          this.pageable = data.obj;
          this.dialog.visible = false;
        });
      },
      detail()
      {
        this.$$api_forbid_detail({id: this.forbid.id}, (data) => {
          console.dir(data)
          this.dialog.visible = false;
        });
      }
      ,
      delete()
      {
        this.$$api_forbid_delete({id: this.forbid.id}, (data) => {
          console.dir(data)
          this.dialog.visible = false;
        });
      }
      ,
      typeDropdown()
      {
        this.$$api_forbid_typeList({}, (data) => {
          this.typeItems = data.obj;
          this.fields.type.filter.list = this.typeItems;
        });
      }
      ,
      starDropdown()
      {
        this.$$api_star_starList({}, (data) => {
          this.starItems = data.obj;
          this.fields.star.filter.list = this.starItems;
        });
      }
    }
  }
</script>
<style scoped>
  * {
    font-size: 12px;
  }
</style>
