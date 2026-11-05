
import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';

import { UserService } from '../../core/services/user';
import { InvitationService } from '../../core/services/invitation';
import { User } from '../../core/models/user.model';
import { GuideInvitation } from '../../core/models/invitation.model';

@Component({
  selector: 'app-guide-invitations',
  imports: [FormsModule, RouterLink],
  templateUrl: './guide-invitations.html',
  styleUrl: './guide-invitations.css'
})
export class GuideInvitations implements OnInit {

  private route = inject(ActivatedRoute);
  private userService = inject(UserService);
  private invitationService = inject(InvitationService);

  guideId = 0;
  users = signal<User[]>([]);
  invitations = signal<GuideInvitation[]>([]);

  loading = signal(true);
  saving = signal(false);
  errorMessage = signal('');

  selectedUserId = 0;

  availableUsers = computed(() =>
    this.users().filter(user =>
      user.role === 'USER' &&
      !this.invitations().some(inv => inv.userId === user.id)
    )
  );

  ngOnInit(): void {
    this.guideId = Number(this.route.snapshot.paramMap.get('id'));

    if (!Number.isSafeInteger(this.guideId) || this.guideId <= 0) {
      this.errorMessage.set('Identifiant de guide invalide.');
      this.loading.set(false);
      return;
    }

    this.loadData();
  }

  loadData(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    forkJoin({
      users: this.userService.getAllUsers(),
      invitations: this.invitationService.getInvitations(this.guideId)
    }).subscribe({
      next: ({ users, invitations }) => {
        this.users.set(users);
        this.invitations.set(invitations);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('Impossible de charger les invitations.');
        this.loading.set(false);
      }
    });
  }

  invite(): void {
    if (this.selectedUserId <= 0 || this.saving()) {
      return;
    }

    this.saving.set(true);
    this.errorMessage.set('');

    this.invitationService.inviteUser(
      this.guideId,
      this.selectedUserId
    ).subscribe({
      next: invitation => {
        this.invitations.update(items => [...items, invitation]);
        this.selectedUserId = 0;
        this.saving.set(false);
      },
      error: () => {
        this.errorMessage.set('Impossible d’inviter cet utilisateur.');
        this.saving.set(false);
      }
    });
  }

  revoke(invitation: GuideInvitation): void {
    if (this.saving()) {
      return;
    }

    if (!window.confirm(
      `Retirer l'accès de ${invitation.userEmail} ?`
    )) {
      return;
    }

    this.saving.set(true);
    this.errorMessage.set('');

    this.invitationService.revokeInvitation(
      this.guideId,
      invitation.userId
    ).subscribe({
      next: () => {
        this.invitations.update(items =>
          items.filter(inv => inv.userId !== invitation.userId)
        );
        this.saving.set(false);
      },
      error: () => {
        this.errorMessage.set('Impossible de retirer cette invitation.');
        this.saving.set(false);
      }
    });
  }
}
