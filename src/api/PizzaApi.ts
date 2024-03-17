import axios from 'axios';
import Pizza, { Category } from './types/Pizza';
import ApiError from './ApiError';

enum Order {
  Asc = 'asc',
  Desc = 'desc',
}

enum Sort {
  Popular = 'rating',
  Name = 'title',
  Price = 'price',
}

interface PaginationProps {
  page: number;
  limit: number;
  sortBy: Sort | undefined;
  order: Order | undefined;
}

interface FilterProps {
  title: string | undefined;
  category: Category | undefined;
}

if (!process.env.REACT_APP_API_BASE_URL) throw new ApiError('Unable to set api');
const baseUrl = process.env.REACT_APP_API_BASE_URL;

export default class PizzasApi {
  static async getAll(paginationProps: PaginationProps, filterProps: FilterProps) {
    try {
      const resp = await axios.get<Pizza[]>(baseUrl, {
        params: { ...paginationProps, ...filterProps },
      });

      return resp.data;
    } catch (e) {
      console.error(e);
      if (e.response && e.response.status === 404) {
        return [];
      }
      throw new ApiError(e.message);
    }
  }
}

export { Sort, Order, Category };
export { PaginationProps, FilterProps };
