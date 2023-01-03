import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {RouterModule} from "@angular/router";
import {ItemListComponent} from "./item-list/item-list.component";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: '', component: ItemListComponent},
    ])
  ],
  declarations: [
    AppComponent,
    ItemListComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
