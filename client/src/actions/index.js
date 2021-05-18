import axios from 'axios';
const baseUrl = 'http://127.0.0.1:8080/api/v1/products';

export const fetchCategoryProducts = (categoryName, page) => {
  return async (dispatch) => {
    const { data } = await axios.get(`${baseUrl}/category/${categoryName}`, {
      params: {
        feildsCapacity: 'low',
        page,
        limit: 50,
      },
    });
    dispatch({ type: 'PRODUCT', payload: data.data.products });
  };
};
export const fetchProductInfo = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`${baseUrl}/${id}`);
    console.log(data.data.product);
    dispatch({ type: 'PRODUCT_INFO', payload: data.data.product });
  };
};
