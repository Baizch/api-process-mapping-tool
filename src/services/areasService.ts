import prisma from '../config/prismaClient';
import { Area } from '../types';

export const createArea = async (name: string) => {
  return prisma.area.create({
    data: { name },
  });
};

export const getAreas = async () => {
  return prisma.area.findMany();
};

export const getAreaById = async (id: number): Promise<Area | null> => {
  return prisma.area.findUnique({
    where: { id },
  });
};

export const updateArea = async (
  id: number,
  data: Partial<Area>
): Promise<Area | null> => {
  return prisma.area.update({
    where: { id },
    data,
  });
};

export const deleteArea = async (id: number): Promise<Area | null> => {
  return prisma.area.delete({
    where: { id },
  });
};
