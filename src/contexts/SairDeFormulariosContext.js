import React, { createContext, useContext } from "react";
import { TouchableWithoutFeedback, Keyboard, View } from "react-native";

const SairDeFormularioContext = createContext();

export const useSairDeFormulario = () => useContext(SairDeFormularioContext);

export const SairDeFormularioProvider = ({ children }) => {
  const handlePress = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress} accessible={false}>
      <View style={{ flex: 1 }}>
        <SairDeFormularioContext.Provider value={{}}>
          {children}
        </SairDeFormularioContext.Provider>
      </View>
    </TouchableWithoutFeedback>
  );
};
