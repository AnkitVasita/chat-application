import React from "react";
import "./App.css";
import Sidebar from "../Sidebar/Sidebar";
import Chat from "../chat/Chat";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "../login/Login";
import { useStateValue } from "../../context/StateProvider";
// import UseWindowDimensions from "./UseWindowDimensions";

function App() {
  const [{ user }] = useStateValue();
  // const { width } = UseWindowDimensions();
  const uid =
    localStorage.getItem("uid") !== undefined
      ? localStorage.getItem("uid")
      : null;

  return (
    <div className="app">
      {!user && !uid ? (
        <Login />
      ) : (
        <div className="app__body">
          <Router>
            <Sidebar />
            <Switch>
              <Route path="/rooms/:roomId">
                <Chat />
              </Route>
              <Route path="/">
                <Chat />
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
