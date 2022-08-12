// Types and Interfaces

type State = ReturnType<typeof store.getState>;
type Dispatch = typeof store.dispatch;
type Fetch = typeof store.fetch;

interface CustomError extends Error {
  response: {data: {message: string}};
}

interface ItemInterface {
  image: string;
  name: string;
  price: number;
  product: string;
  quantity: number;
  stock: number;
}
