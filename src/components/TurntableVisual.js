/**
 * TurntableVisual.js - Displays the animated turntable and its options as a pie chart.
 * Includes split lines between sections, with rotating option text and different colors for each section.
 */

import React from 'react';
import { View } from 'react-native';
import Svg, { G, Circle, Line, Path, Text as SvgText } from 'react-native-svg';
import styles from '../styles';

const TurntableVisual = ({ options }) => {
  const radius = 150; // Radius of the turntable
  const numberOfOptions = options.length;
  const anglePerOption = 360 / numberOfOptions;

  // Color palette for the sections
  const colors = ['#ff9999', '#99ccff', '#ffcc99', '#ccff99', '#99ffcc', '#ff99cc', '#9999ff'];

  // Convert degrees to radians
  const toRadians = (degrees) => degrees * (Math.PI / 180);

  // Calculate the position of a point on the circle's circumference
  const calculatePosition = (angle, distance = radius) => {
    const x = radius + distance * Math.cos(toRadians(angle - 90)); // X coordinate
    const y = radius + distance * Math.sin(toRadians(angle - 90)); // Y coordinate
    return { x, y };
  };

  // Generate the path for each section (pie slice)
  const describeArc = (startAngle, endAngle) => {
    const start = calculatePosition(startAngle);
    const end = calculatePosition(endAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    return `M ${radius},${radius} L ${start.x},${start.y} A ${radius},${radius} 0 ${largeArcFlag},1 ${end.x},${end.y} Z`;
  };

  return (
    <View style={styles.turntableContainer}>
      <Svg width={2 * radius} height={2 * radius}>
        {/* Draw sections with colors */}
        {options.map((option, index) => {
          const startAngle = index * anglePerOption;
          const endAngle = startAngle + anglePerOption;
          const color = colors[index % colors.length]; // Cycle through the color palette

          // Calculate text position outside of return
          const textPosition = calculatePosition(startAngle + anglePerOption / 2, radius * 0.65);

          return (
            <G key={index}>
              {/* Colored section (pie slice) */}
              <Path
                d={describeArc(startAngle, endAngle)}
                fill={color}
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
                transform={`rotate(${startAngle + anglePerOption / 2}, ${textPosition.x}, ${textPosition.y})`}
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
