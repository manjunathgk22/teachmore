/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createTRPCRouter, publicProcedure } from '../trpc';

import { TRPCError } from '@trpc/server';
import prisma from '../prisma';
import { z } from 'zod';

const GRADES = [
  'LKG',
  'UKG',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10'
];

const SECTIONS = ['A', 'B', 'C'];

// Default subjects per grade level
const getSubjectsForGrade = (grade: string): string[] => {
  const baseSubjects = ['English', 'Mathematics'];
  
  if (grade === 'LKG' || grade === 'UKG') {
    return [...baseSubjects, 'Environmental Studies', 'Art'];
  }
  
  if (parseInt(grade) <= 5) {
    return [...baseSubjects, 'Environmental Studies', 'Hindi', 'Art', 'Computer Science'];
  }
  
  return [
    ...baseSubjects,
    'Science',
    'Social Studies',
    'Hindi',
    'Sanskrit',
    'Computer Science',
    'Physical Education'
  ];
};

export const sessionRouter = createTRPCRouter({
  createSessionWithClasses: publicProcedure
    .input(
      z.object({
        name: z.string(),
        startDate: z.string().datetime(),
        endDate: z.string().datetime(),
        isActive: z.boolean().default(false),
      })
    )
    .mutation(async ({ ctx, input }) => {
      
      // Validate dates
      if (input.startDate >= input.endDate) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Start date must be before end date',
        });
      }

      // Create session
      const session = await prisma.session.create({
        data: {
          name: input.name,
          startDate: input.startDate,
          endDate: input.endDate,
          isActive: input.isActive,
        },
      });

      // Create academic classes and sections for each grade
      const createdClasses = await Promise.all(
        GRADES.map(async (grade) => {
          // Create academic class
          const academicClass = await prisma.academicClass.create({
            data: {
              sessionId: session.id,
              grade: grade,
              // subjects: getSubjectsForGrade(grade),
            },
          });

          // Create sections for this class
          const sections = await Promise.all(
            SECTIONS.map((sectionName) =>
              prisma.section.create({
                data: {
                  academicClassId: academicClass.id,
                  name: sectionName,
                },
              })
            )
          );

          return {
            academicClass,
            sections,
          };
        })
      );

      return {
        session,
        classes: createdClasses,
      };
    }),
});
