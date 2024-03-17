import React, { useEffect, useRef, useState } from 'react';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import { useSearchParams } from 'react-router-dom';
import { Order, Sort as SortType } from '../../api/PizzaApi';
import AppParamExtractor, { AppSearchParamName } from '../../util/AppParamExtractor';
import { mapSortToNape } from '../../util/enumMapers';
import cl from './Sort.module.scss';

const Sort = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sort: SortType = AppParamExtractor.extractSort(searchParams) || SortType.Popular;
  const order: Order = AppParamExtractor.extractOrder(searchParams) || Order.Asc;

  const [isPopupVisible, setPopupVisible] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleBodyClick = (e: MouseEvent) => {
      setPopupVisible(sortRef.current !== null && sortRef.current.contains(e.target as Node));
    };
    document.addEventListener('click', handleBodyClick);
    return () => document.removeEventListener('click', handleBodyClick);
  }, []);

  const handleSortClick = (sort: SortType) => {
    searchParams.set(AppSearchParamName.Sort, sort.toString());
    setSearchParams(searchParams);
  };

  const handleOrderClick = () => {
    const newOrder = order === Order.Asc ? Order.Desc : Order.Asc;
    searchParams.set(AppSearchParamName.Order, newOrder.toString());
    searchParams.set(AppSearchParamName.Sort, sort.toString());
    setSearchParams(searchParams);
  };

  return (
    <div className={cl.sort} ref={sortRef}>
      <span className={cl.sort__label}>
        <span onClick={handleOrderClick}>
          {order === Order.Asc ? <FaCaretDown /> : <FaCaretUp />}
        </span>
        <b>Сортировка по:</b>
        <span className={cl.sort__label_type} onMouseEnter={() => setPopupVisible(true)}>
          {mapSortToNape(sort)}
        </span>
      </span>
      {isPopupVisible && (
        <div className={cl.sort__popup} onMouseLeave={() => setPopupVisible(false)}>
          <ul>
            {Object.values(SortType).map((s) => (
              <li
                key={s}
                onClick={() => handleSortClick(s)}
                className={s === sort ? cl.active : ''}>
                {mapSortToNape(s)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
