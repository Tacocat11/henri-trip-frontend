
import { Routes } from '@angular/router';

import { Login } from './pages/login/login';
import { Guides } from './pages/guides/guides';
import { Admin } from './pages/admin/admin';
import { GuideDetail } from './pages/guide-detail/guide-detail';
import { GuideForm } from './pages/guide-form/guide-form';
import { GuideActivities } from './pages/guide-activities/guide-activities';

import { AdminActivities } from './pages/admin-activities/admin-activities';
import { ActivityForm } from './pages/activity-form/activity-form';

import { AdminUsers } from './pages/admin-users/admin-users';
import { GuideInvitations } from './pages/guide-invitations/guide-invitations';

import { authGuard } from './core/guards/auth-guard';
import { adminGuard } from './core/guards/admin-guard';

export const routes: Routes = [
    {
        path: 'login',
        component: Login
    },
    {
        path: 'guides',
        component: Guides,
        canActivate: [authGuard]
    },
    {
        path: 'admin',
        component: Admin,
        canActivate: [authGuard, adminGuard]
    },

    {
        path: 'admin/users',
        component: AdminUsers,
        canActivate: [authGuard, adminGuard]
    },
    
    {
        path: 'admin/guides/:id/invitations',
        component: GuideInvitations,
        canActivate: [authGuard, adminGuard]
    },

    {
        path: 'admin/guides/new',
        component: GuideForm,
        canActivate: [authGuard, adminGuard]
    },

    {
        path: 'admin/guides/:id/edit',
        component: GuideForm,
        canActivate: [authGuard, adminGuard]
    },
    
    {
        path: 'admin/guides/:id/activities',
        component: GuideActivities,
        canActivate: [authGuard, adminGuard]
    },

    {
        path: 'admin/activities',
        component: AdminActivities,
        canActivate: [authGuard, adminGuard]
    },

    {
        path: 'admin/activities/new',
        component: ActivityForm,
        canActivate: [authGuard, adminGuard]
    },

    {
        path: 'admin/activities/:id/edit',
        component: ActivityForm,
        canActivate: [authGuard, adminGuard]
    },

    {
        path: 'guides/:id',
        component: GuideDetail,
        canActivate: [authGuard]
    },
    
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },

    {
        path: '**',
        redirectTo: 'login'
    }
];
