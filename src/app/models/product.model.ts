export interface ProductModelServer {
  id: number;
  title: string;
  category: String;
  description: String;
  imagePath: string;
  price: number;
  quantity: number;
  images: String;
}


export interface serverResponse  {
  count: number;
  products: ProductModelServer[]
};
