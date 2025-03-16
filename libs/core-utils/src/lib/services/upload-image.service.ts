import { Injectable } from '@angular/core';

@Injectable()
export class UploadImageService {
  handleFileSelection(event: Event): {
    file: File | null;
    fileUrl: string | null;
  } {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const fileUrl = URL.createObjectURL(input.files[0]);
      return { file: input.files[0], fileUrl };
    }
    return { file: null, fileUrl: null };
  }
}
