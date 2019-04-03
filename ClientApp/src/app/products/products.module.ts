import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';
import { DataTablesModule } from "angular-datatables";
import { AuthGuardService } from '../guards/auth-guard.service';
import { JwtInterceptor } from "../_helpers/jwt.Interceptor";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


@NgModule({
  declarations: [
    ProductDetailsComponent,
    ProductListComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    DataTablesModule,
    
  ],
  providers: [
    AuthGuardService,
    {provide:HTTP_INTERCEPTORS, useClass:JwtInterceptor,multi:true}
  ],
})
export class ProductsModule { }
