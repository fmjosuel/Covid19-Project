<template>
  <div class="top-header">
    <!--nav open-->
    <nav class="navbar navbar-expand-lg main-navbar">
      <div class="container">
        <a class="header-brand" href="">
          <img
            src="/img/COVIDLOGO.png"
            class="header-brand-img main-logo"
            alt="Treal-Admin  logo"
          />
          <img
            src="/img/COVIDLOGO.png"
            class="header-brand-img mobile-logo"
            alt="Treal-Admin  logo"
          />
        </a>

        <ul class="navbar-nav navbar-right">
          <li class="dropdown dropdown-list-toggle header-fullscreen">
            <a
              id="fullscreen-button"
              href="#"
              class="nav-link nav-link-lg full-screen-link"
            >
              <h5>DRC STATISTICS</h5>
            </a>
          </li>
          <li class="dropdown header-sidebar">
            <a
              href="#"
              class="nav-link nav-link-lg "
              data-toggle="sidebar-right"
              data-target=".sidebar-right"
            >
              <i class="fe fe-align-right"></i>
            </a>
          </li>
        </ul>
      </div>
    </nav>
    <!--nav closed-->
  </div>
</template>
<style scoped>
.header-brand-img {
  top: 0px;
  min-height: 70px;
}
.nav-link.nav-link-lg.full-screen-link {
  margin-top: 0.4rem !important;
}
</style>
