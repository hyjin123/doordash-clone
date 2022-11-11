import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { selectBasketItems, selectBasketTotal } from "../features/basketSlice";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";
import Currency from "react-currency-formatter";

const BasketIcon = () => {
  const items = useSelector(selectBasketItems);
  const navigation = useNavigation();
  const basketTotal = useSelector(selectBasketTotal);

  return (
    <View style={tw`absolute bottom-10 w-full z-50`}>
      <TouchableOpacity
        style={tw`mx-5 bg-[#FF3008] flex-row rounded-lg p-4 items-center`}
      >
        <Text
          style={tw`text-white font-extrabold text-lg bg-[#b02105] py-1 px-2 ml-2`}
        >
          {items.length}
        </Text>
        <Text style={tw`flex-1 text-white font-extrabold text-center ml-2`}>
          View Basket
        </Text>
        <Text style={tw`text-lg text-white font-extrabold ml-2`}>
          <Currency quantity={basketTotal} currency="CAD" />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BasketIcon;

const styles = StyleSheet.create({});
