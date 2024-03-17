import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clear } from '../redux/slices/cart/slice';
import { FaShoppingCart, FaRegTrashAlt, FaArrowLeft } from 'react-icons/fa';
import emptyCart from '../assets/img/empty-cart.png';
import { Button, InfoBlock, CartItem } from '../components';
import { RootState } from '../redux/store';
import { totalCostSelector, totalCountSelector } from '../redux/slices/cart/selectors';

export default function Cart() {
  const cart = useSelector((state: RootState) => state.cart.items);
  const totalCount = useSelector(totalCountSelector);
  const totalCost = useSelector(totalCostSelector);
  const dispatch = useDispatch();

  return (
    <div className="container container--cart">
      {cart.length > 0 ? (
        <div className="cart">
          <div className="cart__top">
            <h2 className="content__title">
              <FaShoppingCart />
              Корзина
            </h2>
            <div className="cart__clear">
              <FaRegTrashAlt />
              <span onClick={() => dispatch(clear())}>Очистить корзину</span>
            </div>
          </div>

          <ul className="cart__items">
            {cart.map((item, i) => (
              <CartItem key={i} {...item} />
            ))}
          </ul>
          <div className="cart__bottom">
            <div className="cart__bottom-details">
              <span>
                Всего пицц: <strong>{totalCount} шт.</strong>{' '}
              </span>
              <span>
                Сумма заказа: <strong>${totalCost}</strong>{' '}
              </span>
            </div>
            <div className="cart__bottom-buttons">
              <Link to="/">
                <Button className="button button--outline button--add go-back-btn">
                  <FaArrowLeft />
                  <span>Вернуться назад</span>
                </Button>
              </Link>

              <Button className="button pay-btn">
                <span>Оплатить сейчас</span>
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
}

function EmptyCart() {
  return (
    <div className="cart cart--empty">
      <InfoBlock title="Корзина пустая 😕" description={['Нету питсы.', 'Я хачу питсы.']} />
      <img src={emptyCart} alt="Empty cart" />
      <Link to="/">
        <Button className="button button--black">Вернуться назад</Button>
      </Link>
    </div>
  );
}
