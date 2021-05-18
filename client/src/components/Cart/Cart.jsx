import Header from '../Header';
import Footer from '../Footer';
import './cart.scss';
import mobile3 from '../../assets/mobiles/mobile3.jpg';
const Cart = () => {
  return (
    <div>
      <Header />
      <div className="cart">
        <div className="cart-heading">
          My cart <span className="cart-heading-count">3 items</span>
        </div>
        <div className="cart_cont">
          <div className="cart_cont-item">
            <img src={mobile3} className="cart_cont-item-img" alt="product" />
            <div className="cart_cont-item-info">
              <div className="cart_cont-item-title">
                Samsung Galaxy S20 FE 5G (Cloud Navy, 8GB RAM, 128GB Storage)
              </div>
              <div className="cart_cont-item-price">
                Price :{' '}
                <span className="cart_cont-item-price-get"> ₹23210</span> /
                <span className="cart_cont-item-price-original"> ₹29000</span>
              </div>
              <div className="cart_cont-item-btns">
                <button className="cart_cont-item-remove">Remove</button>
                <button className="cart_cont-item-move">
                  Move to wishlist
                </button>
              </div>
              <div className="cart_cont-item-rating">
                <span className="cart_cont-item-rating-none">Rating:</span> ★4.2
              </div>
            </div>
          </div>
          <div className="cart_cont-item">
            <img src={mobile3} className="cart_cont-item-img" alt="product" />
            <div className="cart_cont-item-info">
              <div className="cart_cont-item-title">
                Samsung Galaxy S20 FE 5G (Cloud Navy, 8GB RAM, 128GB Storage)
              </div>
              <div className="cart_cont-item-price">
                Price :{' '}
                <span className="cart_cont-item-price-get"> ₹23210</span> /
                <span className="cart_cont-item-price-original"> ₹29000</span>
              </div>
              <div className="cart_cont-item-btns">
                <button className="cart_cont-item-remove">Remove</button>
                <button className="cart_cont-item-move">
                  Move to wishlist
                </button>
              </div>
              <div className="cart_cont-item-rating">
                <span className="cart_cont-item-rating-none">Rating:</span> ★4.2
              </div>
            </div>
          </div>
          <div className="cart_cont-item">
            <img src={mobile3} className="cart_cont-item-img" alt="product" />
            <div className="cart_cont-item-info">
              <div className="cart_cont-item-title">
                Samsung Galaxy S20 FE 5G (Cloud Navy, 8GB RAM, 128GB Storage)
              </div>
              <div className="cart_cont-item-price">
                Price :{' '}
                <span className="cart_cont-item-price-get"> ₹23210</span> /
                <span className="cart_cont-item-price-original"> ₹29000</span>
              </div>
              <div className="cart_cont-item-btns">
                <button className="cart_cont-item-remove">Remove</button>
                <button className="cart_cont-item-move">
                  Move to wishlist
                </button>
              </div>
              <div className="cart_cont-item-rating">
                <span className="cart_cont-item-rating-none">Rating:</span> ★4.2
              </div>
            </div>
          </div>
        </div>
        <div className="order">
          <div className="order-title">Order Details</div>
          <div className="order-price">
            <div className="order-price-title">Total Price</div>
            <div className="order-price-value"> ₹23210</div>
          </div>
          <div className="order-discount">
            <div className="order-discount-title">Discount</div>
            <div className="order-discount-value"> ₹1000</div>
          </div>
          <div className="order-delivery">
            <div className="order-delivery-title">Delivery</div>
            <div className="order-delivery-value"> ₹50</div>
          </div>
          <div className="order-total">
            <div className="order-total-title">Total Amount</div>
            <div className="order-total-value"> ₹25210</div>
          </div>
          <button className="order-btn">Proceed to sipping &rarr;</button>
        </div>
      </div>

      <Footer />
    </div>
  );
};
export default Cart;
