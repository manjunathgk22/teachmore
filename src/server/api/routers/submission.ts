// src/server/routers/submission.ts
import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';
import prisma from '../prisma';

export const submissionRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    return await prisma.submission.findMany();
  }),
  getById: publicProcedure.input(z.string()).query(async ({ input }) => {
    return await prisma.submission.findUnique({ where: { id: input } });
  }),
  create: publicProcedure.input(
    z.object({
      testId: z.string(),
      studentId: z.string(),
      answers: z.array(
        z.object({
          questionId: z.string(),
          answer: z.string(),
        })
      ),
      submittedAt: z.date(),
    })
  ).mutation(async ({ input }) => {
    const { testId, studentId, answers, submittedAt } = input;
    const submission = await prisma.submission.create({
      data: { testId, studentId, submittedAt },
    });
    const answerPromises = answers.map((answer) =>
      prisma.answer.create({
        data: { ...answer, submissionId: submission.id },
      })
    );
    await Promise.all(answerPromises);
    return submission;
  }),
  update: publicProcedure.input(
    z.object({
      id: z.string(),
      testId: z.string().optional(),
      studentId: z.string().optional(),
      graded: z.boolean().optional(),
      score: z.number().optional(),
      submittedAt: z.date().optional(),
    })
  ).mutation(async ({ input }) => {
    const { id, ...data } = input;
    return await prisma.submission.update({ where: { id }, data });
  }),
  delete: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    return await prisma.submission.delete({ where: { id: input } });
  }),
});
