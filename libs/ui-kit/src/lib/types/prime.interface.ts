export type SeverityButtonType =
  | 'success'
  | 'info'
  | 'warn'
  | 'danger'
  | 'help'
  | 'primary'
  | 'secondary'
  | 'contrast'
  | null
  | undefined;

export type SeverityTagType =
  | 'success'
  | 'secondary'
  | 'info'
  | 'warn'
  | 'danger'
  | 'contrast'
  | undefined;

export interface SelectOptionInterface {
  label: string;
  value: unknown;
}
