"use client"

import { useState } from "react"
import { Settings2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"

export type ProviderName = "OpenAI" | "Google" | "Anthropic" | "Mistral AI" | "DeepSeek" | "xAI";

export interface AIModel {
  id: string
  model: string
  input: number
  output: number
  provider: ProviderName
}

interface SettingsPanelProps {
  models: AIModel[]
  enabledModels: string[]
  onToggleModel: (modelId: string) => void
  onToggleAll: (enabled: boolean) => void
}

export function SettingsPanel({
  models,
  enabledModels,
  onToggleModel,
  onToggleAll
}: SettingsPanelProps) {
  const [open, setOpen] = useState(false)

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
      <DropdownMenuContent align="end" className="w-64 max-h-[400px] overflow-y-auto">
        <DropdownMenuLabel>Visible Models</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="px-2 py-1.5">
          <div className="flex items-center">
            <Checkbox
              id="all-models"
              checked={enabledModels.length === models.length}
              onCheckedChange={(checked) => {
                onToggleAll(checked === true);
              }}
              className="mr-2"
            />
            <label
              htmlFor="all-models"
              className="text-sm cursor-pointer"
            >
              All Models
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
              onCheckedChange={() => { }}
            />
            <span className="text-sm">{model.model}</span>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}