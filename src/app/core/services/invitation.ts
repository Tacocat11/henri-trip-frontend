
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_URL } from '../api.config';
import { GuideInvitation } from '../models/invitation.model';

@Injectable({
  providedIn: 'root'
})
export class InvitationService {
  private http = inject(HttpClient);

  getInvitations(guideId: number): Observable<GuideInvitation[]> {
    return this.http.get<GuideInvitation[]>(
      `${API_URL}/guides/${guideId}/invitations`
    );
  }

  inviteUser(
    guideId: number,
    userId: number
  ): Observable<GuideInvitation> {
    return this.http.post<GuideInvitation>(
      `${API_URL}/guides/${guideId}/invitations`,
      { userId }
    );
  }

  revokeInvitation(
    guideId: number,
    userId: number
  ): Observable<void> {
    return this.http.delete<void>(
      `${API_URL}/guides/${guideId}/invitations/${userId}`
    );
  }
}
