import { combineReducers } from 'redux';
const productReducer = (data = [], action) => {
  switch (action.type) {
    case 'PRODUCT':
      return [...action.payload];
    default:
      return [...data];
  }
};
const productInfoReducer = (data = {}, action) => {
  switch (action.type) {
    case 'PRODUCT_INFO':
      return { ...action.payload };
    default:
      return { ...data };
  }
};
export default combineReducers({
  productCatogery: productReducer,
  productInfo: productInfoReducer,
});
