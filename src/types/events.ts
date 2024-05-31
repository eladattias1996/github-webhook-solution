import { Irregulatory } from "./Irregulatory";
import {
  validateDeleteRepository,
  validatePushTime,
  validateTeamCreation,
} from "../utils/validators";

export class Organization {
  constructor(readonly name: string) {}
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

export type IrregulatoryValidator = (event: Event) => Irregulatory | undefined;

export abstract class Event {
  constructor(
    readonly organziation: Organization,
    private readonly validators: IrregulatoryValidator[],
  ) {}

  validate(): Irregulatory[] {
    return this.validators.reduce<Irregulatory[]>(
      (currentIrregulatories, validate) => {
        const irregularity = validate(this);

        return irregularity
          ? [...currentIrregulatories, irregularity]
          : currentIrregulatories;
      },
      [],
    );
  }
}

export class PushEvent extends Event {
  constructor(
    readonly pushTime: Date,
    readonly pushingUser: string,
    readonly repository: Repository,
    organization: Organization,
  ) {
    super(organization, [validatePushTime]);
  }
}

export class TeamCreationEvent extends Event {
  constructor(
    readonly team: Team,
    organization: Organization,
  ) {
    super(organization, [validateTeamCreation]);
  }
}

export class RepositoryDeleteEvent extends Event {
  constructor(
    readonly repository: Repository,
    organization: Organization,
  ) {
    super(organization, [validateDeleteRepository]);
  }
}
