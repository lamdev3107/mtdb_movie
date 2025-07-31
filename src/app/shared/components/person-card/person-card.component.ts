import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Cast } from '@features/movies/models/credit.model';

@Component({
  selector: 'app-person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.scss'],
})
export class PersonCardComponent implements OnInit, OnChanges {
  @Input() cast!: Cast;
  @Input() isLoading!: boolean | null;
  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('check changes', changes);
  }
  ngOnInit(): void {}
}
