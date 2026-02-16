export function LoginScreen() {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 24 }}>
      <header>
        <h2>Login to your account</h2>
        <p>Enter your email below to login to your account</p>
      </header>
      <main>
        <form>
          <div style={{ display: "grid", gap: 12 }}>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" placeholder="m@example.com" />

            <label htmlFor="password">Password</label>
            <input id="password" type="password" />
          </div>
        </form>
      </main>
      <footer style={{ marginTop: 16, display: "flex", gap: 8 }}>
        <button type="button">Login</button>
        <button type="button">Signup</button>
      </footer>
    </div>
  );
}
