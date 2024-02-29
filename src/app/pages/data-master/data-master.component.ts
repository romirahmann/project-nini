import { Component, EventEmitter, Output } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-data-master',
  templateUrl: './data-master.component.html',
  styleUrls: ['./data-master.component.scss'],
})
export class DataMasterComponent {
  displayUsers!: any;
  dataUsers!: any;
  @Output() dataSend: EventEmitter<any> = new EventEmitter<any>();
  dataReceived: any;

  // pagination
  pageSize: number = 20;
  currentPage: number = 1;
  totalPages: number = 0;
  entires: any;
  // SEARCH
  searchQuery!: string;

  constructor(private api: ApiService) {}
  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.api.getAllUsers().subscribe((res: any) => {
      this.dataUsers = res.data;
      this.entires = this.dataUsers.length;
      this.calculateTotalPages();
      this.updateDisplayUsers();
    });
  }

  // SEARCH
  onSearch() {
    this.currentPage = 1;
    if (this.searchQuery.trim() === '') {
      this.updateDisplayUsers();
    } else {
      this.displayUsers = this.dataUsers.filter(
        (user: any) =>
          user.username
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase()) ||
          user.role_name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      this.calculateTotalPages();
    }
  }

  toogleModal(category_toogle: number, user: any) {
    if (user !== null) {
      if (category_toogle === 1) {
        let data = {
          text: '',
          category: 'EDIT_USERS',
          user_id: user.user_id,
          username: user.username,
          role_id: user.role_id,
        };
        this.dataReceived = data;

        const modal = document.querySelector('#modal');
        modal?.classList.toggle('hidden');
        this.getAllUsers();
      }
      if (category_toogle === 2) {
        let data = {
          text: `Remove ${user.username}`,
          category: 'REMOVE_MODAL',
          user_id: user.user_id,
          username: user.username,
          role_id: user.role_id,
          funct: 'removeUser',
        };
        this.dataReceived = data;
        const modal = document.querySelector('#modal');
        modal?.classList.toggle('hidden');
      }
      if (category_toogle === 0) {
        this.getAllUsers();
        const modal = document.querySelector('#modal');
        modal?.classList.toggle('hidden');
      }
    } else {
      this.getAllUsers();
      const modal = document.querySelector('#modal');
      modal?.classList.toggle('hidden');
    }
  }

  // Pagination
  calculateTotalPages() {
    this.totalPages = Math.ceil(this.entires / this.pageSize);
  }

  updateDisplayUsers() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayUsers = this.dataUsers.slice(startIndex, endIndex);
  }
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayUsers();
    }
  }
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayUsers();
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
