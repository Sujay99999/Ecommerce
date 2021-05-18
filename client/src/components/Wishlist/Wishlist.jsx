import Header from '../Header';
import Footer from '../Footer';
import './wishlist.scss';
import mobile3 from '../../assets/mobiles/mobile3.jpg';
const Wishlist = () => {
  return (
    <div>
      <Header />
      <div className="wishlist">
        <div className="wishlist-heading">
          My Wishlist <span className="wishlist-heading-count">3 items</span>
        </div>
        <div className="wishlist_cont">
          <div className="wishlist_cont-item">
            <img
              src={mobile3}
              className="wishlist_cont-item-img"
              alt="product"
            />
            <div className="wishlist_cont-item-info">
              <div className="wishlist_cont-item-title">
                Samsung Galaxy S20 FE 5G (Cloud Navy, 8GB RAM, 128GB Storage)
              </div>
              <div className="wishlist_cont-item-price">
                Price :{' '}
                <span className="wishlist_cont-item-price-get"> ₹23210</span> /
                <span className="wishlist_cont-item-price-original">
                  {' '}
                  ₹29000
                </span>
              </div>
              <div className="wishlist_cont-item-btns">
                <button className="wishlist_cont-item-remove">Remove</button>
                <button className="wishlist_cont-item-move">
                  Move to cart
                </button>
              </div>
              <div className="wishlist_cont-item-rating">
                {' '}
                <span className="wishlist_cont-item-rating-none">
                  Rating:
                </span>{' '}
                ★4.2
              </div>
            </div>
          </div>
          <div className="wishlist_cont-item">
            <img
              src={mobile3}
              className="wishlist_cont-item-img"
              alt="product"
            />
            <div className="wishlist_cont-item-info">
              <div className="wishlist_cont-item-title">
                Samsung Galaxy S20 FE 5G (Cloud Navy, 8GB RAM, 128GB Storage)
              </div>
              <div className="wishlist_cont-item-price">
                Price :{' '}
                <span className="wishlist_cont-item-price-get"> ₹23210</span> /
                <span className="wishlist_cont-item-price-original">
                  {' '}
                  ₹29000
                </span>
              </div>
              <div className="wishlist_cont-item-btns">
                <button className="wishlist_cont-item-remove">Remove</button>
                <button className="wishlist_cont-item-move">
                  Move to cart
                </button>
              </div>
              <div className="wishlist_cont-item-rating">
                {' '}
                <span className="wishlist_cont-item-rating-none">
                  Rating:
                </span>{' '}
                ★4.2
              </div>
            </div>
          </div>
          <div className="wishlist_cont-item">
            <img
              src={mobile3}
              className="wishlist_cont-item-img"
              alt="product"
            />
            <div className="wishlist_cont-item-info">
              <div className="wishlist_cont-item-title">
                Samsung Galaxy S20 FE 5G (Cloud Navy, 8GB RAM, 128GB Storage)
              </div>
              <div className="wishlist_cont-item-price">
                Price :{' '}
                <span className="wishlist_cont-item-price-get"> ₹23210</span> /
                <span className="wishlist_cont-item-price-original">
                  {' '}
                  ₹29000
                </span>
              </div>
              <div className="wishlist_cont-item-btns">
                <button className="wishlist_cont-item-remove">Remove</button>
                <button className="wishlist_cont-item-move">
                  Move to cart
                </button>
              </div>
              <div className="wishlist_cont-item-rating">
                <span className="wishlist_cont-item-rating-none">Rating:</span>{' '}
                ★4.2
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Wishlist;
