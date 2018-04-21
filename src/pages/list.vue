<template>
  <div class="list">
    <div class="top">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>后台首页</el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      </el-breadcrumb>
      <el-row>
        <el-col :span='4'><h1>活动列表</h1></el-col>
        <el-col :span='3'>
          <h1><el-button round :class="issuedClass" @click="issued">已发布</el-button></h1>
        </el-col>
        <el-col :span='3'>
          <h1><el-button round :class="noIssueClass" @click="noIssue">未发布</el-button></h1>
        </el-col>
      </el-row>
      <hr>
    </div>
    <el-row>
      <el-col :span="6" class="classStyle">
        <el-select v-model="classify" placeholder="请选择分类" size="small" @change="classifyChange">
          <el-col :span="1">
            <el-option
              v-for="item in optionClass"
              :key="optionClass.indexOf(item)" :label="item.name"
              :value="item.name"
              size="small">
            </el-option>
          </el-col>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-input
          size="small"
          placeholder="请输入搜索内容"
          prefix-icon="el-icon-search"
          v-model="searchW" @keyup.13.native="blurSearch">
        </el-input>
      </el-col>
    </el-row>
    <br>
    <br>
    <el-row class="tHeader">
      <el-col :span="4">活动图片</el-col>
      <el-col :span="3">活动名称</el-col>
      <el-col :span="2">发布方</el-col>
      <el-col :span="2">分类</el-col>
      <el-col :span="2">活动人数</el-col>
      <el-col :span="4">地址</el-col>
      <el-col :span="4">时间</el-col>
      <el-col :span="3">操作</el-col>
    </el-row>
    <el-row v-for="a in list" :key="a.value" class="tBody">
      <el-col :span="4">{{a.imgUrl ? a.imgUrl : '暂无图片'}}</el-col>
      <el-col :span="3">{{a.name}}</el-col>
      <el-col :span="2">{{a.thost}}</el-col>
      <el-col :span="2">{{a.classify ? a.classify : '暂无'}}</el-col>
      <el-col :span="2">{{a.count ? a.count : '暂无'}}</el-col>
      <el-col :span="4">{{a.address ? a.address : '暂无' | addressFilter}}</el-col>
      <el-col :span="4">{{a.ds|timeFilter}} 至 {{a.de|timeFilter}}</el-col>
      <el-col :span="3">
        <el-button size="mini" type="info" @click="editActivity(a)">编辑</el-button>
        <el-button size="mini" type="danger" @click="delActivity(a._id)">删除</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import '../filter/index.js'
export default {
  name: 'list',
  data () {
    return {
      user: 'user1',
      id: 'id1',
      issue: true,
      classify: '',
      searchW: '',
      optionClass: [],
      list: [],
      issuedClass: 'active',
      noIssueClass: ''
    }
  },
  methods: {
  // get
    getClass () {
      let _this = this;
      this.$http.post('http://localhost:3000/getClass', {
        params: {
          user: this.user,
          id: this.id
        }
      }).then(function (res) {
        _this.optionClass = res.data;
        _this.optionClass.push('')
      }).catch(function(err){
        _this.$message('获取表单分类失败！')
      })
    },
    getList () {
      let _this = this;
      this.$http.post('http://localhost:3000/getList', {
        params: {
          user: this.user,
          id: this.id,
          issue: this.issue,
          classify: this.classify,
          searchW: this.searchW
        }
      }).then(function(res){
        _this.list = res.data
      })
    },
  // get

  // search
    issued () {
      this.issuedClass = "active";
      this.noIssueClass = "";
      this.issue = true;
      this.getList()
    },
    noIssue () {
      this.noIssueClass = "active";
      this.issuedClass = "";
      this.issue = false;
      this.getList()
    },
    classifyChange () {
      this.getList()
    },
    blurSearch () {
      this.getList()
    },
  // search

  // delete && edit
    delActivity (_id) {
      let _this = this;
      this.$confirm('确定删除吗？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _this.$http.post('http://localhost:3000/delActivity', {
          params: {
            _id: _id,
            user: _this.user,
            id: _this.id
          }
        }).then(function (res) {
          _this.$message({
            type: 'success',
            message: '删除成功！'
          });
          _this.getList()
        }).catch(function (err) {
          _this.$message('删除失败！')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消删除'
        })
      })
    },
    editActivity (a) {
      this.$router.push({
        path: '/create',
        name: 'create',
        params: {
          name: 'name',
          activity: a
        }
      })
    }
  // delete && edit
  },
  mounted () {
    this.getClass();
    this.getList()
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
  text-align: left;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.classStyle {
  text-align: left
}
.tHeader {
  background-color: #F2F2F2;
  padding-bottom: 10px;
  padding-top: 10px;
}
.tBody {
  margin-bottom: 10px;
  border-bottom: 1px solid #ccc
}
.active {
  background-color: #ECF4FF
}
</style>
