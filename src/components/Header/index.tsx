import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaShoppingCart } from 'react-icons/fa';
import { totalCostSelector, totalCountSelector } from '../../redux/slices/cart/selectors';
import { Search, Button } from '../';
import logo from '../../assets/img/pizza-logo.svg';
import cl from './Header.module.scss';

const Header = () => {
  const totalCount = useSelector(totalCountSelector);
  const totalCost = useSelector(totalCostSelector);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <header className={cl.header}>
      <div className={cl.container}>
        <Link to="/">
          <div className={cl.header__logo}>
            <img width="38" src={logo} alt="Pizza logo" />
            <div>
              <h1>React Pizza</h1>
              <p>самая вкусная пицца во вселенной</p>
            </div>
          </div>
        </Link>

        {location.pathname === '/' && <Search />}

        <div className={cl.header__cart}>
          <Button onClick={() => navigate('/cart')} className="button button--cart">
            <span>${totalCost}</span>
            <div className="button__delimiter"></div>
            <FaShoppingCart />
            <span>{totalCount}</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
