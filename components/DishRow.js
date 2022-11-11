import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import Currency from "react-currency-formatter";
import tw from "twrnc";
import { urlFor } from "../sanity";

const DishRow = ({ id, name, description, price, image }) => {
  return (
    <TouchableOpacity style={tw`bg-white border p-4 border-gray-100`}>
      <View style={tw`flex-row`}>
        <View style={tw`flex-1 pr-2`}>
          <Text style={tw`text-lg mb-1`}>{name}</Text>
          <Text style={tw`text-gray-400`}>{description}</Text>
          <Text style={tw`text-gray-400`}>
            <Currency quantity={price} currency="CAD" />
          </Text>
        </View>

        <View>
          <Image
            style={{ borderWidth: 1, borderColor: "#F3F3F4" }}
            source={{
              uri: urlFor(image).url(),
            }}
            style={tw`h-20 w-20 bg-gray-300 p-4`}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DishRow;
