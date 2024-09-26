/**
 * TurntableVisual.js - Displays the animated turntable and its options as a pie chart.
 * Includes split lines between sections, with option text.
 * The stationary black pointer is handled in Turntable.js.
 */

import React from 'react';
import { View } from 'react-native';
import Svg, { G, Circle, Line, Text as SvgText } from 'react-native-svg';
import styles from '../styles';

const TurntableVisual = ({ options }) => {
  const radius = 150;  // Increase the radius to make the turntable larger
  const numberOfOptions = options.length;

  // Calculate angle between each option
  const anglePerOption = 360 / numberOfOptions;

  // Convert degrees to radians
  const toRadians = (degrees) => degrees * (Math.PI / 180);

  // Calculate the position of the option text and split lines
  const calculatePosition = (angle, distance = radius) => {
    const x = radius + distance * Math.cos(toRadians(angle - 90));  // X coordinate
    const y = radius + distance * Math.sin(toRadians(angle - 90));  // Y coordinate
    return { x, y };
  };

  return (
    <View style={styles.turntableContainer}>
      <Svg width={2 * radius} height={2 * radius}>
        {/* Turntable background circle */}
        <Circle cx={radius} cy={radius} r={radius} stroke="black" strokeWidth="2" fill="white" />

        {/* Draw split lines and option text */}
        {options.map((option, index) => {
          const angle = index * anglePerOption;  // Angle for this option
          const lineStart = calculatePosition(angle);  // Start point for the split line
          const textPosition = calculatePosition(angle + anglePerOption / 2, radius * 0.65);  // Move text inward

          return (
            <G key={index}>
              {/* Split line */}
              <Line
                x1={radius}
                y1={radius}
                x2={lineStart.x}
                y2={lineStart.y}
                stroke="black"
                strokeWidth="2"
              />
              
              {/* Option text */}
              <SvgText
                x={textPosition.x}
                y={textPosition.y}
                fontSize="14"
                fill="black"
                textAnchor="middle"
                alignmentBaseline="middle"
                transform={`rotate(${angle + anglePerOption / 2}, ${textPosition.x}, ${textPosition.y})`}
              >
                {option}
              </SvgText>
            </G>
          );
        })}
      </Svg>
    </View>
  );
};

export default TurntableVisual;
