import firebase from '../utils/firebase';
const usersCollection = firebase.firestore().collection('users');

//Closet Page//
export const setToExchange = (isUser, item, itemId, exchangeName, exchangeInfo) => {
  const exchangeItem = usersCollection.doc(isUser.email).collection('exchangeItems').doc(itemId);

  exchangeItem.set({
    exchangeName: exchangeName,
    exchangeInfo: exchangeInfo,
    itemSize: item.data.itemSize,
    itemImg: item.data.itemImg,
    itemName: item.data.itemName,
    owner: item.data.owner,
    name: item.data.name,
    exchangeTime: firebase.firestore.Timestamp.now(),
    status: 'pending',
  });
};

export const updateItemToPending = (isUser, item, itemId, Toast) => {
  const items = usersCollection.doc(isUser.email).collection('items').doc(itemId);

  items
    .update({
      status: 'pending',
    })
    .then(() => {
      Toast.fire({
        icon: 'warning',
        title: '提交成功!！',
      });
    });
};

export const updateName = (e, item, id, setEditName, name, isUser) => {
  usersCollection.doc(isUser.email).collection('exchangeItems').doc(id).update({
    exchangeName: name,
  });
  setEditName(false);
};

export const updateSize = (e, item, id, setEditSize, size, isUser) => {
  usersCollection.doc(isUser.email).collection('exchangeItems').doc(id).update({
    itemSize: size,
  });
  setEditSize(false);
};

export const updateInfo = (e, item, id, setEditInfo, info, isUser) => {
  usersCollection.doc(isUser.email).collection('exchangeItems').doc(id).update({
    exchangeInfo: info,
  });
  setEditInfo(false);
};

export const deleteItem = (item, id, Toast, isUser, allExchange) => {
  const itemDoc = usersCollection.doc(isUser.email).collection('items').doc(id);
  let ref = firebase.storage().ref('itemImages/' + itemDoc.id);

  usersCollection.doc(isUser.email).collection('exchangeItems').doc(id).delete();

  usersCollection
    .doc(isUser.email)
    .collection('items')
    .doc(id)
    .delete()
    .then(() => {
      if (!allExchange.map((obj) => obj.itemImg).includes(item.itemImg)) {
        ref.delete();
      }
      Toast.fire({
        icon: 'warning',
        title: '刪除成功!!',
      });
    });
};

export const getExchangeCollection = (setExchangeCollection, findId, isUser) => {
  return usersCollection
    .doc(isUser.email)
    .collection('exchangeItems')
    .onSnapshot((snapshot) => {
      const data = snapshot.docs
        .map((doc) => {
          return { data: doc.data(), id: doc.id };
        })
        .filter((doc) => {
          return findId === doc.id;
        });
      setExchangeCollection(data);
    });
};

export const setAllExchanges = (setAllExchange) => {
  firebase
    .firestore()
    .collectionGroup('exchangeItems')
    .onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => {
        return doc.data();
      });

      setAllExchange(data);
    });
};

export const getItemsCollection = (isUser, setItemsCollection, setIsLoading) => {
  usersCollection
    .doc(isUser.email)
    .collection('items')
    .orderBy('itemTime', 'desc')
    .onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => {
        return { data: doc.data(), id: doc.id };
      });

      setItemsCollection(data);
      setIsLoading(false);
    });
};

export const getNewExchangeItem = (isUser, item, id, userName, userPhone, userAddress, year, month, date, hour, min) => {
  usersCollection.doc(isUser.email).collection('exchangeItems').doc(id).set({
    userName: userName,
    userPhone: userPhone,
    userAddress: userAddress,
    YYYY: year,
    MM: month,
    DD: date,
    HH: hour,
    Min: min,
    newOwner: isUser.email,
    exchangeName: item.exchangeName,
    exchangeInfo: item.exchangeInfo,
    itemSize: item.itemSize,
    itemImg: item.itemImg,
    itemName: item.itemName,
    owner: item.owner,
    name: item.name,
    exchangeTime: firebase.firestore.Timestamp.now(),
    status: 'done',
  });
};

