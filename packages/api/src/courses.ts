import { z } from 'zod';
//import { Pagination } from './queries';
import { start } from 'repl';
import { en } from 'zod/v4/locales';

// Reference DTOs (lightweight relation embeds)
export const CourseRef = z.object({
  id: z.int(),
  title: z.string(),
});
export type CourseRef = z.infer<typeof CourseRef>;

// Output DTOs (API responses)
export const CourseOut = z.object({
  id: z.int(),
  course_code: z.string(),
  course_title: z.string(),
  description: z.string(),
  start_date: z.iso.datetime(),
  end_date: z.iso.datetime(),
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
  instructor_id: z.int(),
});
export type CourseOut = z.infer<typeof CourseOut>;

// Creation DTOs (API request bodies)
export const CourseCreateIn = z.object({
    course_code: z.string().min(1),
    course_title: z.string().min(1),
    description: z.string(),
    instructor_id: z.int(),
    start_date: z.string(), 
    end_date: z.string(),
});
export type CourseCreateIn = z.infer<typeof CourseCreateIn>;

// Update DTOs (API request bodies)
export const CourseUpdateIn = z.object({
  course_code: z.string().min(1).optional(),
  course_title: z.string().min(1).optional(),
  description: z.string().optional(),
  instructor_id: z.int().optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
});
export type CourseUpdateIn = z.infer<typeof CourseUpdateIn>;

export const CourseDelete = z.object({
  id: z.int(),
});
export type CourseDelete = z.infer<typeof CourseDelete>;
// Query DTOs (API query parameters)
/*
export const CoursesListFilter = Pagination.extend({
  ownerId: z.uuid().optional(),
  nameLike: z.string().optional(),
});
*/