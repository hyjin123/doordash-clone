import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import tw from "twrnc";
import { urlFor } from "../sanity";

const CategoryCard = ({ imgUrl, title }) => {
  return (
    <TouchableOpacity style={tw`relative mr-2`}>
      <Image
        style={tw`h-20 w-20 rounded`}
        source={{
          uri: urlFor(imgUrl).width(200).url(),
        }}
      />
      <Text style={tw`absolute bottom-1 left-1 text-white font-bold`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({});
