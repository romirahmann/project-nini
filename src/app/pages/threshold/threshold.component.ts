import { Component, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-threshold',
  templateUrl: './threshold.component.html',
  styleUrls: ['./threshold.component.scss'],
})
export class ThresholdComponent {
  userLogin!: any;
  dataTpDoc!: any;
  dataThreshold!: any;
  tp_id!: number;
  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private activeRoute: ActivatedRoute
  ) {}
  ngOnInit() {
    this.getParamsId();
    this.getUserLogin();
  }
  getParamsId() {
    this.activeRoute.params.subscribe((params) => {
      const param_id = params['id'];
      this.tp_id = parseInt(param_id);
      this.getDetailFaktor();
    });
  }

  getUserLogin() {
    this.userLogin = this.authService.getUserLogin();
  }

  getDetailFaktor() {
    this.apiService.getDetailTp(this.tp_id).subscribe((res: any) => {
      // console.log(res.data);
      this.dataTpDoc = res.data[0][0];
      this.dataThreshold = res.data[1];
      // console.log(this.dataThreshold);
    });
  }
}
