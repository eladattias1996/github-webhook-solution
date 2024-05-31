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
      event.pushingUser,
      event.organziation.name,
    );
  }
};

export const validateTeamCreation = ({
  team,
  organziation,
}: TeamCreationEvent) => {
  const prefixes = [/^hacker/];

  if (prefixes.some((prefix) => team.name.match(prefix))) {
    return new TeamCreationMalicouiousBehavior(team.name, organziation.name);
  }
};

export const validateDeleteRepository = ({
  repository,
  organziation,
}: RepositoryDeleteEvent) => {
  const { createdAt, updatedAt } = repository;

  if (getDifferenceBetweenDatesInMinutes(createdAt, updatedAt) < 10) {
    return new RepositoryDeleteMalicouiousBehavior(
      updatedAt,
      repository.name,
      organziation.name,
    );
  }
};
