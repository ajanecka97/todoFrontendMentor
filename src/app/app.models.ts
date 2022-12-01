export interface TodoItem {
  id: number;
  isCompleted: boolean;
  title: string;
}

export enum TodoFilter {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}
