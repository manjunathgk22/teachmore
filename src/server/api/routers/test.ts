// src/server/routers/test.ts
import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';
import prisma from '../prisma';

export const testRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    return await prisma.test.findMany();
  }),
  getById: publicProcedure.input(z.string()).query(async ({ input }) => {
    return await prisma.test.findUnique({ where: { id: input } });
  }),
  create: publicProcedure.input(
    z.object({
      createdBy: z.string(),
      grade: z.string(),
      subject: z.string(),
      questions: z.array(z.string()),
      scheduledAt: z.date(),
      timeLimit: z.number(),
    })
  ).mutation(async ({ input }) => {
    return await prisma.test.create({ data: input });
  }),
  update: publicProcedure.input(
    z.object({
      id: z.string(),
      createdBy: z.string().optional(),
      grade: z.string().optional(),
      subject: z.string().optional(),
      questions: z.array(z.string()).optional(),
      scheduledAt: z.date().optional(),
      timeLimit: z.number().optional(),
    })
  ).mutation(async ({ input }) => {
    const { id, ...data } = input;
    return await prisma.test.update({ where: { id }, data });
  }),
  delete: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    return await prisma.test.delete({ where: { id: input } });
  }),
});
