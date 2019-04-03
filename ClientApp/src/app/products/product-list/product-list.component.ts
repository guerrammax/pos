import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal/public_api';
import { Product } from 'src/app/interfaces/product';
import { Observable, Subject } from 'rxjs';
import { DataTableDirective } from "angular-datatables";
import { ProductService } from 'src/app/services/product.service';
//import * as jwt_decode  from "jwt-decode";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  //For the FormContol - Adding products
  insertForm:FormGroup;
  name : FormControl;
  price: FormControl;
  description: FormControl;
  imageUrl: FormControl;

  //Updateng the product
  updateForm:FormGroup;
  _name:FormControl;
  _price: FormControl;
  _description: FormControl;
  _imageUrl: FormControl;
  _id: FormControl;

  @ViewChild('template') modal : TemplateRef<any>;

  @ViewChild('editTemplate') editmodal: TemplateRef<any>;

  //Modal Properties
  modaleMessage : string;
  modalRef : BsModalRef;
  selectedProduct: Product;
  products$: Observable<Product[]>;
  products:Product[]=[];
  userRoleStatus: string;

  //datatable properties
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any>= new Subject();

  @ViewChild(DataTableDirective) dtElement : DataTableDirective;

  // decodeToken()
  // {
  //   var token = localStorage.getItem('jwt');

  //   var decoded = jwt_decode(token);

  //   console.log(decoded);
  // }

  constructor(
              private productservice : ProductService
  )
  {

  }

  ngOnInit()
  {
    this.dtOptions={
      pagingType:'full_numbers',
      pageLength:5,
      autoWidth:true,
      order:[[0,'desc']]
    };
    this.products$ =this.productservice.getProducts();

    this.products$.subscribe(result => {
      this.products=result;
      this.dtTrigger.next();
    });
  }

}
