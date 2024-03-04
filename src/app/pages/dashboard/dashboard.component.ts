import { Component, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  @Output() dataSend: EventEmitter<any> = new EventEmitter<any>();
  dataReceived: any;

  userLogin!: any;
  dataTpDoc!: any;
  displayTpDoc!: any;
  tpId!: number;
  // pagination
  pageSize: number = 5;
  currentPage: number = 1;
  totalPages: number = 0;
  entires: any;

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.getUserLogin();
  }

  getUserLogin() {
    this.userLogin = this.authService.getUserLogin();
    this.getAllTpDoc(this.userLogin.user_id);
  }

  getAllTpDoc(id: number) {
    this.apiService.getAllTp(id).subscribe((res: any) => {
      // console.log(res.data);
      this.dataTpDoc = res.data;
      this.entires = this.dataTpDoc.length;
      this.calculateTotalPages();
      this.updateDisplayTpDoc();
    });
  }

  toogleModal(category_toogle: number, tp: any) {
    if (category_toogle === 1) {
      let data = {
        text: '',
        category: 'EDIT_TP',
        dataTp: tp,
      };
      this.dataReceived = data;
      const modal = document.querySelector('#modal');
      modal?.classList.toggle('hidden');
    }
    if (category_toogle === 2) {
      let data = {
        text: 'Remove this Tp Doc?',
        category: 'REMOVE_MODAL',
        dataTp: tp,
        funct: 'removeTp',
      };
      this.dataReceived = data;
      const modal = document.querySelector('#modal');
      modal?.classList.toggle('hidden');
    }
    if (category_toogle === 0) {
      this.getUserLogin();
      const modal = document.querySelector('#modal');
      modal?.classList.toggle('hidden');
    }
  }

  // Pagination
  calculateTotalPages() {
    this.totalPages = Math.ceil(this.entires / this.pageSize);
  }

  updateDisplayTpDoc() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayTpDoc = this.dataTpDoc.slice(startIndex, endIndex);
  }
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayTpDoc();
    }
  }
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayTpDoc();
    }
  }
  getStartIndex(): number {
    return (this.currentPage - 1) * this.pageSize + 1;
  }
  getEndIndex(): number {
    const endIndex: number = this.currentPage * this.pageSize;
    return Math.min(endIndex, this.entires);
  }
}
