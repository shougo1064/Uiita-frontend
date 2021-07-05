<template>
  <form id="writing-article" :class="$style.article_form">
    <v-text-field
      v-model="title"
      outlined
      single-line
      name="title"
      placeholder="タイトル"
      :class="$style.title_form"
    ></v-text-field>
    <div :class="$style.edit_area">
      <v-textarea
        v-model="body"
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
      <v-btn color="#3085DE" class="font-weight-bold white--text"
        >記事を投稿
      </v-btn>
    </div>
  </form>
</template>

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
#writing-article {
  body-form > .v-text-field fieldset,
  .v-text-field .v-input__control {
    height: 100%;
  }
}
</style>
