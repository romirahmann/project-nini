import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ThresholdComponent } from './threshold/threshold.component';
import { DataMasterComponent } from './data-master/data-master.component';
import { ListQuestionsComponent } from './list-questions/list-questions.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'threshold/:id', component: ThresholdComponent },
  { path: 'data-master', component: DataMasterComponent },
  { path: 'list-questions', component: ListQuestionsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
