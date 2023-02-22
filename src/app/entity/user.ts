import {Role} from "../enum/role";
import {Address} from "./address";
import {Order} from "./order";

export class User {

  constructor(username: string, password: string,
              email: string, firstName: string,
              lastName: string, middleName: string,
              birthdate: string) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.middleName = middleName;
    this.birthdate = birthdate;
  }

  id?: string;
  created?: string;
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  middleName: string;
  birthdate: string;
  role?: Role;
  address?: Address;
  order?: Array<Order>;

}
