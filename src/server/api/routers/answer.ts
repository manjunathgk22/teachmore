// src/server/api/routers/answer.ts
import { createTRPCRouter, publicProcedure } from '../trpc';
import { z } from 'zod';
import prisma from '../prisma';

export const answerRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    return prisma.answer.findMany();
  }),
  getById: publicProcedure.input(z.string()).query(async ({ input }) => {
    return prisma.answer.findUnique({
      where: { id: input },
    });
  }),
  create: publicProcedure.input(z.object({
    submissionId: z.string(),
    questionId: z.string(),
    answer: z.string(),
  })).mutation(async ({ input }) => {
    return prisma.answer.create({
      data: input,
    });
  }),
});
