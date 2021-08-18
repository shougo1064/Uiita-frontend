export default function ({ store, redirect, route }) {
  const isSingedIn = store.state.user.isSignedIn
  if (!isSingedIn) {
    return redirect('/sign_in')
  }
}
