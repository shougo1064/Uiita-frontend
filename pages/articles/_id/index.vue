<template>
  <v-container class="elevation-3" :class="$style.article_container">
    <template v-if="isInitialized">
      <div :class="$style.article_layout">
        <v-layout :class="$style.name_area">
          <span :class="$style.user_name">@{{ article.user.name }}</span>
          <timeago
            :class="$style.time_ago"
            :datetime="article.updated_at"
            :auto-update="60"
          />
          <v-spacer></v-spacer>
          <v-btn text fab small>
            <v-icon color="#3085DE">fas fa-trash-alt</v-icon>
          </v-btn>
        </v-layout>
        <h1 :class="$style.article_title">{{ article.title }}</h1>
        <div :class="$style.article_body_container">
          <div :class="$style.article_body">
            <p>{{ article.body }}</p>
          </div>
        </div>
      </div>
    </template>
  </v-container>
</template>

<script>
export default {
  middleware: ['authed'],

  data() {
    return {
      isInitialized: false,
    }
  },

  computed: {
    article() {
      return this.$store.getters['article/article']
    },
  },

  async created() {
    const articleId = this.$route.params.id
    await this.$store.dispatch('article/fetchArticle', articleId).then(() => {
      this.isInitialized = true
    })
  },
}
</script>

<style lang="scss" module>
.article_container {
  margin-top: 30px;
  background: #fff;
  margin-bottom: 20px;
  width: 60%;
}
.article_layout {
  margin: 0 20px;
}
.name_area {
  margin: 16px 0;
}
.user_name {
  margin-right: 16px;
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
  white-space: pre-wrap;
}
</style>
