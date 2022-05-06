import { CardComponent } from './card.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guard/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: CardComponent,
        canActivate: [AuthGuard],
        data: { title: 'Items card' }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CardRoutingModule { }
