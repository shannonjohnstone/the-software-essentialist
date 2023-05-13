import { StudentState } from "../student-types";
import { StudentEvent } from "./student-event";

export class StudentCreated extends StudentEvent {
  public readonly type = "StudentCreated";

  constructor(id: string, state: StudentState) {
    super(id, state);
  }
}
