enum Category {
  All,
  Meat,
  Vegan,
  Grill,
  Spicy,
  Closed,
}

enum Type {
  Thin,
  Traditional,
}

interface Pizza {
  id: number;
  imgUrl: string;
  title: string;
  types: Type[];
  sizes: number[];
  price: number;
  category: Category;
  rating: number;
}

export { Type, Category };
export default Pizza;
