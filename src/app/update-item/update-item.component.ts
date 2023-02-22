import {Component, OnInit} from '@angular/core';
import {Item} from "../entity/item";
import {ActivatedRoute, Router} from "@angular/router";
import {ItemService} from "../service/item.service";

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.css']
})
export class UpdateItemComponent implements OnInit {
  item!: Item;
  onSale!: boolean;
  categories: string[] = [];
  id!: string;
  saved: boolean = false;

  constructor(private itemService: ItemService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getItem()
  }

  private getItem() {
    this.id = this.route.snapshot.params[`id`];
    this.itemService.getItem(this.id).subscribe(data => {
      this.item = data;
      this.onSale = data.onSale;
      this.categories = this.categoryInit(data.category);
    })
  }

  onSubmitUpdateOperation() {
    this.updateItem();
  }

  onSubmitSaveOperation() {

  }

  //update item by id from endpoint
  private updateItem() {
    this.item!.onSale = this.onSale
    this.itemService.updateItem(this.id, this.item).subscribe(data => {
      console.log(data);
      this.onSale = data.onSale;
      this.item = data;
      this.saved = true;
    })
    // this.router.navigate(['/item/', this.id]); он редиректит быстрее чем бэк сохраняет и получается отображает старые данные...
    //фикс скорость сохранения? или фронт чуть притормозить?
  }

  //filter categories, not show current
  private categoryInit(category: string): string[] {
    const cat = ["CLOTHING", "SHOES", "ACCESSORIES"];
    return cat.filter(s => !s.includes(category));
  }

}
