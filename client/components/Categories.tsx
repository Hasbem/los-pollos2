import React from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import tw from "twrnc";

interface CategoriesProps {
  categories: string[];
  onSelectCategory: (categoryId: string) => void;
  selectedCategory: string;
}

export default function Categories({
  categories = [], // Valeur par défaut pour éviter undefined
  onSelectCategory,
  selectedCategory,
}: CategoriesProps) {
  return (
    <ScrollView
      style={tw`bg-neutral-300 rounded-md w-96 self-center`}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      <TouchableOpacity
        style={tw.style(
          `w-32 h-6 m-3 rounded-md items-center justify-center`,
          selectedCategory === "Tous" ? "bg-blue-500" : "bg-white"
        )}
        onPress={() => onSelectCategory("Tous")}
      >
        <Text
          style={tw.style(
            `text-center font-bold text-xs`,
            selectedCategory === "Tous" ? "text-white" : "text-black"
          )}
        >
          Tous
        </Text>
      </TouchableOpacity>
      {categories.length > 0 &&
        categories.map((category, index) => (
          <TouchableOpacity
            style={tw.style(
              `w-32 h-6 m-3 rounded-md items-center justify-center`,
              category === selectedCategory ? "bg-blue-500" : "bg-white"
            )}
            key={index}
            onPress={() => onSelectCategory(category)}
          >
            <Text
              style={tw.style(
                `text-center font-bold text-xs`,
                category === selectedCategory ? "text-white" : "text-black"
              )}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
    </ScrollView>
  );
}