export const updateOwnerStatusToDone = (item, id) => {
  usersCollection.doc(item.owner).collection('items').doc(id).update({
    status: 'done',
  });
};

export const updateNewOwnerInfoToOwner = (isUser, item, id, userName, userPhone, userAddress, year, month, date, hour, min, Toast) => {
  usersCollection
    .doc(item.owner)
    .collection('exchangeItems')
    .doc(id)
    .update({
      status: 'done',
      newOwner: isUser.email,
      userName: userName,
      userPhone: userPhone,
      userAddress: userAddress,
      YYYY: year,
      MM: month,
      DD: date,
      HH: hour,
      Min: min,
      read: false,
    })
    .then(() => {
      Toast.fire({
        icon: 'warning',
        title: '恭喜得到這件衣服囉!！',
      });
    });
};

//FindNewDress Page//

export const redenAllPendingItems = (setAllItems, setLoading) => {
  firebase
    .firestore()
    .collectionGroup('exchangeItems')
    .orderBy('exchangeTime', 'desc')
    .onSnapshot((snapshot) => {
      const data = snapshot.docs
        .map((doc) => {
          return { data: doc.data(), id: doc.id };
        })
        .filter((data) => data.data.status === 'pending');
      setAllItems(data);
      setLoading(false);
    });
};

//Fitting Page//

export const getAccountName = (isUser) => {
  return firebase.firestore().collection('users').doc(isUser.email).get();
};

export const setImgInfoToCollection = (item, data, Toast, setIsLoading) => {
  item.set(data).then(() => {
    Toast.fire({
      icon: 'warning',
      title: '新增成功!!',
    });
    // setIsLoading(false);
  });
};

export const setDataToDairy = (isUser, item, outfitName, diaryUrl, outfitSeason, account, Toast) => {
  firebase
    .firestore()
    .collection('users')
    .doc(isUser.email)
    .collection('outfits')
    .doc(item.id)
    .set({
      outfitName: outfitName,
      outfitImg: diaryUrl,
      outfitSeason: outfitSeason,
      YYYY: new Date().getFullYear(),
      MM: new Date().getMonth() + 1,
      DD: new Date().getDate(),
      outfitTime: firebase.firestore.Timestamp.now(),
      owner: isUser.email,
      name: account,
    });
  Toast.fire({
    icon: 'warning',
    title: '儲存成功，快到穿搭日記看看吧！',
  });
};

//Dairy Page

export const setIntoOutfitCollection = (isUser, setLoading, setOutfitCollection) => {
  firebase
    .firestore()
    .collection('users')
    .doc(isUser.email)
    .collection('outfits')
    .orderBy('outfitTime', 'desc')
    .onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => {
        return { data: doc.data(), id: doc.id };
      });

      setOutfitCollection(data);
      setLoading(false);
    });
};

export const deleteDairyItem = (outfits, id, isUser, Toast) => {
  const item = firebase.firestore().collection('users').doc(isUser.email).collection('outfits').doc(id);

  item.delete().then(() => {
    let ref = firebase.storage().ref('diaryImages/' + item.id);
    ref.delete().then(() => {
      Toast.fire({
        icon: 'warning',
        title: '刪除成功!!',
      });
    });
  });
};

