import { Animated, Dimensions, StyleSheet, View } from "react-native";
import React from "react";
import colors from "../../../../styles/colors";

const { width } = Dimensions.get("screen");

const Pagination = ({ data, scrollX, index, corDotPrimaria = true }) => {
  return (
    <View style={styles.container}>
      <View style={styles.dots}>
        {data.map((_, idx) => {
          const inputRange = [
            (idx - 1) * width,
            idx * width,
            (idx + 1) * width,
          ];

          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [6, 6, 6],
            extrapolate: "clamp",
          });

          const backgroundColor = scrollX.interpolate({
            inputRange,
            outputRange: [
              "#ccc",
              corDotPrimaria ? colors.primaria : colors.branco,
              "#ccc",
            ],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={idx.toString()}
              style={[
                styles.dot,
                { width: dotWidth, backgroundColor },
                idx == index && {
                  backgroundColor: corDotPrimaria
                    ? colors.primaria
                    : colors.branco,
                },
              ]}
            />
          );
        })}
      </View>
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  dots: {
    flexDirection: "row",
    marginTop: 10,
    position: "absolute",
    bottom: 10,
  },
  dot: {
    width: 12,
    height: 6,
    borderRadius: 6,
    marginHorizontal: 3,
    backgroundColor: "ccc",
  },
});
