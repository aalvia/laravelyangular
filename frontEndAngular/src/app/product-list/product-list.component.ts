import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0; 
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
    this.productService.productUpdated$.subscribe(() => {
      this.loadProducts();
    });
  }

  loadProducts(): void {
    this.productService.getProducts(this.currentPage, this.pageSize).subscribe(
      (data: any) => {
        this.products = data.data;
        this.totalItems = data.total;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  onPageChange(event: PageChangedEvent): void {
    this.currentPage = event.page;
    this.loadProducts();
  }

  deleteProduct(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(id).subscribe(
          () => {
            Swal.fire(
              'Eliminado',
              'El producto ha sido eliminado correctamente.',
              'success'
            );
            this.loadProducts();
          },
          (error: any) => {
            console.error(error);
            Swal.fire(
              'Error',
              'Ha ocurrido un error al intentar eliminar el producto.',
              'error'
            );
          }
        );
      }
    });
   
  }
}
