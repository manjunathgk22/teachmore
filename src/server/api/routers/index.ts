// src/server/api/routers/index.ts
import { createTRPCRouter } from '../trpc';
import { userRouter } from './user';
import { gradeRouter } from './grade';
import { questionRouter } from './question';
import { testRouter } from './test';
import { submissionRouter } from './submission';
import { answerRouter } from './answer';

export const appRouter = createTRPCRouter({
  user: userRouter,
  grade: gradeRouter,
  question: questionRouter,
  test: testRouter,
  submission: submissionRouter,
  answer: answerRouter,
});

export type AppRouter = typeof appRouter;
