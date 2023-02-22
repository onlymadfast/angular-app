import {Component, OnInit} from '@angular/core';
import {ItemService} from "../service/item.service";
import {Item} from "../entity/item";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-single-item',
  templateUrl: './single-item.component.html',
  styleUrls: ['./single-item.component.css']
})
export class SingleItemComponent implements OnInit {
  singleItem?: Item;
  private id = this.route.snapshot.params[`id`];

  constructor(private itemService: ItemService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getItemById()
  }

  public deleteItemAndGetProducts() {
    return this.deleteItemById()
  }

  private getItemById(): void {
    this.itemService.getItem(this.id).subscribe(data => {
      this.singleItem = data;
    })
  }

  private deleteItemById() {
    this.itemService.deleteItem(this.id).subscribe(() => {
      return this.router.navigate(['/products']);
    })
  }

}
