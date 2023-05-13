import { StudentState } from "../student-types";
import { StudentEvent } from "./student-event";

export class LastNameUpdatedEvent extends StudentEvent {
  public readonly type = "LastNameUpdated";

  constructor(id: string, state: StudentState) {
    super(id, state);
  }
}
