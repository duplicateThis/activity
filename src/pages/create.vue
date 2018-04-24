<template>
  <div class="create">
    <div class="top">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>后台首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{routerParams ? '编辑活动' : '创建活动'}}</el-breadcrumb-item>
      </el-breadcrumb>
      <h1>{{routerParams ? '编辑活动' : '创建活动'}}</h1>
      <hr>
    </div>
    <div class="middle">
      <p class="title">活动基本信息</p>
      <el-form :rules="rules" ref="form" :model="form" label-width="80px" label-position="left">
        <el-form-item label="活动名称" prop="name">
          <el-col :span="10">
            <el-input v-model="form.name" size="small"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="举办方" prop="thost">
          <el-col :span="10">
            <el-input v-model="form.thost" size="small"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="活动分类" prop="classify">
          <el-col :span="5">
            <el-select v-model="form.classify" placeholder="请选择" size="small">
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
          <el-col :span="4" :offset="1">
            <el-button round @click="addClass" size="small">添加活动分类</el-button>
          </el-col>
        </el-form-item>
        <el-form-item label="活动地址">
          <el-col :span="5">
            <el-cascader
              size="small"
              expand-trigger="hover"
              :options="areaOptions"
              v-model="form.address"
              @change="handleChange">
            </el-cascader>
          </el-col>
          <el-col :span="5">
            <el-input v-model="areaDetail" size="small"></el-input>
          </el-col>
        </el-form-item>
        <el-row>
          <el-col :span="5">
            <el-form-item label="开始日期" prop="ds">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.ds" style="width: 100%;" size="small"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="5" :offset="1">
            <el-form-item label="结束日期" prop="de">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.de" style="width: 100%;" size="small"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="活动标签" prop="tags">
          <el-tag
          size="middle"
            :key="tag"
            v-for="tag in form.tags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
              {{tag}}
          </el-tag>
          <el-input
            size="small"
            class="newTagInput"
            v-if="tagEditVisible"
            v-model="tagValue"
            ref="saveTagInput"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm">
          </el-input>
          <el-button v-else class="newTagButton" size="small" @click="showTagInput">+ 新标签</el-button>
        </el-form-item>
        <el-form-item label="活动人数">
          <el-col :span="3">
            <el-input v-model.number="form.count" size="small"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="活动公开" prop="public">
          <el-radio v-model="form.public" label="1">公开</el-radio>
          <el-radio v-model="form.public" label="0">内部</el-radio>
        </el-form-item>
        <el-row>
          <el-col :span="12" class="activityImage">
            <el-form-item label="活动图片" prop="imgUrl">

            </el-form-item>
          </el-col>
        </el-row>
        <br>
        <el-form-item class="detail" label="活动详情" prop="detail"></el-form-item>
        <el-row>
          <el-col :span="16">
            <el-input
              type="textarea"
              :rows="8"
              placeholder="请输入活动详情"
              v-model="form.detail">
            </el-input>
          </el-col>
        </el-row>
        <br>
        <br>
        <el-row>
          <el-col :span="12" class="activityImage">
            <el-form-item label-width="150px" label="报名表单设置"></el-form-item>
          </el-col>
        </el-row>
        <el-checkbox-group v-model="checkList">
          <el-tag
          size="middle"
          :key="settings.indexOf(set)"
          v-for="set in settings"
          :disable-transitions="false">
            <el-checkbox :label="set.name" :disabled="!set.state"></el-checkbox>
          </el-tag>
          <el-button class="addSettings" round @click="addSettings" size="small">添加设置项</el-button>
        </el-checkbox-group>
        <br>
        <br>
        <br>
        <br>
        <br>
        <!-- submit -->
        <el-form-item>
          <el-button round type="success" @click="issueForm('form')">发布</el-button>
          <el-button v-show="!form.issue" round type="info" @click="saveForm('form')">保存</el-button>
          <el-button round @click="resetForm(form)">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {regionData} from 'element-china-area-data'

