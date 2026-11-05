export interface GuideInvitation {
  id: number;
  userId: number;
  userEmail: string;
  guideId: number;
}

export interface GuideInvitationRequest {
  userId: number;
}