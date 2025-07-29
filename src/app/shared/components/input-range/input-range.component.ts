import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-range',
  templateUrl: './input-range.component.html',
  styleUrls: ['./input-range.component.scss'],
})
export class InputRangeComponent implements OnInit {
  @Input() minValue: number = 0;
  @Input() maxValue: number = 10;
  @Input() step: number = 1;
  @Input() label: string = 'Input Range';
  @Input() showTooltip: boolean = true;
  @Input() tooltipText: string = '';
  @Input() labels: string[] = ['0', '5', '10'];

  ticks: number[] = Array.from({ length: 11 }, (_, i) => i);
  
  constructor() {}

  ngOnInit(): void {}
}
