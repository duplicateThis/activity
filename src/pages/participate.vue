<template>
  <div class="list">
    <div class="top">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>后台首页</el-breadcrumb-item>
        <el-breadcrumb-item>参与人员</el-breadcrumb-item>
      </el-breadcrumb>
      <h1>参与人员</h1>
      <hr>
    </div>
    <el-row>
      <el-col :span="4" class="classStyle">
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
        <el-select v-model="activity" value-key="name" placeholder="请选择活动" size="small" @change="activityChange(activity)">
          <el-col :span="1">
            <el-option
              v-for="item in optionAct"
              :key="optionAct.indexOf(item)" :label="item.name"
              :value="item"
              size="small">
            </el-option>
          </el-col>
        </el-select>
      </el-col>
      <el-col :span="4">
        <span>活动状态：</span>
        <span>{{actState1 === '' ? '' : (actState1 ? (actState2 ? '已结束' : '举行中') : '报名中')}}</span>
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
      <el-col :span="3">微信头像</el-col>
      <el-col :span="2">姓名</el-col>
      <el-col :span="4">公司</el-col>
      <el-col :span="3">职位</el-col>
      <el-col :span="2">手机</el-col>
      <el-col :span="3">邮箱</el-col>
      <el-col :span="4">状态</el-col>
      <el-col :span="3">操作</el-col>
    </el-row>
    <el-row v-for="a in list" :key="a.value" class="tBody">
      <el-col :span="3"></el-col>
      <el-col :span="2"></el-col>
      <el-col :span="4"></el-col>
      <el-col :span="3"></el-col>
      <el-col :span="2"></el-col>
      <el-col :span="3"></el-col>
      <el-col :span="4"></el-col>
      <el-col :span="3">
        <el-button size="mini" type="info" @click="viewAll()">查看</el-button>
        <el-button size="mini" type="danger" @click="delParti()">删除</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'paticipate',
  data () {
    return {
      user: 'user1',
      id: 'id1',
      classify: '',
      optionClass: [],
      activity: '',
      optionAct: [],
      searchW: '',
      actState1: '',
      actState2: '',
      list: []
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
    // get activity
    getList () {
      let _this = this;
      this.$http.post('http://localhost:3000/getList', {
        params: {
          user: this.user,
          id: this.id,
          issue: true,
          classify: this.classify,
          searchW: this.searchW,
        }
      }).then(function(res){
        _this.optionAct = res.data
      }).catch(function(err){
        _this.$message('获取活动失败！')
      })
    },
    getParti (a) {
      console.log(a)
      console.log(a.name)
      console.log(a._id)
      let _this = this;
      this.$http.post('http://localhost:3000/getParti', {
        params: {
          actName: a.name,
          _id: a._id
        }
      }).then(function(res){
        _this.optionAct = res.data
      }).catch(function(err){
        _this.$message('获取参与人员失败！')
      })
    },
  // get

  // search
    classifyChange () {
      this.getList()
    },
    blurSearch () {
      this.getList()
    },
    activityChange (a) {
      this.actState1 = a.holding;
      this.actState2 = a.held;
      this.getParti(a)
    },
  // search

  // delete && view all
    delParti () {

    },
    viewAll () {

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
