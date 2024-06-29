/**
 * Helper function for exhaustive type checking
 */
export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

export interface CoursePartDesc {
  description: string;
}

export interface CoursePartBasic extends CoursePartBase, CoursePartDesc {
  kind: "basic";
}

export interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

export interface CoursePartBackground extends CoursePartBase, CoursePartDesc {
  backgroundMaterial: string;
  kind: "background";
}

export interface CoursePartSpecial extends CoursePartBase, CoursePartDesc {
  requirements: string[];
  kind: "special";
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;
