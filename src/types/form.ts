export type FormResponse = {
  status: 'success' | 'error';
  message: string;
};
export type AddActivityProps = {
  name: string;
  date: Date;
  members: string[];
};
