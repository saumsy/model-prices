import { ComparisonBarChart } from '@/components/bar-chart';
import { ThemeToggle } from '@/components/theme-toggle';

export default function Home() {
  return (
    <div className="min-h-screen container mx-auto py-8 px-4 flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">AI Model Pricing Dashboard</h1>
        <ThemeToggle />
      </div>

      <div className="flex-grow flex justify-center items-center">
        <ComparisonBarChart />
      </div>
    </div>
  );
}
