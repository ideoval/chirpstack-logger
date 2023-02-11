import { useState } from "react";
import { faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Login = ({ setAuthenticated }) => {
  const credentials = { user: "admin", pass: "cusco" };
  const [message, setMessage] = useState({ style: "", text: "" });
  const [loading, setLoading] = useState(true);

  const handleLogin = (e) => {
    e.preventDefault();
    const {
      user: { value: user },
      pass: { value: pass },
    } = e.target.elements;
    if (user === credentials.user && pass === credentials.pass) {
      setMessage({ style: "has-text-success", text: "Login in" });
      setLoading(true);
      setTimeout(() => {
        setAuthenticated(true);
      }, 2000);
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setMessage({
          style: "has-text-danger",
          text: "Invalid user or password",
        });
      }, 1000);
    }
  };

  const handleInputChange = () => {
    setMessage((s) => ({ ...s, text: "" }));
  };

  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <h1 className="title has-text-centered">Chirpstack logger</h1>
        </header>
        <form onSubmit={handleLogin} name="login">
          <section className="modal-card-body">
            <h2 className="subtitle has-text-centered">User login</h2>
            <p className="control has-icons-left">
              <span className="icon is-small is-left">
                <FontAwesomeIcon icon={faUser} />
              </span>
              <input
                type="text"
                placeholder="User"
                className="input"
                name="user"
                required
                onChange={handleInputChange}
                autoFocus
              />
            </p>
            <p className="control has-icons-left">
              <span className="icon is-small is-left">
                <FontAwesomeIcon icon={faKey} />
              </span>
              <input
                type="password"
                placeholder="Password"
                className="input"
                name="pass"
                required
                onChange={handleInputChange}
              />
            </p>
            <p className={`${message.style} has-text-centered`}>
              {message.text}
            </p>
            <footer className="modal-card-foot">
              <button
                type="submit"
                className={`button card-footer-item is-primary ${
                  loading && "is-loading"
                }`}
                disabled={loading}
              >
                Login
              </button>
            </footer>
          </section>
        </form>
      </div>
    </div>
  );
};
export default Login;
