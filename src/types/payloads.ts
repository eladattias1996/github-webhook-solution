export interface OrganizationPayload {
  login: string;
}

export interface TeamPayload {
  name: string;
}

export interface RespoitoryPayload {
  name: string;
  created_at: string;
  updated_at: string;
}

export interface BaseEventPayload {
  organization: OrganizationPayload;
}

export interface TeamEventPayload extends BaseEventPayload {
  team: TeamPayload;
}

export interface RepositoryEventPayload extends BaseEventPayload {
  repository: RespoitoryPayload;
}

export interface PushEventPayload extends RepositoryEventPayload {
  pusher: {
    name: string;
  };
}

export type TeamCreatedEventPayload = TeamEventPayload;

export type RepositoryDeletedEventPayload = RepositoryEventPayload;
