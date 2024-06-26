import { ConsoleNotifier, Notifier } from "./types/notifiers";
import { Event } from "./types/events";
import {
  convertBodyRepositoryDeleteEvent,
  convertBodyToPushEvent,
  convertBodyToTeamCreationEvent,
} from "./utils/converters";

export const TYPE_TO_EVENT_INITIALIZER_MAP: Record<
  string,
  (body: string) => Event
> = {
  push: (body) => convertBodyToPushEvent(body),
  "team.created": (body) => convertBodyToTeamCreationEvent(body),
  "repository.deleted": (body) => convertBodyRepositoryDeleteEvent(body),
};

export const NOTIFIERS: Notifier[] = [new ConsoleNotifier()];
