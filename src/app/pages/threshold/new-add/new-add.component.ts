import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { concat } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';

interface QuestionFormData {
  question_id: number;
  tp_doc_id: number;
  transaksi_afiliasi: boolean;
  transaksi_independent: boolean;
  description: string;
  no_halaman: number;
}

@Component({
  selector: 'app-new-add',
  templateUrl: './new-add.component.html',
  styleUrls: ['./new-add.component.scss'],
})
export class NewAddComponent {
  userLogin!: any;
  questions!: any;

  // formGroup
  formAddTpDoc!: FormGroup;
  formQuestions!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private authService: AuthService,
    private route: Router
  ) {}
  ngOnInit() {
    this.getUserLogin();
    this.createFormTpDoc();
    this.getAllQuestion();
  }
  getUserLogin() {
    this.userLogin = this.authService.getUserLogin();
  }

  // FECTH QUESTION
  getAllQuestion() {
    this.apiService.getAllQuestionsByFaktor().subscribe((res: any) => {
      // console.log(res.data);
      this.questions = res.data;

      this.createFormQuestions();
    });
  }

  //Form TP DOC
  createFormTpDoc() {
    this.formAddTpDoc = this.fb.group({
      nama_perusahaan: ['', Validators.required],
      user_id: [this.userLogin.user_id],
      tahun_pajak: ['', Validators.required],
    });
  }
  submitTp() {
    console.log(this.formAddTpDoc.value);
  }

  // FORM QUESTION
  createFormQuestions() {
    const formControls: { [key: string]: any } = {};
    this.questions.forEach((faktor: any) => {
      faktor.questions.forEach((question: any) => {
        // console.log(question);
        formControls[`transaksi_afiliasi_${question.question_id}`] = [false];
        formControls[`transaksi_independent_${question.question_id}`] = [false];
        formControls[`keterangan_${question.question_id}`] = [''];
        formControls[`no_halaman_${question.question_id}`] = [''];
      });
    });
    this.formQuestions = this.fb.group(formControls);
  }
  submitQuestion() {
    const formData: QuestionFormData[] = [];
    this.questions.forEach((faktor: any) => {
      faktor.questions.forEach((question: any) => {
        const questionId = question.question_id;
        const transaksiAfiliasi = this.formQuestions.get(
          `transaksi_afiliasi_${questionId}`
        )?.value;
        const transaksiIndependent = this.formQuestions.get(
          `transaksi_independent_${questionId}`
        )?.value;
        const description = this.formQuestions.get(
          `keterangan_${questionId}`
        )?.value;
        const noHalaman = this.formQuestions.get(
          `no_halaman_${questionId}`
        )?.value;

        const formDataItem: QuestionFormData = {
          question_id: questionId,
          tp_doc_id: 1,
          transaksi_afiliasi: transaksiAfiliasi,
          transaksi_independent: transaksiIndependent,
          description: description,
          no_halaman: noHalaman,
        };

        formData.push(formDataItem);
      });
    });
    console.log(formData);
  }
}
