export type ClassValue = 
  | string 
  | number 
  | boolean 
  | undefined 
  | null 
  | { [key: string]: boolean | undefined | null } 
  | ClassValue[];

/**
 * Combines multiple CSS class values into a clean space-separated string.
 * Compatible with shadcn/ui patterns and Tailwind CSS.
 */
export function cn(...inputs: ClassValue[]): string {
  const classes: string[] = [];

  function process(input: ClassValue) {
    if (!input) return;
    if (typeof input === 'string' || typeof input === 'number') {
      const trimmed = String(input).trim();
      if (trimmed) classes.push(trimmed);
    } else if (Array.isArray(input)) {
      input.forEach(process);
    } else if (typeof input === 'object') {
      for (const key in input) {
        if (input[key]) {
          classes.push(key);
        }
      }
    }
  }

  inputs.forEach(process);
  return classes.join(' ');
}
