import React, { Component } from "react";

import Aux from "../../Hoc/Aux1";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
};

class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: {
                salad: 0,
                bacon: 0,
                cheese: 0,
                meat: 0
            },
            totalPrice: 4,
            purchaseable: false,
            purchasing: false,
        };
    }

    addIngredientHandler = type => {
        let oldCount = this.state.ingredients[type];
        let updatedCount = oldCount + 1;
        let updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        let newPrice = oldPrice + priceAddition;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients);
    };
    removedIngredientHandler = type => {
        let oldCount = this.state.ingredients[type];

        if (oldCount <= 0) {
            return;
        }
        let updatedCount = oldCount - 1;
        let updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        let newPrice = oldPrice - priceDeduction;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients);
    };
    updatePurchaseState = updatedIngredients => {
        const sum = Object.keys(updatedIngredients)
            .map(igKey => updatedIngredients[igKey])
            .reduce((sum, el) => sum + el, 0);
        console.log(sum);
        this.setState({ purchaseable: sum > 0 });
    };

    purchaseHandler =() => {
        this.setState({purchasing: true});
    };
    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () =>{
        alert("You Continue!")
    }
    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
          <Aux>
            <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}> 
              <OrderSummary ingredients={this.state.ingredients}  purchaseCanceled={this.purchaseCancelHandler}
              purchaseContinued={this.purchaseContinueHandler}/>
            </Modal>
            <Burger ingredients={this.state.ingredients} />
            <BuildControls
              ingredientAdded={this.addIngredientHandler}
              ingredientRemoved={this.removedIngredientHandler}
              disabled={disabledInfo}
              purchaseable={this.state.purchaseable}
              price={this.state.totalPrice}
              ordered = {this.purchaseHandler}
            />
          </Aux>
        );
    }
}

export default BurgerBuilder;
