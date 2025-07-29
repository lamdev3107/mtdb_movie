import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface SelectOption {
  value: any;
  label: string;
}

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent {
  @Input() optionList: SelectOption[] = [];
  @Input() selectedOption: SelectOption | null = null;
  @Input() placeholder: string = 'Chọn một tùy chọn';
  @Input() disabled: boolean = false;

  @Output() onSelectChange = new EventEmitter<SelectOption>();

  isOpen: boolean = false;

  toggleDropdown(): void {
    if (!this.disabled) {
      this.isOpen = !this.isOpen;
    }
  }

  selectOption(option: SelectOption): void {
    this.selectedOption = option;
    this.onSelectChange.emit(option);
    this.isOpen = false;
  }

  closeDropdown(): void {
    this.isOpen = false;
  }

  getDisplayValue(): string {
    return this.selectedOption ? this.selectedOption.label : this.placeholder;
  }
}
