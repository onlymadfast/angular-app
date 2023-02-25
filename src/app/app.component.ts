import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from "./service/localStorageService";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isAuthenticated: boolean = false;
  username?: string | null;
  isThatUserAdmin: boolean = false;

  constructor(private localStorageService: LocalStorageService,
              private router: Router) {
  }

  ngOnInit() {
    this.localStorageService.getUserAndRolesIfExist()
      .then(user => {
        if (user.name != null && user.roles != null) {
          this.username = user.name;
          this.isAuthenticated = true;

          if (user.roles?.includes("ADMIN")) {
            this.isThatUserAdmin = true;
          }
        }
      })
  }

  public logOut() {
    return this.localStorageService.clearStorage()
      .then(() => {
        this.isAuthenticated = false;
        this.isThatUserAdmin = false;
        return this.router.navigate(['/products'])
      })
  }

}
