# Introduction

Uiita は、「Qiita」風の記事作成アプリです。

# ER 図

<img width="694" alt="スクリーンショット 2021-07-10 17 32 27" src="https://user-images.githubusercontent.com/76199103/125157321-582b0580-e1a5-11eb-83a1-67b86b62cd73.png">

# Environment

- 言語: ruby:2.7.2
- フレームワーク: Rails:6.0.3.7
- DB: PostgreSQL
- Nuxt.js:v2.14.11
- Node:v15.5.0-

# function

ここでは Uiita の機能紹介をしています。

- 記事一覧の表示
  - 記事投稿
    - 新規作成
    - 編集
    - 削除
  - User 認証
    - 新規登録
    - ログイン
    - ログアウト

I will introduce the feature of Uiita here.

- list of articles
  - Article Submission
    - Create New
    - Edit
    - Delete
  - User auth

# 記事一覧の表示 (list of articles)

![Animated GIF-downsized_large-2](https://user-images.githubusercontent.com/76199103/125560917-d0f77d95-d192-44d1-a624-4287f42a483e.gif)

記事の一覧は全ての記事が更新順に取得され、未ログインユーザーでも見られるようになっており、１つ１つの記事にはタイトルと記事を書いたユーザーの名前、記事の更新日を表示しております。

# 記事の新規作成　(Create New)

![Animated GIF-downsized](https://user-images.githubusercontent.com/76199103/125160676-2a4fbc00-e1b9-11eb-9130-868620cc1728.gif)

header にある「投稿する」ボタンをクリックすると、記事の作成画面に移行する。
記事の作成はログインユーザーだけができる操作であり、画面には記事のタイトルと本部っ b を入力できるフォームと送信ボタンを設置しております。そして、header の「投稿する」をクリックしたら記事作成ページに遷移します。

# 記事の編集

![Animated GIF-downsized (1)](https://user-images.githubusercontent.com/76199103/125160830-1eb0c500-e1ba-11eb-9b44-8b31bf191efb.gif)

記事詳細ページに編集ボタンを設置しており、そのボタンをクリックしたら編集ページに飛べるようになっております。編集ページにおいて、更新したいタイトルと本文を入力し、記事更新ボタンをクリックすると編集した内容通りに記事が更新されます。

# 記事削除

![Animated GIF-downsized (3)](https://user-images.githubusercontent.com/76199103/125160987-ba423580-e1ba-11eb-8c00-6cebada8cba9.gif)

削除ボタンに関しても記事詳細ページに設置してあり、そのボタンをクリックすると記事が削除されます。

# 新規登録

![Animated GIF-downsized (4)](https://user-images.githubusercontent.com/76199103/125161427-51a88800-e1bd-11eb-9230-016c8b301c64.gif)

新規登録するための入力フォームのみを実装しております。アカウント名、メールアドレス、パスワードを入力し、登録ボタンをクリックするとユーザーの登録が完了します。

# ログイン・ログアウト

![Animated GIF-downsized (5)](https://user-images.githubusercontent.com/76199103/125161548-e8754480-e1bd-11eb-97fb-fd2b4a848ded.gif)

ログインページに関しても入力フォームのみ実装しております。メールアドレス、パスワードを入力し、ログインボタンを押すとユーザー情報の認証が行われ、通ればログインされて記事一覧ページに遷移する。
header のログアウトボタンをクリックするとログアウトが完了する。
