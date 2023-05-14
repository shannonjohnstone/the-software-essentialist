import { StudentState } from "../student-types";
import { StudentEvent } from "./student-event";

export class FirstNameUpdatedEvent extends StudentEvent {
  constructor(id: string, state: StudentState) {
    super(id, "FirstNameUpdated", state);
  }
}
