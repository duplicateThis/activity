<template>
  <div>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>后台首页</el-breadcrumb-item>
        <el-breadcrumb-item>表单项设置</el-breadcrumb-item>
      </el-breadcrumb>
      <h1>表单项设置</h1>
      <hr>
    </div>
    <div class="classTable">
      <el-row>
        <el-col :span="5" :offset="6">
          <el-button round @click="setTagDialog = true" size="small">添加表单项</el-button>
          <el-dialog title="添加表单项设置" :visible.sync="setTagDialog">
            <el-form>
              <el-form-item label="设置名称" >
                <el-col :span="18">
                  <el-input v-model="name" size="small" @keyup.enter.native="addSetTag(name)"></el-input>
                </el-col>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="addSetTag(name)">保存</el-button>
              <el-button type="primary" @click="setTagDialog = false">取消</el-button>
            </div>
          </el-dialog>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3">表单项名称</el-col>
        <el-col :span="3">启用</el-col>
        <el-col :span="5">操作</el-col>
      </el-row>
      <el-row :key="val.name" v-for="val in settings">
        <el-col :span="3">{{val.name}}</el-col>
        <el-col :span="3">
          <div :class="stateClass(val.state)" @click="changeS(val._id, val.state)"></div>
        </el-col>
        <el-col :span="6">
          <el-button size="mini" type="info" @click="editSet(val._id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="delSet(val._id)">删除</el-button>
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
  name: 'setting',
  data () {
    return {
      user: 'user1',
      id: 'id1',
      name: '',
      setTagDialog: false,
      settings: [],
      count: ''
    }
  },
  methods: {
    // add setting
    addSetTag (name) {
      let _this = this;
      if (name) {
        let canSave = 1;
        for (let i = 0; i < _this.settings.length; i ++) {
          if (name == _this.settings[i].name) {
            canSave = 0;
          }
        }
        if (canSave) {
          this.$http.post('http://localhost:3000/addSettings', {
            params: {
              user: this.user,
              id: this.id,
              name: this.name
            }
          }).then(function(res){
            _this.$message({
              type: 'success',
              message: '保存成功！'
            });
            _this.setTagDialog = false;
            _this.getSettings()
          }).catch(function(err){
            _this.$message('保存失败!')
          })
        } else {
          this.$message('已存在同名设置项！')
        }
      } else {
        this.$message('设置名称不能为空！')
      }
    },
    // get settings
    getSettings () {
      let _this = this;
      this.$http.post('http://localhost:3000/getSettings', {
        params: {
          user: this.user,
          id: this.id
        }
      }).then(function(res){
        _this.settings = res.data;
        _this.count = res.data.length
      }).catch(function(err){
        _this.$message('获取表单设置项失败！')
      })
    },

    //  get state
    stateClass (state) {
      if (state) {
        return "el-icon-check"
      } else {
        return "el-icon-close"
      }
    },
    // change state
    changeS (_id, state) {
      let _this = this;
      this.$http.get('http://localhost:3000/changeState', {
        params: {
          user: this.user,
          id: this.id,
          _id: _id,
          state: state
        }
      }).then(function(res){
        console.log(res.data)
        _this.$message({
          type: 'success',
          message: '修改表成功！'
        });
        _this.getSettings()
      }).catch(function(err){
        _this.$message('修改失败！')
      })
    },

    // edit setting
    editSet (_id) {
      let _this = this;
      this.$prompt('请修改设置名称', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({value}) => {
        if (value) {
          let canEdit = 1;
          for (let i = 0; i < _this.settings.length; i ++) {
            if (value == _this.settings[i].name) {
              canEdit = 0;
            }
          }
          if (canEdit) {
            _this.$http.get('http://localhost:3000/editSet', {
              params: {
                user: _this.user,
                id: _this.id,
                name: value,
                _id: _id
              }
            }).then(function (res) {
              _this.getSettings();
              _this.$message({
                type: 'success',
                message: '编辑成功！'
              });
            }).catch(function (err) {
              _this.$message('编辑失败！');
            })
          } else {
            _this.$message('已存在同名设置项！')
          }
        } else {
          _this.$message('设置名称不能为空！')
        }
      }).catch(() => {
        this.$message('取消编辑')
      })
    },
    // delete setting
    delSet (_id) {
      let _this = this;
      this.$confirm('确定删除吗？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _this.$http.get('http://localhost:3000/delSet', {
          params: {
            user: _this.user,
            id: _this.id,
            _id: _id
          }
        }).then(function (res) {
          _this.getSettings()
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
    this.getSettings()
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
