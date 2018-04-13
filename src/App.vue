<template>
  <el-container id="app">
    <el-aside class="aside" width="12.5%">
      <el-menu background-color="#989898" text-color="#fff" active-text-color="#ffd04b">
        <el-menu-item index="1">
          <router-link to='/create'>创建活动</router-link>
        </el-menu-item>
        <el-menu-item index="2">
          <router-link to='/list'>活动列表</router-link>
        </el-menu-item>
        <el-menu-item index="3">
          <router-link to='/active'>举办的活动</router-link>
        </el-menu-item>
        <el-menu-item index="4">
          <router-link to='/participate'>参与人员</router-link>
        </el-menu-item>
        <el-menu-item index="5">
          <router-link to='/setting'>表单项设置</router-link>
        </el-menu-item>
        <el-menu-item index="6">
          <router-link to='/classify'>活动分类</router-link>
        </el-menu-item>
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
</style>
