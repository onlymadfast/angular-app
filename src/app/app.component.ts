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
  username: string | undefined = '';

  //detect refresh page and redirect too another page
  // @HostListener('window:beforeunload') goToPage() {
  //   this.router.navigate(['/products']);
  // }

  constructor(private localStorageService: LocalStorageService,
              private router: Router) {
  }

  ngOnInit() {
    console.log("isAuth -> " + this.isAuthenticated)
    console.log("username in auth -> " + this.username)

    this.localStorageService.getUserIfExist()
      .then(user => {
        if (user === "empty") {
          console.log("user empty ->" + user + "<- here");
        } else {
          this.username = user;
          this.isAuthenticated = true;
        }
      })
  }

  public checkAuth() {

  }

  public logOut() {
    return this.localStorageService.clearStorage()
      .then(() => {
        this.isAuthenticated = false;
        this.router.navigate(['/products'])
          .then(() => this.ngOnInit())
      })
  }

}
