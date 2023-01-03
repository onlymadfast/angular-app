import {Role} from "../enum/role";
import {Address} from "./address";
import {Order} from "./order";

export class User {

  constructor(id: string, created: string,
              username: string, password: string,
              email: string, firstName: string,
              lastName: string, middleName: string,
              birthdate: string, role: Role,
              address: Address, order: Array<Order>) {
    this.id = id;
    this.created = created;
    this.username = username;
    this.password = password;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.middleName = middleName;
    this.birthdate = birthdate;
    this.role = role;
    this.address = address;
    this.order = order;
  }

  id:string;
  created: string;
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  middleName: string;
  birthdate: string;
  role: Role;
  address: Address;
  order: Array<Order>;

}
