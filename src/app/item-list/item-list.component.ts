import {Component, OnInit} from "@angular/core";

import {ItemService} from "../service/item.service";
import {Item} from "../entity/item";

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  content: Item[] = [];

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.getAllItems()
  }

  private getAllItems() {
    this.itemService.getItems().subscribe(data => {
      this.content = data.content;
    })
  }

}
