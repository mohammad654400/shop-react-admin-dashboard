import React from "react";
import { Link, useNavigate } from "react-router-dom";
import man from "@assets/images/men.jpg";
import women from "@assets/images/woman.jpg";
import childeren from "@assets/images/child.jpg";

const Courses = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <ul
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <li>
          <Link to="/courses/man">
            <div style={{ height: "400px", width: "200px" }}>
              <img src={man} alt="" style={{ width: "100%", height: "50%" }} />
              <h1>man</h1>
            </div>
          </Link>
        </li>
        <li>
          <Link to="/courses/woman">
            <div style={{ height: "400px", width: "200px" }}>
              <img
                src={women}
                alt=""
                style={{ width: "100%", height: "50%" }}
              />
              <h1>woman</h1>
            </div>
          </Link>
        </li>
        <li>
          <Link to="/courses/child">
            <div style={{ height: "400px", width: "200px" }}>
              <img
                src={childeren}
                alt=""
                style={{ width: "100%", height: "50%" }}
              />
              <h1>child</h1>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Courses;
