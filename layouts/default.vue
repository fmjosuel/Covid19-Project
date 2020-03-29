<template>
  <div>
    <!--loader -->
    <div id="spinner">
      <img src="/loader.svg" alt="loader" />
    </div>
    <!--app open-->
    <div id="app" class="page">
      <div class="main-wrapper">
        <TopHeader />
        <TheNavbar />
        <nuxt />
        <TheSidebar />
        <TheFooter />
      </div>
    </div>
  </div>
</template>
<script>
import TopHeader from './TopHeader'
import TheNavbar from './TheNavbar'
import TheSidebar from './TheSidebar'
import TheFooter from './TheFooter'
export default {
  components: { TheSidebar, TopHeader, TheFooter, TheNavbar },
  head() {
    return {
      titleTemplate: 'COVID-19 DRC - %s',
      // meta: [
      //   {
      //     hid: 'description',
      //     name: 'description',
      //     content: 'description'
      //   }
      // ],
      script: [{ src: 'js/build.js', body: true }]
    }
  }
}
</script>
