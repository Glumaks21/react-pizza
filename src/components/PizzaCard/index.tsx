import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaPlus } from 'react-icons/fa';
import { selectCartItems } from '../../redux/slices/cart/selectors';
import { useAppDispatch } from '../../redux/store';
import { add } from '../../redux/slices/cart/slice';
import Button from '../UI/Button';
import { mapTypeToName } from '../../util/enumMapers';
import cl from './PizzaCard.module.scss';
import Pizza from '../../api/types/Pizza';

const PizzaCard = ({ id, title, price, imgUrl, types, sizes }: Pizza) => {
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [selectedType, setSelectedType] = useState(0);
  const cartItems = useSelector(selectCartItems);
  const countInCart = cartItems.find((i) => i.id === id)?.count;
  const dispatch = useAppDispatch();

  const handleAdd = () => {
    dispatch(add({ id, title, price, imgUrl, size: selectedSize, type: selectedType }));
  };

  return (
    <div className={cl.content}>
      <img className={cl.content__cover} src={imgUrl} alt="Pizza" />
      <h4 className={cl.content__title}>{title}</h4>
      <div className={cl.content__selector}>
        <ul>
          {types.map((t) => (
            <li
              key={t}
              onClick={() => setSelectedType(t)}
              className={selectedType === t ? cl.active : ''}>
              {mapTypeToName(t)}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((s, i) => (
            <li
              key={i}
              onClick={() => setSelectedSize(s)}
              className={selectedSize === sizes[i] ? cl.active : ''}>
              {s} см.
            </li>
          ))}
        </ul>
      </div>
      <div className={cl.content__bottom}>
        <div className={cl.content__price}>от ${price}</div>
        <Button className="button button--outline button--add" onClick={handleAdd}>
          <FaPlus />
          <span>Добавить</span>
          {countInCart && <i>{countInCart}</i>}
        </Button>
      </div>
    </div>
  );
};

export default PizzaCard;
