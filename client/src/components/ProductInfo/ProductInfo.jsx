import { Carousel } from 'react-responsive-carousel';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchProductInfo } from '../../actions';
import Header from '../Header';
import Footer from '../Footer';

import './ProductInfo.scss';

import img2 from '../../assets/cameras/camera2.jpg';
import img3 from '../../assets/cameras/camera3.jpg';

const ProductInfo = (props) => {
  useEffect(() => {
    props.fetchProductInfo(props.match.params.id);
  }, []);
  const renderInfo = () => {
    if (!props.data.description) {
      return <div>Loading...</div>;
    } else if (props.data.id !== props.match.params.id)
      return <div>loading...</div>;
    else {
      return (
        <div>
          <div className="product-display">
            <div className="product-display-left">
              <Carousel
                className="product-display--carousel"
                showStatus={false}
                autoPlay={true}
                infiniteLoop={true}
                interval={3000}
                showThumbs={false}
                stopOnHover={false}
                swipeable={true}
                useKeyboardArrows={true}
                transitionTime={800}
                showArrows={false}
              >
                {props.data.imageArr.map((el) => {
                  return (
                    <div className="img">
                      <img src={el} alt="img-1" />
                    </div>
                  );
                })}
              </Carousel>
            </div>
            <div className="product-display--content">
              <div className="product-display--content__heading">
                <h1 className="product-display--content__heading-title">
                  {props.data.fullName}
                </h1>
                <p className="product-display--content__heading-rating">
                  Rating: ★{props.data.averageRating}
                </p>
                <hr className="hr" />
                <div className="product-display--content__heading-prices">
                  <p className="mrp">
                    M.R.P: <del>₹ {props.data.originalPrice}</del>
                  </p>
                  <p className="selling">
                    Selling <span>₹ {props.data.finalPrice}</span>
                  </p>
                  <p className="saved">
                    Saved: <span>₹ {props.data.savingPrice}</span>
                  </p>
                </div>
                <div className="product-display--content__heading-description">
                  <p>Description:</p>
                  <ul>
                    {props.data.description.map((el) => {
                      return <li>{el}</li>;
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="product-content">
            <div className="tech-details">
              <h1>Technical Details</h1>
              <hr className="hr" />
              <div className="tech-detials--list">
                {props.data.technicalDetails.map((el) => {
                  return (
                    <div className="tech-details--list__item">
                      <p className="tech-details--list__item-key">
                        {el.detail}
                      </p>
                      <p className="tech-details--list__item-value">
                        {el.value}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="additional-details">
              <h1>Additional Details</h1>
              <hr className="hr" />
              <div className="additional-details--list">
                {props.data.additionalDetails.map((el) => {
                  return (
                    <div className="tech-details--list__item">
                      <p className="tech-details--list__item-key">
                        {el.detail}
                      </p>
                      <p className="tech-details--list__item-value">
                        {el.value}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="reviews">
              <h1>Reviews</h1>
              <hr className="hr" />
              <div className="reviews-list">
                {props.data.reviewArr.map((el) => {
                  return (
                    <div className="reviews-item">
                      <div className="reviews-item__top">
                        <h3 className="reviews-item__top--title">{el.title}</h3>
                        <div className="reviews-item__top--subtitle">
                          <p className="reviews-item__top--subtitle-rating">
                            RATING: {el.rating}
                          </p>
                          <p className="reviews-item__top--subtitle-date">
                            {el.createdAt.slice(0, 10)}
                          </p>
                        </div>
                      </div>
                      <p className="reviews-item__comment">{el.description}</p>
                      <div className="reviews-item__customer">
                        <p>- {el.name}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      );
    }
  };
  return (
    <div className="info">
      <Header />
      {renderInfo()}
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => {
  return { data: state.productInfo };
};
export default connect(mapStateToProps, { fetchProductInfo })(ProductInfo);
