import Vue from 'vue';
import home from '../../src/view/home/index.vue';

describe('test index.vue',()=>{

it('组件加载后，title',()=>{

    let vm =new Vue(home).$mount();
    expect(vm.title).toEqual('标题');
})

})
