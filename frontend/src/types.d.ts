export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Note {
  _id: string;
  title: string;
  content: string;
  createdAt?: string;
}
