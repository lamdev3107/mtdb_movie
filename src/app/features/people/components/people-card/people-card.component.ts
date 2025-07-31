import { Component, Input, OnInit } from '@angular/core';
import { Person } from '@features/people/models/person.model';

@Component({
  selector: 'app-people-card',
  templateUrl: './people-card.component.html',
  styleUrls: ['./people-card.component.scss'],
})
export class PeopleCardComponent implements OnInit {
  @Input() person: Person | null = null;
  constructor() {}

  ngOnInit(): void {}

  renderKnownForText(person: Person): string {
    if (!person.known_for || person.known_for.length === 0) {
      return 'Unknown';
    }
    return person.known_for
      .map((item: any) => {
        if (item.name) return item.name;
        return item.title;
      })
      .join(', ');
  }
}
