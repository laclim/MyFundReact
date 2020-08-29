import moment from "moment";

export const timeToDisplay = (time: string) => {
  return moment(time).format("DD-MM-YYYY hh:MM a");
};
