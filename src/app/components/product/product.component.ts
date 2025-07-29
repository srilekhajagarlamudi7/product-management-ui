import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  productForm: Product = { name: '', price: 0, description: '' };
  isEditMode = false;
  editingId: string | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  submitForm(): void {
    if (this.isEditMode && this.editingId) {
      this.productService.updateProduct(this.editingId, this.productForm).subscribe(() => {
        this.resetForm();
        this.getProducts();
      });
    } else {
      this.productService.addProduct(this.productForm).subscribe(() => {
        this.resetForm();
        this.getProducts();
      });
    }
  }

  editProduct(product: Product): void {
    this.productForm = { ...product };
    this.editingId = product._id!;
    this.isEditMode = true;
  }

  deleteProduct(id: string): void {
    this.productService.deleteProduct(id).subscribe(() => {
      this.getProducts();
    });
  }

  resetForm(): void {
    this.productForm = { name: '', price: 0, description: '' };
    this.isEditMode = false;
    this.editingId = null;
  }
}
