import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import StatusPending from "./StatusPending";
import StatusDone from "./StatusDone";
import StatusNone from "./StatusNone";
import { EmptyDiv } from "../Style/FittingCSS";
import { DeleteBtn } from "../Style/CommonCSS";
import Swal from "sweetalert2";
import Loading from "../General/Loading";
import { ClosetContainer, EachDiv, EmptyContainer } from "../Style/PersonalCSS";

import {
  setToExchange,
  updateItemToPending,
  deleteItem,
  getExchangeCollection,
  setAllExchanges,
  getItemsCollection,
} from "../utils/firebaseFunc";

const MyCloset = () => {
  const isUser = useSelector((state) => state.user);
  const [exchangeName, setExchangeName] = useState("");
  const [exchangeInfo, setExchangeInfo] = useState("");
  const [allExchange, setAllExchange] = useState([]);
  const [itemsCollection, setItemsCollection] = useState([]);
  const [exchangeCollection, setExchangeCollection] = useState([]);
  const [findId, setFindId] = useState("");
  const [isName, setIsName] = useState(false);
  const [isSize, setIsSize] = useState(false);
  const [isInfo, setIsInfo] = useState(false);
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [info, setInfo] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let unsubscribe;
    if (isUser !== null) {
      unsubscribe = setAllExchanges(setAllExchange);
    }

    return () => {
      unsubscribe && unsubscribe();
    };
  }, [isUser]);

  useEffect(() => {
    let unsubscribe;
    if (isUser !== null) {
      unsubscribe = getItemsCollection(
        isUser,
        setItemsCollection,
        setIsLoading
      );
    }
    return () => {
      unsubscribe && unsubscribe();
    };
  }, [isUser]);

  useEffect(() => {
    let unsubscribe;
    if (isUser !== null && findId !== "") {
      unsubscribe = getExchangeCollection(
        setExchangeCollection,
        findId,
        isUser
      );
    }
    return () => {
      unsubscribe && unsubscribe();
    };
  }, [isUser, findId]);

  const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const sumbitToExchange = (item, itemId) => {
    if (exchangeName === "" || exchangeInfo === "") {
      Toast.fire({
        icon: "warning",
        title: "?????????????????????????????????",
      });
    } else {
      setToExchange(isUser, item, itemId, exchangeName, exchangeInfo);
      updateItemToPending(isUser, item, itemId, Toast);
    }
  };

  return (
    <ClosetContainer>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {itemsCollection.length === 0 ? (
            <EmptyContainer>
              <EmptyDiv
                style={{ padding: "15px", borderBottom: "4px #bdc5c9 solid" }}
              >
                ???????????????????????????????????????????????????????????????
              </EmptyDiv>
            </EmptyContainer>
          ) : (
            <>
              {itemsCollection.map((item, e) => (
                <EachDiv key={e}>
                  <DeleteBtn
                    onClick={() => {
                      deleteItem(item, item.id, Toast, isUser, allExchange);
                    }}
                  >
                    X
                  </DeleteBtn>
                  <StatusPending
                    item={item}
                    exchangeCollection={exchangeCollection}
                    name={name}
                    size={size}
                    info={info}
                    setName={setName}
                    setSize={setSize}
                    setInfo={setInfo}
                    setFindId={setFindId}
                    editName={isName}
                    editSize={isSize}
                    editInfo={isInfo}
                    setEditName={setIsName}
                    setEditSize={setIsSize}
                    setEditInfo={setIsInfo}
                    isUser={isUser}
                  />
                  <StatusDone
                    item={item}
                    exchangeCollection={exchangeCollection}
                    setFindId={setFindId}
                  />

                  <img
                    src={item.data.itemImg}
                    alt="OOTD"
                    style={{
                      marginBottom: "32px",
                      maxHeight: "140px",
                    }}
                  />
                  <StatusNone
                    item={item}
                    exchangeCollection={exchangeCollection}
                    exchangeName={exchangeName}
                    exchangeInfo={exchangeInfo}
                    setExchangeInfo={setExchangeInfo}
                    sumbitToExchange={sumbitToExchange}
                    setExchangeName={setExchangeName}
                  />
                </EachDiv>
              ))}
            </>
          )}
        </>
      )}
    </ClosetContainer>
  );
};

export default MyCloset;
