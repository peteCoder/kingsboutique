export interface Image {
  asset: {
    url: string;
  };
}

// ProductSchameType
type Size = {
  _id: string;
  name: string;
  code: string;
};
type Colour = {
  _id: string;
  name: string;
  code: string;
};

type GalleryImage = {
  _id: string;
  _createdAt?: string;
  _updatedAt?: string;
  imageUrl: Image;
  description?: string;
};

type Product = {
  _id: string;
  _createdAt?: string;
  _updatedAt?: string;
  name: string;
  ratings: number;
  price: number;
  is_featured: boolean;
  is_archived: boolean;
  qty_available: number;
  description?: string;
  sizes: Size[];
  colours: Colour[];
  category: Category;
  gallery: GalleryImage[];
};

// CategorySchemaTypes

interface Category {
  _id: string;
  _updatedAt: string;
  _createdAt: string;
  name: string;
  description: string;
  bannerImage: Image;
}

interface HeroBanner {
  _id: string;
  title: string;
  textColor: string;
  subTitle: string;
  bannerImage: Image;
  category: Category;
  _createdAt: string;
  _updatedAt: string;
}

interface SpecialOfferType {
  _id: string;
  _createdAt: string;
  title: string;
  subTitle: string;
  firstBannerImage: Image;
  secondBannerImage: Image;
}

export interface CartItems {
  _id: string;
  _key: string;
  qty: number;
  price: number;
  totalPrice: number;
}

// OrderItems, Order and checkout
interface ProductReference {
  _ref: string;
  _type: "reference";
}

interface OrderItem {
  product: ProductReference;
  _key: string;
  name: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

interface ShippingData {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  country: string;
  city: string;
  phone: string;
  orderNote: string;
}

interface UserData {
  name: string;
  image: string;
  email: string;
}

interface OrderDataType {
  userData: UserData;
  orderItems: OrderItem[];
  shippingData: ShippingData;
}


export interface UserShippingDataForCheckoutForm {
  country: string;
  address: string;
  orderNote: string;
  _id: string;
  email: string;
  customerName: string;
  phone: string;
  city: string;
}

export type ProductSanitySchemaResult = Product;
export type CategorySanitySchemaResult = Category;
export type HeroBannerSchemaResult = HeroBanner;
export type SpecialOfferSchemaResult = SpecialOfferType;
export type OrderUserSchemaResult = OrderDataType;
