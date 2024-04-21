import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";

function QuizEditorNav() {
  const { pathname } = useLocation();
  const path = pathname.split("/").slice(0, -1).join("/");

  return (
    <nav className="nav nav-tabs mt-2">
      <Link
        to={`${path}/Details`}
        className={`nav-link ${pathname.includes("Details") ? "active" : ""}`}
      >
        Details
      </Link>
      <Link
        to={`${path}/Questions`}
        className={`nav-link ${pathname.includes("Questions") ? "active" : ""}`}
      >
        Questions
      </Link>
    </nav>
  );
}

export default QuizEditorNav;