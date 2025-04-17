'use client';

import { useState } from 'react';
import { Settings2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';

export type ProviderName =
  | 'OpenAI'
  | 'Google'
  | 'Anthropic'
  | 'Mistral AI'
  | 'DeepSeek'
  | 'xAI';

export interface AIModel {
  id: string;
  model: string;
  input: number;
  output: number;
  provider: ProviderName;
}

export type PriceDisplayMode = 'both' | 'input' | 'output';

interface SettingsPanelProps {
  models: AIModel[];
  enabledModels: string[];
  onToggleModel: (modelId: string) => void;
  onToggleAll: (enabled: boolean) => void;
  onDeselectAll: () => void;
  priceDisplayMode?: PriceDisplayMode;
  onPriceDisplayModeChange?: (mode: PriceDisplayMode) => void;
}

export function SettingsPanel({
  models,
  enabledModels,
  onToggleModel,
  onToggleAll,
  onDeselectAll,
  priceDisplayMode = 'both',
  onPriceDisplayModeChange = () => {},
}: SettingsPanelProps) {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="p-2 rounded-full hover:bg-secondary transition-colors"
        >
          <Settings2 className="h-5 w-5" />
          <span className="sr-only">Settings</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-64 max-h-[400px] overflow-y-auto"
      >
        <DropdownMenuLabel>Display Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="px-2 py-1.5 space-y-2">
          <div className="flex items-center">
            <Checkbox
              id="price-both"
              checked={priceDisplayMode === 'both'}
              onCheckedChange={() => onPriceDisplayModeChange('both')}
              className="mr-2"
            />
            <label htmlFor="price-both" className="text-sm cursor-pointer">
              Show Both Prices
            </label>
          </div>
          <div className="flex items-center">
            <Checkbox
              id="price-input"
              checked={priceDisplayMode === 'input'}
              onCheckedChange={() => onPriceDisplayModeChange('input')}
              className="mr-2"
            />
            <label htmlFor="price-input" className="text-sm cursor-pointer">
              Input Price Only
            </label>
          </div>
          <div className="flex items-center">
            <Checkbox
              id="price-output"
              checked={priceDisplayMode === 'output'}
              onCheckedChange={() => onPriceDisplayModeChange('output')}
              className="mr-2"
            />
            <label htmlFor="price-output" className="text-sm cursor-pointer">
              Output Price Only
            </label>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="mt-2">Visible Models</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="px-2 py-1.5 space-y-2">
          <div className="flex items-center">
            <Checkbox
              id="all-models"
              checked={enabledModels.length === models.length}
              onCheckedChange={(checked) => {
                onToggleAll(checked === true);
              }}
              className="mr-2"
            />
            <label htmlFor="all-models" className="text-sm cursor-pointer">
              All Models
            </label>
          </div>
          <div className="flex items-center">
            <Checkbox
              id="none-models"
              checked={enabledModels.length === 0}
              onCheckedChange={() => {
                if (enabledModels.length > 0) {
                  onDeselectAll();
                }
              }}
              className="mr-2"
            />
            <label htmlFor="none-models" className="text-sm cursor-pointer">
              Deselect All
            </label>
          </div>
        </div>
        <DropdownMenuSeparator />
        {models.map((model) => (
          <div
            key={model.id}
            className="px-2 py-1.5 flex items-center hover:bg-accent hover:text-accent-foreground rounded-sm cursor-pointer"
            onClick={() => onToggleModel(model.id)}
          >
            <Checkbox
              checked={enabledModels.includes(model.id)}
              className="mr-2"
              onCheckedChange={() => {}}
            />
            <span className="text-sm">{model.model}</span>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
