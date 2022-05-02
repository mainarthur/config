export function config<T>(
  path: string,
  defaultValue?: string,
  cast?: (value: string) => T,
  validate?: (value: T) => boolean,
  autocast?: boolean
): T;
export function config<T>(params: {
  path: string;
  defaultValue?: string;
  cast?: (value: string) => T;
  validate?: (value: T) => boolean;
  autocast?: boolean;
}): T;

export function makeConfig(): Promise<typeof config>;

export function choices<T>(...args: T[]): boolean;

export class ConfigValidationError extends Error {}
