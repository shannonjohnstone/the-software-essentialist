import { StudentState } from "../student-types";
import { StudentEvent } from "./student-event";

export class LastNameUpdatedEvent extends StudentEvent {
  constructor(id: string, state: StudentState) {
    super(id, "LastNameUpdated", state);
  }
}
