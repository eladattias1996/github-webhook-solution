import { MalicouiousBehavior } from "./malicious-behaviors";

export abstract class Notifier {
  abstract notify(maliciousBehavior: MalicouiousBehavior): void;
}

export class ConsoleNotifier extends Notifier {
  notify(maliciousBehavior: MalicouiousBehavior) {
    console.log(maliciousBehavior.getMessage());
  }
}
