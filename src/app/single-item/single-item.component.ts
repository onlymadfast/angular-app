import {Component, OnInit} from '@angular/core';
import {ItemService} from "../service/item.service";
import {Item} from "../entity/item";
import {ActivatedRoute, Router} from "@angular/router";
import {LocalStorageService} from "../service/localStorageService";

@Component({
  selector: 'app-single-item',
  templateUrl: './single-item.component.html',
  styleUrls: ['./single-item.component.css']
})
export class SingleItemComponent implements OnInit {

  isAdminModeOn: boolean = false;
  singleItem?: Item;
  private id = this.route.snapshot.params[`id`];

  constructor(private itemService: ItemService,
              private route: ActivatedRoute,
              private router: Router,
              private localStorageService: LocalStorageService) {
  }

  ngOnInit(): void {

    if (this.localStorageService.getData("authorities").includes("ROLE_ADMIN")) {
      this.isAdminModeOn = true;
    }

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
    this.itemService.deleteItem(this.id)
      .subscribe(() => {
        return this.router.navigate(['/products']);
      })
  }

}
