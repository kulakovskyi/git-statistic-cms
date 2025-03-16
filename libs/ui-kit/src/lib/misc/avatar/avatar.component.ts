import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  output,
} from '@angular/core';
import {
  MODAL_CALLBACK,
  ModalService,
  UploadImageService,
  USER_DEFAULT_AVATAR,
} from '@core-utils';
import { ButtonComponent, LoaderComponent } from '../../form';
import { NgIf } from '@angular/common';
import { ConfirmModalComponent } from '../../modals';

@Component({
  selector: 'ui-avatar',
  imports: [LoaderComponent, NgIf, ButtonComponent],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent {
  image = model<string>(USER_DEFAULT_AVATAR);
  class = input<string>('me-6');
  modalClearImageTitle = input<string>('');
  modalClearImageDescription = input<string>('');
  isLoading = input<boolean>(false);
  changeImage = output<File | null>();

  constructor(
    private uploadImageService: UploadImageService,
    private modalService: ModalService,
  ) {}

  onFileSelected(event: Event) {
    const { file, fileUrl } =
      this.uploadImageService.handleFileSelection(event);
    if (file && fileUrl) {
      this.changeImage.emit(file);
    }
  }

  removeImage() {
    this.modalService
      .openModal(ConfirmModalComponent, {
        description: this.modalClearImageDescription(),
        header: this.modalClearImageTitle(),
      })
      .subscribe((res) => {
        if (res === MODAL_CALLBACK.SUCCESS) {
          this.changeImage.emit(null);
        }
      });
  }
}
