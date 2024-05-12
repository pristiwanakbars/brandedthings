import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";

export default function BaseLayout() {
  return (
    <>
      <Nav />

      <section className="container-fluid" id="home-section">
        <div className="row">
          <Sidebar />
          <Outlet />
        </div>
      </section>
    </>
  );
}
