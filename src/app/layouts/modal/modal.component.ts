import {
  OnChanges,
  Component,
  Input,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnChanges {
  @Output() closeModalEvent: EventEmitter<any> = new EventEmitter<any>();
  @Input() dataReceived: any;

  dataFaktors!: any;
  dataCategories!: any;

  // formEdit
  formEdit!: FormGroup;
  formEditQuestion!: FormGroup;
  formAddQuestion!: FormGroup;
  formEditTpDoc!: FormGroup;
  formEditThreshold!: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('dataReceived' in changes && this.dataReceived) {
      if (this.dataReceived.category === 'EDIT_USERS') {
        this.createFormEditUser();
      }
      if (this.dataReceived.category === 'ADD_QUESTION') {
        this.addQuestionForm();
      }
      if (this.dataReceived.category === 'EDIT_QUESTION') {
        this.createFormEditQuestion();
      }
      if (this.dataReceived.category === 'EDIT_TP') {
        this.createFormTp();
      }
    }
  }

  createFormEditUser() {
    if (this.dataReceived) {
      this.formEdit = this.fb.group({
        username: [this.dataReceived.username, [Validators.required]],
        role_id: [this.dataReceived.role_id, [Validators.required]],
      });
    }
  }

  onSubmit() {
    if (this.formEdit.invalid) {
      alert('Username & User Role Invalid');
    } else {
      // console.log(this.formEdit.value);
      this.updateUser();
    }
  }
  removeUser() {
    const id = this.dataReceived.user_id;
    const data = {
      is_deleted: 1,
    };
    this.apiService.updateUser(id, data).subscribe((res: any) => {
      this.closeModal();
    });
  }
  updateUser() {
    const id = this.dataReceived.user_id;
    const data = this.formEdit.value;
    this.apiService.updateUser(id, data).subscribe((res: any) => {
      this.closeModal();
    });
  }

  executeTestingFunction() {
    const functionToExecute: keyof ModalComponent | undefined =
      this.dataReceived?.funct;
    if (
      typeof functionToExecute === 'string' &&
      typeof this[functionToExecute] === 'function'
    ) {
      // Panggil fungsi jika ditemukan
      this[functionToExecute]();
    } else {
      // Penanganan jika nama fungsi tidak valid atau tidak ditemukan
      console.log('Function does not exist or is not a function');
    }
  }
  closeModal() {
    this.closeModalEvent.emit();
  }

  // FORM QUESTIONS
  getAllFaktor() {
    this.apiService.getAllFaktor().subscribe((res: any) => {
      this.dataFaktors = res.data;
    });
  }
  getAllCategories() {
    this.apiService.getAllCategories().subscribe((res: any) => {
      this.dataCategories = res.data;
    });
  }
  submitQuestion() {
    if (this.formAddQuestion.valid) {
      const data = this.formAddQuestion.value;
      this.apiService.addQuestion(data).subscribe((res: any) => {
        this.closeModal();
      });
    } else {
      alert(' Failure to add question');
    }
  }
  addQuestionForm() {
    this.getAllCategories();
    this.getAllFaktor();

    this.formAddQuestion = this.fb.group({
      faktor_id: ['', [Validators.required]],
      category_id: [null],
      question: ['', [Validators.required]],
    });
  }

  // CREAT FORM EDIT
  editQuestion() {
    let data = this.dataReceived.question;

    if (this.formEditQuestion.valid) {
      this.apiService
        .updateQuestion(data.question_id, this.formEditQuestion.value)
        .subscribe((res: any) => {
          this.closeModal();
        });
    }
  }
  createFormEditQuestion() {
    if (this.dataReceived) {
      let data = this.dataReceived.question;

      this.formEditTpDoc = this.fb.group({
        faktor_id: [data.faktor_id, [Validators.required]],
        category_id: data.category_id,
        question: [data.question, [Validators.required]],
      });
    }
  }
  removeQuestion() {
    let data = this.dataReceived.question;
    this.apiService
      .updateQuestion(data.question_id, { is_deleted: 1 })
      .subscribe((res: any) => {
        console.log('REMOVE SUCCESSFULLY');
        this.closeModal();
      });
  }

  // FORM TP DOC
  editTp() {
    if (this.formEditTpDoc.valid) {
      const id = this.dataReceived.dataTp.tp_doc_id;
      const data = this.formEditTpDoc.value;
      // console.log(id, data);
      this.apiService.updateTpDoc(id, data).subscribe((res: any) => {
        this.closeModal();
      });
    }
  }
  createFormTp() {
    if (this.dataReceived) {
      let data = this.dataReceived.dataTp;

      this.formEditTpDoc = this.fb.group({
        nama_perusahaan: [data.nama_perusahaan, Validators.required],
        tahun_pajak: [data.tahun_pajak, Validators.required],
      });
    }
  }
  removeTp() {
    const id = this.dataReceived.dataTp.tp_doc_id;
    const data = { is_deleted: 1 };
    // console.log(id, data);
    this.apiService.updateTpDoc(id, data).subscribe((res: any) => {
      this.closeModal();
    });
  }
}
