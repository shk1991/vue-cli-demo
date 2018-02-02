import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const HelloWorld = resolve => require(['@/components/HelloWorld.vue'],resolve);

const routes = [
    {
        path: '/',
        name: 'HelloWorld',
        component: HelloWorld
    },
    {
        path: '/HelloWorld',
        name: 'HelloWorld',
        component: HelloWorld
    }
]

export default new Router({
    routes
})
