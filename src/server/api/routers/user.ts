/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
// src/server/routers/user.ts
import { z } from 'zod';
import prisma from '../prisma';
import { createTRPCRouter, publicProcedure } from '../trpc';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const hashPassword = async (password: string) => {
  try {
    const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
  } catch (error) {
    console.log(error)
  }
};

const verifyPassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};

const generateToken = (user: { id: string; email: string }) => {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
};
export const userRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    return await prisma.user.findMany();
  }),
  getById: publicProcedure.input(z.string()).query(async ({ input }) => {
    return await prisma.user.findUnique({ where: { id: input } });
  }),
  create: publicProcedure.input(
    z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string(),
      role: z.string(),
      class: z.string(),
      section: z.string().optional(),
    })
  ).mutation(async ({ input }) => {
    console.log('qqqqqq')
    const passwordHash = await hashPassword(input.password);
    if(input.password){
      delete input.password;
    } 
    return await prisma.user.create({
      data: {
        ...input,
        passwordHash,
      },
    });
  }),
  login: publicProcedure.input(
    z.object({
      email: z.string().email(),
      password: z.string(),
    })
  ).mutation(async ({ input }) => {
    const user = await prisma.user.findUnique({ where: { email: input.email } });
    if (!user || !(await verifyPassword(input.password, user.passwordHash))) {
      throw new Error('Invalid email or password');
    }
    const token = generateToken({ id: user.id, email: user.email });
    return { token };
  }),
  update: publicProcedure.input(
    z.object({
      id: z.string(),
      name: z.string().optional(),
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
