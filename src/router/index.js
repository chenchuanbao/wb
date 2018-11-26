import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Aside from '@/components/Aside'
import Header from '@/components/Header'
import Main from '@/components/Main'
import MediaRouter from '@/components/MediaRouter'
import MediaPay from '@/components/MediaPay'
import Chart1 from '@/components/Chart1'
import Chartline from '@/components/Chartline'
import Mychart from '@/components/Mychart'
import Manage from '@/components/Manage'

Vue.use(Router)

const routes = [
   {
      path: '/csxhlogin',
      component: Login
    },
    {
      path: '/manage',
      component: Manage
    },
    {
      path: '/csxhadministator',  
      component: HelloWorld
      //redirect: '/HelloWorld',
    },
    {
      path: '/csxhmain',  
      component: Main
      //redirect: '/HelloWorld',
    },
    {
      path: '/',
      component: Login
    },
    {
      path:'/MediaRouter',
      component:MediaRouter
    },
    {
      path:'/MediaPay',
      component:MediaPay
    },
    {
      path:'/chart',
      component:Chart1
    },{
      path:'/mychart',
      component:Mychart
    }
    
]

var router =  new Router({
    routes
})
export default router;
