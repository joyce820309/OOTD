import React, { useState, useEffect, useRef } from 'react';
import '../Style/common.css';
import { fabric } from 'fabric';
import 'firebase/firestore';
import 'firebase/storage';
import Swal from 'sweetalert2';
import firebase from '../utils/firebase';
import TagAll from './TagAll';
import Tags from './Tags';
import Loading from '../General/Loading';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector } from 'react-redux';
import { getAccountName, setImgInfoToCollection } from '../utils/firebaseFunc';

import {
  YellowBG,
  TagBox,
  Tag,
  Tag1,
  Tag2,
  Tag3,
  Tag4,
  Tag5,
  Container,
  AddBtn,
  CanvasDiv,
  Div,
  LeftDiv,
  Span,
  MobileTagBox,
  DairyPopup,
  SaveBtn,
  Input,
  InputNum,
  BtnDiv,
  ExplainSave,
  DeleteBtn,
  ExplainDelete,
  ClosetBox,
  ImgsetBox,
  ImgBox,
  MobileImgBox,
  MirrorTitleDiv,
  ClosetTitle,
  ItemForm,
  Backdrop,
  SaveForm,
  Btn,
  ClosetTitleDiv,
  StyledPopup,
} from '../Style/FittingCSS';
let movingImage;
let filePath;

