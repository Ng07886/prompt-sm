import { LoginPlain } from "./components/login/LoginPlain";
import NewsfeedContainer from "./components/newsfeed/NewsfeedContainer";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import FriendsContainer from "./components/friends/FriendsContainer";
import MainLayout from "./layouts/MainLayout";
import RequireAuth from "./routes/RequireAuth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth routes (no NavBar) */}
        <Route path="/login" element={<LoginPlain />} />

        {/* Main app routes with NavBar */}
        <Route element={<MainLayout />}>
          <Route
            path="/newsfeed"
            element={
              <RequireAuth>
                <NewsfeedContainer />
              </RequireAuth>
            }
          />
          <Route
            path="/friends"
            element={
              <RequireAuth>
                <FriendsContainer />
              </RequireAuth>
            }
          />
          <Route path="/" element={<Navigate to="/newsfeed" replace />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
