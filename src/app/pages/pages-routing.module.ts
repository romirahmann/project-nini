import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ThresholdComponent } from './threshold/threshold.component';
import { DataMasterComponent } from './data-master/data-master.component';
import { ListQuestionsComponent } from './list-questions/list-questions.component';
import { AddThresholdComponent } from './threshold/add-threshold/add-threshold.component';
import { ExportPdfComponent } from './export-pdf/export-pdf.component';
import { NewAddComponent } from './threshold/new-add/new-add.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'threshold/:id', component: ThresholdComponent },
  { path: 'data-master', component: DataMasterComponent },
  { path: 'list-questions', component: ListQuestionsComponent },
  { path: 'add-threshold', component: AddThresholdComponent },
  { path: 'new-threshold', component: NewAddComponent },
  { path: 'export-pdf/:id', component: ExportPdfComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
