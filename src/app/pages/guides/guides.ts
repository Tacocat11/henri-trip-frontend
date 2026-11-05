
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { GuideService } from '../../core/services/guide';
import { Guide } from '../../core/models/guide.model';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-guides',
  imports: [RouterLink],
  templateUrl: './guides.html',
  styleUrl: './guides.css'
})
export class Guides implements OnInit {

  private guideService = inject(GuideService);
  private auth = inject(Auth);

  guides = signal<Guide[]>([]);
  loading = signal(true);
  errorMessage = signal('');

  ngOnInit(): void {
    this.loadGuides();
  }

  loadGuides(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.guideService.getMyGuides().subscribe({
      next: guides => {
        this.guides.set(guides);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set(
          'Impossible de charger vos guides.'
        );
        this.loading.set(false);
      }
    });
  }

  getEmail(): string {
    return sessionStorage.getItem('email') ?? '';
  }
}

