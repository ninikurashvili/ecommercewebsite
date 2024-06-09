export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  weight: string;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warranthyInformation: string;
  shippingInformation: string;
  returnPolicy: String;
  images: string[];
  tags: string[];
}

export interface Products {
  products: Product[];
}
