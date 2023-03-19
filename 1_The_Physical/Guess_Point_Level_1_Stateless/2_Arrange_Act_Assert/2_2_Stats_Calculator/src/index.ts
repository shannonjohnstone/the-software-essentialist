export class StatsCalculator {
  static calculate(sequence: number[]) {
    return {
      minimum: StatsCalculator.minimum(sequence),
      maximum: StatsCalculator.maximum(sequence),
      elementsCount: StatsCalculator.elementsCount(sequence),
      average: StatsCalculator.average(sequence),
    }
  }
  static minimum(stats: number[]): number {
    return stats.reduce((min, num) => num < min ? num : min, stats[0])
  }

  static maximum(stats: number[]): number {
    return stats.reduce((max, num) => num > max ? num : max, stats[0])
  }

  static elementsCount(stats: number[]): number {
    return stats.length
  }

  static average(stats: number[]): number {
    return stats.reduce((acc, num) => acc + num, 0) / stats.length
  }
}