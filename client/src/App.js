import { Router, Route, Switch } from 'react-router-dom';
import history from './history';
import ScrollToTop from './ScrollToTop';

import LandingPg from './components/Landing/LandingPg';
import SearchResults from './components/SearchResults/SearchResults';
import Signup from './components/Signup/Signup.jsx';
import Login from './components/Login/Login.jsx';
import ProductInfo from './components/ProductInfo/ProductInfo.jsx';
import Wishlist from './components/Wishlist/Wishlist.jsx';
import Cart from './components/Cart/Cart.jsx';

import './App.scss';

const App = () => {
  return (
    <div>
      <Router history={history}>
        <ScrollToTop>
          <Switch>
            <Route path="/" exact component={LandingPg} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/login" exact component={Login} />
            <Route path="/wishlist" exact component={Wishlist} />
            <Route path="/cart" exact component={Cart} />
            {/* <Route path="/results/:id" exact component={SearchResults} /> */}
            <Route path="/productInfo/:id" exact component={ProductInfo} />
            <Route
              path={`/results/:id`}
              render={(props) => (
                <SearchResults key={props.match.params.id} {...props} />
              )}
            />
          </Switch>
        </ScrollToTop>
      </Router>
    </div>
  );
};

export default App;
