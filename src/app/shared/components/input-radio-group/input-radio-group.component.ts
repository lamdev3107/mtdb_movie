import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-input-radio-group',
  templateUrl: './input-radio-group.component.html',
  styleUrls: ['./input-radio-group.component.scss'],
})
export class InputRadioGroupComponent implements OnInit {
  @Input() options: RadioOption[] = [];
  @Input() name: string = 'radio-group';
  @Input() defaultValue: string | null = null;
  @Input() disabled: boolean = false;
  @Input() inline: boolean = false;

  selectedValue: string | null = null;

  @Output() valueChanged = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {
    if (this.defaultValue) {
      this.selectedValue = this.defaultValue;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['defaultValue'] && changes['defaultValue'].currentValue) {
      this.selectedValue = changes['defaultValue'].currentValue;
    }
  }

  onRadioChange(value: string): void {
    if (!this.disabled && this.selectedValue !== value) {
      this.selectedValue = value;
      this.valueChanged.emit(value);
    }
  }

  isOptionDisabled(option: RadioOption): boolean {
    return this.disabled || option.disabled || false;
  }
}
