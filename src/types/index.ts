export interface Area {
  id: number;
  name: string;
}

export interface Process {
  id: number;
  name: string;
  description?: string | null;
  areaId: number;
  area?: Area | null;
  parentId?: number | null;
  parent?: Process | null;
  subprocesses?: Process[] | null;
  tools?: string[] | null;
  responsible?: string | null;
  documentation?: string | null;
  type: string;
  status: string;
}
