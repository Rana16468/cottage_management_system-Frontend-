export const ProductCalculation = (MyAddToCard) => {
  return MyAddToCard?.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.price * currentItem.count;
  }, 0);
};

export const ProductCalculationLength = (MyAddToCard) => {
  return MyAddToCard?.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.count;
  }, 0);
};
