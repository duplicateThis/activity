<template>
  <div class="create">
    <div class="top">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>后台首页</el-breadcrumb-item>
        <el-breadcrumb-item>创建活动</el-breadcrumb-item>
      </el-breadcrumb>
      <h1>创建活动</h1>
      <hr>
    </div>
    <div class="middle">
      <p class="title">活动基本信息</p>
      <el-form :rules="rules" ref="form" :model="form" label-width="80px" label-position="left">
        <el-form-item label="活动编号" prop="number">
          <el-col :span="10">
            <el-input v-model="form.number" size="small"></el-input>
          </el-col>
        </el-form-item>
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
        <el-form-item label="活动分类">
          <el-col :span="5">
            <el-select v-model="form.classify" placeholder="请选择" size="small">
              <el-col :span="1">
                <el-option
                  v-for="item in optionsClass"
                  :key="item.value" :label="item.label"
                  :value="item.value"
                  size="small">
                </el-option>
              </el-col>
            </el-select>
          </el-col>
          <el-button class='addClass' round @click="addClassDialog = true" size="small">添加</el-button>
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
          <el-col :span="7">
            <el-input v-model="areaDetail" size="small"></el-input>
          </el-col>
        </el-form-item>
        <el-row>
          <el-col :span="5">
            <el-form-item label="开始日期" prop="ds">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.ds" style="width: 100%;" size="small"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="5" :offset="2">
            <el-form-item label="截止日期" prop="de">
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
          <el-col :span="4">
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
        <el-tag
          size="middle"
          :key="val[0]"
          v-for="val in setTags1"
          :disable-transitions="false">
            <el-checkbox :key="val[0]" v-model='val[1]'>{{val[0]}}</el-checkbox>
        </el-tag>
        <el-tag
          size="middle"
          :key="val[0]"
          v-for="val in setTags2"
          closable
          :disable-transitions="false"
          @close="handleSetClose(val)">
          <el-checkbox :key="val[0]" v-model='val[1]'>{{val[0]}}</el-checkbox>
        </el-tag>
        <el-input
          size="small"
          class="newSetInput"
          v-if="setEditVisible"
          v-model="setValue"
          ref="saveSetInput"
          @keyup.enter.native="handleSetConfirm"
          @blur="handleSetConfirm">
        </el-input>
        <el-button v-else class="newSetButton" size="small" @click="showSetInput">+ 设置</el-button>
        <br>
        <br>
        <br>
        <br>
        <br>

        <!-- submit -->
        <el-form-item>
          <el-button round type="success" @click="issueForm('form')">发布</el-button>
          <el-button round type="info" @click="saveForm('form')">保存</el-button>
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
        number: '',
        name: '',
        thost: '',
        classify: '',
        address: [],
        ds: '',
        de: '',
        tags: [],
        count: '',
        public: '',
        imageUrl: '',
        detail: '',
        settings: [],
        issue: 0
      },
      optionsClass: [],
      formA: {
        name: ''
      },
      addClassDialog: false,
      areaOptions: regionData,
      areaDetail: '',
      tagEditVisible: false,
      tagValue: '',
      setTags1: [['姓名', ''], ['公司', ''], ['手机', ''], ['邮箱', ''], ['性别', ''], ['职位', ''], ['工号', '']],
      setTags2: [],
      setEditVisible: false,
      setValue: '',
      rules: {
        number: [
          { required: true, message: '请输入活动编号', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        thost: [
          { required: true, message: '请输入举办方', trigger: 'blur' }
        ],
        ds: [
          { required: true, message: '请选择开始日期', trigger: 'blur' }
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
    // get activity class
    getClass () {
      let _this = this;
      this.$http.get('http://localhost:3000/getClass', {
        params: {
          user: this.user
        }
      })
      .then(function (response) {
        for(var i = 0; i < response.data.length; i ++) {
          _this.optionsClass.push({
            'value': response.data[i].activityClassName,
            'label': response.data[i].activityClassName
          })
        }
      })
    },
    // add activity class
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
      this.optionsClass = [];
      this.getClass();
    },
    // area
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
      if (tagValue) {
        this.form.tags.push(tagValue);
      }
      this.tagEditVisible = false;
      this.tagValue = '';
    },
    // settings
    handleSetClose(val) {
      this.setTags2.splice(this.setTags2.indexOf(val), 1);
    },
    showSetInput() {
      this.setEditVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveSetInput.$refs.input.focus();
      });
    },
    handleSetConfirm() {
      let setValue = this.setValue;
      if (setValue) {
        this.setTags2.push([setValue, '']);
      }
      this.setEditVisible = false;
      this.setValue = '';
    },

    // submit form
    issueForm (form) {
      let _this = this;
      _this.form.issue = 1;
      _this.form.address.push(_this.areaDetail);
      for(var i = 0; i < _this.setTags1.length; i ++) {
        if(_this.setTags1[i][1] != '') {
          _this.form.settings.push(_this.setTags1[i][0])
        }
      }
      for(var i = 0; i < _this.setTags2.length; i ++) {
        if(_this.setTags2[i][1] != '') {
          _this.form.settings.push(_this.setTags2[i][0])
        }
      }
      // valid
      this.$refs[form].validate((valid) => {
        if (valid) {
          _this.$http.post('http://localhost:3000/create', {
            form: _this.form,
            user: _this.user,
            id: _this.id
          }).then(function (res) {
            alert('发布成功！');
            location.reload();
          }).catch(function (err) {
            console.log(err);
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    saveForm (form) {
      let _this = this;
      if (_this.form._id) {
        if (_this.form.issue == 0) {
          // haven't issue activity edit
          console.log('可编辑保存');
          console.log(_this.form)
        } else {
          // issued activity edit
          console.log('将发布活动改为未发布？')
          console.log(_this.form)
        }
      } else {
        console.log('新创建')
      }

      _this.form.address.push(_this.areaDetail);
      for(var i = 0; i < _this.setTags1.length; i ++) {
        if(_this.setTags1[i][1] != '') {
          _this.form.settings.push(_this.setTags1[i][0])
        }
      }
      for(var i = 0; i < _this.setTags2.length; i ++) {
        if(_this.setTags2[i][1] != '') {
          _this.form.settings.push(_this.setTags2[i][0])
        }
      }
      // valid
      this.$refs[form].validate((valid) => {
        if (valid) {
          _this.$http.post('http://localhost:3000/create', {
            form: _this.form,
            user: _this.user,
            id: _this.id
          }).then(function (res) {
            alert('保存成功！');
            location.reload();
          }).catch(function (err) {
            console.log(err);
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm (form) {
      form.number = ''
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
      this.areaDetail = ''
    },

    //get router params
    getParams () {
      let routerForm = this.$route.params.activity;
      if(routerForm){
        this.areaDetail = routerForm.address[3];
        this.form = routerForm;
        if (routerForm.public === true) {
          this.form.public = '1'
        } else {
          this.form.public = '0'
        }
      }
      console.log(routerForm)
    }
  },
  mounted () {
    // get activity class when mounted
    this.getClass();
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
.newSetButton {
  margin-left: 5px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.newSetInput {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
}
</style>
