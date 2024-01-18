import { Component } from '@angular/core';
import { NgbModal  } from '@ng-bootstrap/ng-bootstrap';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-product-create',
  template: `<button class="btn btn-primary" (click)="openForm()">Crear Producto</button>`
})
export class ProductCreateComponent {
  constructor(private modalService: NgbModal) {}

  openForm(): void {
    const modalRef = this.modalService.open(ProductFormComponent);
  modalRef.componentInstance.isEdit = false;
  modalRef.componentInstance.productId = undefined;
  }
}
