
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_URL } from '../api.config';
import { Guide, GuideActivity } from '../models/guide.model';
import { Mobility, Season, Audience } from '../models/guide.model';

@Injectable({
  providedIn: 'root'
})
export class GuideService {

    private http = inject(HttpClient);

    getMyGuides(): Observable<Guide[]> {
        return this.http.get<Guide[]>(
        `${API_URL}/my/guides`
        );
    }

    getMyGuide(id: number): Observable<Guide> {
        return this.http.get<Guide>(
        `${API_URL}/my/guides/${id}`
        );
    }

    getAllGuides(): Observable<Guide[]> {
        return this.http.get<Guide[]>(
            `${API_URL}/guides`
        );
    }

    getGuideById(id: number): Observable<Guide> {
        return this.http.get<Guide>(
            `${API_URL}/guides/${id}`
        );
    }

    getGuideActivities(guideId: number): Observable<GuideActivity[]> {
        return this.http.get<GuideActivity[]>(
            `${API_URL}/guides/${guideId}/activities`
        );
    }

    createGuide(data: GuideRequest): Observable<Guide> {
        return this.http.post<Guide>(
            `${API_URL}/guides`,
            data
        );
    }

    updateGuide(id: number, data: GuideRequest): Observable<Guide> {
        return this.http.put<Guide>(
            `${API_URL}/guides/${id}`,
            data
        );
    }

    deleteGuide(id: number): Observable<void> {
        return this.http.delete<void>(
            `${API_URL}/guides/${id}`
        );
    }

    addActivityToGuide(
        guideId: number,
        data: GuideActivityRequest
        ): Observable<GuideActivity> {
        return this.http.post<GuideActivity>(
            `${API_URL}/guides/${guideId}/activities`,
            data
        );
    }

    updateGuideActivity(
        guideId: number,
        associationId: number,
        data: GuideActivityRequest
        ): Observable<GuideActivity> {
        return this.http.put<GuideActivity>(
            `${API_URL}/guides/${guideId}/activities/${associationId}`,
            data
        );
    }

    removeActivityFromGuide(
        guideId: number,
        associationId: number
        ): Observable<void> {
        return this.http.delete<void>(
            `${API_URL}/guides/${guideId}/activities/${associationId}`
        );
    }

}

export interface GuideRequest {
  title: string;
  description: string;
  numberOfDays: number;
  mobilities: Mobility[];
  seasons: Season[];
  audiences: Audience[];
}

export interface GuideActivityRequest {
  activityId: number;
  dayNumber: number;
  visitOrder: number;
}
