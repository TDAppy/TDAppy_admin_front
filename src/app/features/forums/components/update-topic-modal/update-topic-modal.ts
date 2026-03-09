import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { TopicModel, TopicUpdateModel } from '@/features/forums/models/topic.model';
import { CategoryServiceApi } from '@/features/forums/services/category-service-api';

@Component({
  selector: 'app-update-topic-modal',
  imports: [],
  templateUrl: './update-topic-modal.html',
  styleUrl: './update-topic-modal.css',
})
export class UpdateTopicModal implements OnInit {
  private readonly _categoryServiceApi = inject(CategoryServiceApi);

  topic = input.required<TopicModel>();
  closeModal = output<void>();
  confirm = output<TopicUpdateModel>();

  categories = signal<string[]>([]);
  title = signal('');
  message = signal('');
  categoryName = signal('');
  error = signal('');

  ngOnInit(): void {
    this.title.set(this.topic().topicTitle);
    this.message.set(this.topic().message ?? '');
    this.categoryName.set(this.topic().categoryName ?? '');
    this._categoryServiceApi.getAllCategories().then((result) => {
      this.categories.set(result);
    });
  }

  onOverlayClick(event: MouseEvent):void {
    if (event.target === event.currentTarget) {
      this.closeModal.emit();
    }
  }

  submit():void {
    if (!this.title() || !this.message() || !this.categoryName()) {
      this.error.set('Tous les champs sont obligatoires.');
      return;
    }
    this.error.set('');
    this.confirm.emit({
      title: this.title(),
      message: this.message(),
      categoryName: this.categoryName(),
    });
  }
}
