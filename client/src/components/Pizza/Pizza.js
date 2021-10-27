/* eslint-disable no-loop-func */
import './Pizza.css';
import React, { useState } from 'react';

export default function Pizza(props) {
    const [tomato, setTomato] = useState("to1");
    const [sharp, setSharp] = useState("sh1");
    const [mushrooms, setMushrooms] = useState("mu1");
    const [olives, setOlives] = useState("oliv1");
    const [Onion, setOnion] = useState("on1");
    let idOnion = "Onion" + props.numPizza + props.numTriangular;
    let idOlives = "olives" + props.numPizza + props.numTriangular;
    let idMushrooms = "mushrooms" + props.numPizza + props.numTriangular;
    let idSharp = "sharp" + props.numPizza + props.numTriangular;
    let idTomato = "Tomato" + props.numPizza + props.numTriangular;

    function addToppings(topping, name) {
        var checkBox = document.getElementById(topping);
        if (checkBox != null) {
            if (checkBox.checked) {
                if (name == "Tomato") {
                    setTomato("to2");
                }
                if (name == "sharp") {
                    setSharp("sh2");
                }
                if (name == "mushrooms") {
                    setMushrooms("mu2");
                }
                if (name == "olives") {
                    setOlives("oliv2");
                }
                if (name == "Onion") {
                    setOnion("on2");
                }
                props.funcValue(true, name, props.numPizza, props.numTriangular);
            }
            else {
                if (name == "sharp") {
                    setSharp("sh1");
                }
                if (name == "Tomato") {
                    setTomato("to1");
                }
                if (name == "mushrooms") {
                    setMushrooms("mu1");
                }
                if (name == "Onion") {
                    setOnion("on1");
                }
                if (name == "olives") {
                    setOlives("oliv1");
                }
                props.funcValue(false, name, props.numPizza, props.numTriangular);
            }
        }
    }
    return (
        <div className="pizza1">
            <div class="box">
                <div class="pizza-slice slice-1">
                    <div class="border">
                        <div class="crust"></div>
                        <div class="cheese">
                            <div className={olives}>
                                <div class="olive o-1"></div>
                                <div class="olive o-3"></div>
                                <div class="olive o-4"></div>
                                <div class="olive o-6"></div>
                                <div class="olive o-7"></div>
                            </div>
                            <div className={tomato}>
                                <div class="peperoni p-1"></div>
                                <div class="peperoni p-2"></div>
                                <div class="peperoni p-3"></div>
                            </div>
                            <div className={Onion}>
                                <div class="onions onions-1"></div>
                                <div class="onions onions-3"></div>
                                <div class="onions onions-6"></div>
                                <div class="onions onions-14"></div>
                                <div class="onions onions-13"></div>
                                <div class="onions onions-8"></div>
                                <div class="onions onions-5"></div>
                                <div class="onions onions-4"></div>
                            </div>
                            <div className={mushrooms}>
                                <div class="mushrooms mushrooms-1"></div>
                                <div class="mushrooms mushrooms-3"></div>
                                <div class="mushrooms mushrooms-8"></div>
                                <div class="mushrooms mushrooms-21"></div>
                                <div class="mushrooms mushrooms-19"></div>
                                <div class="mushrooms mushrooms-18"></div>
                                <div class="mushrooms mushrooms-5"></div>
                                <div class="mushrooms mushrooms-16"></div>
                                <div class="mushrooms mushrooms-11"></div>
                                <div class="mushrooms mushrooms-14"></div>
                                <div class="mushrooms mushrooms-17"></div>
                            </div>
                            <div className={sharp}>
                                <div class="peppers peppers-1"></div>
                                <div class="peppers peppers-3"></div>
                                <div class="peppers peppers-6"></div>
                                <div class="peppers peppers-14"></div>
                                <div class="peppers peppers-13"></div>
                                <div class="peppers peppers-8"></div>
                                <div class="peppers peppers-5"></div>
                                <div class="peppers peppers-4"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='topping-select'>
                    <h4>Toppings</h4>
                    <h4>slice {props.numTriangular}</h4>
                    <input
                        type="checkbox"
                        id={idOlives}
                        onClick={(e) => { addToppings(idOlives, "olives") }}
                    />
                    <label for={idOlives}>olives</label><br />
                    <input
                        type="checkbox"
                        id={idMushrooms}
                        onChange={() => { addToppings(idMushrooms, "mushrooms") }}
                    />
                    <label for={idMushrooms}>mushrooms</label><br />
                    <input
                        type="checkbox"
                        id={idOnion}
                        onChange={() => { addToppings(idOnion, "Onion") }}
                    />
                    <label for={idOnion}>Onion</label><br />
                    <input
                        type="checkbox"
                        id={idSharp}
                        onChange={() => { addToppings(idSharp, "sharp") }}
                    />
                    <label for={idSharp}>sharp</label><br />
                    <input
                        type="checkbox"
                        id={idTomato}
                        onChange={() => { addToppings(idTomato, "Tomato") }}
                    />
                    <label for={idTomato}>Tomato</label><br />
                </div >
            </div>
        </div>
    )
}

