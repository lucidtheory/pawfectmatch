import { FC } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "pages/LoginPage/LoginPage";
import SearchPage from "pages/SearchPage/SearchPage";
import SessionExpiredRedirect from "pages/SessionExpiredRedirect";

const App: FC = () => {
  return (
    <Router basename="/pawfectmatch">
      <header className="app-header">
        <h1>Pawfect Match</h1>
      </header>
      <SessionExpiredRedirect />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
