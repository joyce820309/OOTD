import React, { useState, useEffect } from "react";
import "firebase/firestore";
import firebase from "../utils/firebase";
import { EmptyDiv, TagContainer, ImgDiv, LoadingDiv } from "../CSS/FittingCSS";
import Loading from "../CSS/LoadingCSS";

const TagPants = () => {
  const [isUser, setIsUser] = useState(null);
  const [renderShoes, setRenderShoes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setIsUser(user);
      }
    });
  }, [isUser]);

  useEffect(() => {
    let isMounted = true;

    if (isUser !== null) {
      firebase
        .firestore()
        .collection("users")
        .doc(isUser.email)
        .collection("items")
        .orderBy("itemTime", "desc")
        .onSnapshot((snapshot) => {
          const data = snapshot.docs
            .map((doc) => {
              return doc.data();
            })
            .filter((data) => data.itemTag === "shoes");
          console.log("OMG", data);

          if (isMounted) {
            setRenderShoes(data);
            setIsLoading(false);
          }
        });
    }
    return () => {
      isMounted = false;
    };
  }, [isUser]);

  return (
    <>
      {isLoading ? (
        <LoadingDiv>
          <Loading />
        </LoadingDiv>
      ) : (
        <>
          {renderShoes.length === 0 ? (
            <TagContainer>
              <EmptyDiv>
                {" "}
                衣櫥裡現在搜尋不到『鞋子』唷！ 點擊＋號，一起來穿搭吧！！
              </EmptyDiv>
            </TagContainer>
          ) : (
            renderShoes.map((data, index) => (
              <ImgDiv>
                {" "}
                <img
                  key={index}
                  src={data.itemImg}
                  alt="clothes"
                  crossOrigin="anonymous"
                  style={{
                    maxHeight: "160px",
                    margin: "20px",
                    cursor: "grab",
                  }}
                />
              </ImgDiv>
            ))
          )}
        </>
      )}
    </>
  );
};

export default TagPants;