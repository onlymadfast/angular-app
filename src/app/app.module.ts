import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {ItemListComponent} from "./item-list/item-list.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app-routing.module";
import {UserProfileComponent} from './user-profile/user-profile.component';
import {SingleItemComponent} from './single-item/single-item.component';
import {UpdateItemComponent} from './update-item/update-item.component';
import {LoginComponent} from './login/login.component';
import {UserListComponent} from './user-list/user-list.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    ItemListComponent,
    UserProfileComponent,
    SingleItemComponent,
    UpdateItemComponent,
    LoginComponent,
    UserListComponent,
    PageNotFoundComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
