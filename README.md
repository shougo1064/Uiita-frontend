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

# 採用する gem 一覧

- active_model_serializers
- devise_token_auth
- rubocop-rails, rubocop-rspec
- annotate
- pry-byebug, pry-rails, pry-doc
- pg(postgres)
- rspec-rails
- faker
- factory_bot_rails
- rails-erd

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

# validation の実装

- user model

  - validation

    - ```validates :name, presence: true, uniqueness: { case_sensitive: false }, length: { maximum: 30 }

      ```

    ```
    > email と password に関するバリデーションは devise_token_auth のデフォルトを使用

    ```

  - FactoryBot

    - ```
      FactoryBot.define do
        factory :user do
          name { Faker::Name.name }
          sequence(:email) {|n| "#{n}_#{Faker::Internet.email}" }
          password { Faker::Internet.password }
        end
      end
      ```

  - test

    - ```
      require "rails_helper"

      RSpec.describe User, type: :model do
        context "name, email, password が指定されているとき" do
          let(:user) { build(:user) }
          it "ユーザーが作られる" do
            expect(user).to be_valid
          end
        end

        context "name が指定されていないとき" do
          let(:user) { build(:user, name: nil) }
          it "ユーザー作成に失敗する" do
            expect(user).to be_invalid
            expect(user.errors.messages[:name]).to eq ["can't be blank"]
          end
        end

        context "email が指定されていないとき" do
          let(:user) { build(:user, email: nil) }
          it "ユーザー作成に失敗する" do
            expect(user).to be_invalid
            expect(user.errors.messages[:email]).to eq ["can't be blank"]
          end
        end

        context "password が指定されていないとき" do
          let(:user) { build(:user, password: nil) }
          it "ユーザー作成に失敗する" do
            expect(user).to be_invalid
            expect(user.errors.messages[:password]).to eq ["can't be blank"]
          end
        end

        context "すでに同じ名前の name が存在しているとき" do
          let(:user) { build(:user, name: "foo") }
          it "ユーザーの作成に失敗する" do
            create(:user, name: "foo")
            expect(user).to be_invalid
            expect(user.errors.details[:name][0][:error]).to eq :taken
            expect(user.errors.details[:name][0][:value]).to eq "foo"
          end
        end

        context "ユーザーネームの最大文字数が31文字以上のとき" do
          let(:user) { build(:user, name: "a" * 31) }
          it "ユーザーの作成に失敗する" do
            expect(user).to be_invalid
            expect(user.errors.messages[:name]).to eq ["is too long (maximum is 30 characters)"]
          end
        end
      end
      ```

# 実装で頑張った所

