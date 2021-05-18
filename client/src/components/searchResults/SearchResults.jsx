import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './SearchResults.scss';
import React from 'react';
import Header from '../Header';
import { ReactComponent as WishList } from '../../assets/wishlistcard.svg';
import { fetchCategoryProducts } from '../../actions';
const SearchResults = (props) => {
  useEffect(() => {
    props.fetchCategoryProducts(props.match.params.id, 1);
    console.log(props.data[0]);
  }, []);
  const renderProductItems = () => {
    if (!props.data[0]) return <div>Loading..</div>;
    else if (props.data[0].category !== props.match.params.id)
      return <div>loading ...</div>;
    else {
      return props.data.map((el) => {
        return (
          <Link className="Link" to={`/productInfo/${el.id}`} key={el.id}>
            <div className="procard">
              <img src={el.imageArr[0]} alt="product" className="procard-img" />
              <div className="procard-bottom">
                <div className="procard-info">
                  <div className="procard-info-name">
                    {el.fullName.slice(0, 150)}
                  </div>
                  <div className="procard-info-price">₹{el.finalPrice}</div>
                </div>
                <div className="procard-btns">
                  <button className="procard-btns-wishlist">
                    <WishList className="procard-btns-wishlist-icon" />
                  </button>
                  <button className="procard-btns-cart">Add to cart</button>
                </div>
              </div>
            </div>
          </Link>
        );
      });
    }
  };
  return (
    <React.Fragment>
      <Header />
      <div className="procard-container">
        {renderProductItems()}
        {/* <div className="procard">
          <img
            src="https://images-na.ssl-images-amazon.com/images/I/61NsZ6UrfPL._AC_SY450_.jpg "
            alt="product"
            className="procard-img"
          />
          <div className="procard-bottom">
            <div className="procard-info">
              <div className="procard-info-name">
                AVITA Essential NE14A2INC433-CR 14" (35.56cms)Laptop (Celeron
                N4000/4GB/128GB SSD/Window 10 Home in S Mode/Integrated
                Graphics), Concrete Grey
              </div>
              <div className="procard-info-price">₹17990</div>
            </div>
            <div className="procard-btns">
              <button className="procard-btns-wishlist">
                <WishList className="procard-btns-wishlist-icon" />
              </button>
              <button className="procard-btns-cart">Add to cart</button>
            </div>
          </div>
        </div>
        <div className="procard">
          <img
            src="https://images-na.ssl-images-amazon.com/images/I/71tnnbggvrL._AC_SX679_.jpg "
            alt="product"
            className="procard-img"
          />
          <div className="procard-bottom">
            <div className="procard-info">
              <div className="procard-info-name">
                AVITA Essential NE14A2INC433-CR 14" (35.56cms)Laptop (Celeron
                N4000/4GB/128GB SSD/Window 10 Home in S Mode/Integrated
                Graphics), Concrete Grey
              </div>
              <div className="procard-info-price">₹17990</div>
            </div>
            <div className="procard-btns">
              <button className="procard-btns-wishlist">
                <WishList className="procard-btns-wishlist-icon" />
              </button>
              <button className="procard-btns-cart">Add to cart</button>
            </div>
          </div>
        </div>
        <div className="procard">
          <img
            src="https://images-na.ssl-images-amazon.com/images/I/719F8WdfBzL._AC_SX355_.jpg "
            alt="product"
            className="procard-img"
          />
          <div className="procard-bottom">
            <div className="procard-info">
              <div className="procard-info-name">
                AVITA Essential NE14A2INC433-CR 14" (35.56cms)Laptop (Celeron
                N4000/4GB/128GB SSD/Window 10 Home in S Mode/Integrated
                Graphics), Concrete Grey
              </div>
              <div className="procard-info-price">₹17990</div>
            </div>
            <div className="procard-btns">
              <button className="procard-btns-wishlist">
                <WishList className="procard-btns-wishlist-icon" />
              </button>
              <button className="procard-btns-cart">Add to cart</button>
            </div>
          </div>
        </div>
        <div className="procard">
          <img
            src="https://images-na.ssl-images-amazon.com/images/I/61NsZ6UrfPL._AC_SY450_.jpg "
            alt="product"
            className="procard-img"
          />
          <div className="procard-bottom">
            <div className="procard-info">
              <div className="procard-info-name">
                AVITA Essential NE14A2INC433-CR 14" (35.56cms)Laptop (Celeron
                N4000/4GB/128GB SSD/Window 10 Home in S Mode/Integrated
                Graphics), Concrete Grey
              </div>
              <div className="procard-info-price">₹17990</div>
            </div>
            <div className="procard-btns">
              <button className="procard-btns-wishlist">
                <WishList className="procard-btns-wishlist-icon" />
              </button>
              <button className="procard-btns-cart">Add to cart</button>
            </div>
          </div>
        </div>
        <div className="procard">
          <img
            src="https://images-na.ssl-images-amazon.com/images/I/61NsZ6UrfPL._AC_SY450_.jpg "
            alt="product"
            className="procard-img"
          />
          <div className="procard-bottom">
            <div className="procard-info">
              <div className="procard-info-name">
                AVITA Essential NE14A2INC433-CR 14" (35.56cms)Laptop (Celeron
                N4000/4GB/128GB SSD/Window 10 Home in S Mode/Integrated
                Graphics), Concrete Grey
              </div>
              <div className="procard-info-price">₹17990</div>
            </div>
            <div className="procard-btns">
              <button className="procard-btns-wishlist">
                <WishList className="procard-btns-wishlist-icon" />
              </button>
              <button className="procard-btns-cart">Add to cart</button>
            </div>
          </div>
        </div> */}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return { data: state.productCatogery };
};
export default connect(mapStateToProps, { fetchCategoryProducts })(
  SearchResults
);
