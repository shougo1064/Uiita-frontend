export default function ({ store, redirect }) {
  const isSingedIn = store.state.user.isSignedIn
  if (isSingedIn) {
    return redirect('/')
  }
}
