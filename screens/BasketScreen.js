import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant } from "../features/restaurantSlice";
import {
  removeFromBasket,
  selectBasketItems,
  selectBasketTotal,
} from "../features/basketSlice";
import { XCircleIcon } from "react-native-heroicons/solid";
import tw from "twrnc";
import { urlFor } from "../sanity";
import Currency from "react-currency-formatter";

const BasketScreen = () => {
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);
  const dispatch = useDispatch();

  useEffect(() => {
    // Groups items in the basket so it doesn't individually list them out
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});

    setGroupedItemsInBasket(groupedItems);
  }, [items]);

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <View style={tw`flex-1 bg-gray-100`}>
        {/* Heading */}
        <View style={tw`p-5 border-b border-[#FF3008] bg-white`}>
          <View>
            <Text style={tw`text-lg font-bold text-center`}>Your Basket</Text>
            <Text style={tw`text-center text-gray-400`}>
              {restaurant.title}
            </Text>
          </View>

          <TouchableOpacity
            onPress={navigation.goBack}
            style={tw`rounded-full bg-gray-100 absolute top-3 right-5`}
          >
            <XCircleIcon color="#FF3008" height={50} width={50} />
          </TouchableOpacity>
        </View>

        {/* Small Content */}
        <View style={tw`flex-row items-center px-4 py-3 bg-white my-5`}>
          <Image
            source={{ uri: "https://links.papareact.com/wru" }}
            style={tw`h-7 w-7 bg-gray-300 p-4 rounded-full`}
          />
          <Text style={tw`flex-1 pl-4`}>Deliver in 60-75 min</Text>
          <TouchableOpacity>
            <Text style={tw`text-[#FF3008]`}>Change</Text>
          </TouchableOpacity>
        </View>

        {/* Body */}
        <ScrollView>
          {Object.entries(groupedItemsInBasket).map(([key, items]) => (
            <View
              key={key}
              style={tw`flex-row items-center bg-white py-2 px-5`}
            >
              <Text style={tw`text-[#FF3008]`}>{items.length} x</Text>
              <Image
                source={{ uri: urlFor(items[0].image).url() }}
                style={tw`h-12 w-12 rounded-full ml-3`}
              />
              <Text style={tw`flex-1 ml-3`}>{items[0]?.name}</Text>

              <Text style={tw`text-gray-600`}>
                <Currency quantity={items[0]?.price} currency="CAD" />
              </Text>

              <TouchableOpacity>
                <Text
                  style={tw`text-[#FF3008] text-xs ml-2`}
                  onPress={() => dispatch(removeFromBasket({ id: key }))}
                >
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {/* Total for the items */}
        <View style={tw`p-5 bg-white mt-5`}>
          {/* Subtotal */}
          <View style={tw`flex-row justify-between mt-4`}>
            <Text style={tw`text-gray-400`}>Subtotal</Text>
            <Text style={tw`text-gray-400`}>
              <Currency quantity={basketTotal} currency="CAD" />
            </Text>
          </View>

          {/* Delivery Fee */}
          <View style={tw`flex-row justify-between mt-4`}>
            <Text style={tw`text-gray-400`}>Delivery Fee</Text>
            <Text style={tw`text-gray-400`}>
              <Currency quantity={5.99} currency="CAD" />
            </Text>
          </View>

          {/* Total */}
          <View style={tw`flex-row justify-between mt-4`}>
            <Text>Order Total</Text>
            <Text style={tw`font-extrabold`}>
              <Currency quantity={basketTotal + 5.99} currency="CAD" />
            </Text>
          </View>

          {/* Place order button */}
          <TouchableOpacity
            onPress={() => navigation.navigate("PreparingOrderScreen")}
            style={tw`rounded-lg bg-[#FF3008] p-4 mt-4`}
          >
            <Text style={tw`text-center text-white text-lg font-bold`}>
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;
