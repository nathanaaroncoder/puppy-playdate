import React from "react";
import { Link } from 'react-router-dom';

const Nav = () =>
  <nav className="navbar navbar-inverse navbar-top">
    <div className="container-fluid">
    <div className="row">
      <div className="col-xs-3 col-s-3 col-md-3 col-lg-3" id="nav-icons">
        <Link to="/matches" className="navbar-brand" title="Matches">
          <i className="icon-dog icon-large"></i>  
        </Link></div>
        <div className="col-xs-3 col-s-3 col-md-3 col-lg-3" id="nav-icons">
        <Link to="/user_profile" className="navbar-brand" title="Profile">
          <span className="glyphicon glyphicon-user btn-lg" id="nav-icons"></span>
        </Link></div>
        <div className="col-xs-3 col-s-3 col-md-3 col-lg-3" id="nav-icons">
        <Link to="/messages" className="navbar-brand" title="Messages">
          <span className="glyphicon glyphicon-envelope btn-lg" id="nav-icons"></span>
        </Link></div>
        <div className="col-xs-3 col-s-3 col-md-3 col-lg-3">
        <Link to="/calendar" className="navbar-brand" title="Calendar">
          <span className="glyphicon glyphicon-calendar btn-lg" id="nav-icons"></span>
        </Link>
        </div>
      </div>
    </div>
  </nav>;

export default Nav;

