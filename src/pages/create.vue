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
      <el-form ref="form" :model="form" label-width="80px" label-position="left">
        <el-form-item label="活动编号">
          <el-col :span="10">
            <el-input v-model="form.number" size="small"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="活动名称">
          <el-col :span="10">
            <el-input v-model="form.name" size="small"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="举办方">
          <el-col :span="10">
            <el-input v-model="form.thehost" size="small"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="活动分类">
          <el-col :span="5">
            <el-select v-model="form.valueClassify" placeholder="请选择" size="small">
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
          <el-col :span="6">
            <el-cascader
              size="small"
              expand-trigger="hover"
              :options="areaOptions"
              v-model="form.selectedAreaOptions"
              @change="handleChange">
            </el-cascader>
          </el-col>
          <el-col :span="8">
            <el-input v-model="areaDetail" size="small"></el-input>
          </el-col>
        </el-form-item>
        <el-row>
          <el-col :span="5">
            <el-form-item label="开始日期">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.dateStart" style="width: 100%;" size="small"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="5" :offset="2">
            <el-form-item label="截止日期">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.dateEnd" style="width: 100%;" size="small"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="活动标签">
          <el-tag
          size="middle"
            :key="tag"
            v-for="tag in form.activityTags"
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
            <el-input v-model="form.peopleCount" size="small"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="活动公开">
          <el-radio v-model="form.activityRadio" label="1">公开</el-radio>
          <el-radio v-model="form.activityRadio" label="2">内部</el-radio>
        </el-form-item>
        <el-row>
          <el-col :span="12" class="activityImage">
            <el-form-item label="活动图片">

            </el-form-item>
          </el-col>
        </el-row>
        <br>
        <el-form-item class="detail" label="活动详情"></el-form-item>
        <el-row>
          <el-col :span="20">
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

        <!-- submit -->
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
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
      form: {
        number: '',
        name: '',
        thehost: '',
        valueClassify: '',
        selectedAreaOptions: [],
        dateStart: '',
        dateEnd: '',
        activityTags: [],
        peopleCount: '',
        activityRadio: '',
        imageUrl: '',
        detail: '',
        settings: []
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
      setTags2: []
    }
  },
  computed: {
    settingClose: function () {
      return true
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
    // activityTags
    handleClose(tag) {
      this.form.activityTags.splice(this.form.activityTags.indexOf(tag), 1);
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
        this.form.activityTags.push(tagValue);
      }
      this.tagEditVisible = false;
      this.tagValue = '';
    },
    // settings

    // submit form
    onSubmit () {
      this.form.selectedAreaOptions.push(this.areaDetail);
      for(var i = 0; i < this.setTags.length; i ++) {
        if(this.setTags[i][1] != '') {
          this.form.settings.push(this.setTags[i][0])
        }
      }
      // this.$http.get('http://localhost:3000/create', {

      // })
      // .then(function (response) {
      //   console.log(response);
      // })
      //   .catch(function (error) {
      //   console.log(error);
      // });
    }
  },
  mounted () {
    // get activity class when mounted
    this.getClass();
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
</style>
