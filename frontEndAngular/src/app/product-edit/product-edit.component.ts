import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-product-edit',
  template: `<button color="primary" class="btn btn-info mat-icon-button" (click)="openForm(1)">  <mat-icon class="align-middle">visibility</mat-icon> Ver</button>
  <button class="btn btn-warning mat-icon-button" style="margin-left: 5px;" (click)="openForm(2)">  <mat-icon class="align-middle">edit</mat-icon>Editar</button>
  `
})
export class ProductEditComponent {
  @Input() productId!: number;

  constructor(private modalService: NgbModal) {}

  openForm(option:any): void {
    const modalRef = this.modalService.open(ProductFormComponent);
   if (option == 1){
    modalRef.componentInstance.isEditOff = true;
   }
    modalRef.componentInstance.isEdit = true;
  
    
    modalRef.componentInstance.productId = this.productId;
  }
 
}
