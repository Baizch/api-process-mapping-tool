import prisma from '../config/prismaClient';
import { Process } from '../types';

export const createProcess = async (processData: Process): Promise<Process> => {
  const {
    name,
    description,
    areaId,
    parentId,
    tools,
    responsible,
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
      responsible,
      documentation,
      type,
      status,
      tools: tools ?? undefined,
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
  const dataToUpdate: any = {
    ...processData,
    tools: processData.tools ?? undefined,
    responsible: processData.responsible ?? undefined,
    documentation: processData.documentation ?? undefined,
  };

  const filteredData = Object.fromEntries(
    Object.entries(dataToUpdate).filter(([_, v]) => v !== undefined)
  );

  const updatedProcess = await prisma.process.update({
    where: { id },
    data: filteredData,
  });

  return updatedProcess;
};

export const deleteProcess = async (id: number): Promise<void> => {
  const process = await prisma.process.findUnique({
    where: { id },
    include: {
      subprocesses: true,
    },
  });

  if (!process) {
    throw new Error('Process not found');
  }

  await deleteProcessAndSubprocesses(id);
};

const deleteProcessAndSubprocesses = async (
  processId: number
): Promise<void> => {
  const subprocesses = await prisma.process.findMany({
    where: { parentId: processId },
  });

  for (const subprocess of subprocesses) {
    await deleteProcessAndSubprocesses(subprocess.id);
  }

  await prisma.process.delete({
    where: { id: processId },
  });
};
