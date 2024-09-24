import React from 'react';
import {View} from 'react-native';
import {Svg, Rect, Defs, LinearGradient, Stop, Line} from 'react-native-svg';
import {getTopAndLeftForStripAndLabel} from 'gifted-charts-core';

export const StripAndLabel = props => {
  const {
    pointerX,
    pointerLabelWidth,
    pointerRadius,
    pointerWidth,
    pointerYLocal,
    pointerStripUptoDataPoint,
    pointerStripHeight,
    pointerItemLocal,
    showPointerStrip,
    pointerStripWidth,
    containerHeight,
    xAxisThickness,
    pointerStripColor,
    pointerConfig,
    pointerLabelComponent,
    secondaryPointerItem,
    pointerEvents,
    isBarChart,
    stripLineGradient,
  } = props;

  const {top, left} = getTopAndLeftForStripAndLabel(props);

  return (
    <View
      style={{
        position: 'absolute',
        left: pointerX + (pointerItemLocal[0]?.pointerShiftX || 0),
        top: pointerYLocal,
      }}>
      {(
        isBarChart
          ? showPointerStrip && !pointerLabelComponent
          : showPointerStrip
      ) ? (
        <View
          style={{
            position: 'absolute',
            left: (pointerRadius || pointerWidth) - pointerStripWidth / 4,
            top: pointerStripUptoDataPoint
              ? pointerRadius || pointerStripHeight / 2
              : -pointerYLocal + 8,
            width: pointerStripWidth,
            height: pointerStripUptoDataPoint
              ? containerHeight - pointerYLocal + 5 - xAxisThickness
              : pointerStripHeight,
            marginTop: pointerStripUptoDataPoint
              ? 0
              : containerHeight - pointerStripHeight,
          }}>
          {stripLineGradient ? (
            <Svg>
              <Defs>
                <LinearGradient
                  id="defaultUnits"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%">
                  <Stop
                    offset="0%"
                    stopColor={pointerStripColor}
                    stopOpacity="0"
                  />
                  <Stop
                    offset="50%"
                    stopColor={pointerStripColor}
                    stopOpacity="1"
                  />
                  <Stop
                    offset="100%"
                    stopColor={pointerStripColor}
                    stopOpacity="0"
                  />
                </LinearGradient>
              </Defs>
              <Rect
                fill="url(#defaultUnits)"
                x="1"
                y="1"
                width={pointerStripWidth}
                height={
                  pointerStripUptoDataPoint
                    ? containerHeight - pointerYLocal + 5 - xAxisThickness
                    : pointerStripHeight
                }
                rx="1"
                ry="1"
              />
            </Svg>
          ) : (
            <Svg>
              <Line
                stroke={pointerStripColor}
                strokeWidth={pointerStripWidth}
                strokeDasharray={
                  pointerConfig?.strokeDashArray
                    ? pointerConfig?.strokeDashArray
                    : ''
                }
                x1={0}
                y1={0}
                x2={0}
                y2={
                  pointerStripUptoDataPoint
                    ? containerHeight - pointerYLocal + 5 - xAxisThickness
                    : pointerStripHeight
                }
              />
            </Svg>
          )}
        </View>
      ) : null}

      {pointerLabelComponent ? (
        <View
          pointerEvents={pointerEvents ?? 'none'}
          style={[
            {
              position: 'absolute',
              left: left,
              top: top,
              marginTop: pointerStripUptoDataPoint
                ? 0
                : containerHeight - pointerStripHeight,
              width: pointerLabelWidth,
            },
          ]}>
          {pointerLabelComponent?.(pointerItemLocal, secondaryPointerItem)}
        </View>
      ) : null}
    </View>
  );
};
