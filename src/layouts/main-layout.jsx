import { Outlet, useNavigate } from "react-router-dom";
import ChangeLanguage from "../components/change-language";
import { useEffect, useState } from "react";
import logo from "@assets/images/fasco.png";

const MainLayout = () => {
  const [collapseSidebar, setCollapseSidebar] = useState(false);

  const token = localStorage.getItem("token");
  console.log(token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || null) {
      navigate("/login");
    }
  }, []);

  return (
    
    <div className="wrapper" style={{ minHeight: "100h" }}>
      <nav className={`sidebar ${collapseSidebar ? "collapsed" : ""}`}>
        <div className="sidebar-content">
          <a className="sidebar-brand d-flex flex-column align-items-center pt-0 mb-0">
            <img src={logo} alt="" />
            <p className="mb-0 mt-5">پنل ادمین</p>
          </a>

          <ul className="sidebar-nav pe-0">
            <li className="sidebar-header fw-bolder fs-lg">مدیریت</li>
          </ul>
        </div>
      </nav>

      <div className="main">
        <nav className="navbar">
          <a
            className="siddebar-toggle"
            onClick={() => setCollapseSidebar(!collapseSidebar)}
          >
            <i className="hamburger align-self-center"></i>
          </a>

          <div className="d-flex align-items-center gap-3 ms-auto me-3">
            <ChangeLanguage />
          </div>
        </nav>

        <main className="content">
          <div className="container-fluid p-0">
            <Outlet />
          </div>
        </main>

        <footer className="footer">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <p className="mb-0">
                  <a href="index.html" className="text-muted">
                    پنل ادمین fasco
                  </a>
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
export default MainLayout;
