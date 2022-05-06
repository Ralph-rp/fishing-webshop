import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CardComponent } from './card.component';
import { CardRoutingModule } from './card-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { DisplayModule } from './display/display.module';

@NgModule({
  declarations: [CardComponent],
  imports: [
    CommonModule,
    CardRoutingModule,
    MatDialogModule,
    DisplayModule,
  ],
  providers: [DatePipe]
})
export class CardModule { }
