// src/server/routers/question.ts
import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';
import prisma from '../prisma';

export const questionRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    return await prisma.question.findMany();
  }),
  getById: publicProcedure.input(z.string()).query(async ({ input }) => {
    return await prisma.question.findUnique({ where: { id: input } });
  }),
  create: publicProcedure.input(
    z.object({
      createdBy: z.string(),
      grade: z.string(),
      subject: z.string(),
      type: z.string(),
      questionText: z.string(),
      options: z.array(z.string()).optional(),
      correctAnswer: z.string().optional(),
    })
  ).mutation(async ({ input }) => {
    return await prisma.question.create({ data: input });
  }),
  update: publicProcedure.input(
    z.object({
      id: z.string(),
      createdBy: z.string().optional(),
      grade: z.string().optional(),
      subject: z.string().optional(),
      type: z.string().optional(),
      questionText: z.string().optional(),
      options: z.array(z.string()).optional(),
      correctAnswer: z.string().optional(),
    })
  ).mutation(async ({ input }) => {
    const { id, ...data } = input;
    return await prisma.question.update({ where: { id }, data });
  }),
  delete: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    return await prisma.question.delete({ where: { id: input } });
  }),
});
