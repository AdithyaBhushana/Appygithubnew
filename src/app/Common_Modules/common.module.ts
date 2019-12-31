import { GridTableComponent } from './components/grid-table/grid-table.component';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SortPipe } from './components/grid-table/sort.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [  
    GridTableComponent, SortPipe,
    ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

  ], 
  exports: [
    GridTableComponent,
    ],

providers: []
})
export class commonShared { }
