import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_URL } from '../api.config';
import { Activity, ActivityRequest} from '../models/activity.model';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
    private http = inject(HttpClient);

    getAllActivities(): Observable<Activity[]> {
        return this.http.get<Activity[]>(`${API_URL}/activities`);
    }

    getActivityById(id: number): Observable<Activity> {
        return this.http.get<Activity>(`${API_URL}/activities/${id}`);
    }

    createActivity(data: ActivityRequest): Observable<Activity> {
        return this.http.post<Activity>(`${API_URL}/activities`, data);
    }

    updateActivity(id: number, data: ActivityRequest): Observable<Activity> {
        return this.http.put<Activity>(`${API_URL}/activities/${id}`, data);
    }

    deleteActivity(id: number): Observable<void> {
        return this.http.delete<void>(`${API_URL}/activities/${id}`);
    }
}

