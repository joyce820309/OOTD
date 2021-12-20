import styled from "styled-components";

const HeaderSignin = styled.div`
  color: #ed8f03;
`;

const SocialContainer = styled.div`
  margin: 20px 0;
  cursor: pointer;
  color: #4e4949;
  font-size: 0.7rem;
  width: 76%;
  padding: 5px;
  border-bottom: 4px solid #eee;
  &:hover {
    background-color: #f5d1c36b;
    border-radius: 8px;
    border-bottom: 4px solid transparent;
  }
`;

const Input = styled.input`
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
  border-radius: 5px;
`;

const SocialA = styled.a`
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
  border: 1px solid #ecd9bc;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 9px 0 3px;
  height: 30px;
  width: 30px;
`;

const Form = styled.div`
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
`;

const ErrDiv = styled.div`
  color: #f5756c;
`;

const Span = styled.span`
  font-size: 12px;
`;

export { HeaderSignin, SocialContainer, SocialA, Form, ErrDiv, Input, Span };
