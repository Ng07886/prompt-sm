import NavBar from "../components/nav/NavBar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      <NavBar />
      <main>
        <Outlet />
      </main>
    </>
  );
}
