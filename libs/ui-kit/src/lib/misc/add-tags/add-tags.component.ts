import {
  ChangeDetectionStrategy,
  Component,
  model,
  OnInit,
  output,
} from '@angular/core';
import { ChipModule } from 'primeng/chip';
import { NgForOf } from '@angular/common';
import { ButtonComponent, ChipComponent, InputComponent } from '../../form';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PopoverComponent } from '../popover/popover.component';

@Component({
  selector: 'ui-add-tags',
  imports: [
    ChipModule,
    PopoverComponent,
    InputComponent,
    ButtonComponent,
    ChipComponent,
    NgForOf,
  ],
  templateUrl: './add-tags.component.html',
  styleUrl: './add-tags.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTagsComponent implements OnInit {
  tags = model<string[]>(['test', 'test1', 'test2']);
  updateTags = output<string[]>();
  form: FormGroup = new FormGroup({});

  ngOnInit() {
    this.initializeForm();
  }

  removeTag(tag: string) {
    this.tags.update((tags) => tags.filter((t) => t !== tag));
    this.updateTags.emit(this.tags());
  }

  addTag() {
    if (this.form.valid) {
      this.tags.update((tags) => [...tags, this.form.value.tag]);
      this.updateTags.emit(this.tags());
      this.form.reset();
    }
  }

  private initializeForm() {
    this.form = new FormGroup({
      tag: new FormControl('', [Validators.required]),
    });
  }
}
