import {Category} from "../enum/category";
import {Order} from "./order";

export class Item {

  constructor(id: string, created: string,
              image: string, name: string,
              description: string, quantityOnWarehouse: number,
              quantity: number, price: number,
              category: Category, countBuy: number,
              onSale: boolean, order: Order) {
    this.id = id;
    this.created = created;
    this.image = image;
    this.name = name;
    this.description = description;
    this.quantityOnWarehouse = quantityOnWarehouse;
    this.quantity = quantity;
    this.price = price;
    this.category = category;
    this.countBuy = countBuy;
    this.onSale = onSale;
    this.order = order;
  }

  id: string;
  created: string;
  image: string;
  name: string;
  description: string;
  quantityOnWarehouse: number;
  quantity: number;
  price: number;
  category: Category;
  countBuy: number;
  onSale: boolean;
  order: Order;

}
