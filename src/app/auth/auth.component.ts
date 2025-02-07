import {
  animate,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component } from '@angular/core';
import { ChildrenOutletContexts, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [RouterOutlet],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
  animations: [
    trigger('routerFadeIn', [
      transition('* <=> *', [
        query(
          ':enter',
          [
            style({ opacity: 0 }),
            animate('1s ease-in-out', style({ opacity: 1 })),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class AuthComponent {
  constructor(private context: ChildrenOutletContexts) {}
  getRouteUrl() {
    return this.context.getContext('primary')?.route?.url;
  }
}
