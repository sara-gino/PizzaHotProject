import React, { useEffect, useState } from 'react';
import './App.css';
import Pizza from './components/Pizza/Pizza';


function App() {
  const pizza =
  {
    slice1: { Onion: false, mushrooms: false, olives: false, sharp: false, Tomato: false },
    slice2: { Onion: false, mushrooms: false, olives: false, sharp: false, Tomato: false },
    slice3: { Onion: false, mushrooms: false, olives: false, sharp: false, Tomato: false },
    slice4: { Onion: false, mushrooms: false, olives: false, sharp: false, Tomato: false },
    slice5: { Onion: false, mushrooms: false, olives: false, sharp: false, Tomato: false },
    slice6: { Onion: false, mushrooms: false, olives: false, sharp: false, Tomato: false },
    slice7: { Onion: false, mushrooms: false, olives: false, sharp: false, Tomato: false },
    slice8: { Onion: false, mushrooms: false, olives: false, sharp: false, Tomato: false }
  };
  const [arrayPizza, setArrayPizza] = useState([pizza]);
  let pizza1 = [1, 2, 3, 4, 5, 6, 7, 8];
  function ChangeTotalPrice() {
    let s = 0;
    let totalPrice1 = 0;
    var tosafot = ["Onion", "mushrooms", "sharp", "olives", "Tomato"]
    arrayPizza.map((odj => {
      totalPrice1 = totalPrice1 + 30;
      s++;
      for (let i = 0; i < 8; i++) {
        let name = "slice" + (i + 1);
        tosafot.map(tos => {
          if (arrayPizza[s - 1][name][tos]) {
            totalPrice1 = totalPrice1 + 0.5;
          };
        })
      };
    }))
    setTotalPrice(totalPrice1);
  }
  useEffect(() => {
    ChangeTotalPrice();
  }, []);
  let i = 0;
  const [totalPrice, setTotalPrice] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [data, setData] = useState("");
  function onInputChange(event, func) {
    func(event.target.value);
  }
  function popPizza() {
    let arr = arrayPizza;
    arr.pop();
    setArrayPizza(arr);
    ChangeTotalPrice();

  }
  function AddPizza() {
    let arr = arrayPizza;
    arr.push(pizza);
    setArrayPizza(arr);
    ChangeTotalPrice();
  }
  const send = async () => {
    ChangeTotalPrice();
    let response =
      await fetch("http://localhost:3080/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "access-control-allow-origin": "*",
        },
        body: JSON.stringify({
          "name": name,
          "phone": phone,
          "pizza": arrayPizza,
          "totalPrice": totalPrice
        }),
      });
    setData(await response.json());
  }

  return (
    <div>
      <h1 className="name"> 🍕 Pizza Hot 🍕</h1>
      <div className="input1">
        <label className="input" >name</label>
        <br />
 <input id="name" className="input" onChange={(event) => { onInputChange(event, setName) }}></input>        <br />
        <label className="input" >phone</label>
        <br />
        <input id="phone" className="input" onChange={(event) => { onInputChange(event, setPhone) }}></input>
        <br />
        <button className="buttonPizza AddPizza" id="add pizza" onClick={() => { AddPizza() }}>add pizza</button>
        <button className="buttonPizza OutPizza" id="remove pizza" onClick={() => { popPizza() }}>remove pizza</button>
      </div>
      {arrayPizza.map((pizza) => {
        i++;
        return <div className="titlePizza">
          <div className="fff">
            <h2>Pizza {i}</h2>
          </div>
          <div className="cotainer"> {pizza1.map((numSlice) => {
            return <div className="slice">
              <Pizza numPizza={i - 1} numTriangular={numSlice} funcValue={(value, nameTopping, numPizza, numSlice) => {
                let T = arrayPizza;
                let Triangular = "slice" + (numSlice);
                T[numPizza][Triangular][nameTopping] = value;
                setArrayPizza(T);
                ChangeTotalPrice();
              }}
              /></div>
          })}</div></div>;

      })}
      <br />
      <h1>TotalPrice {totalPrice}</h1>
      <button className="buttonOrder buttonPizza AddPizza" id="send" onClick={send}>order</button>
      <br />
      <h2 id="l" className="data">{data}</h2>
      <br />
    </div >
  );
}
export default App;
