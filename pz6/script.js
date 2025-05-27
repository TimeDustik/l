"use strict";
import { greet, add, multiply } from "./utils.js";
import { user } from "./data.js"; 

console.log("Модульний код підключено!");

greet("Студент");
console.log("10 + 5 =", add(10, 5));
console.log("10 * 5 =", multiply(10, 5));

const { name, age, profession } = user;
const info = `Користувач: ${name}, Вік: ${age}, Професія: ${profession}`;
console.log(info);

document.getElementById("app").innerHTML = info;

const numbers = [1, 2, 3];
const newNumbers = [...numbers, 4, 5];
console.log("Новий масив:", newNumbers);

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];
console.log("Об'єднаний масив:", combined);

function sumAll(...nums) {
    return nums.reduce((acc, num) => acc + num, 0);
}
console.log("Сума:", sumAll(1, 2, 3, 4));
