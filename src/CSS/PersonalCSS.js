import styled from "styled-components";
import Popup from "reactjs-popup";

const ClosetContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 720px;
  padding: 15px;
  background-color: #cfdee1;
  overflow-y: scroll;
  z-index: 5;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    background: #cfdee1;
  }

  &::-webkit-scrollbar-thumb {
    border: 3px solid #cfdee1;
  }
  scrollbar-width: 5px;
  scrollbar-color: #cfdee1 #cfdee1;
  @media screen and (max-width: 900px) {
    justify-content: space-evenly;
  }
`;

const ClosetItem = styled.div`
  box-shadow: 0 1px 8px 0 rgb(34 36 38 / 18%);
  width: 20%;
  height: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px;
  background: white;
  padding: 10px;
  position: relative;
  @media screen and (max-width: 1200px) {
    width: 25%;
    height: 25%;
  }
  @media screen and (max-width: 900px) {
    height: 30%;
    width: 35%;
  }
  @media screen and (max-width: 750px) {
    height: 25%;
    width: 40%;
  }
  @media screen and (max-width: 720px) {
    width: 50%;
  }
  @media screen and (max-width: 550px) {
    width: 60%;
  }
`;

const PendingDiv = styled.div`
  position: absolute;
  bottom: 88px;
  text-align: center;
  background-color: #7ecb8180;
  color: #424e42bf;
  width: 107%;
  height: 1.9rem;
  font-weight: 800;
  transform: rotate(-2.8deg);
  cursor: pointer;
  &:hover {
    background-color: #d7d272a3;
  }
`;

const DoneDiv = styled(PendingDiv)`
  background-color: #cd8c87b3;
`;

const NewHomeBtn = styled.div`
  position: absolute;
  right: -10px;
  bottom: 5px;
  background-color: #aacdd596;
  color: #6696a1;
  cursor: pointer;
  font-size: 14px;
  padding: 5px 16px 5px 22px;
  transform: rotate(1.8deg);
  &:hover {
    transform: scale(1.2) !important;
    transform: rotate(1.8deg);
    background-color: #fb84555e;
    color: #31342d5c;
  }
`;

const StyledPopup = styled(Popup)`
  &-overlay {
    background: rgba(0, 0, 0, 0.6);
  }
  &-content {
    margin: auto;
    background: rgb(255, 255, 255);
    width: 500px;
    display: flex;
    height: 550px;
    border-radius: 25px;
    background-color: snow;
  }
`;

const DonePopup = styled(StyledPopup)`
  &-content {
    background-color: #ebf3f5;
  }
`;

const PendingPopup = styled(StyledPopup)`
  &-content {
    background-color: snow;
  }
`;

const Backdrop = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  border-radius: 25px;
  /* background-color: #aebabf57; */
`;

const ItemForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const ImgPopup = styled.div`
  box-shadow: 0 0.2rem 1.2rem rgb(0 0 0 / 20%);
  margin: 15px;
  width: 30%;
  height: 160px;
  display: flex;
  justify-content: center;
  background-color: snow;
  border-radius: 5px;
`;

const NameBtn = styled.div`
  background-color: #f3d5ca;
  text-align: center;
  line-height: 1.6em;
  color: #31342d5c;
  cursor: pointer;
  width: 43% !important;
  margin: 0 auto;
  font-size: 13px;
  font-weight: 600;
  border-radius: 8px;
  margin-bottom: 5px;
  &:hover {
    transform: scale(1.2) !important;
  }
`;

const Submitbtn = styled.span`
  background-color: #d4e4ebc9;
  text-align: center;
  line-height: 1.6em;
  color: #31342d5c;
  cursor: pointer;
  margin: 0 auto;
  font-size: 13px;
  font-weight: 900;
  border-radius: 15px;
  &:hover {
    transform: scale(1.2) !important;
  }
`;

const EditBtn = styled(Submitbtn)`
  background-color: #d4e4eb;
  margin-left: 9px;
`;

const EmptyContainer = styled.div`
  width: 100%;
  padding-top: 60px;
  display: flex;
  justify-content: center;
`;

export {
  EmptyContainer,
  ClosetContainer,
  ClosetItem,
  PendingDiv,
  DoneDiv,
  NewHomeBtn,
  StyledPopup,
  PendingPopup,
  DonePopup,
  Backdrop,
  EditBtn,
  ImgPopup,
  ItemForm,
  NameBtn,
  Submitbtn,
};
