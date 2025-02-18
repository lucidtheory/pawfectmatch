import { FC } from "react";
import { useAppSelector } from "store/hooks/store";
import LoginForm from "./LoginForm/LoginForm";
import { isSessionActive } from "utils/session";
import "./LoginPage.css";

const LoginPage: FC = () => {
  const { sessionStartTime } = useAppSelector((state) => state.session);
  const isLoggedIn = isSessionActive(sessionStartTime);

  if (isLoggedIn) {
    return null;
  }

  return (
    <div className="login-container">
      <div className="form-wrapper">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
