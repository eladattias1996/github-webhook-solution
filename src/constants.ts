import {
  Event,
} from "./types/events";
import {
  convertBodyRepositoryDeleteEvent,
  convertBodyToPushEvent,
  convertBodyToTeamCreationEvent,
} from "./utils/converters";

export const TYPE_TO_CLASS_INNITIATORS_MAP: Record<
  string,
  (body: string) => Event
> = {
  push: (body) => convertBodyToPushEvent(body),
  "team.created": (body) => convertBodyToTeamCreationEvent(body),
  "repository.deleted": (body) => convertBodyRepositoryDeleteEvent(body),
};
