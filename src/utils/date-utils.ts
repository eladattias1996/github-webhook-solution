import moment from "moment";

export const getDifferenceBetweenDatesInMinutes = (
  startTime: Date,
  endTime: Date,
) => moment.duration(moment(endTime).diff(startTime)).asMinutes();
