import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Products } from '../../service/products';
import { addProductType } from '../../models/product';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-product',
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './add-product.html',
  styleUrl: './add-product.scss',
})
export class AddProduct {
  constructor(private productService: Products,private toastr: ToastrService){}
  

  productForm = new FormGroup({
    productName : new FormControl<string>('',{nonNullable: true,validators: [Validators.required]}),
    price: new FormControl<number | null>(null,{nonNullable: true,validators:[Validators.required,Validators.min(1)]}),
    imageUrl: new FormControl<string>('',{nonNullable:true,validators:[Validators.required,Validators.pattern(/https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/)]}),
    desc: new FormControl<string>('',{nonNullable:true,validators:[Validators.required]})
  })

  addProduct(){
    console.log(this.productForm.value,this.productForm.valid);
    if(this.productForm.invalid){
      this.productForm.markAllAsTouched();
      return;
    }
    const payload:addProductType = {
      productName: this.productForm.getRawValue().productName,
      price: this.productForm.getRawValue().price || 0,
      image: this.productForm.getRawValue().imageUrl,
      description: this.productForm.getRawValue().desc,
    }

    this.productService.addProducts(payload).subscribe({
      next:(resp)=>{
        this.toastr.success(resp?.message)
      },
      error: (err)=>{
        this.toastr.error(err.error?.message);
      }
    });

    this.productForm.reset();

  }

}
