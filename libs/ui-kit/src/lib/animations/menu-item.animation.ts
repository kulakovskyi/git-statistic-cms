import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const childrenAnimation = trigger('children', [
  state(
    'collapsed',
    style({
      height: '0',
    }),
  ),
  state(
    'expanded',
    style({
      height: '*',
    }),
  ),
  transition(
    'collapsed <=> expanded',
    animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'),
  ),
]);
