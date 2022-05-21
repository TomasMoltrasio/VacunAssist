import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "@pages/Login";
import Layout from "@containers/Layout";
import LayoutNav from "@containers/LayoutNav";
import CreateAccount from "@pages/CreateAccount";
import MyAccount from "@pages/MyAccount";
import Campaign from "@pages/Campaign";
import Turns from "@pages/Turns";
import CompleteRegister from "@pages/CompleteRegister";
import "@styles/global.css";
import NotFound from "../pages/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route element={<Layout />}>
            <Route exact path="/" element={<Login />} />
            <Route exact path="create-account" element={<CreateAccount />} />
            <Route
              exact
              path="complete-register"
              element={<CompleteRegister />}
            />
          </Route>
          <Route element={<LayoutNav />}>
            <Route exact path="account" element={<MyAccount />} />
            <Route exact path="campaign" element={<Campaign />} />
            <Route exact path="turns" element={<Turns />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
