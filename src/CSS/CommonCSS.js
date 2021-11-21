import styled from "styled-components";

const Div = styled.div`
  margin-bottom: 8px;
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

const DeleteBtn = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  font-weight: bolder;
  color: #9aa8ab;
  cursor: pointer;
  &:hover {
    transform: scale(1.2) !important;
    color: #fb8455;
  }
`;

const OKBtn = styled.span`
  background-color: #f3d5caa3;
  text-align: center;
  line-height: 1.6em;
  color: #31342d5c;
  cursor: pointer;
  margin-top: 14px;
  font-size: 13px;
  font-weight: 600;
  border-radius: 15px;
`;

const FormTitle = styled.div`
  margin-bottom: 40px;
  color: #768891f0;
  border-bottom: 5px solid #768891a1;
  font-weight: bold;
`;

const Input = styled.input`
  background-color: #cddbe16e;

  &:focus-visible {
    outline: #6da2b97d 2px solid;
  }
`;

const Textarea = styled.textarea`
  background-color: #cddbe16e;

  &:focus-visible {
    outline: #6da2b97d 2px solid;
  }
`;

export { Div, Span, DeleteBtn, OKBtn, FormTitle, CheckSpan, Textarea, Input };
