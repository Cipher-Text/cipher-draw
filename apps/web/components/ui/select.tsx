import { cn } from '@/lib/utils';

type Option = {
  label: string;
  value: string;
};

type SelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  className?: string;
  ariaLabel: string;
};

export function Select({ value, onChange, options, className, ariaLabel }: SelectProps) {
  return (
    <select
      aria-label={ariaLabel}
      className={cn(
        'h-11 rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring sm:h-9',
        className
      )}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
