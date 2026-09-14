import { Eye, EyeOff, LoaderCircle, LockKeyhole, Mail } from "lucide-react";
import { type FormEvent, useState } from "react";
import ApiFetch from "../../hooks/ApiFetch";
import "./Auth.css";

type AuthProps = {
  onLogin: () => void;
  onRegister: () => void;
};

const decorations = ["✅", "🎯", "📝", "✏️", "📌", "🗓️", "⏰", "💡", "🔔"];

function Auth({ onLogin, onRegister }: AuthProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await ApiFetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      onLogin();
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Impossible de se connecter pour le moment.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-page__glow" aria-hidden="true" />
      <div className="auth-page__decorations" aria-hidden="true">
        {decorations.map((decoration, index) => (
          <span
            key={decoration}
            className={`auth-page__decoration auth-page__decoration--${index + 1}`}
          >
            {decoration}
          </span>
        ))}
      </div>

      <div className="auth-card">
        <div className="auth-card__logo" aria-hidden="true">
          📝
        </div>
        <h1>
          Bon retour <span aria-hidden="true">👋</span>
        </h1>
        <p className="auth-card__subtitle">Connecte-toi à ton espace</p>

        <div className="auth-card__tabs" aria-label="Choix du formulaire">
          <button
            type="button"
            className="auth-card__tab auth-card__tab--active"
          >
            🔑 Connexion
          </button>
          <button type="button" className="auth-card__tab" onClick={onRegister}>
            ✨ Inscription
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="auth-form__field">
            <span className="sr-only">Email</span>
            <Mail size={21} aria-hidden="true" />
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email"
              autoComplete="email"
              required
            />
          </label>

          <label className="auth-form__field">
            <span className="sr-only">Mot de passe</span>
            <LockKeyhole size={21} aria-hidden="true" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Mot de passe"
              autoComplete="current-password"
              required
            />
            <button
              type="button"
              className="auth-form__visibility"
              onClick={() => setShowPassword((visible) => !visible)}
              aria-label={
                showPassword
                  ? "Masquer le mot de passe"
                  : "Afficher le mot de passe"
              }
            >
              {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
            </button>
          </label>

          <button
            type="button"
            className="auth-form__forgot"
            onClick={() =>
              setError(
                "La récupération du mot de passe n’est pas encore disponible.",
              )
            }
          >
            Mot de passe oublié ?
          </button>

          {error && (
            <p className="auth-form__error" role="alert">
              {error}
            </p>
          )}

          <button
            className="auth-form__submit"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <LoaderCircle className="auth-form__spinner" size={22} />
            ) : (
              "🔑"
            )}
            {isLoading ? "Connexion…" : "Se connecter"}
          </button>
        </form>

        <div className="auth-card__divider">
          <span>ou</span>
        </div>
        <div className="auth-card__socials">
          <a
            href="https://todolist-tententsx.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="auth-card__social"
          >
            🌐 Google
          </a>
          <a
            href="https://github.com/TentenTSX/Todolist"
            target="_blank"
            rel="noopener noreferrer"
            className="auth-card__social"
          >
            🐙 GitHub
          </a>
        </div>
        <p className="auth-card__signup">
          Pas de compte ?{" "}
          <button type="button" onClick={onRegister}>
            Inscris-toi ✨
          </button>
        </p>
      </div>
    </section>
  );
}

export default Auth;
