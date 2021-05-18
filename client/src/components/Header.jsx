import { useState } from 'react';
import { Link } from 'react-router-dom';

// import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import './header.scss';

import { ReactComponent as Logo } from '../assets/Logo.svg';
import { ReactComponent as SearchIcon } from '../assets/searchIcon.svg';
import { ReactComponent as WishList } from '../assets/wishlist.svg';
import { ReactComponent as Cart } from '../assets/cart.svg';

const Header = () => {
  const [term, setTerm] = useState('');
  return (
    <div>
      <div className="header">
        <Link to={'/'} className="Link">
          {' '}
          <Logo className="header_logo" />
        </Link>
        <div className="flex header_right">
          {' '}
          <form className="header_form">
            <input
              value={term}
              type="text"
              className="header_form-input"
              placeholder="search here..."
              onChange={(e) => setTerm(e.target.value)}
            />
            <button className="header_form-btn">
              <SearchIcon className="header_form-btn-img" />
            </button>
          </form>
          <Link to={'/wishlist'} className="header_wishlist">
            <WishList className="header_wishlist-img" />
            {/* <FavoriteRoundedIcon 
              classes={{
                root: "header_wishlist-img",
              }}
            /> */}
            <span className="header_wishlist-name">wishlist</span>
          </Link>
          <Link to={'/cart'} className="header_cart">
            <Cart className="header_cart-img" />
            <span className="header_cart-name">cart</span>
          </Link>
          <Link to={'/login'} className="header_login">
            login
          </Link>
        </div>
      </div>
      <nav className="nav">
        <Link to={'/results/laptops'} className="nav_item">
          LAPTOPS
        </Link>
        <Link to={'/results/mobiles'} className="nav_item">
          MOBILES
        </Link>
        <Link to={'/results/cameras'} className="nav_item">
          CAMERAS
        </Link>
        <Link to={'/results/headphones'} className="nav_item">
          HEADPHONES & SOUND SYSTEMS
        </Link>
        <Link to={'/results/tvs'} className="nav_item">
          TVS
        </Link>
      </nav>
    </div>
  );
};
export default Header;
