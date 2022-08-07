// Types and Interfaces

export interface User {
  _id?: string;
  id: String;
  role(role: string);
  getJwtToken(): () => void;
  name: string;
  email: string;
  password: string;
  avatar: {
    public_id: string;
    url: string;
  };
}
