import * as uuid from 'uuid';
// @ts-ignore
import { BaseUser, User, methodResponse } from './interface.ts';
// @ts-ignore
import { readFromDB } from '../helpers/db.ts';

export const findAll = async (): Promise<User[]> => {
  const users = await readFromDB();
  return users;
};

export const find = async (id: number): Promise<User | null> => {
  const users = await findAll();
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) {
    return null;
  }
  return users[index];
};

export const create = async (newBaseUser: BaseUser): Promise<methodResponse> => {
  const id: string = uuid.v4();
  const users = await findAll();
  const newUser = { id, ...newBaseUser };
  users.push(newUser);
  return { newUserList: users, updatedUser: newUser };
};

export const update = async (id: number, userUpdate: BaseUser): Promise<null | methodResponse> => {
  const users = await findAll();
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) {
    return null;
  }
  users[index] = { ...users[index], ...userUpdate };
  return { newUserList: users, updatedUser: users[index] };
};

export const remove = async (id: number): Promise<null | User[]> => {
  const users = await findAll();
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) {
    return null;
  }
  users.splice(index, 1);
  return users;
};
