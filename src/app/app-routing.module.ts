import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ItemListComponent} from "./item-list/item-list.component";
import {UserProfileComponent} from "./user-profile/user-profile.component";
import {SingleItemComponent} from "./single-item/single-item.component";
import {UpdateItemComponent} from "./update-item/update-item.component";
import {UserListComponent} from "./user-list/user-list.component";
import {LoginComponent} from "./login/login.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";

const routes: Routes = [
  {path: 'products', component: ItemListComponent},
  {path: '', redirectTo: 'products', pathMatch: 'full'},
  {path: 'user-profile', component: UserProfileComponent},
  {path: 'item/:id', component: SingleItemComponent},
  {path: 'items/edit', component: UpdateItemComponent},
  {path: 'items/edit/:id', component: UpdateItemComponent},
  {path: 'users-list', component: UserListComponent},
  {path: 'login', component: LoginComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
