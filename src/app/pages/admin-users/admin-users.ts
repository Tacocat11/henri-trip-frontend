
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserService } from '../../core/services/user';
import { User, UserRequest } from '../../core/models/user.model';

@Component({
  selector: 'app-admin-users',
  imports: [FormsModule, RouterLink],
  templateUrl: './admin-users.html',
  styleUrl: './admin-users.css'
})
export class AdminUsers implements OnInit {

  private userService = inject(UserService);

  users = signal<User[]>([]);
  loading = signal(true);
  saving = signal(false);
  errorMessage = signal('');
  successMessage = signal('');

  form: UserRequest = {
    email: '',
    password: '',
    role: 'USER'
  };

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.userService.getAllUsers().subscribe({
      next: users => {
        this.users.set(users);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('Impossible de charger les utilisateurs.');
        this.loading.set(false);
      }
    });
  }

  createUser(): void {
    if (this.saving()) return;

    this.saving.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');

    this.userService.createUser(this.form).subscribe({
      next: user => {
        this.users.update(users => [...users, user]);

        this.form = {
          email: '',
          password: '',
          role: 'USER'
        };

        this.successMessage.set('Utilisateur créé.');
        this.saving.set(false);
      },
      error: () => {
        this.errorMessage.set(
          'Création impossible. Vérifie notamment que l’email est disponible.'
        );
        this.saving.set(false);
      }
    });
  }

  deleteUser(user: User): void {
    if (!window.confirm(`Supprimer ${user.email} ?`)) {
      return;
    }

    this.errorMessage.set('');
    this.successMessage.set('');

    this.userService.deleteUser(user.id).subscribe({
      next: () => {
        this.users.update(users =>
          users.filter(u => u.id !== user.id)
        );
      },
      error: () => {
        this.errorMessage.set(
          'Impossible de supprimer cet utilisateur.'
        );
      }
    });
  }
}
