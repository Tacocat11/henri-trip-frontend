
export type Mobility = 'WALKING' | 'BIKE' | 'CAR' | 'MOTORCYCLE';

export type Season = 'SPRING' | 'SUMMER' | 'AUTUMN' | 'WINTER';

export type Audience = 'FAMILY' | 'ALONE' | 'GROUP' | 'FRIENDS';

export interface GuideActivity {
  id: number;
  activityId: number;
  title: string;
  dayNumber: number;
  visitOrder: number;
}

export interface Guide {
  id: number;
  title: string;
  description: string;
  numberOfDays: number;
  mobilities: Mobility[];
  seasons: Season[];
  audiences: Audience[];
  activities: GuideActivity[];
}
