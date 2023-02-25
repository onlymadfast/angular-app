import {Component, OnInit} from '@angular/core';
import {Item} from "../entity/item";
import {ActivatedRoute, Router} from "@angular/router";
import {ItemService} from "../service/item.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LocalStorageService} from "../service/localStorageService";
import {firstValueFrom} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.css']
})
export class UpdateItemComponent implements OnInit {

  itemForCreate!: ItemForCreate;
  item!: Item;
  onSale!: boolean;
  currentCategory: string = '';
  id!: string;
  saved: boolean = false;

  isThatEditSingleItem: boolean = false;
  idFromParam = this.route.snapshot.params[`id`];

  formCreateItem = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    quantityOnWarehouse: new FormControl('', Validators.required),
    quantity: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required)
  })

  formEditItem = new FormGroup({
    name: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    quantityOnWarehouse: new FormControl(null, Validators.required),
    quantity: new FormControl(null, Validators.required),
    price: new FormControl(null, Validators.required),
    onSale: new FormControl(null),
    category: new FormControl(null, Validators.required)
  })


  constructor(private itemService: ItemService,
              private route: ActivatedRoute,
              private localStorageService: LocalStorageService,
              private router: Router,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    //if its edit - get item
    if (this.idFromParam != null) {
      this.isThatEditSingleItem = true
      this.getItem()
    }
  }

  public onEditItem() {
    return this.updateItem();
  }

  public async onCreateItem() {
    const isCanMakeProduct = this.localStorageService.getData("authorities");
    if (isCanMakeProduct.includes("ROLE_ADMIN")) {

      const f = this.formCreateItem.value;
      this.itemForCreate = new ItemForCreate(
        f.name, f.description, f.quantityOnWarehouse, f.quantity, f.price, f.category)

      await firstValueFrom(this.itemService.createItem(this.itemForCreate))
        .then(() => this.router.navigate(['/']))
        .then(() => this.snackBar.open("Successfully create item", "Ok"))
    }
  }

  private getItem() {
    this.itemService.getItem(this.idFromParam)
      .subscribe(data => {
        this.id = data.id;
        this.item = data;
        this.currentCategory = data.category

        this.formEditItem = new FormGroup({
          name: new FormControl(data.name, Validators.required),
          description: new FormControl(data.description, Validators.required),
          quantityOnWarehouse: new FormControl(data.quantityOnWarehouse, Validators.required),
          quantity: new FormControl(data.quantity, Validators.required),
          price: new FormControl(data.price, Validators.required),
          onSale: new FormControl(data.onSale),
          category: new FormControl(data.category, Validators.required)
        })
      })
  }

  //update item by id from endpoint
  private async updateItem() {
    const f = this.formEditItem.value
    this.item.name = f.name
    this.item.description = f.description
    this.item.quantityOnWarehouse = f.quantityOnWarehouse
    this.item.quantity = f.quantity
    this.item.price = f.price
    this.item.onSale = f.onSale
    this.item.category = f.category

    await firstValueFrom(this.itemService.updateItem(this.id, this.item))
      .then(data => {
        this.onSale = data.onSale;
        this.item = data;
        this.saved = true;
      })
      .then(() => this.router.navigate(['/item/', this.id]))
  }

  //filter categories, not show current
  private categoryInit(category: string): string[] {
    const cat = ["CLOTHING", "SHOES", "ACCESSORIES"];
    return cat.filter(s => !s.includes(category));
  }

}

export class ItemForCreate {

  constructor(name: string, description: string, quantityOnWarehouse: number,
              quantity: number, price: number, category: string) {
    this.name = name;
    this.description = description;
    this.quantityOnWarehouse = quantityOnWarehouse;
    this.quantity = quantity;
    this.price = price;
    this.category = category;
  }

  name: string;
  description: string;
  quantityOnWarehouse: number;
  quantity: number;
  price: number;
  category: string;

}
