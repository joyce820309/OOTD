import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import IndexPage from "./IndexPage";
import FittingRoom from "./FittingRoom_Page/FittingRoom";
import Diary from "./Dairy/Diary";
import FindNewDress from "./FindNewDress";
import Personal from "./Personal/Personal";
import WebFont from "webfontloader";
import NotFound from "./Landing_Page/NotFound";
import Header from "./Landing_Page/Header";
import Footer from "./Landing_Page/Footer";
import styled from "styled-components";

const Main = styled.div`
  margin: 115px auto 20px auto;
  max-width: 1200px;
  padding: 0 2rem;
  min-height: calc(100vh - 185px);
  @media screen and (max-width: 770px) {
    margin: 50px auto 10px auto;
    min-height: calc(100vh - 110px);
  }
`;

const App = () => {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Droid Sans", "Chilanka"],
      },
    });
  }, []);
  return (
    <>
      <BrowserRouter style={{ fontFamily: "Chilanka" }}>
        <Header />
        <Main>
          <Switch>
            <Route exact path="/" component={IndexPage} />
            <Route path="/FittingRoom" component={FittingRoom} />
            <Route path="/Diary" component={Diary} />
            <Route path="/FindNewDress" component={FindNewDress} />
            <Route path="/Personal" component={Personal} />
            {/* <Route exact path="/Personal" component={Personal} /> */}

            <Route path="" component={NotFound} />
          </Switch>
        </Main>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
