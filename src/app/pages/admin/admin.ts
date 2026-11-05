
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { GuideService } from '../../core/services/guide';
import { Guide } from '../../core/models/guide.model';

@Component({
  selector: 'app-admin',
  imports: [RouterLink],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})

export class Admin implements OnInit {

  private guideService = inject(GuideService);

  guides = signal<Guide[]>([]);
  loading = signal(true);
  errorMessage = signal('');

  ngOnInit(): void {
    this.loadGuides();
  }

  loadGuides(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.guideService.getAllGuides().subscribe({
      next: guides => {
        this.guides.set(guides);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set(
          'Impossible de récupérer les guides.'
        );
        this.loading.set(false);
      }
    });
  }

  deleteGuide(guide: Guide): void {
    const confirmed = window.confirm(
      `Voulez-vous vraiment supprimer le guide "${guide.title}" ?`
    );

    if (!confirmed) {
      return;
    }

    this.guideService.deleteGuide(guide.id).subscribe({
      next: () => {
        this.guides.update(guides =>
          guides.filter(g => g.id !== guide.id)
        );
      },
      error: () => {
        this.errorMessage.set(
          'Impossible de supprimer le guide.'
        );
      }
    });
  }
}