const FittingRoom = () => {
  const isUser = useSelector((state) => state.user);
  const [account, setAccount] = useState('');
  const [itemSize, setItemSize] = useState('');
  const [canvas, setCanvas] = useState({});
  const [price, setPrice] = useState();
  const [option, setOption] = useState('');
  const [itemName, setItemName] = useState('');
  const [imgFile, setImgFile] = useState('');
  const [diaryURL, setDiaryURL] = useState('');
  const [outfitName, setOutfitName] = useState('');
  const [outfitSeason, setOutfitSeason] = useState('');
  const [filerStatus, setFilterStatus] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [selectDate, setSelectDate] = useState(new Date());
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    setCanvas(initCanvas());
  }, []);

  useEffect(() => {
    setYear(selectDate.getFullYear());
    setMonth(Number(selectDate.getMonth()) + 1);
    setDate(Number(selectDate.getDate()));
  }, [selectDate]);

  useEffect(() => {
    const modified = { drop: dropImg };
    if (Object.keys(canvas).length) {
      canvas.on(modified);
    }

    return () => {
      if (Object.keys(canvas).length) {
        canvas.off(modified); //???????????????????????????memory leak
      }
    };
  }, [canvas]);

  useEffect(() => {
    let unsubscribe;
    if (Object.keys(isUser).length !== 0) {
      getAccountName(isUser).then((doc) => {
        setAccount(doc.data()?.name);
      });
    }
    return () => {
      unsubscribe && unsubscribe();
    };
  }, [isUser]);

  const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

  const summitItem = () => {
    setIsLoading(true);

    const item = firebase.firestore().collection('users').doc(isUser.email).collection('items').doc();

    // ?????? FileReader ???????????????????????????
    filePath = firebase.storage().ref('itemImages/' + item.id); //??????filebase???????????????

    if (imgFile === '' || itemName === '' || price === undefined || itemSize === '' || option === '' || date === '') {
      Toast.fire({
        icon: 'warning',
        title: '?????????????????????????????????',
      });
    } else {
      filePath.put(imgFile, { contentType: imgFile.type }).then(() => {
        filePath.getDownloadURL().then((imageUrl) => {
          const data = {
            itemExpense: price,
            itemName: itemName,
            YYYY: year,
            MM: month,
            DD: date,
            itemImg: imageUrl,
            itemTag: option,
            itemSize: itemSize,
            itemTime: firebase.firestore.Timestamp.now(),
            owner: isUser.email,
            name: account,
            status: 'none',
          };

          setImgInfoToCollection(item, data, Toast, setIsLoading);
          setIsLoading(false);
        });
      });
    }
    //?????????????????????????????? FileReader ???????????????????????????????????? Image???????????????????????????????????????????????????
    const newFileReader = new FileReader();
  };

  const initCanvas = () =>
    new fabric.Canvas('canvas', {
      height: 480,
      width: 360,
    });

  const handleDelete = (e) => {
    if (canvas) {
      const obj = canvas.getActiveObject();
      canvas.remove(obj);
    }
  };

  const handleSave = (e) => {
    canvas.discardActiveObject().renderAll();
    const item = firebase.firestore().collection('users').doc(isUser.email).collection('items').doc();
    let canvasEle = document.getElementById('canvas');
    let dataUrl = canvasEle.toDataURL();
    let ref = firebase.storage().ref('diaryImages/' + item.id); //??????filebase???????????????

    ref.putString(dataUrl, 'data_url').then((snapshot) => {
      ref.getDownloadURL().then((diaryUrl) => {
        setDiaryURL(diaryUrl);

        if (outfitName === '' || outfitSeason === '') {
          Toast.fire({
            icon: 'warning',
            title: '??????????????????????????? ??? ??????????????????',
          });
        } else {
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
            title: '?????????????????????????????????????????????',
          });
        }
      });
    });
  };

  let imgDragOffset = {
    offsetX: 0,
    offsetY: 0,
  };

  // ??????????????? mousedown ???????????????????????????????????????????????????????????????????????????
  const saveImg = (e) => {
    if (e.target.tagName.toLowerCase() === 'img') {
      imgDragOffset.offsetX = e.clientX - e.target.offsetLeft;
      imgDragOffset.offsetY = e.clientY - e.target.offsetTop;
      movingImage = e.target;
    }
  };

  //?????? Fabricjs Drop ?????? canvas.on('drop', dropImg)???Drop ??????????????????????????????????????????????????? new fabric.Image ??????????????????
  function dropImg(e) {
    const { offsetX, offsetY } = e.e;
    const image = new fabric.Image(movingImage, {
      width: movingImage.naturalWidth,
      height: movingImage.naturalHeight,
      scaleX: 100 / movingImage.naturalWidth,
      scaleY: 100 / movingImage.naturalHeight,
      top: offsetY - imgDragOffset.offsetY,
      left: offsetX - imgDragOffset.offsetX,
    });
    canvas.add(image);
  }

  const previewUrl = imgFile ? URL.createObjectURL(imgFile) : 'https://react.semantic-ui.com/images/wireframe/image.png';

  return (
    <div>
      <YellowBG />

      <Container>
        <MirrorTitleDiv>
          <ClosetTitle>?????????</ClosetTitle>
        </MirrorTitleDiv>
        <CanvasDiv>
          <canvas id="canvas" onDrop={(e) => dropImg(e, saveImg())} />
          <div style={{ marginTop: '80px', position: 'relative' }}>
            <BtnDiv>
              <DeleteBtn type="submit" onClick={(e) => handleDelete(e)}>
                ??????
                <ExplainDelete>Tip: ???????????????????????????????????????</ExplainDelete>
              </DeleteBtn>

              <DairyPopup
                modal
                trigger={
                  <Btn>
                    ??????
                    <ExplainSave>Tip: ??????????????????????????????????????????</ExplainSave>
                  </Btn>
                }
              >
                {(close) => (
                  <Backdrop>
                    <SaveForm>
                      <Div style={{ width: '100%' }}>
                        <Span>????????????</Span>
                        <Input type="text" value={outfitName} onChange={(e) => setOutfitName(e.target.value)}></Input>
                      </Div>
                      <Div style={{ width: '100%' }}>
                        <Span>?????????</Span>

                        <select value={outfitSeason} onChange={(e) => setOutfitSeason(e.target.value)}>
                          <option>????????????</option>
                          <option value="spring">??????</option>
                          <option value="summer">??????</option>
                          <option value="fall">??????</option>
                          <option value="winter">??????</option>
                        </select>
                      </Div>
                    </SaveForm>
                    <div style={{ marginTop: 'auto', marginBottom: '100px' }}>
                      <SaveBtn
                        onClick={(e) => {
                          handleSave(e);
                          if (outfitName !== '' && outfitSeason !== '') {
                            close();
                          }
                        }}
                      >
                        ??????
                      </SaveBtn>
                    </div>
                  </Backdrop>
                )}
              </DairyPopup>
            </BtnDiv>
          </div>
        </CanvasDiv>

        <ClosetBox>
          <ClosetTitleDiv>
            <ClosetTitle>????????????</ClosetTitle>
          </ClosetTitleDiv>
          <ImgsetBox>
            {isLoading ? (
              <div style={{ width: '150px' }}>
                <Loading />
              </div>
            ) : null}

            <ImgBox id="imgset" onMouseDown={(e) => saveImg(e)}>
              {filerStatus === 'all' ? <TagAll /> : null}
              {filerStatus === 'clothes' ? <Tags tag={'clothes'} /> : null}
              {filerStatus === 'pants' ? <Tags tag={'pants'} /> : null}
              {filerStatus === 'skirt' ? <Tags tag={'skirt'} /> : null}
              {filerStatus === 'shoes' ? <Tags tag={'shoes'} /> : null}
              {filerStatus === 'accessary' ? <Tags tag={'accessary'} /> : null}
            </ImgBox>
            {/* 
            <MobileImgBox id="imgset" onClick={(e) => addImg(e)}>
              {filerStatus === "all" ? <TagAll /> : null}
              {filerStatus === "clothes" ? <Tags tag={"clothes"} /> : null}
              {filerStatus === "pants" ? <Tags tag={"pants"} /> : null}
              {filerStatus === "skirt" ? <Tags tag={"skirt"} /> : null}
              {filerStatus === "shoes" ? <Tags tag={"shoes"} /> : null}
              {filerStatus === "accessary" ? <Tags tag={"accessary"} /> : null}
            </MobileImgBox> */}

            <StyledPopup modal trigger={<AddBtn>+</AddBtn>}>
              {(close) => (
                <Backdrop>
                  <ItemForm>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '140px',
                      }}
                    >
                      <LeftDiv
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                        }}
                      >
                        <label htmlFor="file">
                          <img
                            src={previewUrl}
                            alt="uploadImg"
                            style={{
                              height: '120px',
                              borderRadius: '5px',
                            }}
                          />
                        </label>

                        <Input style={{ display: 'none' }} type="file" id="file" onChange={(e) => setImgFile(e.target.files[0])} />
                      </LeftDiv>
                      <LeftDiv>
                        <Span>?????????</Span>

                        <select value={option} onChange={(e) => setOption(e.target.value)}>
                          <option>?????????</option>
                          <option value="clothes">??????</option>
                          <option value="pants">??????</option>
                          <option value="skirt">??????</option>
                          <option value="shoes">??????</option>
                          <option value="accessary">??????</option>
                        </select>
                      </LeftDiv>

                      <LeftDiv>
                        <Span>?????????</Span>

                        <select value={itemSize} onChange={(e) => setItemSize(e.target.value)}>
                          <option>?????????</option>
                          <option value="F">F</option>
                          <option value="XXS">XXS</option>
                          <option value="XS">XS</option>
                          <option value="S">S</option>
                          <option value="M">M</option>
                          <option value="L">L</option>
                          <option value="XL">XL</option>
                          <option value="XXL">XXL</option>
                        </select>
                      </LeftDiv>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '250px',
                      }}
                    >
                      <Div>
                        <Span>???????????????</Span>
                        <Input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} />
                      </Div>
                      <Div>
                        <Span>???????????????</Span>
                        <InputNum
                          style={{ '-webkit-appearance': 'none' }}
                          type="number"
                          value={price}
                          onChange={(e) => {
                            setPrice(Number(e.target.value));
                          }}
                        />
                      </Div>
                      <Div>
                        <Span>???????????????</Span>

                        <DatePicker
                          dateFormat="yyyy/MM/dd"
                          selected={selectDate}
                          onChange={(e) => {
                            setSelectDate(e);
                          }}
                          maxDate={new Date()}
                        />
                      </Div>
                    </div>
                  </ItemForm>
                  <div style={{ marginTop: 'auto', marginBottom: '100px' }}>
                    <SaveBtn
                      type="submit"
                      onClick={(e) => {
                        summitItem(e);
                        if (imgFile !== '' && itemName !== '' && price !== undefined && itemSize !== '' && option !== '' && date !== '') {
                          close();
                        }
                      }}
                    >
                      ??????
                    </SaveBtn>
                  </div>
                </Backdrop>
              )}
            </StyledPopup>
          </ImgsetBox>
          <TagBox>
            <Tag
              onClick={() => {
                setFilterStatus('all');
              }}
            >
              ??????
            </Tag>
            <Tag1
              onClick={() => {
                setFilterStatus('clothes');
              }}
            >
              ??????
            </Tag1>
            <Tag2
              onClick={() => {
                setFilterStatus('pants');
              }}
            >
              ??????
            </Tag2>
            <Tag3
              onClick={() => {
                setFilterStatus('skirt');
              }}
            >
              ??????
            </Tag3>
            <Tag4
              onClick={() => {
                setFilterStatus('shoes');
              }}
            >
              ??????
            </Tag4>
            <Tag5
              onClick={() => {
                setFilterStatus('accessary');
              }}
            >
              ??????
            </Tag5>
            <MobileTagBox />
          </TagBox>
        </ClosetBox>
      </Container>
    </div>
  );
};

export default FittingRoom;
