/*
  ------------------------------------------
  Auth
  ------------------------------------------
  400 Bad Request
  ------------------------------------------
  401 Unauthorized Error
  ------------------------------------------
*/
export function getAuthForm() {
  return `
    <!-- form -->
    <form class="mui-form" id="auth-form">
      <!-- Login -->
      <div class="mui-textfield mui-textfield--float-label">
        <input id="email" type="email" required>
        <label for="email">Email</label>
      </div>
      <!-- Password -->
      <div class="mui-textfield mui-textfield--float-label">
        <input id="password" type="password" required>
        <label for="email">Password</label>
      </div>
      <!-- btn -->
      <button class="mui-btn mui-btn--raised mui-btn--primary"
        type="submit">Enter</button>
    </form>
  `
}

export function authWithEmailAndPassword(email, password) {
  const apiKey = 'AIzaSyA-iqnKl_cDfd7siP8GHYMOAh4hnDamrKs'
  return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
      returnSecureToken: true
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => data.idToken)
}