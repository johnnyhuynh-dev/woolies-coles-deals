import React from "react";
import "./SingleCategory.scss";

export default function SingleCategory({
  category,
  categorySVG,
  selectCategory,
}) {
  return (
    <li onClick={selectCategory} data-category={category} className="category">
      <div>
        <img src={categorySVG} alt={`${category} icon`} height="25" />
        <span>{category}</span>
      </div>
      <i className="fas fa-chevron-right"></i>
    </li>
  );
}
