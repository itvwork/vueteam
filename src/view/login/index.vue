
<template>
<section class="login-bg">
    <div class="login-box">
        <div class="login-logo">管理系统
        </div>
        <div class="ul-login">
            <div class="item-login"><input v-model="sub.admin_name"  class="input-login" type="text" placeholder="请输入登录帐号" />

            </div>
            <div class="item-login"><input v-model="sub.admin_password"  class="input-login" type="password" placeholder="请输入登录密码" /></div>
            <div class="item-login"><input type="file" @change="file($event.target.files)" /> </div>
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
                name:'useadmin',
                pwd:'123456',
                contents:[1,2,3,4],
                id:{
                    id:10,
                    user:name
                }
            }
            ,
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
             await this.$ajax.post('http://192.168.26.86/3dplay/public/admin/login',{
                 data:this.sub
             });
        },
        file(e){
            this.sub.img=e[0];

            console.log(e[0]);

        }

    }
}
    
</script>