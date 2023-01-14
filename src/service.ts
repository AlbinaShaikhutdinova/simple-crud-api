import * as uuid from 'uuid';
// @ts-ignore
import { BaseUser, User, methodResponse } from './interface.ts';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const users: User[] = require('../data.json');

export const findAll = async (): Promise<User[]> => users;

export const find = async (id: number): Promise<User | null> => {
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) {
    return null;
  }
  return users[index];
};

export const create = async (newBaseUser: BaseUser): Promise<methodResponse> => {
  const id: string = uuid.v4();
  const newUser = { id, ...newBaseUser };
  users.push(newUser);
  return { newUserList: users, updatedUser: newUser };
};

export const update = async (id: number, userUpdate: BaseUser): Promise<null | methodResponse> => {
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) {
    return null;
  }
  console.log(index);
  users[index] = { ...users[index], ...userUpdate };

  return { newUserList: users, updatedUser: users[index] };
};

export const remove = async (id: number): Promise<null | User[]> => {
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) {
    return null;
  }
  users.splice(index, 1);
  return users;
};
