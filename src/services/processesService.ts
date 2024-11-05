import prisma from '../config/prismaClient';
import { Process } from '../types';

export const createProcess = async (processData: Process): Promise<Process> => {
  const {
    name,
    description,
    areaId,
    parentId,
    tools,
    responsibleId,
    documentation,
    type,
    status,
  } = processData;

  const newProcess = await prisma.process.create({
    data: {
      name,
      description,
      areaId,
      parentId,
      responsibleId,
      documentation,
      type,
      status,
      tools: {
        connect: tools?.map((tool) => ({ id: tool.id })) ?? [],
      },
    },
    include: {
      tools: true,
      responsible: true,
    },
  });
  return newProcess;
};

export const getProcesses = async (): Promise<Process[]> => {
  const processes = await prisma.process.findMany({
    include: {
      area: true,
      parent: true,
      subprocesses: {
        include: {
          subprocesses: true,
        },
      },
    },
  });

  return processes;
};

export const getProcessById = async (
  processId: number
): Promise<Process | null> => {
  const process = await prisma.process.findUnique({
    where: { id: processId },
    include: {
      area: true,
      parent: true,
      subprocesses: {
        include: {
          subprocesses: true,
        },
      },
    },
  });

  return process;
};

export const updateProcess = async (
  id: number,
  processData: Partial<Process>
): Promise<Process> => {
  const dataToUpdate = {
    ...processData,
    tools: processData.tools
      ? { set: [], connect: processData.tools.map((tool) => ({ id: tool.id })) }
      : undefined,
    subprocesses: processData.subprocesses
      ? {
          connect: processData.subprocesses.map((subprocess) => ({
            id: subprocess.id,
          })),
        }
      : undefined,
  };

  const filteredData = Object.fromEntries(
    Object.entries(dataToUpdate).filter(([_, v]) => v !== undefined)
  );

  const updatedProcess = await prisma.process.update({
    where: { id },
    data: filteredData,
    include: {
      tools: true,
      subprocesses: true,
      responsible: true,
      area: true,
      parent: true,
    },
  });

  return updatedProcess;
};

export const deleteProcess = async (id: number): Promise<Process> => {
  const deletedProcess = await prisma.process.delete({
    where: { id },
    include: {
      tools: true,
      responsible: true,
    },
  });

  return deletedProcess;
};
