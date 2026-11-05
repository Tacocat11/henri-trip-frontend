
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ActivityService } from '../../core/services/activity';
import { Activity } from '../../core/models/activity.model';

@Component({
  selector: 'app-admin-activities',
  imports: [RouterLink],
  templateUrl: './admin-activities.html',
  styleUrl: './admin-activities.css'
})
export class AdminActivities implements OnInit {

  private activityService = inject(ActivityService);

  activities = signal<Activity[]>([]);
  loading = signal(true);
  errorMessage = signal('');
  deletingId = signal<number | null>(null);
  categoryLabels: Record<string, string> = {
    MUSEUM: 'Musée',
    CASTLE: 'Château',
    ACTIVITY: 'Activité',
    PARK: 'Parc',
    CAVE: 'Grotte'
  };

  ngOnInit(): void {
    this.loadActivities();
  }

  loadActivities(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.activityService.getAllActivities().subscribe({
      next: activities => {
        this.activities.set(activities);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('Impossible de charger les activités.');
        this.loading.set(false);
      }
    });
  }

  deleteActivity(activity: Activity): void {
    if (!window.confirm(`Supprimer "${activity.title}" ?`)) {
      return;
    }

    this.deletingId.set(activity.id);
    this.errorMessage.set('');

    this.activityService.deleteActivity(activity.id).subscribe({
      next: () => {
        this.activities.update(activities =>
          activities.filter(a => a.id !== activity.id)
        );
        this.deletingId.set(null);
      },
      error: () => {
        this.errorMessage.set(
          'Suppression impossible. Cette activité est peut-être utilisée dans un guide.'
        );
        this.deletingId.set(null);
      }
    });
  }
}
