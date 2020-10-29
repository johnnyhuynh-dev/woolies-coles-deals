import React, { useContext } from "react";
import "./SingleCategory.scss";
import { GlobalContext } from "./ContextWrapper";

export default function SingleCategory({ category, categorySVG, setCategory }) {
  const state = useContext(GlobalContext);
  const [selectedCategory] = state.categorySelectionHook;
  return (
    <li
      onClick={setCategory}
      data-category={category}
      className={`category ${selectedCategory === category ? "selected" : ""}`}
    >
      <div>
        <img src={categorySVG} alt={`${category} icon`} height="25" />
        <span>{category}</span>
      </div>
      <i className="fas fa-chevron-right"></i>
    </li>
  );
}
