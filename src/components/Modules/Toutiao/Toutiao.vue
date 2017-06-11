<!--suppress ALL -->
<template>
  <div class="list" id="forbidApp">
    <span v-for="(item,index) in authors" @click="filterToutiao(item,index)" >
      <el-badge style="margin-left: 10px;" class="item">
        <el-tag size="small" class="radius-17" color="red" v-if="authorSelected==index"> {{item.author}} ({{item.quantity}})</el-tag>
        <el-tag size="small" class="radius-17" type="gray" v-else>{{item.author}} ({{item.quantity}})</el-tag>
      </el-badge>
    </span>
   ...
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
  </div>
</template>

<script>
  import {formatDate} from 'config/filters/format.js';
  module.exports = {
    name: 'list',
    data() {
      return {
        authors: [],
        filtersJson: {},
        authorSelected: -1,
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
      }
    },
    created(){
      this.toutiaoList();
      this.authorList();
    },
    methods: {
      authorList(){
        this.$$api_toutiao_authorList({}, (data) => {
          this.authors = data.obj;
        });
      },
      filterToutiao(item,index){
        console.log('item:'+JSON.stringify(item))
        console.log('index:'+index);
        this.authorSelected=index;
      },
      filterChange(f){
        for (var k in f) {
          this.filtersJson[k] = f[k];
        }
        this.pageList();
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
      toutiaoList()
      {
        this.$$api_toutiao_pageList({
          pageNum: this.pageable.pageNum,
          pageSize: this.pageable.pageSize,
          sorts: this.sortsJson,
          filters: this.filtersJson
        }, (data) => {
          this.pageable = data.obj;
          this.dialog.visible = false;
        });
      },
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

  .radius-17 {
    border-radius: 10px;
    cursor: pointer;
    height:30px;
    vertical-align: middle;
    line-height: 24px;
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
