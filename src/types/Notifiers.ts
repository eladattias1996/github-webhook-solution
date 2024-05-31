import { Irregulatory } from "./Irregulatory";

export abstract class Notifier {
    abstract notify(irregularity: Irregulatory)
}

export class ConsoleNotifier extends Notifier {
    notify(irregularity: Irregulatory) {
        console.log(irregularity.getMessage());
    }
}