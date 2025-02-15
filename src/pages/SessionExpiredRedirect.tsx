import { FC, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "store/hooks/store";
import { isSessionActive } from "utils/session";

const SessionExpiredRedirect: FC = () => {
  const { sessionStartTime } = useAppSelector((state) => state.session);
  const isLoggedIn = isSessionActive(sessionStartTime);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoggedIn && location.pathname !== "/login") {
      navigate("/login");
    }
    if (isLoggedIn && location.pathname === "/login") {
      navigate("/search");
    }
  }, [isLoggedIn, navigate, location.pathname]);

  return null;
};

export default SessionExpiredRedirect;
