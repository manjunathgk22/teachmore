// src/server/routers/grade.ts
import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';
import prisma from '../prisma';

export const gradeRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    return await prisma.grade.findMany();
  }),
  getById: publicProcedure.input(z.string()).query(async ({ input }) => {
    return await prisma.grade.findUnique({ where: { id: input } });
  }),
  create: publicProcedure.input(
    z.object({
      grade: z.string(),
      subjects: z.array(z.string()),
    })
  ).mutation(async ({ input }) => {
    return await prisma.grade.create({ data: input });
  }),
  update: publicProcedure.input(
    z.object({
      id: z.string(),
      grade: z.string().optional(),
      subjects: z.array(z.string()).optional(),
    })
  ).mutation(async ({ input }) => {
    const { id, ...data } = input;
    return await prisma.grade.update({ where: { id }, data });
  }),
  delete: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    return await prisma.grade.delete({ where: { id: input } });
  }),
});
