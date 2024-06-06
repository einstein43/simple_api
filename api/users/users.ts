export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
}

export const users: User[] = [
  {
    id: 1,
    name: "admin",
    email: "admin@vitalcare.com",
    password: "admin123!",
    role: "admin",
  },
  {
    id: 2,
    name: "Alexander Janssen",
    email: "a-janssen@vitalcare.com",
    password: "Janssen123!",
    role: "user",
  },
];
