import { answerRouter } from './answer';
// src/server/api/routers/index.ts
import { createTRPCRouter } from '../trpc';
import { gradeRouter } from './grade';
import { questionRouter } from './question';
import { sessionRouter } from './create-session';
import { submissionRouter } from './submission';
import { testRouter } from './test';
import { userRouter } from './user';

export const appRouter = createTRPCRouter({
  user: userRouter,
  grade: gradeRouter,
  question: questionRouter,
  test: testRouter,
  submission: submissionRouter,
  answer: answerRouter,
  createSession: sessionRouter
});

export type AppRouter = typeof appRouter;
