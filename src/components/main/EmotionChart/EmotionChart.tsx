import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Chart,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const options = {
  scales: {
    y: {
      min: -1,
      max: 11,
      display: false,
    },
    x: {
      border: {
        display: false,
      },
    },
  },
};

const midlinePlugin = {
  id: "midlinePlugin",
  afterDraw: (chart: Chart) => {
    const {
      ctx,
      chartArea: { left, right, top, bottom },
    } = chart;

    ctx.save();

    ctx.strokeStyle = "rgba(0,0,0, 0.3)";
    ctx.lineWidth = 2;

    ctx.setLineDash([4, 4]);
    ctx.beginPath();

    ctx.moveTo(left, (top + bottom) / 2);
    ctx.lineTo(right, (top + bottom) / 2);

    ctx.stroke();
    ctx.restore();
  },
};

const EmotionChart = () => {
  const data = {
    labels: ["", "", "", "", "", "", ""],
    datasets: [
      {
        label: "My First dataset",
        data: [4, 5, 7, 6, 8, 10, 5],
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgba(75, 192, 192)",
        tension: 0.3,
      },
    ],
  };

  return <Line data={data} options={options} plugins={[midlinePlugin]} />;
};

export default EmotionChart;
