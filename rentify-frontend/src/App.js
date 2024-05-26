import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import ErrorBoundary from "./components/errorBoundary";

// Lazy load the page components
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Properties = lazy(() => import("./pages/Properties"));
const MyProperties = lazy(() => import("./pages/MyProperties"));

const App = () => {
  return (
    <Router>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/properties" element={<Properties />} />
              <Route path="/myProperties" element={<MyProperties />} />
          </Routes>
        </ErrorBoundary>
      </Suspense>
    </Router>
  );
};

export default App;
