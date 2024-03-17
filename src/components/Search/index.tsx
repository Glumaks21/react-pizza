import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import debounce from 'debounce';
import { AppSearchParamName } from '../../util/AppParamExtractor';
import cl from './Search.module.scss';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedSearchParamsChange = useCallback(
    debounce((search, searchParams) => {
      searchParams.set(AppSearchParamName.Search, search);
      setSearchParams(searchParams);
    }, 500),
    [],
  );

  useEffect(() => {
    const searchParam = searchParams.get(AppSearchParamName.Search) || '';
    if (searchParam !== searchQuery) {
      setSearchQuery(searchParam);
    }
  }, [searchParams.get(AppSearchParamName.Search)]);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    debouncedSearchParamsChange(e.target.value, searchParams);
  };

  const onClearClick = () => {
    setSearchQuery('');
    searchParams.delete('search');
    setSearchParams(searchParams);
    inputRef.current?.focus();
  };

  return (
    <div className={cl.search_block}>
      <span className={cl.icon}>
        <FaSearch />
      </span>
      <input ref={inputRef} value={searchQuery} onChange={onInputChange} className={cl.search} />
      {searchQuery && (
        <span className={cl.close_icon} onClick={onClearClick}>
          <IoMdClose />
        </span>
      )}
    </div>
  );
};

export default Search;
