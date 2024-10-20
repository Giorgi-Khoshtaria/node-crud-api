import { v4 as uuidv4 } from "uuid";

interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}
let users: User[] = [];

export const getUsers = () => users;

export const getUser = (id: string) => {
  users.find((user) => user.id === id);
};

export const createUser = (userData: Omit<User, "id">) => {
  const newUser: User = { id: uuidv4(), ...userData };
  users.push(newUser);
  return newUser;
};

export const updateUser = (id: string, updates: Partial<User>) => {
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) return null;
  users[index] = { ...users[index], ...updates };
  return users[index];
};

export const deleteUser = (id: string) => {
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) return false;
  users.splice(index, 1);
  return true;
};
