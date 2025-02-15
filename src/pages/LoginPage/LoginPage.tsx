import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import { isAuthenticated } from "utils/auth";

const LoginPage: FC = () => {
  const isSessionActive = isAuthenticated();
  const navigate = useNavigate();

  /**
   * If there is an active session, redirect user to search page.
   */
  useEffect(() => {
    if (isSessionActive) {
      navigate("/search", { replace: true });
    }
  }, [isSessionActive, navigate]);

  if (isSessionActive) {
    return null;
  }

  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
