import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http'; 
import { MatIconModule } from '@angular/material/icon';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductEditComponent } from './product-edit/product-edit.component'; // Agrega esta importación
@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCreateComponent,
    ProductFormComponent,
    ProductEditComponent
  ],
  imports: [
    NgbModule,
    BrowserModule, FormsModule,
    ReactiveFormsModule,MatIconModule,
    AppRoutingModule,HttpClientModule,PaginationModule.forRoot()
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
