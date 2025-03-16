import { Pipe, PipeTransform } from '@angular/core';
import { USER_DEFAULT_AVATAR } from '../constants';

@Pipe({
  name: 'defaultAvatar',
  standalone: true,
})
export class DefaultAvatarPipe implements PipeTransform {
  transform(pic?: string, domain?: string): string {
    return pic ? `${domain}${pic}` : USER_DEFAULT_AVATAR;
  }
}
