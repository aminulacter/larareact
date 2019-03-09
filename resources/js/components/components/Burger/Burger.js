import React from "react";

import "./Burger.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const Burger = props => {
    console.log(props.ingredients);
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igkey => {
            return [...Array(props.ingredients[igkey])].map((_, i) => {
                return <BurgerIngredient key={igkey + i} type={igkey} />;
            });
        })
        .reduce((arr, el) => arr.concat(el), []);
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p> Please Start adding ingredients</p>;
    }
    return (
        <div className="Burger">
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default Burger;
