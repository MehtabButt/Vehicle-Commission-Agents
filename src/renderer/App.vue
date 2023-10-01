<template>
  <div>
    <router-view />
    <notifications class="mt-11" :duration="5000" :pause-on-hover="true" />
  </div>
</template>

<script setup></script>

<style>
.vue-notification {
  background-color: #ffffff !important;
  border-radius: 7px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.08) inset;
  color: black !important;

  .notification-title {
  }

  .notification-content {
    /*...*/
  }

  &.success {
    border-left: 8px solid #47d764;
  }

  &.info {
    border-left: 8px solid #2f86eb;
  }

  &.error {
    border-left: 8px solid #ff355b;
  }
}
.success::before {
  content: '';
  background: url(@/renderer/assets/success.png) no-repeat;
  width: 22px;
  height: 22px;
  float: left;
  background-size: contain;
  margin-top: 8px;
  margin-right: 16px;
}
.info::before {
  content: '';
  background: url(@/renderer/assets/info.png) no-repeat;
  width: 30px;
  height: 30px;
  float: left;
  background-size: contain;
  margin-top: 3px;
  margin-right: 8px;
  margin-left: -3px;
}
.error::before {
  content: '';
  background: url(@/renderer/assets/error.png) no-repeat;
  width: 22px;
  height: 22px;
  float: left;
  background-size: contain;
  margin-top: 8px;
  margin-right: 16px;
}
</style>
