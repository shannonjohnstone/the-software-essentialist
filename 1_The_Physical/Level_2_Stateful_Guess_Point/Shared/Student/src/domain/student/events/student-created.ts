import { StudentState } from "../student-types";
import { StudentEvent } from "./student-event";

export class StudentCreated extends StudentEvent {
  constructor(id: string, state: StudentState) {
    super(id, "StudentCreated", state);
  }
}
