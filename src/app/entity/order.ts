import {HowPay} from "../enum/howPay";
import {HowDeliver} from "../enum/howDeliver";
import {StatusPay} from "../enum/statusPay";
import {StatusOrder} from "../enum/statusOrder";
import {Item} from "./item";
import {User} from "./user";

export class Order {


  constructor(id: number, created: string,
              orderDate: string, howPay: HowPay,
              howDeliver: HowDeliver, statusPay: StatusPay,
              statusOrder: StatusOrder, approvedFlag:
                boolean, items: Array<Item>, user: User) {
    this.id = id;
    this.created = created;
    this.orderDate = orderDate;
    this.howPay = howPay;
    this.howDeliver = howDeliver;
    this.statusPay = statusPay;
    this.statusOrder = statusOrder;
    this.approvedFlag = approvedFlag;
    this.items = items;
    this.user = user;
  }

  id: number;
  created: string;
  orderDate: string;
  howPay: HowPay;
  howDeliver: HowDeliver;
  statusPay: StatusPay;
  statusOrder: StatusOrder;
  approvedFlag: boolean;
  items: Array<Item>;
  user: User;

}
