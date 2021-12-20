const Comp = (props) => {
  return (
    <Div key={i}>
      <Span>
        我交換出去的是：
        <input
          type="text"
          placeholder={props.exchangeItem.data.exchangeName}
          onChange={(e) => props.setName(e.target.value)}
          style={{ margin: "8px 10px 10px 0" }}
        />
        <OKBtn onClick={props.updateName}>好了</OKBtn>
      </Span>
    </Div>
  );
};
