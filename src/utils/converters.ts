import {
  Organization,
  PushEvent,
  Repository,
  RepositoryDeleteEvent,
  Team,
  TeamCreationEvent,
} from "../types/events";
import {
  OrganizationPayload,
  PushEventPayload,
  RepositoryDeletedEventPayload,
  RespoitoryPayload,
  TeamCreatedEventPayload,
  TeamPayload,
} from "../types/payloads";

export const convertOrganizationPayloadToOrganization = ({
  login,
}: OrganizationPayload): Organization => new Organization(login);

export const convertRepositoryPayloadToRepository = ({
  name,
  created_at,
  updated_at,
}: RespoitoryPayload): Repository =>
  new Repository(name, new Date(created_at), new Date(updated_at));

export const convertTeamPayloadToTeam = ({ name }: TeamPayload): Team =>
  new Team(name);

export const convertBodyToPushEvent = (body: unknown): PushEvent => {
  const payload = body as PushEventPayload;
  const pushedAt = new Date(payload.repository.updated_at);

  return new PushEvent(
    pushedAt,
    payload.pusher.name,
    convertRepositoryPayloadToRepository(payload.repository),
    convertOrganizationPayloadToOrganization(payload.organization),
  );
};

export const convertBodyToTeamCreationEvent = (
  body: unknown,
): TeamCreationEvent => {
  const payload = body as TeamCreatedEventPayload;

  return new TeamCreationEvent(
    convertTeamPayloadToTeam(payload.team),
    convertOrganizationPayloadToOrganization(payload.organization),
  );
};

export const convertBodyRepositoryDeleteEvent = (
  body: unknown,
): RepositoryDeleteEvent => {
  const payload = body as RepositoryDeletedEventPayload;

  return new RepositoryDeleteEvent(
    convertRepositoryPayloadToRepository(payload.repository),
    convertOrganizationPayloadToOrganization(payload.organization),
  );
};
