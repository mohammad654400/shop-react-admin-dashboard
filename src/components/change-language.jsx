import usflag from "@assets/images/us.png";
import faflag from "@assets/images/fa.png";

import { useState } from "react";
import { useTranslation } from "react-i18next";
const ChangeLanguage = () => {
  const [show, setShow] = useState(false);
  const { t, i18n } = useTranslation();

  return (
    <div className="dropdown">
      <a className="nav-flag dropdown-toggle" onClick={() => setShow(true)}>
        <img src={usflag} alt="English" />
      </a>
      <div
        className={`dropdown-menu dropdown-menu-end ${
          show ? "show" : undefined
        } `}
      >
        <button
          className="dropdown-item fw-bolder"
          style={{ textAlign: "right" }}
          onClick={() => {
            setShow(false), i18n.changeLanguage("fa");
          }}
        >
          <img src={faflag} alt="iran" width="20" className="ms-2" />
          <span className="align-middle">فارسی</span>
        </button>

        <button
          className="dropdown-item fw-bolder"
          style={{ textAlign: "right" }}
          onClick={() => {
            setShow(false), i18n.changeLanguage("en");
          }}
        >
          <img src={usflag} alt="iran" width="20" className="ms-2" />
          <span className="align-middle">English</span>
        </button>
      </div>
    </div>
  );
};
export default ChangeLanguage;
