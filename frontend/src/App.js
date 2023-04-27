import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Header from "./components/Header";
import About from "./pages/About";
import AddEdit from "./pages/AddEdit";
import Home from "./pages/Home";
import Sample from "./pages/Sample";
import View from "./pages/View";
import Update from "./pages/Update";
import ViewLeaves from "./pages/ViewLeaves";
import AddLeave from "./pages/AddLeave";
import Practive from "./pages/Practive";
import Upad from "./Upad";







function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <ToastContainer position="top-center" />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/add" component={AddEdit} />
          <Route path="/practice" component={Practive} />
          <Route path="/up" component={Upad} />
          <Route path="/addLeave" component={AddLeave} />
          <Route path="/viewLeave" component={ViewLeaves} />
          <Route path="/sample" component={Sample} />
          <Route path="/update/:id" component={Upad} />
          <Route path="/view/:id" component={View} />
          <Route path="/about" component={About} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
