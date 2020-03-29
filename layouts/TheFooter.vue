<template>
  <footer class="text-center main-footer card-footer box-shadow-none">
    <!-- <ul class="footer-social-list mb-2">
      <li>
        <a href="javascript:;"><i class="fa fa-facebook"></i></a>
      </li>
      <li>
        <a href="javascript:;"><i class="fa fa-google"></i></a>
      </li>
      <li>
        <a href="javascript:;"><i class="fa fa-twitter"></i></a>
      </li>
      <li>
        <a href="javascript:;"><i class="fa fa-linkedin"></i></a>
      </li>
    </ul> -->
    <div class="text-center">
      Copyright &copy; {{ copyright.date }} COVID-19 DRC DATA PROGRESS By
      <a target="_blank" :href="copyright.url"> Uptodate Developers</a>
    </div>
  </footer>
</template>
<script>
export default {
  computed: {
    copyright() {
      const dt = new Date()
      return {
        date: dt.getFullYear(),
        url: 'http://uptodatedevelopers.com'
      }
    }
  }
}
</script>
<style scoped>
.main-footer {
  padding: 20px 30px 20px 30px;
}
</style>
