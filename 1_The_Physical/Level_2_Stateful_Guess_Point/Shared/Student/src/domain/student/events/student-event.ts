import { StudentEventProps, StudentState } from "../student-types";

export abstract class StudentEvent {
  public readonly data;

  constructor(id: StudentEventProps["id"], state: StudentState) {
    this.data = StudentEvent.eventData(id, state);
  }

  static eventData(id: StudentEventProps["id"], state: StudentState) {
    type Keys = keyof Omit<StudentEventProps, "id">;
    const keys = Object.keys(state) as Keys[];

    const eventData = keys.reduce(
      (agg: Partial<StudentEventProps>, key: Keys) => {
        return {
          ...agg,
          [key]: state[key].getValue,
        };
      },
      { id }
    );

    return eventData as StudentEventProps;
  }
}
