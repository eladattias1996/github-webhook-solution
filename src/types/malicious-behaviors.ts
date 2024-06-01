export abstract class MalicouiousBehavior {
  abstract getMessage(): string;
}

export class PushTimingMalicouiousBehavior extends MalicouiousBehavior {
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

export class TeamCreationMalicouiousBehavior extends MalicouiousBehavior {
  constructor(
    private readonly teamName: string,
    private readonly organizationName: string,
    private readonly creatingUser: string,
  ) {
    super();
  }

  getMessage(): string {
    return `A suspicious team called ${this.teamName} in organization ${this.organizationName} was created by user "${this.creatingUser}"`;
  }
}

export class RepositoryDeleteMalicouiousBehavior extends MalicouiousBehavior {
  constructor(
    private readonly deletionTime: Date,
    private readonly repositoryName: string,
    private readonly organizationName: string,
    private readonly deletingUser: string,
  ) {
    super();
  }

  getMessage(): string {
    return `Repostiory ${this.repositoryName} in organization name ${this.organizationName} was deleted at ${this.deletionTime}, less than 10 minutes from its creation by user "${this.deletingUser}"`;
  }
}
