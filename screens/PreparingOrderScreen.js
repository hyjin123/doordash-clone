import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";
import tw from "twrnc";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";

const PreparingOrderScreen = () => {
  return (
    <SafeAreaView style={tw`bg-[#FF3008] flex-1 justify-center items-center`}>
      <Animatable.Image
        source={require("../assets/giphy.gif")}
        animation="slideInUp"
        iterationCount={1}
        style={tw`h-96 w-96`}
      />
      <Animatable.Text
        animation="slideInUp"
        iterationCount={1}
        style={tw`text-lg my-10 text-white font-bold text-center`}
      >
        Waiting for Restaurant to accept your order!
      </Animatable.Text>

      <Progress.Circle size={60} indeterminate={true} />
    </SafeAreaView>
  );
};

export default PreparingOrderScreen;
