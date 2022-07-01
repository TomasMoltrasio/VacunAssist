import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "@pages/Login";
import Layout from "@containers/Layout";
import LayoutNav from "@containers/LayoutNav";
import CreateAccount from "@pages/CreateAccount";
import MyAccount from "@pages/MyAccount";
import Campaign from "@pages/Campaign";
import Turns from "@pages/Turns";
import TurnVacunator from "@pages/TurnVacunator";
import Stock from "@pages/Stock";
import Register from "@pages/Register";
import "@styles/global.css";
import NotFound from "../pages/NotFound";
import { AuthProvider } from "../context/useAuth";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="container">
          <Routes>
            <Route element={<Layout />}>
              <Route exact path="/" element={<Login />} />
              <Route exact path="create-account" element={<CreateAccount />} />
            </Route>
            <Route element={<LayoutNav />}>
              <Route exact path="account" element={<MyAccount />} />
              <Route exact path="campaign" element={<Campaign />} />
              <Route exact path="turns" element={<Turns />} />
              <Route
                exact
                path="/turns-vacunador"
                element={<TurnVacunator />}
              />
              <Route exact path="/stock" element={<Stock />} />
              <Route exact path="/register" element={<Register />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
