export interface IngredientItem {
  name: string;
  category: '통곡류' | '녹황색채소' | '뿌리채소' | '버섯해조류' | '씨앗류';
  origin: string; // 100% 국내산
  description: string;
}

export interface ProductOption {
  id: string;
  title: string;
  quantityDesc: string;
  price: number;
  originalPrice: number;
  discountRate: number;
  gift?: string;
  isPopular?: boolean;
}

export interface ProductItem {
  id: string;
  name: string;
  category: '생식/간편식' | '건강기능식품' | '분말/정/환 식품' | '건강즙/진액 식품';
  engName?: string;
  badge: string;
  summary: string;
  price: number;
  originalPrice: number;
  discountRate: number;
  image: string;
  fallbackImage: string;
  options: ProductOption[];
  tags: string[];
}

export interface CartItem {
  id: string;
  title: string;
  optionTitle: string;
  price: number;
  quantity: number;
}

export interface OrderForm {
  name: string;
  phone: string;
  zipCode: string;
  address: string;
  detailAddress: string;
  deliveryRequest: string;
  paymentMethod: 'card' | 'naverpay' | 'tosspay' | 'kakaopay' | 'bank';
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
}

export type OrderStatus = '결제완료' | '배송중' | '배송완료';

export interface OrderRecord {
  id: string;
  orderTime: string;
  customerName: string;
  customerPhone: string;
  shippingAddress: string;
  items: CartItem[];
  itemsSummary: string;
  totalAmount: number;
  paymentMethod: string;
  status: OrderStatus;
  isNew?: boolean;
}
