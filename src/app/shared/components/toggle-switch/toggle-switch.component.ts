import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

interface ToggleOption {
  value: string;
  label: string;
}
@Component({
  selector: 'app-toggle-switch',
  templateUrl: './toggle-switch.component.html',
  styleUrls: ['./toggle-switch.component.scss'],
})
export class ToggleSwitchComponent implements OnInit {
  @Input() options: ToggleOption[] = [];
  @Input() defaultValue: string | null = null;

  selectedOptionValue: string | null = null;
  selectedOptionIndex: number = 0;

  @Output() optionChanged = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {
    if (
      this.defaultValue &&
      this.options.some((opt) => opt.value === this.defaultValue)
    ) {
      this.selectedOptionValue = this.defaultValue;
    } else if (this.options.length > 0) {
      this.selectedOptionValue = this.options[0].value;
    }

    this.updateSelectedIndexAndEmit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options'] || changes['defaultValue']) {
      const currentSelectedIsValid = this.options.some(
        (opt) => opt.value === this.selectedOptionValue
      );
      if (!currentSelectedIsValid && this.options.length > 0) {
        if (
          this.defaultValue &&
          this.options.some((opt) => opt.value === this.defaultValue)
        ) {
          this.selectedOptionValue = this.defaultValue;
        } else {
          this.selectedOptionValue = this.options[0].value;
        }
      } else if (this.options.length === 0) {
        this.selectedOptionValue = null;
      }
      this.updateSelectedIndexAndEmit();
    }
  }

  selectOption(optionValue: string): void {
    if (this.selectedOptionValue !== optionValue) {
      this.selectedOptionValue = optionValue;
      this.updateSelectedIndexAndEmit();
      console.log('Custom Toggle: Selected Option:', this.selectedOptionValue);
    }
  }

  private updateSelectedIndexAndEmit(): void {
    const foundIndex = this.options.findIndex(
      (opt) => opt.value === this.selectedOptionValue
    );
    this.selectedOptionIndex =
      foundIndex !== -1 ? foundIndex : this.options.length > 0 ? 0 : -1;

    if (this.selectedOptionValue) {
      this.optionChanged.emit(this.selectedOptionValue);
    }
  }
}
