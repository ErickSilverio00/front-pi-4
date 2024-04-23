import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  View,
} from "react-native";
import Pagination2 from "./Pagination2";
import colors from "../../styles/colors";

export default function SliderCarrossel({ blocks }) {
  const [index, setIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);

  const handleOnScroll = (event) => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      }
    )(event);
  };

  const handleOnViewableItemsChanged = useRef(({ viewableItems }) => {
    setIndex(viewableItems[0].index);
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const proximaPagina = () => {
    if (index < blocks.length - 1) {
      flatListRef.current.scrollToIndex({ index: index + 1 });
      setIndex(index + 1);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={blocks}
        renderItem={({ item }) => {
          if (item.type === "view") {
            return <View style={styles.blockContainer}>{item.content}</View>;
          } else if (item.type === "image") {
            return (
              <Image
                source={item.content}
                style={styles.blockContainerImagem}
              />
            );
          }
        }}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        contentContainerStyle={styles.flatListContentContainer}
      />
      <Pagination2
        data={blocks}
        scrollX={scrollX}
        index={index}
        abrirProximaPagina={proximaPagina}
      />
    </View>
  );
}

const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.branco,
  },
  blockContainer: {
    width: width - 32,
    marginHorizontal: 16,
  },
  blockContainerImagem: {
    width: width - 32,
    height: height * 0.3,
    borderRadius: 10,
    marginHorizontal: 16,
  },
});
