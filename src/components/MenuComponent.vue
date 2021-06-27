<template>
  <div>
  <Menu mode="horizontal" theme="dark" active-name="1">
    <MenuItem name="1">
      <Icon type="ios-people" />
     <router-link :to="{'name': 'urlcollect'}">URL收藏</router-link>
    </MenuItem>
    <Submenu name="2">
      <template slot="title">
        <Icon type="md-laptop" />
        资源管理
      </template>
      <MenuItem name="2-1">服务器资源</MenuItem>
    </Submenu>

    <MenuItem name="3">
      <Icon type="ios-people" />

      <router-link :to="{'name': 'certcard'}">身份证号码生成</router-link>
    </MenuItem>

<!--    <Submenu name="4">-->
<!--      <template slot="title">-->
<!--        <Icon type="md-hammer" />-->
<!--        效率工具-->
<!--      </template>-->
<!--      <MenuItem name="4-1">用例转FPA</MenuItem>-->
<!--    </Submenu>-->

<!--    <Submenu name="5">-->
<!--      <template slot="title">-->
<!--        <Icon type="ios-calendar-outline" />-->
<!--        考勤管理-->
<!--      </template>-->
<!--      <MenuItem name="5-1"><router-link to="/att">加班申请</router-link></MenuItem>-->
<!--    </Submenu>-->

    <div class="signin-btn-grp">
      <ButtonGroup v-if="username">
        <Button type="primary" shape="circle" icon="ios-person-outline">{{username}}</Button>
        <Button type="success" shape="circle" icon="ios-log-out" @click="signout">退出</Button>
<!--        <component :is="signcom"></component>-->
      </ButtonGroup>
      <ButtonGroup v-else>
        <Button type="primary" shape="circle" @click="signModal = true" icon="ios-log-in">登录</Button>
        <Button type="success" shape="circle" @click="signModal = true" icon="ios-hand-outline">注册</Button>
      </ButtonGroup>
    </div>

    <Modal
      v-model="signModal"
      :mask-closable="false"
      footer-hide
      class-name="vertical-center-modal">
      <Tabs>
        <TabPane label="登录">
          <signincomponent></signincomponent>
        </TabPane>
        <TabPane label="注册">
          <signupcomponent></signupcomponent>
        </TabPane>
      </Tabs>
    </Modal>

  </Menu>
  </div>
</template>

<script>
import signincomponent from '@/components/SignInComponent'
import signupcomponent from '@/components/SignUpComponent'

export default {
  name: 'MenuComponent',
  components: { signincomponent, signupcomponent },
  data () {
    return {
      signModal: false,
      username: localStorage.getItem('username')
      // componentName: 'signincomponent'
    }
  },
  created () {
    console.log(this.username)
  },
  methods: {
    signout () {
      localStorage.clear()
      location.reload()
    }
  }
}
</script>

<style scoped>
.signin-btn-grp {
  float: right;
}

</style>
