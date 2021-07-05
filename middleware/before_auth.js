export default function ({ store, redirect }) {
  const isSingedIn = store.state.user.isSignedIn
  // 既にログインしていたらトップページへ
  if (isSingedIn) {
    return redirect('/')
  }
}
