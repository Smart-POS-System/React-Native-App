import React, { useState } from "react";
import { Dimensions, View, Text, TouchableWithoutFeedback } from "react-native";
import Svg, {
  Line,
  Path,
  Circle,
  Text as SvgText,
  Defs,
  LinearGradient,
  Stop,
  Rect,
} from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
} from "react-native-reanimated";

// Your data source
const salesData = [
  { date: "2024-09-28", highTmp: 450 },
  { date: "2024-09-29", highTmp: 134 },
  { date: "2024-09-30", highTmp: 401 },
  { date: "2024-10-01", highTmp: 111 },
  { date: "2024-10-02", highTmp: 410 },
  { date: "2024-10-03", highTmp: 200 },
  { date: "2024-10-04", highTmp: 314 },
];

// Constants
const SCREEN_WIDTH = Dimensions.get("window").width - 30;
const CHART_HEIGHT = 200;
const PADDING = 20;
const CHART_WIDTH = SCREEN_WIDTH - PADDING * 2;

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { month: "short", day: "2-digit" };
  return date.toLocaleDateString("en-US", options);
};

const dates = salesData.map((item) => formatDate(item.date));
const highTemps = salesData.map((item) => item.highTmp);

const maxValue = Math.max(...highTemps);
const minValue = Math.min(...highTemps);

export default function SalesChart() {
  const [tooltipData, setTooltipData] = useState({ x: 0, y: 0, value: null });

  const progress = useSharedValue(0);

  // Define getNormalizedValue function here
  const getNormalizedValue = (value) => {
    const range = maxValue - minValue;
    if (range === 0) return CHART_HEIGHT / 2; // Avoid division by zero
    return CHART_HEIGHT - ((value - minValue) / range) * CHART_HEIGHT; // Y is flipped in SVG
  };

  // Function to generate path for the chart line
  const generateLinePath = (highTemps) => {
    return highTemps
      .map((value, index) => {
        const x = PADDING + (index / (highTemps.length - 1)) * CHART_WIDTH;
        const y = getNormalizedValue(value);
        return `${index === 0 ? "M" : "L"} ${x},${y}`;
      })
      .join(" ");
  };

  // Animating the path using animatedProps and Path
  const animatedProps = useAnimatedProps(() => {
    const path = generateLinePath(highTemps);
    const animatedPath = path.split(" ").map((command, index) => {
      if (command.includes(",")) {
        const [x, y] = command.split(",");
        return `${x},${y * progress.value}`;
      }
      return command;
    });
    return {
      d: animatedPath.join(" "),
    };
  });

  // Trigger the animation when component is mounted
  React.useEffect(() => {
    progress.value = withTiming(1, { duration: 1000 });
  }, []);

  return (
    <View style={{ alignItems: "center", padding: 10 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Sales Chart</Text>

      <Svg width={SCREEN_WIDTH} height={CHART_HEIGHT + 50}>
        {/* Background */}
        <Rect x="0" y="0" width="100%" height="100%" fill="white" />

        {/* Gradient Definition */}
        <Defs>
          <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor="#90ee90" stopOpacity="1" />
            <Stop offset="100%" stopColor="#90ee9050" stopOpacity="0.3" />
          </LinearGradient>
        </Defs>

        {/* Draw the area below the line (gradient area) */}
        <Path
          d={`${generateLinePath(highTemps)} L ${
            CHART_WIDTH + PADDING
          },${CHART_HEIGHT} L ${PADDING},${CHART_HEIGHT} Z`}
          fill="url(#grad)"
        />

        {/* Draw the animated path (line graph) */}
        <AnimatedPath
          animatedProps={animatedProps}
          fill="none"
          stroke="green"
          strokeWidth="3"
        />

        {/* Draw circles for data points */}
        {highTemps.map((value, index) => {
          const x = PADDING + (index / (highTemps.length - 1)) * CHART_WIDTH;
          const y = getNormalizedValue(value); // Keep the tooltip logic

          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => setTooltipData({ x, y, value })}
            >
              <Circle cx={x} cy={y} r={5} fill="green" />
            </TouchableWithoutFeedback>
          );
        })}

        {/* X-Axis Labels */}
        {dates.map((date, index) => {
          const x = PADDING + (index / (highTemps.length - 1)) * CHART_WIDTH;
          return (
            <SvgText
              key={index}
              x={x}
              y={CHART_HEIGHT + 20}
              fontSize="10"
              fill="black"
              textAnchor="middle"
            >
              {date}
            </SvgText>
          );
        })}

        {/* Y-Axis Labels (min and max) */}
        <SvgText
          x={PADDING - 10}
          y={getNormalizedValue(maxValue)}
          fontSize="10"
          fill="black"
          textAnchor="end"
        >
          ${maxValue}
        </SvgText>
        <SvgText
          x={PADDING - 10}
          y={getNormalizedValue(minValue)}
          fontSize="10"
          fill="black"
          textAnchor="end"
        >
          ${minValue}
        </SvgText>

        {/* Draw X and Y Axes */}
        <Line
          x1={PADDING}
          y1={CHART_HEIGHT}
          x2={SCREEN_WIDTH - PADDING}
          y2={CHART_HEIGHT}
          stroke="black"
        />
        <Line
          x1={PADDING}
          y1={0}
          x2={PADDING}
          y2={CHART_HEIGHT}
          stroke="black"
        />

        {/* Tooltip */}
        {tooltipData.value !== null && (
          <>
            <Circle cx={tooltipData.x} cy={tooltipData.y} r={8} fill="gray" />
            <SvgText
              x={tooltipData.x}
              y={tooltipData.y - 10}
              fontSize="12"
              fill="black"
              textAnchor="middle"
            >
              ${tooltipData.value}
            </SvgText>
          </>
        )}
      </Svg>
    </View>
  );
}

// Define the animated path using react-native-reanimated
const AnimatedPath = Animated.createAnimatedComponent(Path);
