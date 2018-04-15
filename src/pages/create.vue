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
          <el-col :span="8">
            <el-input v-model="form.number" size="small"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="活动名称">
          <el-col :span="8">
            <el-input v-model="form.name" size="small"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="举办方">
          <el-col :span="8">
            <el-input v-model="form.thehost" size="small"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="活动分类">
          <el-col :span="5">
            <el-select v-model="form.valueClassify" placeholder="请选择" size="small">
              <el-col :span="3">
                <el-option
                  v-for="item in form.optionsClass"
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

        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'create',
  data () {
    return {
      user: 'user1',
      form: {
        number: '',
        name: '',
        thehost: '',
        // activity classity
        optionsClass: [
          {value: '1', label: '分类1'},
          {value: '2', label: '分类2'},
          {value: '3', label: '分类3'}
        ],
        valueClassify: ''
      },
      formA: {
        name: ''
      },
      addClassDialog: false
    }
  },
  methods: {
    // get activity class
    getClass () {
      this.$http.get('http://localhost:3000/getClass', {

      })
      .then(function (response) {
        console.log(response);
      })
    },
    // add activity class
    addClass () {
      this.addClassDialog = false;
      this.$http.get('http://localhost:3000/addClass', {
        params: {
          user: this.user,
          activityClassName: this.formA.name
        }
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (response) {
        console.log(error);
      });
    },
    // submit form
    onSubmit () {
      this.$http.get('http://localhost:3000/create', {

      })
      .then(function (response) {
        console.log(response);
      })
        .catch(function (error) {
        console.log(error);
      });
    }
  },
  mounted () {
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
</style>
