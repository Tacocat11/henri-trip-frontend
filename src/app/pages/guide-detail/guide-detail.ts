
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { GuideService } from '../../core/services/guide';
import { Guide, GuideActivity } from '../../core/models/guide.model';

@Component({
  selector: 'app-guide-detail',
  imports: [RouterLink],
  templateUrl: './guide-detail.html',
  styleUrl: './guide-detail.css'
})
export class GuideDetail implements OnInit {

  private route = inject(ActivatedRoute);
  private guideService = inject(GuideService);

  guide = signal<Guide | null>(null);
  loading = signal(true);
  errorMessage = signal('');

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!Number.isSafeInteger(id) || id <= 0) {
      this.errorMessage.set('Identifiant de guide invalide.');
      this.loading.set(false);
      return;
    }

    this.guideService.getMyGuide(id).subscribe({
      next: guide => {
        this.guide.set(guide);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set(
          'Impossible de charger ce guide ou accès non autorisé.'
        );
        this.loading.set(false);
      }
    });
  }

  getActivitiesForDay(day: number): GuideActivity[] {
    return [...(this.guide()?.activities ?? [])]
      .filter(activity => activity.dayNumber === day)
      .sort((a, b) => a.visitOrder - b.visitOrder);
  }

  getDays(numberOfDays: number): number[] {
    return Array.from(
      { length: numberOfDays },
      (_, index) => index + 1
    );
  }
}
