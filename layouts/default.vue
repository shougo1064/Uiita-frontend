<template>
  <v-app>
    <v-app-bar app dark color="#3085DE">
      <nuxt-link to="/" :class="$style.header_link">
        <v-toolbar-title :class="$style.app_title">Uiita </v-toolbar-title>
      </nuxt-link>
      <v-spacer></v-spacer>
      <v-btn text :class="$style.register">ユーザー登録</v-btn>
      <v-btn text :class="$style.login">ログイン</v-btn>
    </v-app-bar>
    <v-main>
      <v-container fluid :class="$style.container">
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<style lang="scss" module>
.header_link {
  text-decoration: none;
}
.app_title {
  color: #fff;
  font-weight: bold;
  font-size: 24px;
}
.register {
  border: 2px solid #fff;
  border-radius: 5px;
  font-weight: bold;
}
.login {
  font-weight: bold;
}
.container {
  background: #ecf6fe;
  height: 100%;
}
</style>
