import React from 'react';
import { useSearchParams } from 'react-router-dom';
import AppParamExtractor, { AppSearchParamName } from '../../util/AppParamExtractor';
import { mapCategoryToName } from '../../util/enumMapers';
import { Category } from '../../api/PizzaApi';
import cl from './Categories.module.scss';

const Categories = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = AppParamExtractor.extractCategory(searchParams) || Category.All;

  const handleCategoryClick = (category: Category) => {
    category
      ? searchParams.set(AppSearchParamName.Category, category.toString())
      : searchParams.delete(AppSearchParamName.Category);

    setSearchParams(searchParams);
  };

  return (
    <ul className={cl.content}>
      {/* YOBANIY ENUM */}
      {/* {Object.values(Category).map((c) => (
        <li
          key={c}
          onClick={() => handleCategoryClick(c)}
          className={activeCategory === c ? cl.active : null}>
          {mapCategoryToName(c)}
        </li>
      ))} */}
    </ul>
  );
};

export default Categories;
