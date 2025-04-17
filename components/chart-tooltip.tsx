'use client';

type PayloadItem = {
  name: string;
  value: number;
  fill: string;
  payload: {
    model: string;
    input: number;
    output: number;
    provider: string;
    id: string;
  };
};

interface ChartTooltipProps {
  active?: boolean;
  payload?: PayloadItem[];
  label?: string;
}

export function ChartTooltip(props: ChartTooltipProps) {
  const { active, payload, label } = props;

  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className="bg-card border border-border/30 rounded-md shadow-md px-4 py-3 text-xs backdrop-blur-sm z-50">
      <p className="font-medium mb-3 text-sm">{label}</p>
      <div className="space-y-2">
        {payload.map((entry, index) => (
          <div
            key={`item-${index}`}
            className="flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: entry.fill }}
              />
              <span className="text-muted-foreground">{entry.name}:</span>
            </div>
            <span className="font-medium text-foreground tabular-nums">
              ${entry.value.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-3 pt-2 border-t border-border/30">
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Total:</span>
          <span className="font-medium tabular-nums">
            ${payload.reduce((sum, entry) => sum + entry.value, 0).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
