import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import IndexPage from "./IndexPage";
import FittingRoom from "./FittingRoom_Page/FittingRoom";
import Diary from "./Diary";
import FindNewDress from "./FindNewDress";
import Personal from "./Personal";
// import SignUp from "./SignUp";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={IndexPage} />
        <Route path="/FittingRoom" component={FittingRoom} />
        <Route path="/Diary" component={Diary} />
        <Route path="/FindNewDress" component={FindNewDress} />
        <Route path="/Personal" component={Personal} />
        {/* <Route path="/SignUp" component={SignUp} /> */}
      </Switch>
    </BrowserRouter>
  );
};

export default App;
