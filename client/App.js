import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";

import { Login, Signup } from "./authform/AuthForm.js";
import Home from "./components/home/home.jsx";
import { me } from "./store/index.js";
import Navbar from "./components/navbar/Navbar.jsx";
import Profile from "./components/profile/Profile.jsx";
import AboutUs from "./components/about/About.jsx";
import TeamMemberCard from "./components/about/Team-Member/TeamMemberCard.jsx";
import CompanyList from "./components/company/AllCompany.jsx";
import SingleCompany from "./components/company/SingleCompany.jsx";
import Careers from "./components/career/Career.jsx";
import Feature from "./components/feature/Feature.jsx";
import TodoList from "./components/todo/todo.jsx";
import CompanyIdeas from "./components/company/CompanyIdeas.jsx";

class App extends React.Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    this.props.loadInitialData().then(() => {
      this.setState({ loading: false });
    });
  }

  render() {
    const { isLoggedIn } = this.props;
    const { loading } = this.state;

    if (loading) {
      return <div>Loading...</div>; // Or your custom loading indicator
    }

    return (
      <Fragment>
        <Navbar isLoggedIn={isLoggedIn} />
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path="/home" element={<Home />} />
              <Route path="/About" element={<AboutUs />} />
              <Route path="/about/team" element={<TeamMemberCard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/companies" element={<CompanyList />} />
              <Route path="/companies/:id/ideas" element={<CompanyIdeas />} />
              <Route path="/companies/:id" element={<SingleCompany />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/Features" element={<Feature />} />
              <Route path="/todo" element={<TodoList />} />
              <Route path="*" element={<Navigate replace to="/home" />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<Navigate replace to="/" />} />
            </>
          )}
        </Routes>
      </Fragment>
    );
  }
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      return dispatch(me());
    },
  };
};

export default connect(mapState, mapDispatch)(App);
