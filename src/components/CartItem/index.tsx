import React from 'react';
import { IoIosClose } from 'react-icons/io';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { Button } from '../';
import { useDispatch } from 'react-redux';
import { add, remove, removeAll } from '../../redux/slices/cart/slice';
import { CartItem as CartItemProps } from '../../redux/slices/cart/types';
import { mapTypeToName } from '../../util/enumMapers';

const CartItem = ({ id, imgUrl, title, type, size, price, count }: CartItemProps) => {
  const dispatch = useDispatch();

  return (
    <li className="cart__item">
      <div className="cart__item-img">
        <img className="pizza-block__image" src={imgUrl} alt="Pizza" />
      </div>
      <div className="cart__item-info">
        <h3>{title}</h3>
        <p>
          {mapTypeToName(type)}, {size} см.
        </p>
      </div>
      <div className="cart__item-count">
        <Button
          onClick={() => dispatch(remove({ id, size, type }))}
          className="button button--outline button--circle cart__item-count-minus">
          <FaMinus />
        </Button>
        <strong>{count}</strong>
        <Button
          onClick={() => dispatch(add({ id, imgUrl, title, size, type, price }))}
          className="button button--outline button--circle cart__item-count-plus">
          <FaPlus />
        </Button>
      </div>
      <div className="cart__item-price">
        <strong>${price * count}</strong>
      </div>
      <div className="cart__item-remove">
        <Button
          onClick={() => dispatch(removeAll({ id, type, size }))}
          className="button button--outline button--circle">
          <IoIosClose />
        </Button>
      </div>
    </li>
  );
};

export default CartItem;
