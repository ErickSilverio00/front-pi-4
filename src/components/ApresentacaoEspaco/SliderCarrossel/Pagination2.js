import { Animated, Dimensions, StyleSheet, View } from "react-native";
import React from "react";
import colors from "../../../styles/colors";

const { width } = Dimensions.get("screen");

const Pagination2 = ({ data, scrollX, index }) => {
  return (
    <View style={styles.container}>
      <View style={styles.dots}>
        {data?.map((_, idx) => {
          const inputRange = [
            (idx - 1) * width,
            idx * width,
            (idx + 1) * width,
          ];

          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [6, 15, 6],
            extrapolate: "clamp",
          });

          const backgroundColor = scrollX.interpolate({
            inputRange,
            outputRange: ["#ccc", colors.primaria, "#ccc"],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={idx.toString()}
              style={[
                styles.dot,
                { width: dotWidth, backgroundColor },
                idx == index && styles.dotActive,
              ]}
            />
          );
        })}
      </View>
    </View>
  );
};

export default Pagination2;

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
  },
  dot: {
    width: 12,
    height: 6,
    borderRadius: 6,
    marginHorizontal: 3,
    backgroundColor: "ccc",
  },
  dotActive: {
    backgroundColor: colors.primaria,
  },
});
