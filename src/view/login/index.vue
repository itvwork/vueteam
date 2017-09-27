
<template>
<section class="login-bg">
    <div class="login-box">
        <div class="login-logo">管理系统
        </div>
        <div class="ul-login">
            <div class="item-login"><input v-model="sub.admin"  class="input-login" type="text" placeholder="请输入登录帐号" />

            </div>
            <div class="item-login"><input v-model="sub.pwd"  class="input-login" type="password" placeholder="请输入登录密码" /></div>
        </div>
        <div class="btn-box">
            <button class="btn btn-login" @click="submit()">{{stateWord}}</button>
        </div>
    </div>
</section>
</template>


<script>
export default {
 
    data(){
        return {
            sub:{
              admin: 'admin',
              pwd: 'admin'
            },
            stateWord:'登录',
            err_msg:'登录失败',
            state:0

        }
    },
    ready() {

    },
    components: {

    },
    watch: {



    },
    methods: {
        async submit() {

        }

    }
}
    
</script>