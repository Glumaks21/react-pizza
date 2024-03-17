export interface CartItem {
  id: number;
  imgUrl: string;
  title: string;
  type: number;
  size: number;
  price: number;
  count: number;
}

export type CartItemComparisonFields = Pick<CartItem, 'id' | 'size' | 'type'>;

export interface CartState {
  items: CartItem[];
}
