<template>
  <el-container id="app">
    <el-aside class="aside" width="12.5%">
      <el-menu background-color="#989898" text-color="#fff" active-text-color="#ffd04b">
        <router-link to='/create'>
          <el-menu-item index="1">创建活动</el-menu-item>
        </router-link>
        <router-link to='/list'>
          <el-menu-item index="2">活动列表</el-menu-item>
        </router-link>
        <router-link to='/active'>
          <el-menu-item index="3">举办的活动</el-menu-item>
        </router-link>
        <router-link to='/participate'>
          <el-menu-item index="4">参与人员</el-menu-item>
        </router-link>
        <router-link to='/setting'>
          <el-menu-item index="5">表单项设置</el-menu-item>
        </router-link>
        <router-link to='/classify'>
          <el-menu-item index="6">活动分类</el-menu-item>
        </router-link>
      </el-menu>
    </el-aside>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
a {text-decoration: none; color: #fff;}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.el-aside {
  background-color: #989898;
}
.el-menu {
  border: none;
}
a {
  display: block;
}
.aaa {
  background-color: red
}
</style>
