import React, { useState, useEffect } from "react";
import "firebase/firestore";
import firebase from "../utils/firebase";
import {
  EmptyDiv,
  TagContainer,
  ImgDiv,
  LoadingDiv,
} from "../Style/FittingCSS";
import Loading from "../General/Loading";
import { useSelector } from "react-redux";

const TagAll = () => {
  const isUser = useSelector((state) => state.user);
  const [renderAll, setRenderAll] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
          let arr = [];
          snapshot.forEach((doc) => {
            arr.push(doc.data().itemImg);
          });
          if (isMounted) {
            setRenderAll(arr);
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
          {renderAll.length === 0 ? (
            <TagContainer>
              <EmptyDiv>
                {" "}
                現在衣櫥是空的唷！ 點擊＋號，一起來穿搭吧！！
              </EmptyDiv>
            </TagContainer>
          ) : (
            renderAll.map((url, index) => (
              <ImgDiv key={url}>
                <img
                  src={url}
                  alt="clothes"
                  crossOrigin="anonymous"
                  style={{
                    // maxHeight: "160px",
                    maxHeight: "100%",

                    maxWidth: "100%",
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

export default TagAll;
