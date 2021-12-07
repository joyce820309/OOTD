export const calaulateExp = (money, budget, expense, setRemain) => {
  money = Number(budget - expense);
  setRemain(money);
};
