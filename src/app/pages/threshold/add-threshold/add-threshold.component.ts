import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  selector: 'app-add-threshold',
  templateUrl: './add-threshold.component.html',
  styleUrls: ['./add-threshold.component.scss'],
})
export class AddThresholdComponent {
  formAddTpDoc!: FormGroup;
  formAddFakor!: FormGroup;
  userLogin!: any;
  questions: any;

  tpDocId!: number;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private authService: AuthService,
    private route: Router
  ) {}
  ngOnInit() {
    this.getUserLogin();
    this.createFormTpDoc();
    this.fecthQuestion();
  }

  getUserLogin() {
    this.userLogin = this.authService.getUserLogin();
    // console.log('USER LOGIN : ', this.userLogin);
  }

  fecthQuestion() {
    this.apiService.getAllQuestions().subscribe((res: any) => {
      this.questions = res.data;
      this.createFormQuestion();
    });
  }

  createFormTpDoc() {
    this.formAddTpDoc = this.fb.group({
      nama_perusahaan: ['', Validators.required],
      user_id: [this.userLogin.user_id],
      tahun_pajak: ['', Validators.required],
    });
  }

  createFormQuestion() {
    const formControls: { [key: string]: any } = {};
    this.questions.forEach((question: any) => {
      formControls[`transaksi_afiliasi_${question.question_id}`] = [false];
      formControls[`transaksi_independent_${question.question_id}`] = [false];
      formControls[`keterangan_${question.question_id}`] = [''];
      formControls[`no_halaman_${question.question_id}`] = [''];
    });
    this.formAddFakor = this.fb.group(formControls);
  }

  submitTp() {
    // this.toogleCardQuestion();
    if (this.formAddFakor.valid) {
      this.apiService
        .addTpDoc(this.formAddTpDoc.value)
        .subscribe((res: any) => {
          this.tpDocId = res.data[0];
          this.toogleCardTpDoc();
          this.toogleCardQuestion();
        });
    }
  }

  toogleCardTpDoc() {
    const card_tp = document.querySelector('#card-tp');
    card_tp?.classList.toggle('hidden');
  }

  toogleCardQuestion() {
    const card_question = document.querySelector('#formQuestionCard');
    card_question?.classList.toggle('hidden');
  }

  submitQuestion() {
    const formData: QuestionFormData[] = [];
    this.questions.forEach((question: any) => {
      const questionId = question.question_id;
      const transaksiAfiliasi = this.formAddFakor.get(
        `transaksi_afiliasi_${questionId}`
      )?.value;
      const transaksiIndependent = this.formAddFakor.get(
        `transaksi_independent_${questionId}`
      )?.value;
      const description = this.formAddFakor.get(
        `keterangan_${questionId}`
      )?.value;
      const noHalaman = this.formAddFakor.get(
        `no_halaman_${questionId}`
      )?.value;

      const formDataItem: QuestionFormData = {
        question_id: questionId,
        tp_doc_id: this.tpDocId,
        transaksi_afiliasi: transaksiAfiliasi,
        transaksi_independent: transaksiIndependent,
        description: description,
        no_halaman: noHalaman,
      };

      formData.push(formDataItem);
    });
    // console.log(formData);
    this.addResult(formData);
  }

  addResult(data: any) {
    this.apiService.addResult(data).subscribe((res: any) => {
      console.log('Success Add Result');
      this.route.navigate(['']);
    });
  }
}
