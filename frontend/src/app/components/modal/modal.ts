import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
})
export class Modal {
  isModalOpen = input.required<boolean>();
  closeModal = output();

  closeModalEvent(){
    this.closeModal.emit();
  }
}
