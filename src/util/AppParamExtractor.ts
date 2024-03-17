import { Category, Order, Sort } from '../api/PizzaApi';

export const enum AppSearchParamName {
  Page = 'page',
  Limit = 'limit',
  Sort = 'sort',
  Order = 'order',
  Category = 'category',
  Search = 'search',
}

//FIND THE WAY TO MAKE CONVERTER NOT REQUIRED PARAM
const extractParam = <T>(
  searchParams: URLSearchParams,
  name: string,
  converter: (val: string) => T,
) => {
  const param = searchParams.get(name);
  if (param) return converter(param);
  return undefined;
};

export default class AppParamExtractor {
  static extractPage = (searchParams: URLSearchParams) =>
    extractParam<number>(searchParams, AppSearchParamName.Page, parseInt) || 1;

  static extractLimit = (searchParams: URLSearchParams): number =>
    extractParam<number>(searchParams, AppSearchParamName.Limit, parseInt) || 3;

  static extractSort = (searchParams: URLSearchParams): Sort | undefined => {
    let param = searchParams.get(AppSearchParamName.Sort);
    if (!param) return undefined;

    param = param.toLocaleLowerCase();
    for (let [name, value] of Object.entries(Sort)) {
      if (param === value) {
        return Sort[name as keyof typeof Sort];
      }
    }

    return undefined;
  };

  static extractOrder = (searchParams: URLSearchParams): Order | undefined => {
    const param = extractParam(searchParams, AppSearchParamName.Order, (t) => t);
    return (param === 'asc' && Order.Asc) || (param === 'desc' && Order.Desc) || undefined;
  };

  static extractCategory = (searchParams: URLSearchParams): Category | undefined =>
    extractParam<Category>(searchParams, AppSearchParamName.Category, parseInt) || undefined;

  static extractSearch = (searchParams: URLSearchParams): string | undefined =>
    extractParam(searchParams, AppSearchParamName.Search, (t) => t) || undefined;
}
