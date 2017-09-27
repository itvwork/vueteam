export default [
    {
        name: 'home',       //路由的名称，这个值是唯一 ，起名的好处就是在跳转的时候放便
        meta: {  //给路传递一些参数
            title: '模型列表'
        },
        path: '', //路径这里填写路由的路径，即域名后面的url  不能带？号的那一部份
        component: function (resolve) {  //按需加载，这样写的好处就是需要的时候才会加载这个页面的代码，至于其它写法请上官网查看，webpack会分包编译从（dist/js的0.js,1.js……）看出来
            require(['./view/home/index.vue'], resolve)
        }

    },
    {
        name: 'login',    
        meta: {
            title: '登录'
        },
        path: '/login',
        component: function (resolve) {
            require(['./view/login/index.vue'], resolve)
        }

    },
    {
        name: 'case',
        path: '/case',

        component: function (resolve) {
            require(['./view/case/index.vue'], resolve)
        }
    },
    {
        name: 'news',
        path: '/news',
        component: function (resolve) {
            require(['./view/news/index.vue'], resolve)
        }
    },
    {
        name: 'newdetail',
        path: '/news/:id',// 带参数路由的写法  加: 后面是参数名, 可带多个
        component: function(resolve) {
            require(['./view/news/index.vue'], resolve)
        }
    }

];
