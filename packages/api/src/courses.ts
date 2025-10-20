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
  code: z.string(),
  title: z.string(),
  description: z.string(),
  startDate: z.iso.datetime(),
  endDate: z.iso.datetime(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
  instructorId: z.int(),
});
export type CourseOut = z.infer<typeof CourseOut>;

// Creation DTOs (API request bodies)
export const CourseCreateIn = z.object({
    code: z.string().min(1),
    title: z.string().min(1),
    description: z.string(),
    instructorId: z.int(),
    startDate: z.string(), // may update the schema itself to make it a nullable field / optional
    endDate: z.string(),
});
export type CourseCreateIn = z.infer<typeof CourseCreateIn>;

// Update DTOs (API request bodies)
export const CourseUpdateIn = z.object({
  code: z.string().min(1).optional(),
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  instructorId: z.int().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});
export type CourseUpdateIn = z.infer<typeof CourseUpdateIn>;

// Query DTOs (API query parameters)
/*
export const CoursesListFilter = Pagination.extend({
  ownerId: z.uuid().optional(),
  nameLike: z.string().optional(),
});
*/