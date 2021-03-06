import React, { useContext } from "react";
import "./ProductsNavigation.scss";
import SingleCategory from "./SingleCategory";
import { GlobalContext } from "./ContextWrapper";

// import all SVG icons
import allSVG from "../assets/all.svg";
import meatSVG from "../assets/meat.svg";
import bakerySVG from "../assets/bakery.svg";
import dairySVG from "../assets/dairy.svg";
import pantrySVG from "../assets/pantry.svg";
import freezerSVG from "../assets/freezer.svg";
import drinksSVG from "../assets/drinks.svg";
import liquorSVG from "../assets/liquor.svg";
import petSVG from "../assets/pet.svg";
import babySVG from "../assets/baby.svg";
import beautySVG from "../assets/beauty.svg";
import householdSVG from "../assets/household.svg";

// create an object of categories and their corresponding SVG
const categories = {
  "All Specials": allSVG,
  "Meat, Seafood & Deli": meatSVG,
  Bakery: bakerySVG,
  "Dairy, Eggs & Fridge": dairySVG,
  Pantry: pantrySVG,
  Freezer: freezerSVG,
  Drinks: drinksSVG,
  Liquor: liquorSVG,
  Pet: petSVG,
  Baby: babySVG,
  "Health & Beauty": beautySVG,
  Household: householdSVG,
};

export default function ProductsNavigation() {
  const state = useContext(GlobalContext);
  const [selectedCategory, setSelectedCategory] = state.categorySelectionHook;

  function setCategory(e) {
    const category = e.currentTarget.dataset.category;
    console.log(category);
    setSelectedCategory(category);
  }

  return (
    <>
      <nav className="products-navigation">
        {Object.entries(categories).map(([category, categorySVG]) => (
          <SingleCategory
            key={category}
            category={category}
            categorySVG={categorySVG}
            setCategory={setCategory}
          />
        ))}
      </nav>

      <div>{selectedCategory}</div>
    </>
  );
}
