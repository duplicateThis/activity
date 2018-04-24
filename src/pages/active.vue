<template>
  <div class="list">
    <div class="top">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>后台首页</el-breadcrumb-item>
        <el-breadcrumb-item>举办的活动</el-breadcrumb-item>
      </el-breadcrumb>
      <h1>举办的活动</h1>
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
      <el-col :span="3">活动名称</el-col>
      <el-col :span="3">发布方</el-col>
      <el-col :span="2">分类</el-col>
      <el-col :span="2">活动人数</el-col>
      <el-col :span="2">实际人数</el-col>
      <el-col :span="6">活动记录照片</el-col>
      <el-col :span="4">操作</el-col>
    </el-row>
    <el-row v-for="a in list" :key="a.value" class="tBody">
      <el-col :span="3">{{a.name}}</el-col>
      <el-col :span="3">{{a.thost}}</el-col>
      <el-col :span="2">{{a.classify}}</el-col>
      <el-col :span="2">{{a.count ? a.count : '暂无'}}</el-col>
      <el-col :span="2">{{a.count ? a.count : '暂无'}}</el-col>
      <el-col :span="6">{{a.imgURLed ? a.imgURLed : '暂无图片'}}</el-col>
      <el-col :span="4">
        <el-button size="mini" type="info" @click="editImg(a)">编辑</el-button>
        <el-button size="mini" type="danger" @click="delActivity(a._id)">删除</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'active',
  data () {
    return {
      user: 'user1',
      id: 'id1',
      classify: '',
      searchW: '',
      optionClass: [],
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
    getList () {
      let _this = this;
      this.$http.post('http://localhost:3000/getList', {
        params: {
          user: this.user,
          id: this.id,
          issue: true,
          classify: this.classify,
          searchW: this.searchW,
          holding: true,
          held: true
        }
      }).then(function(res){
        _this.list = res.data
      }).catch(function(err){
        _this.$message('获取列表失败！')
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
    editImg (a) {
      console.log('上传活动图片')
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
