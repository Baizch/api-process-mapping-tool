import { Request, Response } from 'express';
import * as processService from '../services/processesService';
import { Process } from '../types';

export const createProcess = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const processData: Process = req.body;

    const newProcess = await processService.createProcess(processData);
    res.status(201).json(newProcess);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to create process' });
  }
};

export const getProcesses = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const process = await processService.getProcesses();
    res.json(process);
  } catch (error: unknown) {
    res.status(500).json({ error: 'Failed to fetch process' });
  }
};

export const getProcessById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;
    const processId = parseInt(id, 10);

    if (isNaN(processId)) {
      return res.status(400).json({ message: 'ID must be a number' });
    }

    const process: Process | null = await processService.getProcessById(
      processId
    );

    if (!process) {
      return res.status(404).json({ message: 'Process not found' });
    }

    return res.status(200).json(process);
  } catch (error: unknown) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateProcess = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;
    const processId = parseInt(id, 10);
    const data = req.body;

    if (isNaN(processId)) {
      return res.status(400).json({ message: 'ID must be a number' });
    }

    if (!data) {
      return res.status(400).json({ message: 'Data is required' });
    }

    const updatedProcess: Process | null = await processService.updateProcess(
      processId,
      data
    );

    if (!updatedProcess) {
      return res.status(404).json({ message: 'Process not found' });
    }

    return res.status(200).json(updatedProcess);
  } catch (error: unknown) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteProcess = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;
    const processId = parseInt(id, 10);

    if (isNaN(processId)) {
      return res.status(400).json({ message: 'ID must be a number' });
    }

    const deletedProcess = await processService.deleteProcess(processId);

    if (!deletedProcess) {
      return res.status(404).json({ message: 'Process not found' });
    }

    return res.status(204).send();
  } catch (error: unknown) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};
