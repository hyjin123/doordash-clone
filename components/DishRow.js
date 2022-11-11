import { View, Text } from "react-native";
import React from "react";

const DishRow = ({ id, name, description, price, image }) => {
  return (
    <View>
      <Text>{name}</Text>
    </View>
  );
};

export default DishRow;
