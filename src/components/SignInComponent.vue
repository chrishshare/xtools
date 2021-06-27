<template>
  <div>
    <Form ref="formInline" :model="signinForm">
      <FormItem prop="username">
        <Input prefix="ios-person-outline" type="text" v-model="signinForm.username" placeholder="请输入用户名" />
      </FormItem>
      <FormItem prop="password">
        <Input prefix="ios-lock-outline" type="password" v-model="signinForm.password" placeholder="请输入密码" />
      </FormItem>
      <FormItem>
<!--        <Button type="primary" @click="handleSubmit('formInline')">登录</Button>-->
        <Button type="primary" @click="signin()">登录</Button>
      </FormItem>
    </Form>

  </div>
</template>

<script>
export default {
  name: 'SignInComponent',
  data () {
    return {
      signinForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    signin () {
      this.$http.post('v1/users/login/', JSON.stringify(this.signinForm)).then(result => {
        if (result.status === 200) {
          localStorage.setItem('username', result.data.username)
          localStorage.setItem('access', result.data.access)
          location.reload()
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
