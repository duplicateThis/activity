<template>
  <div class="active">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>后台首页</el-breadcrumb-item>
      <el-breadcrumb-item>举办的活动</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'active',
  data () {
    return {

    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
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
</style>
