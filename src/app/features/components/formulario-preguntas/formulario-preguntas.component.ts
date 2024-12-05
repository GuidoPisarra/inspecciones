import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario-preguntas',
  standalone: false,
  templateUrl: './formulario-preguntas.component.html',
  styleUrl: './formulario-preguntas.component.scss',
})
export class FormularioPreguntasComponent {
  courseForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data?: any
  ) {
    this.courseForm = this.formBuilder.group({
      profesor: [null, [Validators.required]],
      commitee: [null, [Validators.required]],
      course: [null, [Validators.required]],
      startDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
    });
    this.patchFormValue();
  }

  private get isEditing() {
    return !!this.data?.editingCourse;
  }

  patchFormValue() {
    if (this.data?.editingCourse) {
      const { startDate, endDate, ...otherData } = this.data.editingCourse;

      this.courseForm.patchValue({
        ...otherData,
        startDate: this.formatDate(startDate),
        endDate: this.formatDate(endDate)
      });
    }
  }

  onSave(): void {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
    } else {

    }
  }

  private formatDate(date: Date | string): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }

}
