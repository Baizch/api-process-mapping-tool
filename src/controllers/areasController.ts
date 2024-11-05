import { Request, Response } from 'express';
import * as areaService from '../services/areasService';
import { Area } from '../types';

export const createArea = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name } = req.body;
    const area = await areaService.createArea(name);
    res.status(201).json(area);
  } catch (error: unknown) {
    console.log(error);
    res.status(500).json({ error: 'Failed to create area' });
  }
};

export const getAreas = async (_req: Request, res: Response): Promise<void> => {
  try {
    const areas = await areaService.getAreas();
    res.json(areas);
  } catch (error: unknown) {
    res.status(500).json({ error: 'Failed to fetch areas' });
  }
};

export const getAreaById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;
    const areaId = parseInt(id, 10);

    if (isNaN(areaId)) {
      return res.status(400).json({ message: 'ID must be a number' });
    }

    const area: Area | null = await areaService.getAreaById(areaId);

    if (!area) {
      return res.status(404).json({ message: 'Area not found' });
    }

    return res.status(200).json(area);
  } catch (error: unknown) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateArea = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const areaId = parseInt(id, 10);
    const { name } = req.body;

    if (isNaN(areaId)) {
      return res.status(400).json({ message: 'ID must be a number' });
    }

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const updatedArea: Area | null = await areaService.updateArea(areaId, {
      name,
    });

    if (!updatedArea) {
      return res.status(404).json({ message: 'Area not found' });
    }

    return res.status(200).json(updatedArea);
  } catch (error: unknown) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteArea = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const areaId = parseInt(id, 10);

    if (isNaN(areaId)) {
      return res.status(400).json({ message: 'ID must be a number' });
    }

    const deletedArea = await areaService.deleteArea(areaId);

    if (!deletedArea) {
      return res.status(404).json({ message: 'Area not found' });
    }

    return res.status(204).send();
  } catch (error: unknown) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};
