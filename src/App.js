import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import IndexPage from "./General/IndexPage";
import FittingRoom from "./FittingRoom_Page/FittingRoom";
import firebase from "./utils/firebase";
import Diary from "./Dairy_Page/Diary";
import FindNewDress from "./FindNewDress_Page/FindNewDress";
import Personal from "./Personal_Page/Personal";
import WebFont from "webfontloader";
import NotFound from "./General/NotFound";
import Header from "./General/Header";
import Footer from "./General/Footer";
import styled from "styled-components";
import Loading from "./General/Loading";
import { useDispatch, useSelector } from "react-redux";
import { getIsUser } from "./state/action";

const Main = styled.div`
  margin: 115px auto 20px auto;
  max-width: 1200px;
  padding: 0 2rem;
  min-height: calc(100vh - 185px);
  @media screen and (max-width: 770px) {
    margin: 70px auto 10px auto;
    min-height: calc(100vh - 130px);
  }
`;

const App = () => {
  const [isUser, setIsUser] = useState();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Droid Sans", "Chilanka"],
      },
    });
  }, []);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setIsUser(user);
      dispatch(getIsUser(user));
      if (user) {
        setIsUser(user);
      }
    });
  }, []);
  return (
    <>
      <BrowserRouter>
        <Header />
        <Main>
          {user !== null ? (
            <>
              {user !== undefined ? (
                <Switch>
                  <Route exact path="/" component={IndexPage} />
                  <Route path="/FittingRoom" component={FittingRoom} />
                  <Route path="/Diary" component={Diary} />
                  <Route path="/FindNewDress" component={FindNewDress} />
                  <Route path="/Personal" component={Personal} />
                  <Route path="" component={NotFound} />
                </Switch>
              ) : (
                <Loading />
              )}
            </>
          ) : (
            <IndexPage />
          )}
        </Main>

        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
