import React from "react";
import { useState } from "react";
import { ResponsiveBump,} from "@nivo/bump";
import { Box } from "@mui/material";
export default function BumpGraph() {
  const [graphData, setGraphData] = useState([
    {
      id: "Tâches\nréussi",
      color: "hsl(261, 70%, 50%)",
      data: [
        {
          x: "Lundi",
          y: 257,
        },
        {
          x: "Mardi",
          y: 285,
        },
        {
          x: "Mercredi",
          y: 64,
        },
        {
          x: "Jeudi",
          y: 209,
        },
        {
          x: "Vendredi",
          y: 258,
        },
        {
          x: "Samedi",
          y: 163,
        },
        {
          x: "Dimanche",
          y: 53,
        },
      ],
    },
  ]);
  return (
    <Box
      sx={{
        height: 500,
      }}
    >
      <ResponsiveBump
        data={graphData}
        colors={{ scheme: "spectral" }}
        lineWidth={6}
        activeLineWidth={8}
        inactiveLineWidth={3}
        inactiveOpacity={0.15}
        pointSize={15}
        activePointSize={21}
        inactivePointSize={0}
        pointColor={{ theme: "background" }}
        pointBorderWidth={3}
        activePointBorderWidth={3}
        pointBorderColor={{ from: "serie.color" }}
        axisTop={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "",
          legendPosition: "middle",
          legendOffset: -36,
        }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "ranking",
          legendPosition: "middle",
          legendOffset: -40,
        }}
        margin={{ top: 40, right: 100, bottom: 40, left: 60 }}
        axisRight={null}
      />
    </Box>
  );
}
