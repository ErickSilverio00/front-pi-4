import React, { useRef, useState } from "react";
import Pagination from "./Pagination";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { AntDesign } from "@expo/vector-icons";
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import colors from "../../../../styles/colors";

export default function SliderInfoEspaco({
  blocks,
  curtido,
  aoClicarEmCurtir,
  corDotPrimaria = false,
}) {
  const [index, setIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  const navigation = useNavigation();

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
                resizeMode="cover"
              />
            );
          }
        }}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.iconeVoltar}
      >
        <Icon name="arrow-left" size={28} color={colors.branco} />
      </TouchableOpacity>
      <TouchableOpacity onPress={aoClicarEmCurtir} style={styles.iconeCurtir}>
        {curtido && <AntDesign name="heart" size={28} color={colors.branco} />}
        {!curtido && <Icon name="heart" size={28} color={colors.branco} />}
      </TouchableOpacity>
      <Pagination
        data={blocks}
        scrollX={scrollX}
        index={index}
        abrirProximaPagina={proximaPagina}
        corDotPrimaria={corDotPrimaria}
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
    width: width,
  },
  blockContainerImagem: {
    width: width,
  },
  iconeVoltar: {
    position: "absolute",
    left: 16,
    top: 10,
  },
  iconeCurtir: {
    position: "absolute",
    right: 16,
    top: 10,
  },
});
