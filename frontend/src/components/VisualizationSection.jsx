import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import DC_Likes from "./charts/DC_Likes";
import DC_Comments from "./charts/DC_Comments";
import DC_Shares from "./charts/DC_Shares";
import AreaChart from "./charts/AreaChart";
import { useData } from "../context/DataContext";

export default function VisualizationSection() {
  const [view, setView] = useState("graph");
  const { data, loading, error } = useData();

  console.log(data);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // You can access the data directly, for example:
  const likesData = [
    { name: "Reels", value: data.reel.likes },
    { name: "Carousels", value: data.carousel.likes },
    { name: "Static Images", value: data.static_image.likes },
    { name: "Stories", value: data.story.likes },
  ];

  const commentsData = [
    { name: "Reels", value: data.reel.comments },
    { name: "Carousels", value: data.carousel.comments },
    { name: "Static Images", value: data.static_image.comments },
    { name: "Stories", value: data.story.comments },
  ];

  const sharesData = [
    { name: "Reels", value: data.reel.shares },
    { name: "Carousels", value: data.carousel.shares },
    { name: "Static Images", value: data.static_image.shares },
    { name: "Stories", value: data.story.shares },
  ];

  const engagementData = [
    {
      name: "Reels",
      likes: data.reel.likes,
      comments: data.reel.comments,
      shares: data.reel.shares,
    },
    {
      name: "Carousels",
      likes: data.carousel.likes,
      comments: data.carousel.comments,
      shares: data.carousel.shares,
    },
    {
      name: "Static Images",
      likes: data.static_image.likes,
      comments: data.static_image.comments,
      shares: data.static_image.shares,
    },
    {
      name: "Stories",
      likes: data.story.likes,
      comments: data.story.comments,
      shares: data.story.shares,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Button
          onClick={() => setView("graph")}
          variant={view === "graph" ? "default" : "outline"}
        >
          Graph View
        </Button>
        <Button
          onClick={() => setView("table")}
          variant={view === "table" ? "default" : "outline"}
        >
          Table View
        </Button>
        <Button>Generate Report</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {view === "graph" ? (
          <Card>
            <CardHeader>
              <CardTitle>Overall Engagement by Post Type</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <AreaChart />
            </CardContent>
          </Card>
        ) : (
          ""
        )}

        <Card>
          <CardHeader>
            <CardTitle>Average Likes by Post Type</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            {view === "graph" ? <DC_Likes /> : <TableView data={likesData} />}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Average Comments by Post Type</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            {view === "graph" ? (
              <DC_Comments />
            ) : (
              <TableView data={commentsData} />
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Average Shares by Post Type</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            {view === "graph" ? <DC_Shares /> : <TableView data={sharesData} />}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function TableView({ data }) {
  return (
    <table className="w-full">
      <thead>
        <tr>
          <th>Post Type</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.name}</td>
            <td>{item.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