- 記事の CRUD 機能と記事一覧のテスト

  - ```
    module Api::V1
      class ArticlesController < BaseApiController
        before_action :authenticate_user!, only: [:create, :update, :destroy]
        def index
          articles = Article.published.order(updated_at: :desc)
          render json: articles, each_serializer: Api::V1::ArticlePreviewSerializer
        end

        def show
          article = Article.published.find(params[:id])
          render json: article, serializer: Api::V1::ArticleSerializer
        end

        def create
          article = current_user.articles.create!(article_params)
          render json: article, serializer: Api::V1::ArticleSerializer
        end

        def update
          article = current_user.articles.find(params[:id])
          article.update!(article_params)
          render json: article, serializer: Api::V1::ArticleSerializer
        end

        def destroy
          article = current_user.articles.find(params[:id])
          article.destroy!
        end

        def search
          # フォームで入力された、キーワードをパラメータで取得
          keyword = params[:keyword]

          # || は、左辺を評価して false だから、右辺を評価した。つまり、渡ってきた sort のパラメータの値が nil の場合、created_at desc をデフォとする。
          sort = params[:sort] || "created_at DESC"

          # 入力された値をLIKE 句により各カラムと一致したものを抽出する。
          articles = Article.published.where("title LIKE(?) or body LIKE(?)", "%#{keyword}%", "%#{keyword}%").order(sort)
          render json: articles, each_serializer: Api::V1::ArticleSerializer
        end

        private

          def article_params
            params.require(:article).permit(:title, :body, :status)
          end
      end
    end
    ```

    ```
    require "rails_helper"

    RSpec.describe "Api::V1::Articles", type: :request do
      describe "GET /api/v1/articles" do
        subject { get(api_v1_articles_path) }

        let!(:article1) { create(:article, :published, updated_at: 2.days.ago) }
        let!(:article2) { create(:article, :published, updated_at: 1.days.ago) }
        let!(:article3) { create(:article, :published) }
        let!(:article) { create(:article) }
        it "公開状態の記事のみ一覧で取得できる" do
          subject
          res = JSON.parse(response.body)
          expect(res.length).to eq 3
          expect(res.map {|article| article["id"] }).to eq [article3.id, article2.id, article1.id]
          expect(res[0]["user"].keys).to eq ["id", "name", "email"]
          expect(res[0]["status"]).to eq "published"
          expect(response).to have_http_status(:ok)
        end
      end

      describe "GET /api/v1/articles/:id" do
        subject { get(api_v1_article_path(article_id)) }

        let(:article_id) { article.id }
        context "公開状態の記事の id を指定したとき" do
          let(:article) { create(:article, :published) }
          it "指定した id の公開記事の詳細が取得できる" do
            subject
            res = JSON.parse(response.body)
            expect(response).to have_http_status(:ok)
            expect(res["id"]).to eq article.id
            expect(res["title"]).to eq article.title
            expect(res["body"]).to eq article.body
            expect(res["updated_at"]).to be_present
            expect(res["user"].keys).to eq ["id", "name", "email"]
            expect(res["status"]).to eq "published"
          end
        end

        context "下書き状態の記事の id を指定したとき" do
          let(:article) { create(:article, :draft) }
          it "記事の詳細が取得できない" do
            expect { subject }.to raise_error(ActiveRecord::RecordNotFound)
          end
        end

        context "存在しない記事の id を指定したとき" do
          let(:article_id) { 100000 }
          it "指定した id の記事が見つからない" do
            expect { subject }.to raise_error(ActiveRecord::RecordNotFound)
          end
        end
      end

      describe "POST /api/v1/articles" do
        subject { post(api_v1_articles_path, params: params, headers: headers) }

        context "下書き状態を指定したとき" do
          let(:params) { { article: attributes_for(:article, :draft) } }
          let(:current_user) { create(:user) }
          let(:headers) { current_user.create_new_auth_token }
          it "下書き記事が作成できる" do
            expect { subject }.to change { Article.count }.by(1)
            res = JSON.parse(response.body)
            expect(res["title"]).to eq params[:article][:title]
            expect(res["body"]).to eq params[:article][:body]
            expect(res["status"]).to eq "draft"
            expect(res["user"]["id"]).to eq current_user.id
            expect(response).to have_http_status(:ok)
          end
        end

        context "公開状態を指定したとき" do
          let(:params) { { article: attributes_for(:article, :published) } }
          let(:current_user) { create(:user) }
          let(:headers) { current_user.create_new_auth_token }
          it "下書き記事が作成できる" do
            expect { subject }.to change { Article.count }.by(1)
            res = JSON.parse(response.body)
            expect(res["title"]).to eq params[:article][:title]
            expect(res["body"]).to eq params[:article][:body]
            expect(res["status"]).to eq "published"
            expect(res["user"]["id"]).to eq current_user.id
            expect(response).to have_http_status(:ok)
          end
        end

        context "不適切なパラメータを送信したとき" do
          let(:params) { attributes_for(:article) }
          let(:current_user) { create(:user) }
          let(:headers) { current_user.create_new_auth_token }
          it "記事の作成に失敗する" do
            expect { subject }.to raise_error(ActionController::ParameterMissing)
          end
        end
      end

      describe "PUT /api/v1/articles/:id" do
        subject { put(api_v1_article_path(article.id), params: params, headers: headers) }

        let(:params) { { article: { title: "foo", created_at: 1.days.ago, status: "published" } } }
        let(:current_user) { create(:user) }
        let(:headers) { current_user.create_new_auth_token }
        context "記事を更新するとき" do
          let!(:article) { create(:article, :draft, user: current_user) }
          it "適切な値のみ更新されている" do
            expect { subject }.to change { article.reload.title }.from(article.title).to(params[:article][:title]) &
                                  not_change { article.reload.body } &
                                  not_change { article.reload.created_at } &
                                  change { article.reload.status }.from(article.status).to(params[:article][:status])
          end
        end
      end

      describe "DELETE /api/v1/articles/:id" do
        subject { delete(api_v1_article_path(article.id), headers: headers) }

        let!(:article) { create(:article, user: current_user) }
        let(:current_user) { create(:user) }
        let(:headers) { current_user.create_new_auth_token }

        it "記事が削除できる" do
          expect { subject }.to change { Article.count }.by(-1)
          expect(response).to have_http_status(:no_content)
        end
      end

      describe "GET /api/v1/articles/search" do
        subject { get(search_api_v1_articles_path, params: params) }

        let!(:article1) { create(:article, :published, title: "TT", created_at: 2.days.ago) }
        let!(:article2) { create(:article, :published, body: "TTTT", created_at: 1.days.ago) }
        let!(:article3) { create(:article, :published, title: "xxx", body: "xxx", created_at: 3.days.ago) }
        context "キーワードを指定したとき" do
          let(:params) { { "keyword": "TT", "sort": "created_at DESC" } }
          it "公開状態でタイトルまたは本文にキーワードを含まれている記事が作成順に一覧で取得できる" do
            subject
            res = JSON.parse(response.body)
            expect(response).to have_http_status(:ok)
            expect(res.length).to eq 2
            expect(res[0]["status"]).to eq "published"
            expect(res.map {|article| article["id"] }).to eq [article2.id, article1.id]
          end
        end

        context "キーワードが指定されていないとき" do
          let(:params) { { "keyword": nil, "sort": "created_at DESC" } }
          it "全ての公開状態の記事の一覧が作成順で取得できる" do
            subject
            res = JSON.parse(response.body)
            expect(response).to have_http_status(:ok)
            expect(res.length).to eq 3
            expect(res.map {|article| article["id"] }).to eq [article2.id, article1.id, article3.id]
            expect(res[0]["status"]).to eq "published"
          end
        end
      end
    end
    ```

- ダミーの current_user メソッドを実装

  - devise_token_auth の実装が終わってない状態で、current_user を使えないので、テストの為に仮の current_user を用意します。（単にテストを通す為の仮のモノのイメージです）

  - ```
    class Api::V1::BaseApiController < ApplicationController
      # current_user のダミーコード
      def current_user
        @current_user ||= User.first
      end
    end
    ```

  - 'current_user'はインスタンスメソッドなので、 'allow_any_instance_of' で mock する。
    ```
    before { allow_any_instance_of(Api::V1::BaseApiController).to receive(:current_user).and_return(current_user) }
    ```
