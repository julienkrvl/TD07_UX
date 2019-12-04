import DashboardLayout from '../components/Dashboard/Layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../components/GeneralViews/NotFoundPage.vue'

// user pages
import Overview from 'src/components/Dashboard/Views/Overview.vue'
import Notifications from 'src/components/Dashboard/Views/Notifications.vue'
import Hello from '@/components/Dashboard/Views/HelloWorld'
import Register from '@/components/Dashboard/Views/Register'
import Login from '@/components/Dashboard/Views/Login'
import StoreProduct from '@/components/Dashboard/Views/seller/StoreProduct'
import Products from '@/components/Dashboard/Views/tester/Products'
import TableProduct from '@/components/Dashboard/Views/seller/TableProduct'
import Categories from '@/components/Dashboard/Views/tester/Categories'
import UserProfile from '@/components/Dashboard/Views/UserProfile'
import TableTestingProducts from '@/components/Dashboard/Views/tester/TableTestingProducts'

const routes = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/user/overview'
  },
  {
    path: '/user',
    component: DashboardLayout,
    redirect: '/user/overview',
    children: [
      {
        path: 'overview',
        name: 'Overview',
        component: Overview
      },
      {
        path: 'hello-world',
        name: 'Hello',
        component: Hello
      },
      {
        path: 'register',
        name: 'Register',
        component: Register
      },
      {
        path: 'login',
        name: 'Login',
        component: Login
      },
      {
        path: 'profile',
        name: 'Profile',
        component: UserProfile
      },
      {
        path: 'store-product',
        name: 'StoreProduct',
        component: StoreProduct
      },
      {
        path: 'categories',
        name: 'Categories',
        component: Categories
      },
      {
        path: 'products',
        name: 'Products',
        component: Products
      },
      {
        path: 'seller/table',
        name: 'TableProduct',
        component: TableProduct
      },
      {
        path: 'tester/table',
        name: 'TableTestingProducts',
        component: TableTestingProducts
      },
      {
        path: 'notifications',
        name: 'Notifications',
        component: Notifications
      }
    ]
  },
  { path: '*', component: NotFound }
]

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes
