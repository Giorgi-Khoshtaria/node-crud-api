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
  return users.find((user) => user.id === id);
};

export const createUser = (
  username: string,
  age: number,
  hobbies: string[]
) => {
  const newUser = { id: uuidv4(), username, age, hobbies };
  users.push(newUser);
  return newUser;
};
export const updateUser = (
  id: string,
  username: string,
  age: number,
  hobbies: string[]
) => {
  const user = getUser(id);
  if (!user) return null;
  user.username = username;
  user.age = age;
  user.hobbies = hobbies;
  return user;
};
export const deleteUser = (id: string) => {
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) return null;
  return users.splice(index, 1);
};