export const putFullYearPriceToChart = (isUser, date, setData) => {
  firebase
    .firestore()
    .collection('users')
    .doc(isUser.email)
    .collection('items')
    .onSnapshot((snapshot) => {
      const data = snapshot.docs
        .map((doc) => {
          return doc.data();
        })
        .filter((doc) => doc.YYYY === Number(date));

      const monthExp = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        10: 0,
        11: 0,
        12: 0,
      };

      data.forEach((doc) => {
        let MM = doc.MM.toString();

        if (MM === '1') {
          monthExp['1'] += doc.itemExpense;
        } else if (MM === '2') {
          monthExp['2'] += doc.itemExpense;
        } else if (MM === '3') {
          monthExp['3'] += doc.itemExpense;
        } else if (MM === '4') {
          monthExp['4'] += doc.itemExpense;
        } else if (MM === '5') {
          monthExp['5'] += doc.itemExpense;
        } else if (MM === '6') {
          monthExp['6'] += doc.itemExpense;
        } else if (MM === '7') {
          monthExp['7'] += doc.itemExpense;
        } else if (MM === '8') {
          monthExp['8'] += doc.itemExpense;
        } else if (MM === '9') {
          monthExp['9'] += doc.itemExpense;
        } else if (MM === '10') {
          monthExp['10'] += doc.itemExpense;
        } else if (MM === '11') {
          monthExp['11'] += doc.itemExpense;
        } else if (MM === '12') {
          monthExp['12'] += doc.itemExpense;
        } else {
          return 0;
        }
      });

      let dataArr = [];
      let nameArr = ['Jan.', 'Feb.', 'March', 'April', 'May', 'June', 'July', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];
      for (let i = 0; i < 12; i++) {
        let d = {
          name: nameArr[i],
          Expense: Object.values(monthExp)[i],
        };
        dataArr.push(d);
      }
      setData(dataArr);
    });
};

export const putTagPriceToChart = (isUser, date, setPieData, setData, setIsLoading) => {
  firebase
    .firestore()
    .collection('users')
    .doc(isUser.email)
    .collection('items')
    .onSnapshot((snapshot) => {
      const data = snapshot.docs
        .map((doc) => {
          return doc.data();
        })
        .filter((doc) => doc.YYYY === Number(date));
      const tagExp = {};
      const tag = ['clothes', 'pants', 'skirt', 'shoes', 'accessary'];

      for (let i = 0; i < tag.length; i++) {
        tagExp[tag[i]] = 0;
      }
      data.forEach((doc) => {
        if (doc.itemTag === 'clothes') {
          tagExp['clothes'] += doc.itemExpense;
        } else if (doc.itemTag === 'pants') {
          tagExp['pants'] += doc.itemExpense;
        } else if (doc.itemTag === 'skirt') {
          tagExp['skirt'] += doc.itemExpense;
        } else if (doc.itemTag === 'shoes') {
          tagExp['shoes'] += doc.itemExpense;
        } else if (doc.itemTag === 'accessary') {
          tagExp['accessary'] += doc.itemExpense;
        } else {
          return 0;
        }
      });

      let dataArr = [];
      let name = ['上衣', '褲子', '裙子', '鞋子', '配件'];
      for (let i = 0; i < 5; i++) {
        let d = {
          name: name[i],
          value: Object.values(tagExp)[i],
        };
        dataArr.push(d);
      }
      setPieData(dataArr);
      setData(data);
      setIsLoading(false);
    });
};

//Save Page//

export const SaveTitleToDairy = (isUser, setAccount) => {
  firebase
    .firestore()
    .collection('users')
    .doc(isUser.email)
    .get()
    .then((doc) => {
      setAccount(doc.data().name);
    });
};

export const handleSaveBtn = (e, isUser, outfitName, outfitSeason, account) => {
  const item = firebase.firestore().collection('users').doc(isUser.email).collection('items').doc();
  let canvas = document.getElementById('canvas');
  let dataUrl = canvas.toDataURL();
  let ref = firebase.storage().ref('diaryImages/' + item.id); //傳入filebase的路徑位置

  ref.putString(dataUrl, 'data_url').then((snapshot) => {
    ref.getDownloadURL().then((diaryUrl) => {
      firebase
        .firestore()
        .collection('users')
        .doc(isUser.email)
        .collection('outfits')
        .doc(item.id)
        .set({
          outfitName: outfitName, //讓使用者取名？
          outfitImg: diaryUrl,
          outfitSeason: outfitSeason,
          YYYY: new Date().getFullYear(),
          MM: new Date().getMonth() + 1,
          DD: new Date().getDate(),
          outfitTime: firebase.firestore.Timestamp.now(),
          owner: isUser.email,
          name: account,
        });
    });
  });
};

