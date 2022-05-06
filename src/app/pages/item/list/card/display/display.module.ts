import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DisplayComponent } from './display.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [DisplayComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [DatePipe],
  exports: [DisplayComponent]
})
export class DisplayModule { }
