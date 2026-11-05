
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ActivityService } from '../../core/services/activity';
import {
  ActivityRequest,
  ActivityCategory
} from '../../core/models/activity.model';

@Component({
  selector: 'app-activity-form',
  imports: [FormsModule],
  templateUrl: './activity-form.html',
  styleUrl: './activity-form.css'
})
export class ActivityForm implements OnInit {

  private activityService = inject(ActivityService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  activityId: number | null = null;

  loading = signal(false);
  saving = signal(false);
  errorMessage = signal('');

  categories: { value: ActivityCategory; label: string }[] = [
    { value: 'MUSEUM', label: 'Musée' },
    { value: 'CASTLE', label: 'Château' },
    { value: 'ACTIVITY', label: 'Activité' },
    { value: 'PARK', label: 'Parc' },
    { value: 'CAVE', label: 'Grotte' }
  ];

  form: ActivityRequest = {
    title: '',
    description: '',
    category: 'ACTIVITY',
    address: '',
    phone: '',
    openingHours: '',
    website: ''
  };

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam === null) {
      return;
    }

    const id = Number(idParam);

    if (!Number.isSafeInteger(id) || id <= 0) {
      this.errorMessage.set('Identifiant invalide.');
      return;
    }

    this.activityId = id;
    this.loading.set(true);

    this.activityService.getActivityById(id).subscribe({
      next: activity => {
        this.form = {
          title: activity.title,
          description: activity.description ?? '',
          category: activity.category,
          address: activity.address ?? '',
          phone: activity.phone ?? '',
          openingHours: activity.openingHours ?? '',
          website: activity.website ?? ''
        };

        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('Impossible de charger cette activité.');
        this.loading.set(false);
      }
    });
  }

  onSubmit(): void {
    if (this.saving() || this.loading()) {
      return;
    }

    this.saving.set(true);
    this.errorMessage.set('');

    const request = this.activityId === null
      ? this.activityService.createActivity(this.form)
      : this.activityService.updateActivity(this.activityId, this.form);

    request.subscribe({
      next: () => {
        this.router.navigate(['/admin/activities']);
      },
      error: () => {
        this.errorMessage.set(
          'Impossible d’enregistrer cette activité.'
        );
        this.saving.set(false);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/admin/activities']);
  }
}
