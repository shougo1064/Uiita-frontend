<template>
  <form id="edit-article" :class="$style.article_form">
    <v-text-field
      v-model="article.title"
      outlined
      single-line
      name="title"
      placeholder="タイトル"
      :class="$style.title_form"
    ></v-text-field>
    <div :class="$style.edit_area">
      <v-textarea
        v-model="article.body"
        outlined
        no-resize
        hide-details
        height="100%"
        name="body"
        placeholder="記事の内容を入力してください"
        class="body-form"
      ></v-textarea>
    </div>
    <div :class="$style.create_btn_area">
      <v-btn
        color="#3085DE"
        class="font-weight-bold white--text"
        @click="updateArticle(article.id)"
        >記事を更新
      </v-btn>
    </div>
  </form>
</template>

<script>
export default {
  middleware: ['authed'],

  data() {
    return {
      article: {
        id: '',
        title: '',
        body: '',
      },

      loading: false,
    }
  },

  async created() {
    await this.fetchArticle()
  },

  methods: {
    async fetchArticle() {
      const articleId = this.$route.params.id
      try {
        await this.$store.dispatch('article/fetchArticle', articleId)

        const article = this.$store.getters['article/article']
        this.article.id = article.id
        this.article.title = article.title
        this.article.body = article.body
      } catch (err) {
        // 暫定的な Error 表示
        alert(err.response.data.errors.full_messages)
      }
    },

    async updateArticle(id) {
      this.loading = true

      const params = {
        title: this.article.title,
        body: this.article.body,
      }

      try {
        await this.$store.dispatch('article/updateArticle', { id, params })
        this.$router.push(`/articles/${id}`)
      } catch (err) {
        // 暫定的な Error 表示
        alert(err.response.statusText)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style lang="scss" module>
.article_form {
  margin: 5px;
  height: calc(100% - 64px - 10px);
  display: flex;
  flex-flow: column;
  width: 100%;
}

.title_form {
  flex: none;
  background: #fff;
}

.edit_area {
  height: 100%;
  display: flex;
  overflow: hidden;
  background: #fff;
  margin-bottom: 10px;
}

.create_btn_area {
  text-align: right;
}
</style>

<style lang="scss">
#edit-article {
  body-form > .v-text-field fieldset,
  .v-text-field .v-input__control {
    height: 100%;
  }
}
</style>
