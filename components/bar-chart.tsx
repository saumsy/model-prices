'use client';

import { useState, useMemo } from 'react';
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { ChartTooltip } from './chart-tooltip';
import { SettingsPanel, type AIModel } from './settings-panel';

const BLURPLE = '#5865F2';
const BRIGHT_BLUE = '#00A8FC';

const ALL_MODELS: Array<AIModel> = [
  {
    id: 'gemini-flash-lite',
    model: 'Gemini 2.0 Flash-Lite',
    input: 0.075,
    output: 0.3,
    provider: 'Google',
  },
  {
    id: 'mistral-small',
    model: 'Mistral 3.1 Small',
    input: 0.1,
    output: 0.3,
    provider: 'Mistral AI',
  },
  {
    id: 'gemini-flash',
    model: 'Gemini 2.0 Flash',
    input: 0.1,
    output: 0.4,
    provider: 'Google',
  },
  {
    id: 'chatgpt-4-1-nano',
    model: 'ChatGPT 4.1-nano',
    input: 0.1,
    output: 0.4,
    provider: 'OpenAI',
  },
  {
    id: 'deepseek-v3-old',
    model: 'DeepSeek v3 (old)',
    input: 0.14,
    output: 0.28,
    provider: 'DeepSeek',
  },
  {
    id: 'chatgpt-4o-mini',
    model: 'ChatGPT 4o-mini',
    input: 0.15,
    output: 0.6,
    provider: 'OpenAI',
  },
  {
    id: 'deepseek-v3',
    model: 'DeepSeek v3',
    input: 0.27,
    output: 1.1,
    provider: 'DeepSeek',
  },
  {
    id: 'grok-mini',
    model: 'Grok 3-mini',
    input: 0.3,
    output: 0.5,
    provider: 'xAI',
  },
  {
    id: 'chatgpt-4-1-mini',
    model: 'ChatGPT 4.1-mini',
    input: 0.4,
    output: 1.6,
    provider: 'OpenAI',
  },
  {
    id: 'deepseek-r1',
    model: 'DeepSeek r1',
    input: 0.55,
    output: 2.19,
    provider: 'DeepSeek',
  },
  {
    id: 'chatgpt-o3-mini',
    model: 'ChatGPT o3-mini',
    input: 1.1,
    output: 4.4,
    provider: 'OpenAI',
  },
  {
    id: 'gemini-pro',
    model: 'Gemini 2.5 Pro',
    input: 1.25,
    output: 10.0,
    provider: 'Google',
  },
  {
    id: 'chatgpt-4-1',
    model: 'ChatGPT 4.1',
    input: 2.0,
    output: 8.0,
    provider: 'OpenAI',
  },
  {
    id: 'chatgpt-4o',
    model: 'ChatGPT 4o',
    input: 2.5,
    output: 10.0,
    provider: 'OpenAI',
  },
  {
    id: 'claude-sonnet',
    model: 'Claude 3.5 Sonnet',
    input: 3.0,
    output: 15.0,
    provider: 'Anthropic',
  },
  { id: 'grok-3', model: 'Grok 3', input: 3.0, output: 15.0, provider: 'xAI' },
  {
    id: 'chatgpt-o1',
    model: 'ChatGPT o1',
    input: 15.0,
    output: 60.0,
    provider: 'OpenAI',
  },
  {
    id: 'chatgpt-4-5',
    model: 'ChatGPT 4.5',
    input: 75.0,
    output: 150.0,
    provider: 'OpenAI',
  },
  {
    id: 'o1-pro',
    model: 'O1 Pro',
    input: 150.0,
    output: 600.0,
    provider: 'OpenAI',
  },
];

function CustomXAxisTick(props: any) {
  const { x, y, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill="currentColor"
        fontSize={12}
        transform="rotate(-45)"
      >
        {payload.value}
      </text>
    </g>
  );
}

function roundToMultipleOf20(value: number): number {
  return Math.ceil(value / 20) * 20;
}

function roundToNextInteger(value: number): number {
  return Math.ceil(value);
}

export function ComparisonBarChart() {
  const initialModels = ALL_MODELS.map((m) => m.id).slice(0, -2);
  const [enabledModels, setEnabledModels] = useState(initialModels);

  const chartData = useMemo(() => {
    return ALL_MODELS.filter((model) => enabledModels.includes(model.id));
  }, [enabledModels]);

  const maxValue = useMemo(() => {
    if (chartData.length === 0) return 20;
    const maxOutput = Math.max(...chartData.map((item) => item.output));
    const maxInput = Math.max(...chartData.map((item) => item.input));
    const absoluteMax = Math.max(maxOutput, maxInput);
    return absoluteMax < 10
      ? roundToNextInteger(absoluteMax)
      : roundToMultipleOf20(absoluteMax);
  }, [chartData]);

  const formatDollar = (value: number) => `$${value.toFixed(2)}`;

  const toggleModel = (modelId: string) => {
    setEnabledModels((prev) => {
      if (prev.includes(modelId)) {
        if (prev.length === 1) return prev;
        return prev.filter((id) => id !== modelId);
      } else {
        return [...prev, modelId];
      }
    });
  };

  const setAllModels = (enabled: boolean) => {
    setEnabledModels(
      enabled
        ? ALL_MODELS.map((m) => m.id)
        : ALL_MODELS.map((m) => m.id).slice(0, -2)
    );
  };

  return (
    <Card className="w-full max-w-screen mx-auto shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>AI Model Pricing Comparison</CardTitle>
          <CardDescription>
            Cost per million tokens for popular AI models
          </CardDescription>
        </div>
        <SettingsPanel
          models={ALL_MODELS}
          enabledModels={enabledModels}
          onToggleModel={toggleModel}
          onToggleAll={setAllModels}
        />
      </CardHeader>
      <CardContent className="pb-8">
        <div className="h-[650px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              barGap={2}
              barCategoryGap={8}
            >
              <XAxis
                dataKey="model"
                axisLine={false}
                tickLine={false}
                interval={0}
                height={60}
                tick={<CustomXAxisTick />}
              />
              <YAxis
                tickFormatter={formatDollar}
                axisLine={false}
                tickLine={false}
                width={80}
                domain={[0, maxValue]}
              />
              <Legend
                iconType="circle"
                wrapperStyle={{
                  paddingTop: 60,
                  textAlign: 'center',
                  width: '100%',
                }}
                iconSize={12}
                verticalAlign="bottom"
                height={36}
              />
              <Bar
                name="Input Cost"
                dataKey="input"
                fill={BLURPLE}
                radius={[4, 4, 0, 0]}
                barSize={24}
                animationDuration={1500}
              />
              <Bar
                name="Output Cost"
                dataKey="output"
                fill={BRIGHT_BLUE}
                radius={[4, 4, 0, 0]}
                barSize={24}
                animationDuration={1500}
              />
              <defs>
                <filter
                  id="tooltip-shadow"
                  x="0"
                  y="0"
                  width="200%"
                  height="200%"
                >
                  <feDropShadow
                    dx="0"
                    dy="1"
                    stdDeviation="2"
                    floodOpacity="0.1"
                  />
                </filter>
              </defs>
              <Tooltip
                content={<ChartTooltip />}
                cursor={{ opacity: 0.1 }}
                wrapperStyle={{ outline: 'none' }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
