import { Sort, Category } from '../api/PizzaApi';
import { Type } from '../api/types/Pizza';

const sortMap: Record<Sort, string> = {
  [Sort.Price]: 'стоимости',
  [Sort.Popular]: 'популярности',
  [Sort.Name]: 'названию',
};
const categoryNames = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
const typeNames = ['тонкое', 'традиционное'];

export const mapSortToNape = (sort: Sort) => sortMap[sort];
export const mapCategoryToName = (category: Category) => categoryNames[category];
export const mapTypeToName = (type: Type) => typeNames[type];
