import {Component, OnInit} from "@angular/core";

import {ItemService} from "../service/item.service";
import {Item} from "../entity/item";
import {LocalStorageService} from "../service/localStorageService";

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  isAdminModeOn: boolean = false;
  content: Item[] = [];

  // singleItem?: Item;

  constructor(private itemService: ItemService,
              private localStorageService: LocalStorageService) {
  }

  ngOnInit(): void {

    if (this.localStorageService.getData("authorities").includes("ROLE_ADMIN")) {
      this.isAdminModeOn = true;
    }

    this.getAllItems()
  }

  private getAllItems() {
    this.itemService.getItems()
      .subscribe(data => {
        this.content = data.content;
      })
  }

}
