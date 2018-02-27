import React from "react";

const Nav = () =>
  <nav className="navbar navbar-inverse navbar-top">
    <div className="container-fluid">
    <div className="row">
      <div className="col-xs-3 col-s-3 col-md-3 col-lg-3" id="nav-icons">
        <a href="/matches" className="navbar-brand" title="Matches">
          <i className="icon-dog icon-large"></i>  
        </a></div>
        <div className="col-xs-3 col-s-3 col-md-3 col-lg-3" id="nav-icons">
        <a href="/user_profile" className="navbar-brand" title="Profile">
          <span className="glyphicon glyphicon-user btn-lg" id="nav-icons"></span>
        </a></div>
        <div className="col-xs-3 col-s-3 col-md-3 col-lg-3" id="nav-icons">
        <a href="/messages" className="navbar-brand" title="Messages">
          <span className="glyphicon glyphicon-envelope btn-lg" id="nav-icons"></span>
        </a></div>
        <div className="col-xs-3 col-s-3 col-md-3 col-lg-3">
        <a href="/calendar" className="navbar-brand" title="Calendar">
          <span className="glyphicon glyphicon-calendar btn-lg" id="nav-icons"></span>
        </a>
        </div>
      </div>
    </div>
  </nav>;

export default Nav;

