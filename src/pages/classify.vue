<template>
  <div class="classify">
    <div class="top">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>后台首页</el-breadcrumb-item>
        <el-breadcrumb-item>活动分类</el-breadcrumb-item>
      </el-breadcrumb>
      <h1>活动分类</h1>
      <hr>
    </div>
    <div class="classTable">
      <el-row>
        <el-col :span="6" :offset="6">
          <el-button class='addClass' round @click="addClassDialog = true" size="small">添加活动分类</el-button>
          <el-dialog title="添加活动分类" :visible.sync="addClassDialog">
            <el-form :model="formA">
              <el-form-item label="分类名称" >
                <el-col :span="18">
                  <el-input v-model="formA.name" size="small"></el-input>
                </el-col>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="addClass">保存</el-button>
              <el-button type="primary" @click="addClassDialog = false">取消</el-button>
            </div>
          </el-dialog>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">分类名称</el-col>
        <el-col :span="6">操作</el-col>
      </el-row>
      <el-row :key="val.value" v-for="val in activityClass">
        <el-col :span="6">
          <div>{{val.value}}</div>
        </el-col>
        <el-col :span="6">
          <el-button size="mini" type="info" @click="editClass(val.value)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteClass(val.value)">删除</el-button>
        </el-col>
      </el-row>
      <hr>
      <el-row>
        <el-col :span="6">
          <div>共 {{count}} 个</div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'classify',
  data () {
    return {
      user: 'user1',
      addClassDialog : false,
      formA: {
        name: ''
      },
      activityClass: [],
      count: "",
      editDialog: false
    }
  },
  methods: {
    addClass () {
      let _this = this;
      this.addClassDialog = false;
      this.$http.get('http://localhost:3000/addClass', {
        params: {
          user: this.user,
          activityClassName: this.formA.name
        }
      })
      .then(function (response) {

      })
      .catch(function (response) {
        console.log(error);
      });
      this.activityClass = [];
      this.getClass();
    },
    getClass () {
      let _this = this;
      this.$http.get('http://localhost:3000/getClass', {
        params: {
          user: this.user
        }
      })
      .then(function (response) {
        for(var i = 0; i < response.data.length; i ++) {
          _this.activityClass.push({
            'value': response.data[i].activityClassName
          })
        }
        _this.count = response.data.length
      })
    },
    // editClass
    editClass (val) {
      let _this = this;
      this.$prompt('请修改分类名称', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({value}) => {
        _this.$http.get('http://localhost:3000/editClass', {
          params: {
            user: _this.user,
            val1: val,
            val2: value
          }
        }).then(function (res) {
          console.log(res.data)
          _this.activityClass = [];
          _this.getClass();
          _this.$message({
            type: 'success',
            message: '编辑成功！'
          });
        }).catch(function (err) {

        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消编辑'
        })
      })
    },
    // deleteClass
    deleteClass (val) {
      let _this = this;
      this.$confirm('确定删除吗？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _this.$http.get('http://localhost:3000/deleteClass', {
          params: {
            user: _this.user,
            val: val
          }
        }).then(function (res) {
          console.log(res.data)
          _this.activityClass = [];
          _this.getClass();
          _this.$message({
            type: 'success',
            message: '删除成功！'
          });
        }).catch(function (err) {

        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消删除'
        })
      })
    }
  },
  mounted () {
    this.getClass()
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

.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
</style>
