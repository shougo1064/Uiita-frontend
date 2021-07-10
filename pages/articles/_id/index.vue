<template>
  <div>
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
              <v-btn
                :class="$style.editBtn"
                text
                fab
                small
                @click="moveToEditArticlePage(article.id)"
              >
                <v-icon color="#3085DE">fas fa-pencil-alt</v-icon>
              </v-btn>
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
    <v-container class="elevation-3" :class="$style.comment_container">
      <div :class="$style.comment_layout">
        <div :class="$style.comment_header">
          <h2>コメント</h2>
          <v-divider insert />
        </div>
        <div :class="$style.comment_content">
          <v-list-item-avatar size="50px" color="#3085DE">
            <v-icon large color="#fff">fas fa-user</v-icon>
          </v-list-item-avatar>
        </div>
        <form id="writing-article" :class="$style.comment_form">
          <div :class="$style.comment_area">
            <v-textarea
              v-model="body"
              outlined
              no-resize
              hide-details
              height="100%"
              name="body"
              placeholder="コメントを入力する"
              class="body-form"
            ></v-textarea>
          </div>
          <div :class="$style.create_btn_area">
            <v-btn color="#3085DE" class="font-weight-bold white--text"
              >投稿
            </v-btn>
          </div>
        </form>
      </div>
    </v-container>
  </div>
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
    // 暫定でログインユーザーと記事を書いたユーザーが比較できる要素として設定
    // 本来は user の id などをエンコードしておいて比較する方が良さそう
    isShowBtn() {
      const currentUserEmail = this.$store.getters['user/headers'].uid
      const result = currentUserEmail === this.article?.user?.email
      return result
    },
  },

  async created() {
    const articleId = this.$route.params.id
    try {
      await this.$store.dispatch('article/fetchArticle', articleId)
      this.isInitialized = true
    } catch (err) {
      // 暫定的な Error 表示
      alert(err.response.statusText)
    }
  },

  methods: {
    moveToEditArticlePage(id) {
      this.$router.push(`/articles/${id}/edit`)
    },

    async deleteArticle() {
      const result = confirm('この記事を削除してもよろしいですか？')

      if (result) {
        try {
          await this.$store.dispatch('article/deleteArticle', this.article.id)
          this.$router.push('/')
        } catch (err) {
          // 暫定的な Error 表示
          alert(err.response.statusText)
        }
      }
    },
  },
}
</script>

<style lang="scss" module>
.comment_form {
  margin: 5px;
  height: calc(100% - 64px - 10px);
  display: flex;
  flex-flow: column;
  width: 100%;
}
.comment_area {
  height: 100%;
  display: flex;
  overflow: hidden;
  background: #fff;
  margin-bottom: 10px;
}
.create_btn_area {
  text-align: right;
}

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

.editBtn {
  margin-right: 12px;
}

.comment_container {
  margin-top: 20px;
  background-color: #fff;
  margin-bottom: 20px;
  width: 60%;
}
.comment_header {
  width: 100;
  margin: 16px 0;
  flex-direction: column;
}
.comment_content {
  flex-direction: column;
}
</style>
