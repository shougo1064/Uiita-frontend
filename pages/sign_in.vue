<template>
  <v-container>
    <v-row :class="$style.layout">
      <v-col cols="8">
        <h2 class="mb-5">ログイン</h2>
        <v-form>
          <v-text-field
            v-model="email"
            dense
            type="email"
            label="メールアドレス"
            outlined
            placeholder="test@example.com"
            class="mb-5"
          />
          <v-text-field
            v-model="password"
            dense
            type="password"
            label="パスワード(半角英数字)"
            outlined
            placeholder="********"
            class="mb-10"
          />
          <v-btn
            color="#f96204"
            block
            rounded
            depressed
            nuxt
            :loading="loading"
            class="white--text font-weight-bold"
            @click="submit"
            >ログイン</v-btn
          >
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      loading: false,
      email: '',
      password: '',
    }
  },

  methods: {
    async submit() {
      this.loading = true
      const params = {
        email: this.email,
        password: this.password,
      }
      await this.$store
        .dispatch(`user/signIn`, params)
        .then(() => {
          this.$router.push('/')
        })
        .catch((e) => {
          // 暫定的な Error 表示
          alert(e.response.data.errors.full_messages)
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>

<style module lang="scss">
.layout {
  background: #fff;
  margin: 20px auto 0;
  width: 500px;
  padding: 20px 0;
  display: flex;
  justify-content: center;
}
</style>
