import {
  OnChanges,
  Component,
  Input,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnChanges {
  @Output() closeModalEvent: EventEmitter<any> = new EventEmitter<any>();
  @Input() dataReceived: any;

  // formEdit
  formEdit!: any;
  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('dataReceived' in changes) {
      this.createForm();
    }
  }

  createForm() {
    if (this.dataReceived) {
      this.formEdit = this.fb.group({
        username: [this.dataReceived.username, [Validators.required]],
        role_id: [this.dataReceived.role_id, [Validators.required]],
      });
    }
  }

  onSubmit() {
    console.log(this.formEdit.value);
  }

  closeModal() {
    this.closeModalEvent.emit();
  }
}
