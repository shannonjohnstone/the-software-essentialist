import {
  StudentEventProps,
  StudentEventTypes,
  StudentState,
} from "../student-types";

export abstract class StudentEvent {
  public readonly data;

  constructor(
    private id: StudentEventProps["id"],
    private type: StudentEventTypes,
    private state: StudentState
  ) {
    this.data = StudentEvent.eventData(id, state);
  }

  get getEvent() {
    const { data, type } = this;
    return { type, data };
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
