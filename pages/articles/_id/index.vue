<template>
  <v-container class="elevation-3" :class="$style.article_container">
    <div :class="$style.article_layout">
      <div :class="$style.name_area">
        <span>@{{ article.user.name }}</span>
      </div>
      <h1 :class="$style.article_title">{{ article.title }}</h1>
      <div :class="$style.article_body_container">
        <div :class="$style.article_body">
          <p>{{ article.body }}</p>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  middleware: ['authed'],

  data() {
    return {
      article: {
        title: 'title',
        body: '本文です',
        user: { name: 'test' },
      },
    }
  },
}
</script>

<style lang="scss" module>
.article_container {
  margin-top: 30px;
  background: #fff;
  margin-bottom: 20px;
}
.article_layout {
  margin: 0 20px;
}
.name_area {
  margin-bottom: 16px;
}
.article_title {
  font-size: 40px;
  line-height: 1.5;
}
.article_body_container {
  margin: 36px 0;
  font-size: 16px;
}
.article_body {
  width: 100%;
}
</style>
