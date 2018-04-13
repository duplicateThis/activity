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
          <el-col :span="3">
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
          <el-button class='addClass' round @click='addClass' size="small">添加</el-button>
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
import popUp from '@/components/popUp.vue'

export default {
  name: 'create',
  data () {
    return {
      form: {
        user: 'admin',
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
      }
    }
  },
  methods: {
    // add activity class
    addClass () {
      popUp.add()
    },
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
