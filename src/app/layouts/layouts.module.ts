import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutsComponent } from './layouts.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [LayoutsComponent, SidebarComponent, ModalComponent],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  exports: [SidebarComponent, ModalComponent],
})
export class LayoutsModule {}
