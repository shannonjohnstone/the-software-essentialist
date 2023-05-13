import { eventList } from "../domain-events";
import { Email } from "../value-objects/email";
import { FirstName } from "../value-objects/first-name";
import { LastName } from "../value-objects/last-name";

export interface StudentState {
  firstName: FirstName;
  lastName: LastName;
  email: Email;
}

export interface StudentEventProps {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Error {
  type: string;
  message: string;
}

export enum StudentEventTypesValues {
  StudentCreated = "StudentCreated",
  StudentUpdated = "StudentUpdated",
  LastNameUpdated = "LastNameUpdated",
  FirstNameUpdated = "FirstNameUpdated",
}

export type StudentEventTypes = `${StudentEventTypesValues}`;

export type StudentEvent = eventList<StudentEventTypes, StudentEventProps>;
