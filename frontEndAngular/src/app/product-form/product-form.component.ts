import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
})
export class ProductFormComponent implements OnInit {
  @Input() isEdit: boolean = false;
  @Input() isEditOff: boolean = false;
  @Input() productId!: number | undefined;
  product: any = {
    name: '',
    description: '',
    price: 0,
    quantity: 0,
  };

  constructor(public activeModal: NgbActiveModal, private productService: ProductService,private router: Router, private location: Location) {}

  ngOnInit(): void {
    if (this.isEdit && this.productId) {
      this.productService.getProduct(this.productId).subscribe(
        (data: any) => {
          this.product = data;
        },
        (error: any) => {
          console.error(error);
        }
      );
    }
  }

  submitForm(): void {
// Validar que todos los campos estén completos
if (
  !this.product.name ||
  !this.product.description ||
  this.product.price <= 0 ||
  this.product.quantity <= 0
) {
  Swal.fire(
    'Campos incompletos',
    'Por favor, completa todos los campos antes de continuar.',
    'warning'
  );
  return; // Detener la ejecución si los campos no están completos
}


    if (this.isEdit) {
      this.productService.updateProduct(this.productId!, this.product).subscribe(
        () => {
          Swal.fire(
            'Actualizacion exitosa',
            'Producto actualizado exitosamente!!!.',
            'info'
          );
          this.activeModal.close('updated');
        
             this.productService.notifyProductUpdated();
      
        },
        (error: any) => {
          console.error(error);
          Swal.fire(
            'Error',
            'Ha ocurrido un error al intentar actualizar el producto.',
            'error'
          );
        
        }
      );
      
    } else {
      this.productService.createProduct(this.product).subscribe(
        () => {
          Swal.fire(
            'Registro exitoso',
            'Producto registrado exitosamente!!!.',
            'info'
          );
          this.activeModal.close('created');
          this.productService.notifyProductUpdated();
        
        },
        (error: any) => {
          console.error(error);
          Swal.fire(
            'Error',
            'Ha ocurrido un error al intentar crear el producto.',
            'error'
          );
         
        }
      );
    }
  }

  closeForm(): void {
    this.activeModal.dismiss('Closed');
  }
  
}
