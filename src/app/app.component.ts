import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, filter, map, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  users = [
    { id: 1, name: 'Nexo', isActive: true },
    { id: 2, name: 'Anastie', isActive: true },
    { id: 3, name: 'Raleigh', isActive: true },
  ];
  users$ = of(this.users);
  usernames$ = this.users$.pipe(map((users) => users.map((user) => user.name)));
  filteredUsers$ = this.users$.pipe(
    filter((users) => users.every((usr) => usr.isActive)),
    map((usr) => usr.map((usr) => usr.name))
  );
  data$ = combineLatest([
    this.users$,
    this.usernames$,
    this.filteredUsers$,
  ]).pipe(
    map(([users, usernames, filteredusers]) => ({
      users,
      usernames,
      filteredusers,
    }))
  );
  user$ = new BehaviorSubject<{ id: number; name: string } | null>(null);
  ngOnInit(): void {
    setTimeout(() => {
      this.user$.next({ id: 1, name: 'Nexo Bentola' });
    }, 2000);
  }
}
