import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './components/product/product.component';


const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' }, // Default route
  { path: 'products', component: ProductComponent },        // Products route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
