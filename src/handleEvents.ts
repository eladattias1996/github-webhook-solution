import { NOTIFIERS, TYPE_TO_CLASS_INNITIATORS_MAP } from "./constants";
import { Request } from "express";
import { MalicouiousBehavior } from "./types/malicious-behaviors";

export const handleEvent = (request: Request) => {
  const eventType = getEventType(request);
  const initiator = TYPE_TO_CLASS_INNITIATORS_MAP[eventType];

  if (!initiator) return;

  console.log("--------------------------------");
  console.log(`Got supported event ${eventType}, about to process it`);

  const payload = request.body;
  const event = initiator(payload);

  const maliciousBehaviors = event.validate();

  notifyMaliciousBehaviors(maliciousBehaviors);
};

export const getEventType = ({ headers, body }: Request): string => {
  const eventGroup = headers["x-github-event"];
  const action = body.action;

  const actionAddition = action ? `.${action}` : "";

  return `${eventGroup}${actionAddition}`;
};

const notify = (maliciousBehavior: MalicouiousBehavior) => {
  NOTIFIERS.forEach((notifier) => notifier.notify(maliciousBehavior));
};

export const notifyMaliciousBehaviors = (maliciousBehaviors: MalicouiousBehavior[]) => {
  maliciousBehaviors.forEach((maliciousBehavior: MalicouiousBehavior) =>
    notify(maliciousBehavior),
  );
};
