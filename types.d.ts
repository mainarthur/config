import { PathLike } from "fs";

type ValidateFunction = (value: T) => boolean;

export function config<T>(
  path: string,
  defaultValue?: string,
  cast?: (value: string) => T,
  validate?: ValidateFunction,
  autocast?: boolean
): T;
export function config<T>(params: {
  path: string;
  defaultValue?: string;
  cast?: (value: string) => T;
  validate?: ValidateFunction;
  autocast?: boolean;
}): T;

export function makeConfig(
  filename: PathLike,
  parser?: (
    content: Buffer
  ) => Record<string, string> | Promise<Record<string, string>>
): Promise<typeof config>;

export function choices<T>(...args: T[]): ValidateFunction;

export class ConfigValidationError extends Error {}
