
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Mobility, Season, Audience } from '../../core/models/guide.model';
import {
  GuideService,
  GuideRequest
} from '../../core/services/guide';

@Component({
  selector: 'app-guide-form',
  imports: [FormsModule],
  templateUrl: './guide-form.html',
  styleUrl: './guide-form.css'
})
export class GuideForm implements OnInit {

  private guideService = inject(GuideService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  guideId: number | null = null;
  saving = signal(false);
  loading = signal(false);
  errorMessage = signal('');

  mobilityOptions: { value: Mobility; label: string }[] = [
    { value: 'CAR', label: 'Voiture' },
    { value: 'BIKE', label: 'Vélo' },
    { value: 'WALKING', label: 'À pied' },
    { value: 'MOTORCYCLE', label: 'Moto' }
  ];

  seasonOptions: { value: Season; label: string }[] = [
    { value: 'SPRING', label: 'Printemps' },
    { value: 'SUMMER', label: 'Été' },
    { value: 'AUTUMN', label: 'Automne' },
    { value: 'WINTER', label: 'Hiver' }
  ];

  audienceOptions: { value: Audience; label: string }[] = [
    { value: 'FAMILY', label: 'Famille' },
    { value: 'ALONE', label: 'Solo' },
    { value: 'GROUP', label: 'Groupe' },
    { value: 'FRIENDS', label: 'Amis' }
  ];

  form: GuideRequest = {
    title: '',
    description: '',
    numberOfDays: 1,
    mobilities: [],
    seasons: [],
    audiences: []
  };

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam !== null) {
      const id = Number(idParam);

      if (!Number.isSafeInteger(id) || id <= 0) {
        this.errorMessage.set('Identifiant de guide invalide.');
        return;
      }

      this.guideId = id;
      this.loading.set(true);

      this.guideService.getGuideById(id).subscribe({
        next: guide => {
          this.form = {
            title: guide.title,
            description: guide.description,
            numberOfDays: guide.numberOfDays,
            mobilities: [...guide.mobilities],
            seasons: [...guide.seasons],
            audiences: [...guide.audiences]
          };

          this.loading.set(false);
        },
        error: () => {
          this.errorMessage.set('Impossible de charger le guide.');
          this.loading.set(false);
        }
      });
    }
  }

  onSubmit(): void {
    this.saving.set(true);
    this.errorMessage.set('');

    const request = this.guideId === null
      ? this.guideService.createGuide(this.form)
      : this.guideService.updateGuide(this.guideId, this.form);

    request.subscribe({
      next: () => {
        this.router.navigate(['/admin']);
      },
      error: () => {
        this.errorMessage.set(
          'Impossible d’enregistrer le guide.'
        );
        this.saving.set(false);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/admin']);
  }

  isSelected<T>(values: T[], value: T): boolean {
    return values.includes(value);
  }

  toggleSelection<T>(values: T[], value: T, checked: boolean): void {
    if (checked && !values.includes(value)) {
      values.push(value);
    } else if (!checked) {
      const index = values.indexOf(value);
      if (index !== -1) {
        values.splice(index, 1);
      }
    }
  }
}
