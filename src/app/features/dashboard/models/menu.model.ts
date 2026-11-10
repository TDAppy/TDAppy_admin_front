export type MenuItem = {
  label: string;
  route?: string;
  children?: { label: string; route: string }[];
};
