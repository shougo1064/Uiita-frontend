<template>
  <v-container :class="$style.container">
    <v-card tile flat :class="$style.card">
      <div v-for="article in articles" :key="article.id">
        <v-list-item two-line>
          <v-list-item-avatar size="50px" color="#3085DE">
            <v-icon large color="#fff">fas fa-user</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title :class="$style.article_title">
              <nuxt-link
                :to="{ name: 'articles-id', params: { id: article.id } }"
                >{{ article.title }}</nuxt-link
              >
            </v-list-item-title>
            <v-list-item-subtitle :class="$style.user_name">
              by {{ article.user.name }}
              <timeago
                :class="$style.time_ago"
                :datetime="article.updated_at"
                :auto-update="60"
              />
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider class="mx-4"></v-divider>
      </div>
    </v-card>
  </v-container>
</template>

<script>
export default {
  computed: {
    articles() {
      return this.$store.getters['article/articles']
    },
  },

  created() {
    this.$store.dispatch('article/fetchArticles')
  },
}
</script>

<style lang="scss" module>
.container {
  margin-top: 20px;
}
.card {
  margin: 0 auto;
  padding: 28px 20px;
  width: 800px;
}
.article_title {
  a {
    color: #000;
    font-weight: bold;
    text-decoration: none;
    font-size: 20px;
  }
  a:hover {
    text-decoration: underline;
  }
  a:visited {
    color: #777;
  }
}
.user_name {
  font-size: 16px;
  display: flex;
}

.time_ago {
  margin-left: 10px;
}
</style>
