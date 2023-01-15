// @ts-ignore
import propertyType from '../helpers/propertyType.ts';
export interface BaseUser {
  username: string;
  age: number;
  hobbies: [string] | [];
}

export interface User extends BaseUser {
  id: string;
}
export interface methodResponse {
  newUserList: User[];
  updatedUser: User;
}
export function instanceOfBaseUser(object: any): object is BaseUser {
  if (Object.getOwnPropertyNames(object).length !== 3) {
    return false;
  }
  return (
    propertyType.isPropertySimpleType(object, 'username', 'string') &&
    propertyType.isPropertySimpleType(object, 'age', 'number') &&
    propertyType.isPropertyArrayType(object, 'hobbies')
  );
}
