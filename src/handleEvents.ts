import { NOTIFIERS, TYPE_TO_CLASS_INNITIATORS_MAP } from "./constants";
import { Request } from "express";
import { Irregulatory } from "./types/Irregulatory";

export const handleEvent = (request: Request) => {
  const eventType = getEventType(request);
  const initiator = TYPE_TO_CLASS_INNITIATORS_MAP[eventType];

  if (!initiator) return;

  console.log("--------------------------------");
  console.log(`Got supported event ${eventType}, about to process it`);

  const payload = request.body;
  const event = initiator(payload);

  const irregularities = event.validate();

  notifyIrregularities(irregularities);
};

export const getEventType = ({ headers, body }: Request): string => {
  const eventGroup = headers["x-github-event"];
  const action = body.action;

  const actionAddition = action ? `.${action}` : "";

  return `${eventGroup}${actionAddition}`;
};

const notify = (irregularity: Irregulatory) => {
  NOTIFIERS.forEach((notifier) => notifier.notify(irregularity));
};

export const notifyIrregularities = (irregularities: Irregulatory[]) => {
  irregularities.forEach((irregularity: Irregulatory) => notify(irregularity));
};
