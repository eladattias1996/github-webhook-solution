import {
  PushTimingMalicouiousBehavior,
  RepositoryDeleteMalicouiousBehavior,
  TeamCreationMalicouiousBehavior,
} from "../types/malicious-behaviors";
import { getDifferenceBetweenDatesInMinutes } from "./date-utils";
import {
  PushEvent,
  RepositoryDeleteEvent,
  TeamCreationEvent,
} from "../types/events";

const SUSPICIOUS_PUSH_START_HOUR = 14;
const SUSPICIOUS_PUSH_END_HOUR = 16;

export const validatePushTime = (event: PushEvent) => {
  const pushHour = event.pushTime.getHours();

  if (
    pushHour >= SUSPICIOUS_PUSH_START_HOUR &&
    pushHour < SUSPICIOUS_PUSH_END_HOUR
  ) {
    return new PushTimingMalicouiousBehavior(
      event.pushTime,
      event.repository.name,
      event.user.username,
      event.organization.name,
    );
  }
};

export const validateTeamCreation = ({
  team,
  organization: organziation,
  user,
}: TeamCreationEvent) => {
  const prefixes = [/^hacker*/];

  if (prefixes.some((prefix) => team.name.match(prefix))) {
    return new TeamCreationMalicouiousBehavior(
      team.name,
      organziation.name,
      user.username,
    );
  }
};

export const validateDeleteRepository = ({
  repository,
  organization: organziation,
  user,
}: RepositoryDeleteEvent) => {
  const { createdAt, updatedAt } = repository;

  if (getDifferenceBetweenDatesInMinutes(createdAt, updatedAt) < 10) {
    return new RepositoryDeleteMalicouiousBehavior(
      updatedAt,
      repository.name,
      organziation.name,
      user.username,
    );
  }
};
