export abstract class Irregulatory {
  abstract getMessage(): string;
}

export class PushTimingIrregulatory extends Irregulatory {
  constructor(
    private readonly pushTime: Date,
    private readonly repositoryName: string,
    private readonly pushingUser: string,
    private readonly organizationName: string,
  ) {
    super();
  }

  getMessage(): string {
    return `A suspicious push occured in ${this.pushTime} to repository ${this.repositoryName} from organization ${this.organizationName} by user "${this.pushingUser}"`;
  }
}

export class TeamCreationIrregulatory extends Irregulatory {
  constructor(
    private readonly teamName: string,
    private readonly organizationName: string,
  ) {
    super();
  }

  getMessage(): string {
    return `A suspicious team called ${this.teamName} in organization ${this.organizationName} was created`;
  }
}

export class RepositoryDeleteIrregulatory extends Irregulatory {
  constructor(
    private readonly deletionTime: Date,
    private readonly repositoryName: string,
    private readonly organizationName: string,
  ) {
    super();
  }

  getMessage(): string {
    return `Repostiory ${this.repositoryName} in organization name ${this.organizationName} was deleted at ${this.deletionTime}, less than 10 minutes from its creation`;
  }
}
