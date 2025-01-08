import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { useData } from "../../context/DataContext";

export default function CustomAreaChart() {
  const { data: dataFromAPI, loading, error } = useData();

  const data = [
    {
      name: "Reels",
      likes: dataFromAPI.reel.likes,
      comments: dataFromAPI.reel.comments,
      shares: dataFromAPI.reel.shares,
    },
    {
      name: "Carousels",
      likes: dataFromAPI.carousel.likes,
      comments: dataFromAPI.carousel.comments,
      shares: dataFromAPI.carousel.shares,
    },
    {
      name: "Static Images",
      likes: dataFromAPI.static_image.likes,
      comments: dataFromAPI.static_image.comments,
      shares: dataFromAPI.static_image.shares,
    },
    {
      name: "Stories",
      likes: dataFromAPI.story.likes,
      comments: dataFromAPI.story.comments,
      shares: dataFromAPI.story.shares,
    },
  ];

  return (
    <ChartContainer
      config={{
        likes: { label: "Likes", color: "hsl(var(--chart-1))" },
        comments: { label: "Comments", color: "hsl(var(--chart-2))" },
        shares: { label: "Shares", color: "hsl(var(--chart-3))" },
      }}
      className="w-full h-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Area
            type="monotone"
            dataKey="likes"
            stackId="1"
            stroke="var(--color-likes)"
            fill="var(--color-likes)"
            fillOpacity={0.8}
          />
          <Area
            type="monotone"
            dataKey="comments"
            stackId="1"
            stroke="var(--color-comments)"
            fill="var(--color-comments)"
            fillOpacity={0.8}
          />
          <Area
            type="monotone"
            dataKey="shares"
            stackId="1"
            stroke="var(--color-shares)"
            fill="var(--color-shares)"
            fillOpacity={0.8}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
