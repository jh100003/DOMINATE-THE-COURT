import React from 'react';
import { ProductSpecs } from '../types';

interface RadarChartProps {
  specs: ProductSpecs;
}

const RadarChart: React.FC<RadarChartProps> = ({ specs }) => {
  const size = 200;
  const center = size / 2;
  const radius = 80;
  const maxScore = 10;

  // Data mapping order for the pentagon
  const data = [
    { label: '접지력', value: specs.traction },
    { label: '쿠셔닝', value: specs.cushion },
    { label: '지지력', value: specs.support },
    { label: '내구성', value: specs.durability },
    { label: '경량성', value: specs.weight },
  ];

  // Helper to calculate coordinates
  const getCoordinates = (value: number, index: number, total: number) => {
    const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
    const r = (value / maxScore) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  // Generate path for the data polygon
  const points = data.map((d, i) => {
    const coords = getCoordinates(d.value, i, data.length);
    return `${coords.x},${coords.y}`;
  }).join(' ');

  // Generate grid levels (20%, 40%, 60%, 80%, 100%)
  const levels = [2, 4, 6, 8, 10].map((level) => {
    return data.map((_, i) => {
      const coords = getCoordinates(level, i, data.length);
      return `${coords.x},${coords.y}`;
    }).join(' ');
  });

  // Generate axis lines
  const axes = data.map((_, i) => {
    const start = { x: center, y: center };
    const end = getCoordinates(maxScore, i, data.length);
    return { start, end };
  });

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-full max-w-[300px] aspect-square">
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full drop-shadow-xl">
          {/* Grid Levels */}
          {levels.map((points, i) => (
            <polygon
              key={i}
              points={points}
              fill="none"
              stroke="#374151" // gray-700
              strokeWidth="1"
              strokeDasharray="2 2"
            />
          ))}

          {/* Axes */}
          {axes.map((axis, i) => (
            <line
              key={i}
              x1={axis.start.x}
              y1={axis.start.y}
              x2={axis.end.x}
              y2={axis.end.y}
              stroke="#374151"
              strokeWidth="1"
            />
          ))}

          {/* Data Polygon Area */}
          <polygon
            points={points}
            fill="rgba(234, 88, 12, 0.4)" // orange-600 with opacity
            stroke="#ea580c" // orange-600
            strokeWidth="2"
            className="drop-shadow-[0_0_10px_rgba(234,88,12,0.5)]"
          />

          {/* Data Points */}
          {data.map((d, i) => {
            const coords = getCoordinates(d.value, i, data.length);
            return (
              <g key={i}>
                <circle
                  cx={coords.x}
                  cy={coords.y}
                  r="4"
                  fill="#fff"
                  stroke="#ea580c"
                  strokeWidth="2"
                />
                {/* Labels */}
                <text
                  x={coords.x}
                  y={coords.y}
                  dx={coords.x > center ? 10 : coords.x < center ? -10 : 0}
                  dy={coords.y > center ? 15 : coords.y < center ? -10 : -10}
                  textAnchor={coords.x > center ? 'start' : coords.x < center ? 'end' : 'middle'}
                  fill="#9ca3af" // gray-400
                  fontSize="10"
                  fontWeight="bold"
                >
                  {d.label}
                </text>
                <text
                  x={coords.x}
                  y={coords.y}
                  dx={coords.x > center ? 10 : coords.x < center ? -10 : 0}
                  dy={coords.y > center ? 27 : coords.y < center ? 2 : 2}
                  textAnchor={coords.x > center ? 'start' : coords.x < center ? 'end' : 'middle'}
                  fill="#ea580c"
                  fontSize="11"
                  fontWeight="bold"
                >
                  {d.value}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default RadarChart;