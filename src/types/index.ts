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
  tools?: Tool[] | null;
  responsibleId?: number | null;
  responsible?: User | null;
  documentation?: string | null;
  type: string;
  status: string;
}

export interface Tool {
  id: number;
  name: string;
  description?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  processes?: Process[];
}
