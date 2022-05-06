import { EditComponent } from './edit.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guard/auth.guard';

const routes: Routes = [
    {
        path: ':id',
        component: EditComponent,
        canActivate: [AuthGuard],
        data: { title: 'Edit item' }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class EditRoutingModule { }
