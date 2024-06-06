// LoadingContext.js
import React, { createContext, useContext, useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import colors from "../styles/colors";

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
      {isLoading && (
        <View style={styles.overlay}>
          <View style={styles.indicator}>
            <ActivityIndicator size="large" color={colors.primaria} />
          </View>
        </View>
      )}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  indicator: {
    padding: 20,
    borderRadius: 10,
  },
});
