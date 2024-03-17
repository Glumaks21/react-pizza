import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Button from '../UI/Button';
import cl from './Pagination.module.scss';
import AppParamExtractor from '../../util/AppParamExtractor';

export const Pagination = ({ totalPages }: { totalPages: number }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currPage = AppParamExtractor.extractPage(searchParams);

  const pageArray = [...new Array(totalPages)].map((_, i) => i + 1);

  const handleButtonClick = (page: number) => {
    searchParams.set('page', page.toString());
    setSearchParams(searchParams);
  };

  return (
    <ul className={cl.pagination}>
      {pageArray.map((p) => (
        <li key={p} className={currPage === p ? 'active' : ''}>
          <Button onClick={() => handleButtonClick(p)} className="button button--circle">
            {p}
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
