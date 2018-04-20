<template>
  <div>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>后台首页</el-breadcrumb-item>
        <el-breadcrumb-item>活动分类</el-breadcrumb-item>
      </el-breadcrumb>
      <h1>活动分类</h1>
      <hr>
    </div>
    <div>
      <el-row>
        <el-col :span="7" :offset="3">
          <el-button round @click="classifyDialog = true" size="small">添加活动分类</el-button>
          <el-dialog title="添加活动分类" :visible.sync="classifyDialog">
            <el-form>
              <el-form-item label="分类名称" >
                <el-col :span="18">
                  <el-input v-model="name" size="small" @keyup.enter.native="addClassify(name)"></el-input>
                </el-col>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="addClassify(name)">保存</el-button>
              <el-button type="primary" @click="classifyDialog = false">取消</el-button>
            </div>
          </el-dialog>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3">分类名称</el-col>
        <el-col :span="7">操作</el-col>
      </el-row>
      <el-row :key="val.name" v-for="val in classify">
        <el-col :span="3">{{val.name}}</el-col>
        <el-col :span="7">
          <el-button size="mini" type="info" @click="editClassify(val._id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="delClassify(val._id)">删除</el-button>
        </el-col>
      </el-row>
      <hr>
      <el-row>
        <el-col :span="3">
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
      id: 'id1',
      name: '',
      classifyDialog: false,
      classify: [],
      count: ''
    }
  },
  methods: {
    // get classify
    getClassify () {
      let _this = this;
      this.$http.post('http://localhost:3000/getClass', {
        params: {
          user: this.user,
          id: this.id
        }
      }).then(function(res){
        _this.classify = res.data;
        _this.count = res.data.length
      }).catch(function(err){
        _this.$message('获取表单分类失败！')
      })
    },
    // add classify
    addClassify (name) {
      let _this = this;
      if (name) {
        let canSave = 1;
        for (let i = 0; i < _this.classify.length; i ++) {
          if (name == _this.classify[i].name) {
            canSave = 0;
          }
        }
        if (canSave) {
          this.$http.post('http://localhost:3000/addClass', {
            params: {
              user: this.user,
              id: this.id,
              name: this.name
            }
          }).then(function(res){
            console.log(res.data)
            _this.$message({
              type: 'success',
              message: '保存成功！'
            });
            _this.classifyDialog = false;
            _this.getClassify()
          }).catch(function(err){
            _this.$message('保存失败!')
          })
        } else {
          this.$message('已存在同名分类项！')
        }
      } else {
        this.$message('分类名称不能为空！')
      }
    },

    // edit classify
    editClassify (_id) {
      let _this = this;
      this.$prompt('请修改分类名称', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({value}) => {
        if (value) {
          let canEdit = 1;
          for (let i = 0; i < _this.classify.length; i ++) {
            if (value == _this.classify[i].name) {
              canEdit = 0;
            }
          }
          if (canEdit) {
            _this.$http.get('http://localhost:3000/editClass', {
              params: {
                user: _this.user,
                id: _this.id,
                name: value,
                _id: _id
              }
            }).then(function (res) {
              _this.getClassify();
              _this.$message({
                type: 'success',
                message: '编辑成功！'
              });
            }).catch(function (err) {
              _this.$message('编辑失败！');
            })
          } else {
            _this.$message('已存在同名分类项！')
          }
        } else {
          _this.$message('分类名称不能为空！')
        }
      }).catch(() => {
        this.$message('取消编辑')
      })
    },
    // delete classify
    delClassify (_id) {
      let _this = this;
      this.$confirm('确定删除吗？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _this.$http.get('http://localhost:3000/delClass', {
          params: {
            user: _this.user,
            id: _this.id,
            _id: _id
          }
        }).then(function (res) {
          _this.getClassify()
          _this.$message({
            type: 'success',
            message: '删除成功！'
          });
        }).catch(function (err) {
          this.$message('删除失败！')
        })
      }).catch(() => {
        this.$message('取消删除')
      })
    }
  },
  mounted () {
    this.getClassify()
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
    margin-bottom: 25px;
    &:last-child {
      margin-bottom: 0;
    }
}
</style>
