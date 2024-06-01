import { MalicouiousBehavior } from "./malicious-behaviors";
import {
  validateDeleteRepository,
  validatePushTime,
  validateTeamCreation,
} from "../utils/validators";

export class Organization {
  constructor(readonly name: string) {}
}

export class User {
  constructor(readonly username: string) {}
}

export class Team {
  constructor(readonly name: string) {}
}

export class Repository {
  constructor(
    readonly name: string,
    readonly createdAt: Date,
    readonly updatedAt: Date,
  ) {}
}

export type MaliciousBehaviorValidator = (
  event: Event,
) => MalicouiousBehavior | undefined;

export abstract class Event {
  constructor(
    readonly organization: Organization,
    readonly user: User,
    private readonly validators: MaliciousBehaviorValidator[],
  ) {}

  validate(): MalicouiousBehavior[] {
    return this.validators.reduce<MalicouiousBehavior[]>(
      (currentMaliciousBehaviors, validate) => {
        const maliciousBehavior = validate(this);

        return maliciousBehavior
          ? [...currentMaliciousBehaviors, maliciousBehavior]
          : currentMaliciousBehaviors;
      },
      [],
    );
  }
}

export class PushEvent extends Event {
  constructor(
    readonly pushTime: Date,
    readonly repository: Repository,
    organization: Organization,
    user: User,
  ) {
    super(organization, user, [validatePushTime]);
  }
}

export class TeamCreationEvent extends Event {
  constructor(
    readonly team: Team,
    organization: Organization,
    user: User,
  ) {
    super(organization, user, [validateTeamCreation]);
  }
}

export class RepositoryDeleteEvent extends Event {
  constructor(
    readonly repository: Repository,
    organization: Organization,
    user: User,
  ) {
    super(organization, user, [validateDeleteRepository]);
  }
}
