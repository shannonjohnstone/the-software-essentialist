export class TimeValidator {
  private static normalizeTimeRange(range: string, delimiter: string): [string, string] {
    const [start = "", end = ""] = range.split(delimiter)
    return [start.trim(), end.trim()]
  }
  static isValid24HourTimeRange(range: string): boolean {
    const [start, end] = TimeValidator.normalizeTimeRange(range, "-")

    if (!start && !end) return false;

    const is24HourTimeFormatRegex = /^(?:[01][0-9]|2[0-3]):[0-5][0-9](?::[0-5][0-9])?$/;

    return is24HourTimeFormatRegex.test(start) && is24HourTimeFormatRegex.test(end);
  }
}