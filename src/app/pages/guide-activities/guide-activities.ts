
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { GuideService } from '../../core/services/guide';
import { Guide, GuideActivity } from '../../core/models/guide.model';

import { FormsModule } from '@angular/forms';
import { ActivityService } from '../../core/services/activity';
import { Activity } from '../../core/models/activity.model';
import { GuideActivityRequest } from '../../core/services/guide';

@Component({
  selector: 'app-guide-activities',
  imports: [RouterLink, FormsModule],
  templateUrl: './guide-activities.html',
  styleUrl: './guide-activities.css'
})
export class GuideActivities implements OnInit {

  private route = inject(ActivatedRoute);
  private guideService = inject(GuideService);
  private activityService = inject(ActivityService);

  guide = signal<Guide | null>(null);
  loading = signal(true);
  errorMessage = signal('');

  availableActivities = signal<Activity[]>([]);
  saving = signal(false);
  formError = signal('');
  editingAssociationId = signal<number | null>(null);
  deletingAssociationId = signal<number | null>(null);

  form: GuideActivityRequest = {
    activityId: 0,
    dayNumber: 1,
    visitOrder: 1
  };

  editForm: GuideActivityRequest = {
    activityId: 0,
    dayNumber: 1,
    visitOrder: 1
  };

  ngOnInit(): void {
    this.loadAvailableActivities();
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!Number.isSafeInteger(id) || id <= 0) {
      this.errorMessage.set('Identifiant invalide.');
      this.loading.set(false);
      return;
    }

    this.guideService.getGuideById(id).subscribe({
      next: guide => {
        this.guide.set(guide);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('Impossible de charger le guide.');
        this.loading.set(false);
      }
    });
  }

  activitiesForDay(day: number): GuideActivity[] {
    return [...(this.guide()?.activities ?? [])]
      .filter(activity => activity.dayNumber === day)
      .sort((a, b) => a.visitOrder - b.visitOrder);
  }

  days(count: number): number[] {
    return Array.from({ length: count }, (_, i) => i + 1);
  }

  loadAvailableActivities(): void {
    this.activityService.getAllActivities().subscribe({
      next: activities => {
        this.availableActivities.set(activities);
      },
      error: () => {
        this.formError.set(
          'Impossible de charger les activités disponibles.'
        );
      }
    });
  }

  addActivity(): void {
    const guideId = this.guide()?.id;

    if (!guideId || this.saving()) {
      return;
    }

    this.saving.set(true);
    this.formError.set('');

    this.guideService.addActivityToGuide(guideId, this.form).subscribe({
      next: () => {
        this.saving.set(false);

        // Recharge le guide pour afficher son programme actualisé.
        this.guideService.getGuideById(guideId).subscribe({
          next: guide => this.guide.set(guide),
          error: () => this.formError.set(
            'Activité ajoutée, mais impossible de rafraîchir le programme.'
          )
        });

        this.form = {
          activityId: 0,
          dayNumber: 1,
          visitOrder: 1
        };
      },
      error: () => {
        this.saving.set(false);
        this.formError.set(
          'Impossible d’ajouter cette activité au guide.'
        );
      }
    });
  }
  
  startEditing(activity: GuideActivity): void {
    this.editingAssociationId.set(activity.id);

    this.editForm = {
      activityId: activity.activityId,
      dayNumber: activity.dayNumber,
      visitOrder: activity.visitOrder
    };

    this.formError.set('');
  }

  cancelEditing(): void {
    this.editingAssociationId.set(null);
  }

  saveActivity(): void {
    const guideId = this.guide()?.id;
    const associationId = this.editingAssociationId();

    if (!guideId || associationId === null || this.saving()) {
      return;
    }

    this.saving.set(true);
    this.formError.set('');

    this.guideService.updateGuideActivity(
      guideId,
      associationId,
      this.editForm
    ).subscribe({
      next: () => {
        this.editingAssociationId.set(null);
        this.saving.set(false);
        this.reloadGuide(guideId);
      },
      error: () => {
        this.formError.set('Impossible de modifier cette activité.');
        this.saving.set(false);
      }
    });
  }

  deleteActivity(activity: GuideActivity): void {
    const guideId = this.guide()?.id;

    if (!guideId || this.deletingAssociationId() !== null) {
      return;
    }

    const confirmed = window.confirm(
      `Retirer "${activity.title}" du programme ?`
    );

    if (!confirmed) {
      return;
    }

    this.deletingAssociationId.set(activity.id);
    this.formError.set('');

    this.guideService.removeActivityFromGuide(
      guideId,
      activity.id
    ).subscribe({
      next: () => {
        this.deletingAssociationId.set(null);
        this.reloadGuide(guideId);
      },
      error: () => {
        this.formError.set('Impossible de retirer cette activité.');
        this.deletingAssociationId.set(null);
      }
    });
  }

  reloadGuide(guideId: number): void {
    this.guideService.getGuideById(guideId).subscribe({
      next: guide => this.guide.set(guide),
      error: () => {
        this.formError.set(
          'Impossible de rafraîchir le programme.'
        );
      }
    });
  }
}
