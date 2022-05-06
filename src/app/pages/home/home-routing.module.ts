import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../shared/guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'items', pathMatch: 'full' , canActivate: [AuthGuard]},
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'items',
        loadChildren: () => import('../item/list/list.module').then(m => m.ListModule)
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }
