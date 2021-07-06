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
          <template v-if="isShowBtn">
            <v-btn text fab small @click="deleteArticle">
              <v-icon color="#3085DE">fas fa-trash-alt</v-icon>
            </v-btn>
          </template>
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

  // 暫定でログインユーザーと記事を書いたユーザーが比較できる要素として設定
  // 本来は user の id などをエンコードしておいて比較する方が良さそう
  isShowBtn() {
    const currentUserEmail = this.$store.getters['user/headers'].uid
    const result = currentUserEmail === this.article?.user?.email

    return result
  },
  async created() {
    const articleId = this.$route.params.id
    await this.$store.dispatch('article/fetchArticle', articleId).then(() => {
      this.isInitialized = true
    })
  },

  methods: {
    async deleteArticle() {
      const result = confirm('この記事を削除してもよろしいですか？')
      if (result) {
        await this.$store
          .dispatch('article/deleteArticle', this.article.id)
          .then(() => {
            this.$router.push('/')
          })
          .catch((e) => {
            // 暫定的な Error 表示
            alert(e.response.statusText)
          })
      }
    },
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