//Exchange Page//

export const getAllItemCollection = (setAllItems) => {
  firebase
    .firestore()
    .collectionGroup('items')
    .onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => {
        return doc.data();
      });

      setAllItems(data);
    });
};

export const getOthersItem = (isUser, setExchangeDone, setIsLoading) => {
  firebase
    .firestore()
    .collection('users')
    .doc(isUser.email) //拿到別人的衣服
    .collection('exchangeItems')
    .orderBy('exchangeTime', 'desc')
    .onSnapshot((snapshot) => {
      const data = snapshot.docs
        .map((doc) => {
          return { data: doc.data(), id: doc.id };
        })
        .filter((data) => data.data.status === 'done' && data.data.owner !== isUser.email);
      setExchangeDone(data);
      setIsLoading(false);
    });
};

export const deleteExchangeItem = (item, id, isUser, allItems, Toast) => {
  const itemDoc = firebase.firestore().collection('users').doc(isUser.email).collection('exchangeItems').doc(id);
  let ref = firebase.storage().ref('itemImages/' + itemDoc.id);

  firebase
    .firestore()
    .collection('users')
    .doc(isUser.email)
    .collection('exchangeItems')
    .doc(id)
    .delete()
    .then(() => {
      if (!allItems.map((obj) => obj.itemImg).includes(item.itemImg)) {
        ref.delete();
      }
      Toast.fire({
        icon: 'warning',
        title: '刪除成功!!',
      });
    });
};

export const getLengthFromExchange = (isUser) => {
  return new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection('users')
      .doc(isUser.email)
      .collection('exchangeItems')
      .orderBy('exchangeTime', 'desc')
      .onSnapshot((snapshot) => {
        const data = snapshot.docs
          .map((doc) => {
            return { data: doc.data(), id: doc.id };
          })
          .filter((doc) => {
            return doc.data.status === 'done' && doc.data.owner === isUser.email;
          });

        console.log('setInitMsgLength', data.length);
        if (data) {
          resolve(data);
          console.log('IFdata:', data.length);
        } else return reject();
      });
  });
};

export const setInitLength = (data, setAllExchange, setInitMsgLength) => {
  setAllExchange(data);
  setInitMsgLength(data.length);
};

export const setMsgLength = (setMsgLength, allExchange) => {
  return setMsgLength(allExchange.length);
};

export const getInitLengthFromExchange = (isUser, setAllExchange, setInitMsgLength) => {
  firebase
    .firestore()
    .collection('users')
    .doc(isUser.email)
    .collection('exchangeItems')
    .orderBy('exchangeTime', 'desc')
    .onSnapshot((snapshot) => {
      const data = snapshot.docs
        .map((doc) => {
          return { data: doc.data(), id: doc.id };
        })
        .filter((doc) => {
          return doc.data.status === 'done' && doc.data.owner === isUser.email;
        });
      setAllExchange(data);
      setInitMsgLength(data.length);
      console.log('setInitMsgLength', data, data.length);
    });
};

export const getMsgLengthFromExchange = (isUser) => {
  return new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection('users')
      .doc(isUser.email)
      .collection('exchangeItems')
      .orderBy('exchangeTime', 'desc')
      .onSnapshot((snapshot) => {
        const data = snapshot.docs
          .map((doc) => {
            return { data: doc.data(), id: doc.id };
          })
          .filter((doc) => {
            return doc.data.status === 'done' && doc.data.owner === isUser.email;
          });
        // setAllExchange(data);
        // setInitMsgLength(data.length);
        console.log('setInitMsgLength', data.length);
        if (data) return resolve(data);
        else return reject();
      });
  });
};
