import { Component, EventEmitter, Output } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-list-questions',
  templateUrl: './list-questions.component.html',
  styleUrls: ['./list-questions.component.scss'],
})
export class ListQuestionsComponent {
  @Output() dataSend: EventEmitter<any> = new EventEmitter<any>();
  dataReceived: any;
  displayQuestions!: any;
  dataQuestions!: any;
  // pagination
  pageSize: number = 5;
  currentPage: number = 1;
  totalPages: number = 0;
  entires: any;
  // SEARCH
  searchQuery!: string;

  constructor(private apiService: ApiService) {}
  ngOnInit() {
    this.getQuestions();
  }

  getQuestions() {
    this.apiService.getAllQuestions().subscribe((res: any) => {
      this.dataQuestions = res.data;
      this.entires = this.dataQuestions.length;
      this.calculateTotalPages();
      this.updateDisplayQuestions();
    });
  }

  toogleModal(category_toogle: number, question: any) {
    // ADD
    if (category_toogle === 1) {
      let data = {
        text: '',
        category: 'ADD_QUESTION',
      };
      this.dataReceived = data;
      const modal = document.querySelector('#modal');
      modal?.classList.toggle('hidden');
    }
    // EDIT
    if (category_toogle === 2) {
      let data = {
        text: '',
        category: 'EDIT_QUESTION',
        question: question,
        funct: 'removeUser',
      };
      this.dataReceived = data;
      const modal = document.querySelector('#modal');
      modal?.classList.toggle('hidden');
    }
    // REMOVE
    if (category_toogle === 3) {
      let data = {
        text: 'Remove this question?',
        category: 'REMOVE_MODAL',
        question: question,
        funct: 'removeQuestion',
      };
      this.dataReceived = data;
      const modal = document.querySelector('#modal');
      modal?.classList.toggle('hidden');
    }
    if (category_toogle === 0) {
      this.getQuestions();
      const modal = document.querySelector('#modal');
      modal?.classList.toggle('hidden');
    }
  }

  // SEARCH
  onSearch() {
    this.currentPage = 1;
    if (this.searchQuery.trim() === '') {
      this.updateDisplayQuestions();
    } else {
      this.displayQuestions = this.dataQuestions.filter(
        (question: any) =>
          question.question
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase()) ||
          question.faktor_description
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase())
      );
      this.calculateTotalPages();
    }
  }

  // Pagination
  calculateTotalPages() {
    this.totalPages = Math.ceil(this.entires / this.pageSize);
  }

  updateDisplayQuestions() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayQuestions = this.dataQuestions.slice(startIndex, endIndex);
  }
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayQuestions();
    }
  }
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayQuestions();
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
