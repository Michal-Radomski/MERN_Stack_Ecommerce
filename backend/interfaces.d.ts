// Types and Interfaces

export interface User {
  getJwtToken(): () => void;
  name: string;
  email: string;
  password: string;
  avatar: {
    public_id: string;
    url: string;
  };
}
