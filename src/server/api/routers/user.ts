// src/server/routers/user.ts
import { z } from 'zod';
import prisma from '../prisma';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const userRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    return await prisma.user.findMany();
  }),
  getById: publicProcedure.input(z.string()).query(async ({ input }) => {
    return await prisma.user.findUnique({ where: { id: input } });
  }),
  create: publicProcedure.input(
    z.object({
      username: z.string(),
      passwordHash: z.string(),
      role: z.string(),
      class:z.string(),
      section: z.string().optional(),
    })
  ).mutation(async ({ input }) => {
    return await prisma.user.create({ data: input });
  }),
  update: publicProcedure.input(
    z.object({
      id: z.string(),
      username: z.string().optional(),
      passwordHash: z.string().optional(),
      role: z.string().optional(),
      class: z.string().optional(),
      section: z.string().optional(),
    })
  ).mutation(async ({ input }) => {
    const { id, ...data } = input;
    return await prisma.user.update({ where: { id }, data });
  }),
  delete: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    return await prisma.user.delete({ where: { id: input } });
  }),
});
