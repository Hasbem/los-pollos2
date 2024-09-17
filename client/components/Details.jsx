import useBasketStore from "@/store/BasketStore";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "twrnc";
import Categories from "./Categories";

export default function Details({ selectedCategory }) {
  const addProduct = useBasketStore((state) => state.addProduct);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("Tous");
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      const response = await fetch(`http://localhost:3310/products`);
      if (!response.ok) {
        throw new Error("Erreur lors du chargement des produits");
      }
      const productsData = await response.json();
      setProducts(productsData);
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  console.log(products);

  const getFilteredProducts = () => {
    if (currentCategory === "Tous") {
      return products;
    }
    return products.filter((product) => product.category === currentCategory);
  };

  const handleSelectCategory = (categoryId) => {
    setCurrentCategory(categoryId);
  };

  return (
    <SafeAreaView style={tw``}>
      <Categories
        categories={categories}
        onSelectCategory={handleSelectCategory}
        selectedCategory={currentCategory}
      />
      <ScrollView style={tw`flex-1`} showsVerticalScrollIndicator={false}>
        {getFilteredProducts().map((product) => (
          <View
            style={tw`w-auto h-auto p-1.5 bg-neutral-200 m-3 flex-row justify-between rounded-lg`}
            key={product.product_id}
          >
            {product.img ? (
              <Image
                style={tw`w-24 h-24 left-3 rounded-md`}
                source={{ uri: product.img }}
              />
            ) : (
              <View
                style={tw`w-24 h-24 left-3 rounded-md bg-gray-300 justify-center items-center`}
              >
                <Text style={tw`text-xs text-gray-500`}>No Image</Text>
              </View>
            )}
            <Text style={tw`text-center font-bold text-xs self-center`}>
              {product.name} - {product.price}€
            </Text>
            <TouchableOpacity onPress={() => addProduct(product)}>
              <Ionicons
                name="add-circle-outline"
                size={20}
                color={"#262626"}
                style={tw`rounded-full top-3/4 right-1`}
              />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
