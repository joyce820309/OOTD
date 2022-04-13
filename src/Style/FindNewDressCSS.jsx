import styled from "styled-components";
import Popup from "reactjs-popup";

const StyledPopup = styled(Popup)`
  &-overlay {
    background: rgba(0, 0, 0, 0.6);
  }
  &-content {
    margin: auto;
    background: rgb(255, 255, 255);
    width: 700px;
    display: flex;
    height: 550px;
    border-radius: 25px;
  }
`;

const CheckPopup = styled(StyledPopup)`
  &-content {
    width: 400px;
    height: 500px;
  }
`;

const Backdrop = styled.div`
  width: 100%;
  height: 100%;
  background-color: #aebabf57;
  display: flex;
  justify-content: space-evenly;
  position: relative;
  border-radius: 25px;
`;

const Input = styled.input`
  background-color: #cddbe16e;
`;

const Div = styled.div`
  margin: 5px auto;
`;
const Span = styled.span`
  color: #3f484cc2;
  font-weight: 600;
  font-size: 0.8rem;
`;

const CheckSpan = styled.span`
  font-weight: 700;
  font-size: 0.9rem;
  color: #3f484ca3;
  background-color: #e5c07366;
  border-radius: 8px;
`;

const Submitbtn = styled.div`
  background-color: #f3d5caa3;
  text-align: center;
  line-height: 1.6em;
  color: #31342d5c;
  cursor: pointer;
  margin-top: 14px;
  font-size: 13px;
  font-weight: 600;
  border-radius: 15px;
  &:hover {
    transform: scale(1.2) !important;
    background-color: #f3d5ca;
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px 40px;
  margin: 0 auto;
  padding: 40px;
  @media screen and (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 40px 40px;
  }
  @media screen and (max-width: 532px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 30px 30px;
  }
`;

const EachBox = styled.div`
  position: relative;
  background: #fff;
  padding: 1rem;
  box-shadow: 0 0.2rem 1.2rem rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 100%;
  @media screen and (max-width: 1100px) {
    padding: 0.5rem;
  }
`;

const Label = styled.div``;
const ImgBox = styled.div`
  height: 260px;
  margin-bottom: 15px;
  padding: 5px;
  display: flex;
  justify-content: center;
  &:hover {
    transform: scale(1.1) !important;
    transition: all 0.35s;
  }
  @media screen and (max-width: 1100px) {
    height: 300px;
  }
  @media screen and (max-width: 767px) {
    height: 230px;
  }
`;

const DetailBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 8px;
  background-color: #b8d5db5c;
  color: #39474ab8;
  padding: 5px 16px;
  width: 100%;
`;

const Detail = styled.div`
  font-size: 1rem;
  text-align: center;
  line-height: 2em;
  font-weight: 700;
  color: #6e7f83b5;
  letter-spacing: 0.2rem;
  @media screen and (max-width: 350px) {
    font-size: 0.6rem;
    line-height: 1.5em;
  }
`;

const Button = styled.div`
  background-color: #a9dbe596;
  text-align: center;
  color: #31342d5c;
  cursor: pointer;
  border-radius: 5px;
  margin: 8px auto 3px auto;
  padding: 3px 10px;
  font-size: 1rem;
  font-weight: 600;
  &:hover {
    background-color: #ffdd759e;
  }
  @media screen and (max-width: 350px) {
    font-size: 0.6rem;
    line-height: 1.5em;
  }
`;

export {
  StyledPopup,
  CheckPopup,
  Backdrop,
  Input,
  Div,
  Span,
  CheckSpan,
  Submitbtn,
  Container,
  EachBox,
  Label,
  ImgBox,
  DetailBox,
  Detail,
  Button,
};
