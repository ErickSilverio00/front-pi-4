import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";

const iconTypes = {
  MaterialIcons,
  MaterialCommunityIcons,
  Feather,
  FontAwesome5,
  Entypo,
};

export const getIconComponent = (type) => iconTypes[type] || null;
