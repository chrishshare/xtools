<template>
  <div id="app">
<!--    <div id="nav">-->
<!--      <router-link to="/">Home</router-link> |-->
<!--      <router-link to="/about">About</router-link>-->
<!--    </div>-->
    <div class="layout">
      <Layout>
        <Header>
          <MenuComponent></MenuComponent>
        </Header>
        <Content>
          <router-view/>
        </Content>
        <Footer>footer</Footer>
      </Layout>
    </div>

  </div>
</template>
<script>
import MenuComponent from '@/components/MenuComponent'

export default {
  name: 'app',
  components: { MenuComponent },
  comments: {

  },
  data () {
    return {

    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.content {
  width: 90%;
  padding-left: 5%;
  padding-top: 10px;
}
</style>
