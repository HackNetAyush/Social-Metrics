import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { useData } from "../../context/DataContext";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function DC_Likes() {
  const { data: dataFromAPI, loading, error } = useData();
  const data = [
    { name: "Reels", value: dataFromAPI.reel.likes },
    { name: "Carousels", value: dataFromAPI.carousel.likes },
    { name: "Static Images", value: dataFromAPI.static_image.likes },
    { name: "Stories", value: dataFromAPI.story.likes },
  ];

  return (
    <ChartContainer
      config={{
        reels: { label: "Reels", color: COLORS[0] },
        carousels: { label: "Carousels", color: COLORS[1] },
        staticImages: { label: "Static Images", color: COLORS[2] },
        stories: { label: "Stories", color: COLORS[3] },
      }}
      className="w-full h-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={300}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="70%"
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <ChartTooltip content={<ChartTooltipContent />} />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
