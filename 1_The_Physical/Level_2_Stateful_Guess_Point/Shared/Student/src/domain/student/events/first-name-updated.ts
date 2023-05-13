import { StudentState } from "../student-types";
import { StudentEvent } from "./student-event";

export class FirstNameUpdatedEvent extends StudentEvent {
  public readonly type = "FirstNameUpdated";

  constructor(id: string, state: StudentState) {
    super(id, state);
  }
}
