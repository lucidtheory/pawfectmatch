import { FC } from "react";
import { useAppSelector } from "store/hooks/store";
import LoginForm from "./LoginForm";
import { isSessionActive } from "utils/session";

const LoginPage: FC = () => {
  const { sessionStartTime } = useAppSelector((state) => state.session);
  const isLoggedIn = isSessionActive(sessionStartTime);

  if (isLoggedIn) {
    return null;
  }

  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