export default {
  name: 'create',
  data () {
    return {
      user: 'user1',
      id: 'id1',
      form: {
        name: '',
        thost: '',
        classify: '',
        address: [],
        ds: '',
        de: '',
        tags: [],
        count: '',
        public: '',
        imageUrl: [],
        detail: '',
        settings: [],
        issue: 0
      },
      optionClass: [],
      areaOptions: regionData,
      areaDetail: '',
      tagEditVisible: false,
      tagValue: '',
      settings: '',
      checkList: [],
      routerParams: '',

      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        thost: [
          { required: true, message: '请输入举办方', trigger: 'blur' }
        ],
        classify: [
          { required: true, message: '请选择分类', trigger: 'blur' }
        ],
        ds: [
          { required: true, message: '请选择开始日期', trigger: 'blur' }
        ],
        de: [
          { required: true, message: '请选择结束日期', trigger: 'blur' }
        ],
        public: [
          { required: true, message: '请选择是否公开活动', trigger: 'blur' }
        ],
        detail: [
          { required: true, message: '请填写活动详情', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
  // activity classify
    getClass () {
      let _this = this;
      this.$http.post('http://localhost:3000/getClass', {
        params: {
          user: this.user,
          id: this.id
        }
      }).then(function (res) {
        _this.optionClass = res.data
      }).catch(function(err){
        _this.$message('获取表单分类失败！')
      })
    },
    addClass () {
      let _this = this;
      this.$prompt('请填写分类名称', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({value}) => {
        if (value) {
          let canSave = 1;
          for (let i = 0; i < _this.optionClass.length; i ++) {
            if (value == _this.optionClass[i].name) {
              canSave = 0;
            }
          }
          if (canSave) {
            _this.$http.post('http://localhost:3000/addClass', {
              params: {
                user: _this.user,
                id: _this.id,
                name: value,
              }
            }).then(function (res) {
              _this.getClass();
              _this.$message({
                type: 'success',
                message: '添加成功！'
              });
            }).catch(function (err) {
              _this.$message('添加失败！');
            })
          } else {
            _this.$message('已存在同名分类项！')
          }
        } else {
          _this.$message('分类名称不能为空！')
        }
      }).catch(() => {
        this.$message('取消添加')
      })
    },
  // activity classify

  // aaddress
    handleChange (value) {},

  // tags
    handleClose(tag) {
      this.form.tags.splice(this.form.tags.indexOf(tag), 1);
    },
    showTagInput() {
      this.tagEditVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let tagValue = this.tagValue;
      let tags = this.form.tags;
      let canSave = 1;
      for (let i = 0; i < tags.length; i ++) {
        if (tagValue == tags[i]) {
          canSave = 0
        }
      }
      if (tagValue) {
        if (canSave) {
          this.form.tags.push(tagValue);
        } else {
          this.$message('已存在同名标签！')
        }
      }
      this.tagEditVisible = false;
      this.tagValue = '';
    },
  // tags

  // settings
    getSettings () {
      let _this = this;
      this.$http.post('http://localhost:3000/getSettings', {
        params: {
          user: this.user,
          id: this.id
        }
      }).then(function(res){
        _this.settings = res.data
      }).catch(function(err){
        _this.$message('获取表单设置项失败！')
      })
    },
    addSettings () {
      let _this = this;
      this.$prompt('请填写设置项', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({value}) => {
        if (value) {
          let canSave = 1;
          for (let i = 0; i < _this.settings.length; i ++) {
            if (value == _this.settings[i].name) {
              canSave = 0;
            }
          }
          if (canSave) {
            _this.$http.post('http://localhost:3000/addSettings', {
              params: {
                user: _this.user,
                id: _this.id,
                name: value,
              }
            }).then(function (res) {
              _this.getSettings();
              _this.$message({
                type: 'success',
                message: '添加成功！'
              });
            }).catch(function (err) {
              _this.$message('添加失败！');
            })
          } else {
            _this.$message('已存在同名设置项！')
          }
        } else {
          _this.$message('设置名称不能为空！')
        }
      }).catch(() => {
        this.$message('取消添加')
      })
    },
  // settings

  // submit form
    issueForm (form) {
      let _this = this;
      let time = new Date();
      _this.form.issue = 1;
      _this.form.settings = _this.checkList;
      // valid
      this.$refs[form].validate((valid) => {
        if (valid) {
          if (_this.routerParams) {
            _this.routerParams.address[3] = _this.areaDetail;
            _this.$http.post('http://localhost:3000/editActivity', {
              form: _this.form,
              user: _this.user,
              id: _this.id,
              _id: _this.routerParams._id,
              time: time
            }).then(function (res) {
              _this.$message({
                type: 'success',
                message: '发布成功！'
              })
              location.reload()
            }).catch(function (err) {
              _this.$message('发布失败！')
            });
          } else {
            _this.form.address.push(_this.areaDetail);
            _this.$http.post('http://localhost:3000/create', {
              form: _this.form,
              user: _this.user,
              id: _this.id,
              time: time
            }).then(function (res) {
              _this.$message({
                type: 'success',
                message: '发布成功！'
              })
              location.reload()
            }).catch(function (err) {
              _this.$message('发布失败！')
            });
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    saveForm (form) {
      let _this = this;
      _this.form.settings = _this.checkList;
      // valid
      this.$refs[form].validate((valid) => {
        if (valid) {
          if (_this.routerParams) {
            _this.routerParams.address[3] = _this.areaDetail;
            _this.$http.post('http://localhost:3000/editActivity', {
              form: _this.form,
              user: _this.user,
              id: _this.id,
              _id: _this.routerParams._id
            }).then(function (res) {
              _this.$message({
                type: 'success',
                message: '保存成功！'
              })
              location.reload()
            }).catch(function (err) {
              _this.$message('保存失败！')
            });
          } else {
            _this.form.address.push(_this.areaDetail);
            _this.$http.post('http://localhost:3000/create', {
              form: _this.form,
              user: _this.user,
              id: _this.id
            }).then(function (res) {
              _this.$message({
                type: 'success',
                message: '保存成功！'
              })
              location.reload();
            }).catch(function (err) {
              _this.$message('发布失败！')
            });
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm (form) {
      let routerForm = this.$route.params.activity;
      if (routerForm) {
        this.$router.push({
          path: '/list'
        })
      } else {
        form.name = '',
        form.thost = '',
        form.classify = '',
        form.address = [],
        form.ds = '',
        form.de = '',
        form.tags = [],
        form.count = '',
        form.public = '',
        form.imageUrl = '',
        form.detail = '',
        form.settings = [],
        form.issue = 0,
        this.areaDetail = '',
        this.checkList = []
      }
    },
  // submit form

  // get router params
    getParams () {
      let routerForm = this.$route.params.activity;
      this.routerParams = this.$route.params.activity;
      if(routerForm){
        this.areaDetail = routerForm.address[3];
        this.checkList = routerForm.settings;
        this.form = routerForm;
        if (routerForm.public == true) {
          this.form.public = '1'
        } else {
          this.form.public = '0'
        }
      }
    }
  },
  mounted () {
    this.getClass();
    this.getSettings();
    this.getParams();
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

.middle {
  text-align: left;
  padding-left: 50px;
}

.title {
  padding-bottom: 5px;
  border-bottom: 1px solid #ccc;
}
.addClass {
  margin-left: 50px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.newTagButton {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.newTagInput {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
}
.activityImage > .el-form-item {
  border-bottom: 1px solid #ccc
}
.detail {
  margin-bottom: 0
}
.el-tag {
  margin-bottom: 20px
}
.addSettings {
  margin-left: 50px;
}
</style>
