// Types and Interfaces

export interface User {
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
