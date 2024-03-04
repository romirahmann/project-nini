import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { LayoutsModule } from '../layouts/layouts.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ThresholdComponent } from './threshold/threshold.component';
import { DataMasterComponent } from './data-master/data-master.component';
import { ListQuestionsComponent } from './list-questions/list-questions.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddThresholdComponent } from './threshold/add-threshold/add-threshold.component';
import { ExportPdfComponent } from './export-pdf/export-pdf.component';
import { NewAddComponent } from './threshold/new-add/new-add.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ThresholdComponent,
    DataMasterComponent,
    ListQuestionsComponent,
    AddThresholdComponent,
    ExportPdfComponent,
    NewAddComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    LayoutsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class PagesModule {}
