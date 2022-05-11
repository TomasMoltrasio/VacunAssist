import React from "react";
import Header from "@components/Header";
import { Outlet } from "react-router-dom";
import Nav from "@components/Nav";

const LayoutNav = () => {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
};

export default LayoutNav;
