export type LessonLevel = 'basic' | 'intermediate' | 'advanced';

export interface Lesson {
  lessonId: string;
  lessonName: string;
  level: LessonLevel;
  topics: string[];
}

export interface GroupedModules {
  [level: string]: {
    title: string;
    topics: string[];
    lessonId: string;
  }[];
}

export interface Course {
  id: string;
  courseName: string;
  enrollmentCount: number;
  level: LessonLevel[];
  title: string;
  totalTasks: string;
  courseId: string;
  totalLessons: number;
  certificationAvailable: boolean;
  duration: number;
  modules: string[]; // list of module IDs like SWE101, SWE102, etc.
}

export interface FullCourseDetails extends Course {
  groupedModules: GroupedModules;
}
