<template>
  <div class="wrapper">
    <side-bar>
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/user/overview">
        <i class="nc-icon nc-chart-pie-35"></i>
        <p>Dashboard</p>
      </sidebar-link>
      <sidebar-link to="/user/profile">
        <i class="nc-icon nc-circle-09"></i>
        <p>User Profile</p>
      </sidebar-link>
      <sidebar-link to="/user/hello-world">
        <i class="nc-icon nc-notes"></i>
        <p>Table list</p>
      </sidebar-link>
      <sidebar-link to="/user/register">
        <i class="nc-icon nc-paper-2"></i>
        <p>Typography</p>
      </sidebar-link>
      <sidebar-link to="/user/login">
        <i class="nc-icon nc-atom"></i>
        <p>Icons</p>
      </sidebar-link>
      <sidebar-link to="/user/store-product">
        <i class="nc-icon nc-pin-3"></i>
        <p>Maps</p>
      </sidebar-link>
      <sidebar-link to="/user/store-product">
        <i class="nc-icon nc-pin-3"></i>
        <p>Maps</p>
      </sidebar-link>
      <sidebar-link to="/user/categories">
        <i class="nc-icon nc-bell-55"></i>
        <p>Notifications</p>
      </sidebar-link>
      <sidebar-link to="/user/seller/table">
        <i class="nc-icon nc-bell-55"></i>
        <p>Notifications</p>
      </sidebar-link>
      <sidebar-link to="/user/tester/table">
        <i class="nc-icon nc-bell-55"></i>
        <p>Notifications</p>
      </sidebar-link>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click="toggleSidebar">

      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">

</style>
<script>
  import TopNavbar from './TopNavbar.vue'
  import ContentFooter from './ContentFooter.vue'
  import DashboardContent from './Content.vue'
  import MobileMenu from './MobileMenu.vue'
  export default {
    components: {
      TopNavbar,
      ContentFooter,
      DashboardContent,
      MobileMenu
    },
    methods: {
      toggleSidebar () {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false)
        }
      }
    }
  }

</script>
