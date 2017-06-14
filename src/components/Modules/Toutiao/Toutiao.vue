<!--suppress ALL -->
<template>
  <div class="list" id="forbidApp">
    <div class="row">
    <span v-for="(item,index) in authors" @click="filterToutiao(item,index)">
      <el-badge style="margin-left: 10px;" class="item">
        <el-tag size="small" class="radius-17" color="red"
                v-if="authorSelected==index"> {{item.author}} ({{item.quantity}})</el-tag>
        <el-tag size="small" class="radius-17" type="gray" v-else>{{item.author}} ({{item.quantity}})</el-tag>
      </el-badge>
    </span>
      ...

    </div>
    <ul>
      <li class='list' v-for="tt in pageable.list">
        <p class="list-top">
          <a class="author"><span>{{ tt.authorName }}</span></a>
          <span class="time"> - {{ tt.date | formatDate}}</span>
        </p>
        <h2 class="title"><a :href="tt.url" target="_blank">{{ tt.title }}</a></h2>
        <span class="small-text">阅读({{tt.readAmount}}) -</span>
        <span class="small-text">评论({{tt.commentAmount}}) -</span>
        <span class="small-text">喜欢({{tt.approvalAmount}}) -</span>
        <span class="small-text">厌恶({{tt.opposeAmount}}) -</span>
        <span class="small-text">打赏(...)</span>
        <span class="image"
              :style="{backgroundImage:'url('+tt.thumbnailPicS+')', backgroundSize:'100%', backgroundRepeat:'no-repat'}"></span>
        <span class="image"
              :style="{backgroundImage:'url('+tt.thumbnailPicS02+')', backgroundSize:'100%', backgroundRepeat:'no-repat'}"></span>
        <span class="image"
              :style="{backgroundImage:'url('+tt.thumbnailPicS03+')', backgroundSize:'100%', backgroundRepeat:'no-repat'}"></span>
      </li>
    </ul>
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
    filters: {
      formatDate(time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy年MM月dd日hh点mm分');
      }
    },
    methods: {
      authorList(){
        this.$$api_toutiao_authorList({}, (data) => {
          this.authors = data.obj;
        });
      },
      filterToutiao(item, index){
        this.authorSelected = index;
        this.authorSelected = index;
        this.filtersJson['author'] = this.authors[index].author;
        this.toutiaoList();
      },
      handleSizeChange(val)
      {
        this.pageable.pageSize = val;
        this.toutiaoList();
      },
      handleCurrentChange(val)
      {
        this.pageable.pageNum = val;
        this.toutiaoList();
      },
      toutiaoList()
      {
        this.$$api_toutiao_pageList({
          pageNum: this.pageable.pageNum,
          pageSize: this.pageable.pageSize,
          filters: this.filtersJson
        }, (data) => {
          this.pageable = data.obj;
        });
      },
    }
  }
</script>
<style scoped>
  * {
    font-size: 12px;
    text-decoration: none;
  }

  .demo-table-expand {
    font-size: 0;
  }

  .radius-17 {
    border-radius: 10px;
    cursor: pointer;
    height: 30px;
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

  .list {
    margin-left: 30px;
    margin-top: 17px;
    margin-bottom: 17px;
    padding-bottom: 17px;
    width: calc(100% - 30px);
    border-bottom: 1px dashed #efefef;
    border-bottom: 1px dashed #d9d9d9;
  }

  .list-top {
    padding-top: 10px;
  }

  .list .title a {
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 0;
    display: inherit;
    font-size: 18px;
    font-weight: bold;
    line-height: 1.5;
    color: #555555;
  }

  .list .image {
    border: 1px solid #eeeeee;
    box-sizing: border-box;
    border-radius: 5px;
    width: 100px;
    height: 100px;
    float: right;
    margin-top: -74px;
  }

  .list .author {
    color: #4094c7;
  }

  .list .time {
    font-size: 12px;
    color: #717171;
  }

  .list .small-text {
    font-size: 12px;
    color: #717171;
  }

  ul {
    list-style: none;
  }
</style>
