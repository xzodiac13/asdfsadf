"use client";

import { useMemo, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

type Store = { name: string; mark: string; color: string; domain?: string };
type FoodOption = { name: string; image: string };
type Product = {
  id: string;
  name: string;
  detail: string;
  price: number;
  image: string;
  category: string;
  qty: number;
  unit: string;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
};
type Ingredient = { productId: string; amount: string };
type Recipe = {
  id: string;
  title: string;
  scenario: string;
  time: string;
  prepTime: string;
  cookTime: string;
  difficulty: string;
  image: string;
  servings: number;
  ingredients: Ingredient[];
  steps: string[];
  tips: string[];
  substitutions: string[];
};
type Palette = { name: string; colors: string[] };
type Profile = {
  sex: "female" | "male";
  age: string;
  height: string;
  weight: string;
  activity: string;
  goal: "deficit" | "maintenance" | "surplus";
};

const photo = (id: string, width = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

const stores: Store[] = [
  { name: "Пятёрочка", mark: "5", color: "#e52329", domain: "5ka.ru" },
  { name: "Перекрёсток", mark: "П", color: "#008b55", domain: "perekrestok.ru" },
  { name: "Магнит", mark: "М", color: "#e31e24", domain: "magnit.ru" },
  { name: "ВкусВилл", mark: "В", color: "#16864a", domain: "vkusvill.ru" },
  { name: "Лента", mark: "Л", color: "#174b8f", domain: "lenta.com" },
  { name: "Ашан", mark: "A", color: "#e31d2b", domain: "auchan.ru" },
  { name: "Дикси", mark: "Д", color: "#d9232e", domain: "dixy.ru" },
  { name: "Окей", mark: "О", color: "#ed1c24", domain: "okmarket.ru" },
  { name: "Самокат", mark: "С", color: "#ef5364", domain: "samokat.ru" },
  { name: "Чижик", mark: "Ч", color: "#f2c400", domain: "chizhik.club" },
  { name: "METRO", mark: "M", color: "#e31e24", domain: "metro-cc.ru" },
  { name: "Азбука вкуса", mark: "А", color: "#202020", domain: "av.ru" },
  { name: "Глобус", mark: "Г", color: "#e4a900", domain: "globus.ru" },
  { name: "Яндекс Лавка", mark: "Я", color: "#f4c400", domain: "lavka.yandex.ru" },
  { name: "Виктория", mark: "В", color: "#177b45", domain: "victoria-group.ru" },
];

const foodOptions: FoodOption[] = [
  { name: "Курица", image: photo("photo-1604503468506-a8da13d82791") },
  { name: "Мясо", image: photo("photo-1603048297172-c92544798d5a") },
  { name: "Рыба", image: photo("photo-1519708227418-c8fd9a32b7a2") },
  { name: "Яйца", image: photo("photo-1506976785307-8732e854ad03") },
  { name: "Колбасы", image: photo("photo-1547592180-85f173990554") },
  { name: "Грибы", image: photo("photo-1504545102780-26774c1bb073") },
  { name: "Картофель", image: photo("photo-1518977676601-b53f82aba655") },
  { name: "Макароны", image: photo("photo-1551183053-bf91a1d81141") },
  { name: "Крупы", image: photo("photo-1515543904379-3d7573263c7b") },
  { name: "Овощи", image: photo("photo-1540420773420-3366772f4999") },
  { name: "Фрукты", image: photo("photo-1610832958506-aa56368176cf") },
  { name: "Молочные продукты", image: photo("photo-1550583724-b2692b85b150") },
  { name: "Сыр", image: photo("photo-1486297678162-eb2a19b0a32d") },
  { name: "Полуфабрикаты", image: photo("photo-1604908176997-125f25cc6f3d") },
  { name: "Пельмени", image: photo("photo-1562967914-608f82629710") },
  { name: "Снеки", image: photo("photo-1621939514649-280e2aa9f4e6") },
  { name: "Сладости", image: photo("photo-1548907040-4d42bfc2c7a9") },
  { name: "Напитки", image: photo("photo-1544145945-f90425340c7e") },
  { name: "Готовая еда", image: photo("photo-1547592180-85f173990554") },
  { name: "Соусы", image: photo("photo-1472476443507-c7a5948772fc") },
];

const palettes: Palette[] = [
  { name: "Снежные горы", colors: ["#2A4B6F", "#3B6392", "#D3DBE3", "#638CB7", "#1B2636"] },
];

const scenarios = [
  { id: "snacks", title: "Вечер со снеками", desc: "Чипсы, доширак, чебупели и вкусности под игру или фильм", emoji: "🍿", image: photo("photo-1621939514649-280e2aa9f4e6") },
  { id: "quick", title: "Быстро перекусить", desc: "Бутерброды, лапша, готовая еда — без долгой готовки", emoji: "🥪", image: photo("photo-1525351484163-7529414344d8") },
  { id: "day", title: "Еда на день", desc: "Завтрак, обед, ужин и перекусы", emoji: "🍲", image: photo("photo-1547592180-85f173990554") },
  { id: "stock", title: "Закупиться на несколько дней", desc: "Полноценная корзина для дома", emoji: "🛒", image: photo("photo-1542838132-92c53300491e") },
  { id: "mass", title: "Набор массы", desc: "Сытные продукты, белок и калорийные блюда", emoji: "💪", image: photo("photo-1546069901-ba9599a7e63c") },
  { id: "balanced", title: "Сбалансированное питание", desc: "Разнообразная еда на каждый день", emoji: "🥗", image: photo("photo-1512621776951-a57141f2eefd") },
  { id: "no-cook", title: "Вообще не готовить", desc: "Готовые блюда и продукты, которые можно сразу есть", emoji: "🥡", image: photo("photo-1547592180-85f173990554") },
];

const budgetOptions = [200, 500, 1000, 3000, 5000, 10000, 20000, 30000];

const baseProducts: Product[] = [
  { id: "chips", name: "Чипсы", detail: "Пачка картофельных чипсов, около 140 г", price: 119, image: photo("photo-1566478989037-eec170784d0b", 500), category: "Снеки", qty: 1, unit: "уп.", calories: 536, protein: 7, fat: 35, carbs: 49 },
  { id: "drink", name: "Газированный напиток", detail: "Бутылка 1 л", price: 99, image: photo("photo-1629203851122-3726ecdf080e", 500), category: "Напитки", qty: 1, unit: "бут.", calories: 42, protein: 0, fat: 0, carbs: 10.6 },
  { id: "crackers", name: "Сухарики", detail: "Пачка 80–100 г", price: 69, image: photo("photo-1599490659213-e2b9527bd087", 500), category: "Снеки", qty: 1, unit: "уп.", calories: 410, protein: 10, fat: 12, carbs: 65 },
  { id: "chocolate", name: "Шоколад", detail: "Плитка 80–100 г", price: 109, image: photo("photo-1606313564200-e75d5e30476c", 500), category: "Сладости", qty: 1, unit: "шт.", calories: 540, protein: 7, fat: 31, carbs: 58 },
  { id: "bread", name: "Хлеб", detail: "Буханка или нарезка 350–450 г", price: 89, image: photo("photo-1509440159596-0249088772ff", 500), category: "Крупы", qty: 1, unit: "шт.", calories: 250, protein: 8, fat: 3, carbs: 49 },
  { id: "cheese", name: "Сыр", detail: "Кусок 200 г", price: 179, image: photo("photo-1486297678162-eb2a19b0a32d", 500), category: "Сыр", qty: 1, unit: "уп.", calories: 350, protein: 25, fat: 27, carbs: 2 },
  { id: "ham", name: "Ветчина", detail: "Упаковка 200 г", price: 159, image: photo("photo-1524438418049-ab2acb7aa48f", 500), category: "Колбасы", qty: 1, unit: "уп.", calories: 230, protein: 18, fat: 17, carbs: 2 },
  { id: "tomato", name: "Помидоры", detail: "Упаковка или несколько штук, 500 г", price: 99, image: photo("photo-1546094096-0df4bcaaa337", 500), category: "Овощи", qty: 1, unit: "уп.", calories: 18, protein: 0.9, fat: 0.2, carbs: 3.9 },
  { id: "eggs", name: "Яйца", detail: "Десяток С1", price: 119, image: photo("photo-1506976785307-8732e854ad03", 500), category: "Яйца", qty: 1, unit: "уп.", calories: 143, protein: 13, fat: 10, carbs: 1 },
  { id: "oats", name: "Овсяные хлопья", detail: "Пачка 400 г", price: 89, image: photo("photo-1517673132405-a56a62b18caf", 500), category: "Крупы", qty: 1, unit: "уп.", calories: 370, protein: 13, fat: 7, carbs: 62 },
  { id: "chicken", name: "Куриное филе", detail: "Охлаждённое, около 500 г", price: 269, image: photo("photo-1604503468506-a8da13d82791", 500), category: "Курица", qty: 1, unit: "уп.", calories: 120, protein: 23, fat: 2.6, carbs: 0 },
  { id: "potato", name: "Картофель", detail: "Пакет 1 кг", price: 69, image: photo("photo-1518977676601-b53f82aba655", 500), category: "Картофель", qty: 1, unit: "кг", calories: 77, protein: 2, fat: 0.1, carbs: 17 },
  { id: "vegetables", name: "Овощная смесь", detail: "Замороженная смесь 400 г", price: 149, image: photo("photo-1540420773420-3366772f4999", 500), category: "Овощи", qty: 1, unit: "уп.", calories: 55, protein: 3, fat: 0.5, carbs: 10 },
  { id: "yogurt", name: "Йогурт натуральный", detail: "Стаканчик или банка 350 г", price: 99, image: photo("photo-1488477181946-6428a0291777", 500), category: "Молочные продукты", qty: 1, unit: "шт.", calories: 75, protein: 5, fat: 3, carbs: 7 },
  { id: "pasta", name: "Макароны", detail: "Пачка 450 г", price: 89, image: photo("photo-1551183053-bf91a1d81141", 500), category: "Макароны", qty: 1, unit: "уп.", calories: 350, protein: 12, fat: 1.5, carbs: 72 },
  { id: "rice", name: "Рис", detail: "Пачка 800 г", price: 109, image: photo("photo-1516684732162-798a0062be99", 500), category: "Крупы", qty: 1, unit: "уп.", calories: 360, protein: 7, fat: 0.7, carbs: 80 },
  { id: "milk", name: "Молоко", detail: "Пакет 1 л", price: 99, image: photo("photo-1563636619-e9143da7973b", 500), category: "Молочные продукты", qty: 1, unit: "л", calories: 60, protein: 3, fat: 3.2, carbs: 4.7 },
  { id: "minced", name: "Фарш", detail: "Охлаждённый, 400 г", price: 239, image: photo("photo-1607623814075-e51df1bdc82f", 500), category: "Мясо", qty: 1, unit: "уп.", calories: 250, protein: 17, fat: 20, carbs: 0 },
  { id: "fish", name: "Филе белой рыбы", detail: "Замороженное, 400 г", price: 299, image: photo("photo-1519708227418-c8fd9a32b7a2", 500), category: "Рыба", qty: 1, unit: "уп.", calories: 100, protein: 20, fat: 2, carbs: 0 },
  { id: "apples", name: "Яблоки", detail: "Около 1 кг", price: 119, image: photo("photo-1560806887-1e4cd0b6cbd6", 500), category: "Фрукты", qty: 1, unit: "кг", calories: 52, protein: 0.3, fat: 0.2, carbs: 14 },
  { id: "bananas", name: "Бананы", detail: "Связка около 1 кг", price: 129, image: photo("photo-1571771894821-ce9b6c11b08e", 500), category: "Фрукты", qty: 1, unit: "кг", calories: 89, protein: 1.1, fat: 0.3, carbs: 23 },
  { id: "cucumber", name: "Огурцы", detail: "Около 500 г", price: 89, image: photo("photo-1604977042946-1eecc30f269e", 500), category: "Овощи", qty: 1, unit: "уп.", calories: 15, protein: 0.7, fat: 0.1, carbs: 3.6 },
  { id: "onion", name: "Лук", detail: "Сетка или несколько штук", price: 49, image: photo("photo-1508747703725-719777637510", 500), category: "Овощи", qty: 1, unit: "уп.", calories: 40, protein: 1.1, fat: 0.1, carbs: 9 },
  { id: "carrot", name: "Морковь", detail: "Пакет 1 кг", price: 59, image: photo("photo-1445282768818-728615cc910a", 500), category: "Овощи", qty: 1, unit: "кг", calories: 41, protein: 0.9, fat: 0.2, carbs: 10 },
  { id: "butter", name: "Сливочное масло", detail: "Пачка 180 г", price: 149, image: photo("photo-1589985270826-4b7bb135bc9d", 500), category: "Молочные продукты", qty: 1, unit: "шт.", calories: 717, protein: 0.9, fat: 81, carbs: 0.1 },
  { id: "sourcream", name: "Сметана", detail: "Баночка 300 г", price: 89, image: photo("photo-1550583724-b2692b85b150", 500), category: "Молочные продукты", qty: 1, unit: "шт.", calories: 206, protein: 2.8, fat: 20, carbs: 3.2 },
  { id: "beans", name: "Фасоль консервированная", detail: "Банка 400 г", price: 99, image: photo("photo-1515543904379-3d7573263c7b", 500), category: "Крупы", qty: 1, unit: "банка", calories: 110, protein: 7, fat: 0.5, carbs: 20 },
  { id: "tuna", name: "Тунец консервированный", detail: "Банка 185 г", price: 179, image: photo("photo-1534483509719-3feaee7c30da", 500), category: "Рыба", qty: 1, unit: "банка", calories: 116, protein: 26, fat: 1, carbs: 0 },
  { id: "dumplings", name: "Пельмени", detail: "Пачка 800 г", price: 249, image: photo("photo-1562967914-608f82629710", 500), category: "Пельмени", qty: 1, unit: "уп.", calories: 260, protein: 11, fat: 12, carbs: 25 },
  { id: "cutlets", name: "Котлеты замороженные", detail: "Пачка 400 г", price: 229, image: photo("photo-1607623814075-e51df1bdc82f", 500), category: "Полуфабрикаты", qty: 1, unit: "уп.", calories: 240, protein: 14, fat: 16, carbs: 10 },
  { id: "pizza", name: "Пицца замороженная", detail: "Одна пицца 300–400 г", price: 249, image: photo("photo-1513104890138-7c749659a591", 500), category: "Полуфабрикаты", qty: 1, unit: "шт.", calories: 260, protein: 11, fat: 10, carbs: 30 },
  { id: "mushrooms", name: "Шампиньоны", detail: "Упаковка 400 г", price: 139, image: photo("photo-1504545102780-26774c1bb073", 500), category: "Грибы", qty: 1, unit: "уп.", calories: 22, protein: 3, fat: 0.3, carbs: 3.3 },
  { id: "garlic", name: "Чеснок", detail: "Одна головка", price: 39, image: photo("photo-1540148426945-6cf22a6b2383", 500), category: "Овощи", qty: 1, unit: "шт.", calories: 149, protein: 6.4, fat: 0.5, carbs: 33 },
  { id: "sauce", name: "Томатный соус", detail: "Банка или упаковка 350 г", price: 99, image: photo("photo-1472476443507-c7a5948772fc", 500), category: "Соусы", qty: 1, unit: "шт.", calories: 75, protein: 2, fat: 1, carbs: 14 },
  { id: "oil", name: "Растительное масло", detail: "Бутылка 0,5 л", price: 119, image: photo("photo-1474979266404-7eaacbcd87c5", 500), category: "Соусы", qty: 1, unit: "бут.", calories: 884, protein: 0, fat: 100, carbs: 0 },
  { id: "cottage", name: "Творог", detail: "Пачка 200 г", price: 109, image: photo("photo-1488477181946-6428a0291777", 500), category: "Молочные продукты", qty: 1, unit: "шт.", calories: 121, protein: 17, fat: 5, carbs: 3 },
  { id: "granola", name: "Гранола", detail: "Пачка 300 г", price: 169, image: photo("photo-1517673132405-a56a62b18caf", 500), category: "Крупы", qty: 1, unit: "уп.", calories: 450, protein: 10, fat: 18, carbs: 64 },
  { id: "juice", name: "Сок", detail: "Пакет 1 л", price: 119, image: photo("photo-1600271886742-f049cd451bba", 500), category: "Напитки", qty: 1, unit: "пакет", calories: 45, protein: 0.5, fat: 0.1, carbs: 10.5 },
  { id: "cookies", name: "Печенье", detail: "Пачка 250 г", price: 99, image: photo("photo-1499636136210-6f4ee915583e", 500), category: "Сладости", qty: 1, unit: "уп.", calories: 480, protein: 6, fat: 20, carbs: 68 },
  { id: "nuts", name: "Ореховая смесь", detail: "Пачка 100 г", price: 149, image: photo("photo-1508061253366-f7da158b6d46", 500), category: "Снеки", qty: 1, unit: "уп.", calories: 600, protein: 20, fat: 54, carbs: 20 },
  { id: "soy", name: "Соевый соус", detail: "Бутылка 150 мл", price: 99, image: photo("photo-1472476443507-c7a5948772fc", 500), category: "Соусы", qty: 1, unit: "бут.", calories: 53, protein: 8, fat: 0, carbs: 5 },
  { id: "sausage", name: "Сосиски", detail: "Упаковка 400 г", price: 169, image: photo("photo-1524438418049-ab2acb7aa48f", 500), category: "Колбасы", qty: 1, unit: "уп.", calories: 270, protein: 12, fat: 24, carbs: 2 },
  { id: "lettuce", name: "Салатные листья", detail: "Пакет 100 г", price: 99, image: photo("photo-1540420773420-3366772f4999", 500), category: "Овощи", qty: 1, unit: "уп.", calories: 15, protein: 1.4, fat: 0.2, carbs: 2.9 },
  { id: "instant-noodles", name: "Лапша быстрого приготовления", detail: "Пачка или стакан 70–90 г", price: 69, image: photo("photo-1569718212165-3a8278d5f624", 500), category: "Готовая еда", qty: 1, unit: "шт.", calories: 440, protein: 9, fat: 18, carbs: 60 },
  { id: "chebupeli", name: "Чебупели", detail: "Замороженная упаковка 300–400 г", price: 199, image: photo("photo-1601050690597-df0568f70950", 500), category: "Полуфабрикаты", qty: 1, unit: "уп.", calories: 280, protein: 10, fat: 17, carbs: 21 },
  { id: "nuggets", name: "Куриные наггетсы", detail: "Замороженная упаковка 300–400 г", price: 229, image: photo("photo-1562967914-608f82629710", 500), category: "Полуфабрикаты", qty: 1, unit: "уп.", calories: 270, protein: 15, fat: 16, carbs: 18 },
  { id: "ready-pasta", name: "Готовая паста", detail: "Охлаждённая порция 250–300 г", price: 219, image: photo("photo-1551183053-bf91a1d81141", 500), category: "Готовая еда", qty: 1, unit: "шт.", calories: 190, protein: 8, fat: 7, carbs: 24 },
  { id: "peanut-butter", name: "Арахисовая паста", detail: "Банка 300 г", price: 229, image: photo("photo-1505576633757-0ac1084af824", 500), category: "Сладости", qty: 1, unit: "банка", calories: 590, protein: 25, fat: 50, carbs: 20 },
  { id: "greek-yogurt", name: "Греческий йогурт", detail: "Баночка 300 г", price: 139, image: photo("photo-1488477181946-6428a0291777", 500), category: "Молочные продукты", qty: 1, unit: "шт.", calories: 110, protein: 10, fat: 5, carbs: 4 },
];

const scenarioProductIds: Record<string, string[]> = {
  // Для вечера со снеками — именно снеки и быстрые горячие штуки, не случайные овощи.
  snacks: ["instant-noodles", "chebupeli", "chips", "crackers", "chocolate", "cookies", "drink", "juice", "nuts", "pizza", "nuggets"],
  quick: ["bread", "cheese", "ham", "sausage", "tomato", "cucumber", "tuna", "yogurt", "bananas", "granola", "instant-noodles", "ready-pasta", "chebupeli"],
  day: ["eggs", "oats", "chicken", "potato", "vegetables", "rice", "milk", "pasta", "cottage", "yogurt", "bananas", "apples", "fish", "minced", "cheese", "carrot", "onion", "sourcream", "butter", "sauce"],
  stock: ["pasta", "rice", "chicken", "vegetables", "milk", "eggs", "potato", "onion", "carrot", "minced", "fish", "beans", "dumplings", "cutlets", "apples", "bananas", "butter", "sourcream", "oil", "mushrooms", "cottage", "granola", "bread", "cheese", "oats", "greek-yogurt"],
  mass: ["chicken", "minced", "eggs", "rice", "pasta", "oats", "milk", "cottage", "greek-yogurt", "bananas", "peanut-butter", "nuts", "potato", "cheese", "fish", "beans", "bread", "butter"],
  balanced: ["chicken", "fish", "eggs", "rice", "oats", "potato", "vegetables", "tomato", "cucumber", "apples", "bananas", "greek-yogurt", "cottage", "beans", "olive-oil"].filter((id) => id !== "olive-oil"),
  "no-cook": ["ready-pasta", "dumplings", "chebupeli", "nuggets", "pizza", "tuna", "bread", "cheese", "ham", "yogurt", "greek-yogurt", "bananas", "apples", "chips", "drink"],
};

const recipes: Recipe[] = [
  { id: "cheese-toast", title: "Горячие тосты с сыром", scenario: "snacks", time: "10 минут", prepTime: "4 мин", cookTime: "6 мин", difficulty: "Легко", image: photo("photo-1525351484163-7529414344d8"), servings: 2, ingredients: [{ productId: "bread", amount: "4 ломтика" }, { productId: "cheese", amount: "80 г" }, { productId: "tomato", amount: "½ шт. по желанию" }], steps: ["Нарежь хлеб ломтиками толщиной около 1–1,5 см. Если используешь помидор, нарежь его тонкими кружочками.", "Разложи сыр на двух ломтиках хлеба. Добавь помидор и накрой оставшимися ломтиками.", "Разогрей сухую сковороду на среднем огне. Положи тосты и слегка прижми лопаткой.", "Обжаривай по 2–3 минуты с каждой стороны до золотистой корочки и расплавленного сыра. Подавай горячими."], tips: ["На слабом или среднем огне сыр успеет расплавиться, а хлеб не сгорит.", "Можно приготовить в тостере-гриле или духовке при 190 °C."], substitutions: ["Вместо ветчины можно добавить грибы или листья салата.", "Подойдёт любой хорошо плавящийся сыр."] },
  { id: "snack-board", title: "Быстрая тарелка к фильму", scenario: "snacks", time: "5 минут", prepTime: "5 мин", cookTime: "0 мин", difficulty: "Очень легко", image: photo("photo-1547592180-85f173990554"), servings: 2, ingredients: [{ productId: "cheese", amount: "80 г" }, { productId: "crackers", amount: "½ пачки" }, { productId: "apples", amount: "1 шт." }, { productId: "nuts", amount: "горсть" }], steps: ["Вымой яблоко и обсуши его. Нарежь тонкими дольками.", "Сыр нарежь небольшими ломтиками или кубиками.", "Разложи на большой тарелке крекеры, сыр, яблоко и орехи отдельными группами.", "Поставь тарелку на стол сразу перед подачей, чтобы крекеры оставались хрустящими."], tips: ["Не выкладывай всё слишком плотно: так удобнее брать кусочки.", "Если орехи не подходят, увеличь количество яблока или крекеров."], substitutions: ["Яблоко можно заменить бананом.", "Вместо крекеров подойдут хлебцы."] },
  { id: "chips-dip", title: "Чипсы с быстрым йогуртовым дипом", scenario: "snacks", time: "5 минут", prepTime: "5 мин", cookTime: "0 мин", difficulty: "Очень легко", image: photo("photo-1566478989037-eec170784d0b"), servings: 2, ingredients: [{ productId: "chips", amount: "1 пачка" }, { productId: "yogurt", amount: "100 г" }, { productId: "garlic", amount: "¼ зубчика по желанию" }], steps: ["Переложи натуральный йогурт в небольшую миску.", "Если используешь чеснок, очень мелко натри или измельчи небольшой кусочек и вмешай в йогурт.", "Приправь дип солью и перцем, если они есть дома. Перемешай.", "Подавай дип рядом с чипсами, не смешивая заранее, чтобы они не размокли."], tips: ["Дай соусу постоять 2–3 минуты, чтобы вкус чеснока раскрылся.", "Не добавляй много чеснока сразу — начни с маленького количества."], substitutions: ["Йогурт можно заменить сметаной.", "Вместо чеснока подойдут сушёные травы."] },
  { id: "hot-sandwich", title: "Горячие бутерброды с ветчиной", scenario: "quick", time: "12 минут", prepTime: "4 мин", cookTime: "8 мин", difficulty: "Легко", image: photo("photo-1525351484163-7529414344d8"), servings: 2, ingredients: [{ productId: "bread", amount: "4 ломтика" }, { productId: "ham", amount: "4 ломтика" }, { productId: "cheese", amount: "80 г" }, { productId: "tomato", amount: "1 шт." }], steps: ["Разогрей духовку до 190 °C или сковороду на среднем огне.", "Нарежь помидор тонкими кружочками, сыр — ломтиками.", "На каждый кусок хлеба положи ветчину, помидор и сыр.", "Запекай 6–8 минут до расплавления сыра. На сковороде готовь под крышкой на слабом огне.", "Дай бутербродам постоять минуту и подавай."], tips: ["Если хлеб быстро темнеет, убавь нагрев.", "Сыр сверху помогает удержать начинку."], substitutions: ["Ветчину можно заменить сосиской или тунцом.", "Помидор можно не добавлять."] },
  { id: "tuna-salad", title: "Салат с тунцом за 7 минут", scenario: "quick", time: "7 минут", prepTime: "7 мин", cookTime: "0 мин", difficulty: "Легко", image: photo("photo-1540420773420-3366772f4999"), servings: 2, ingredients: [{ productId: "tuna", amount: "1 банка" }, { productId: "tomato", amount: "1 шт." }, { productId: "cucumber", amount: "1 шт." }, { productId: "lettuce", amount: "½ упаковки" }], steps: ["Вымой овощи и салатные листья. Обсуши листья бумажным полотенцем.", "Нарежь помидор и огурец небольшими кусочками.", "Открой банку тунца и слей жидкость. Раздели рыбу вилкой на небольшие кусочки.", "Смешай листья, овощи и тунца в миске.", "Добавь немного масла, соли и перца, если они есть. Аккуратно перемешай."], tips: ["Заправляй салат непосредственно перед едой.", "Если тунец в масле, отдельная заправка может не понадобиться."], substitutions: ["Вместо тунца подойдёт варёное яйцо — если оно тебе нравится.", "Листья салата можно заменить капустой."] },
  { id: "yogurt-bowl", title: "Йогурт-боул с фруктами", scenario: "quick", time: "5 минут", prepTime: "5 мин", cookTime: "0 мин", difficulty: "Очень легко", image: photo("photo-1488477181946-6428a0291777"), servings: 1, ingredients: [{ productId: "yogurt", amount: "180 г" }, { productId: "bananas", amount: "½ шт." }, { productId: "granola", amount: "30 г" }], steps: ["Переложи йогурт в глубокую миску.", "Нарежь банан кружочками и разложи поверх йогурта.", "Посыпь гранолой непосредственно перед подачей.", "По желанию добавь немного мёда или корицы, если они есть дома."], tips: ["Гранолу добавляй в последний момент, чтобы она не размокла.", "Для более сытного варианта увеличь порцию йогурта."], substitutions: ["Банан можно заменить яблоком.", "Гранолу можно заменить овсяными хлопьями."] },
  { id: "omelette", title: "Омлет с помидорами", scenario: "day", time: "12 минут", prepTime: "4 мин", cookTime: "8 мин", difficulty: "Легко", image: photo("photo-1525351484163-7529414344d8"), servings: 2, ingredients: [{ productId: "eggs", amount: "4 шт." }, { productId: "milk", amount: "50 мл" }, { productId: "tomato", amount: "1 шт." }, { productId: "cheese", amount: "30 г" }], steps: ["Разбей яйца в миску, добавь молоко и щепотку соли. Взбей вилкой до однородности.", "Помидор нарежь небольшими кубиками. Сыр натри или нарежь тонкими кусочками.", "Разогрей сковороду на слабом или среднем огне и слегка смажь маслом, если оно есть.", "Вылей яичную смесь, равномерно распредели помидор.", "Готовь под крышкой 5–7 минут, пока верх почти полностью не схватится.", "Посыпь сыром, накрой ещё на минуту и выключи нагрев. Раздели на две порции."], tips: ["Не перегревай сковороду: омлет получится нежнее.", "Сними его с огня, пока поверхность ещё чуть влажная — он дойдёт от остаточного тепла."], substitutions: ["Молоко можно не добавлять.", "Помидор можно заменить грибами или овощной смесью."] },
  { id: "chicken-potato", title: "Курица с картофелем на сковороде", scenario: "day", time: "30 минут", prepTime: "10 мин", cookTime: "20 мин", difficulty: "Средне", image: photo("photo-1604503468506-a8da13d82791"), servings: 2, ingredients: [{ productId: "chicken", amount: "300 г" }, { productId: "potato", amount: "350 г" }, { productId: "onion", amount: "½ шт." }, { productId: "vegetables", amount: "150 г" }], steps: ["Куриное филе обсуши и нарежь небольшими кусочками. Картофель очисти и нарежь кубиками.", "Лук очисти и мелко нарежь. Подготовь овощную смесь.", "Разогрей сковороду с небольшим количеством масла. Обжарь курицу 4–5 минут, помешивая.", "Добавь лук и готовь ещё 2 минуты.", "Добавь картофель и примерно 100 мл воды. Накрой крышкой и туши 12–15 минут, периодически помешивая.", "Добавь овощную смесь, посоли и поперчи. Готовь ещё 5 минут до мягкости картофеля и полной готовности курицы."], tips: ["Нарезай картофель одинаковыми кубиками, чтобы он приготовился равномерно.", "Если жидкость испарилась раньше времени, добавь ещё немного воды."], substitutions: ["Куриное филе можно заменить индейкой.", "Овощную смесь можно заменить морковью и горошком."] },
  { id: "pasta-chicken", title: "Паста с курицей в томатном соусе", scenario: "day", time: "25 минут", prepTime: "8 мин", cookTime: "17 мин", difficulty: "Легко", image: photo("photo-1551183053-bf91a1d81141"), servings: 2, ingredients: [{ productId: "pasta", amount: "180 г" }, { productId: "chicken", amount: "220 г" }, { productId: "sauce", amount: "150 г" }, { productId: "cheese", amount: "30 г" }], steps: ["Поставь воду для пасты. Когда закипит, посоли и отвари макароны по времени на упаковке до состояния al dente.", "Пока варится паста, нарежь курицу небольшими кусочками.", "Обжарь курицу на сковороде с небольшим количеством масла 6–8 минут до полной готовности.", "Добавь томатный соус и 2–3 столовые ложки воды от пасты. Перемешай и прогрей 2–3 минуты.", "Переложи пасту в соус, перемешай и прогрей ещё минуту.", "Разложи по тарелкам и посыпь тёртым сыром."], tips: ["Не промывай пасту после варки — крахмал помогает соусу держаться.", "Проверь готовность самого толстого кусочка курицы: внутри не должно оставаться сырого мяса."], substitutions: ["Курицу можно заменить фаршем.", "Вместо томатного соуса подойдёт пассата или протёртые томаты."] },
  { id: "rice-veg", title: "Рис с овощами и яйцом", scenario: "day", time: "20 минут", prepTime: "5 мин", cookTime: "15 мин", difficulty: "Легко", image: photo("photo-1516684732162-798a0062be99"), servings: 2, ingredients: [{ productId: "rice", amount: "150 г" }, { productId: "vegetables", amount: "200 г" }, { productId: "eggs", amount: "2 шт." }], steps: ["Промой рис до более прозрачной воды и отвари согласно инструкции на упаковке.", "Разогрей сковороду, добавь овощную смесь и готовь 6–8 минут до мягкости.", "Сдвинь овощи к краю сковороды. В свободную часть разбей яйца и быстро перемешай лопаткой.", "Добавь готовый рис и аккуратно перемешай с овощами и яйцом.", "Приправь солью и перцем. Если есть соевый соус, добавь немного и прогрей ещё минуту."], tips: ["Удобнее использовать заранее сваренный и охлаждённый рис.", "Не клади слишком много соуса, чтобы рис не стал мокрым."], substitutions: ["Яйцо можно исключить и добавить фасоль.", "Овощную смесь можно заменить свежими овощами."] },
  { id: "fish-potato", title: "Рыба с картофелем в духовке", scenario: "day", time: "35 минут", prepTime: "10 мин", cookTime: "25 мин", difficulty: "Средне", image: photo("photo-1519708227418-c8fd9a32b7a2"), servings: 2, ingredients: [{ productId: "fish", amount: "300 г" }, { productId: "potato", amount: "300 г" }, { productId: "sourcream", amount: "2 ст. л." }], steps: ["Разогрей духовку до 190 °C. Картофель нарежь тонкими дольками.", "Выложи картофель в форму, добавь соль, перец и немного масла. Запекай 15 минут.", "Рыбу обсуши, проверь на наличие костей и нарежь порционными кусками.", "Достань форму, положи рыбу поверх картофеля и смажь сметаной.", "Верни форму в духовку ещё на 10–15 минут, пока рыба не станет непрозрачной и легко не разделится вилкой."], tips: ["Время зависит от толщины филе: тонкие кусочки приготовятся быстрее.", "Не передерживай рыбу, чтобы она не стала сухой."], substitutions: ["Сметану можно заменить натуральным йогуртом.", "Белую рыбу можно заменить другой рыбой с похожей толщиной филе."] },
  { id: "dumplings", title: "Пельмени со сметаной", scenario: "stock", time: "15 минут", prepTime: "2 мин", cookTime: "13 мин", difficulty: "Очень легко", image: photo("photo-1562967914-608f82629710"), servings: 2, ingredients: [{ productId: "dumplings", amount: "400 г" }, { productId: "sourcream", amount: "3 ст. л." }], steps: ["Налей в кастрюлю достаточно воды, доведи до кипения и посоли.", "Опусти пельмени в кипящую воду и сразу аккуратно перемешай, чтобы они не прилипли ко дну.", "После всплытия вари столько, сколько указано на упаковке, обычно ещё 5–7 минут.", "Достань шумовкой, дай воде стечь и подавай со сметаной."], tips: ["Ориентируйся на инструкцию производителя: время у разных пельменей отличается.", "Не заполняй кастрюлю пельменями слишком плотно."], substitutions: ["Вместо сметаны можно использовать сливочное масло или йогурт."] },
  { id: "meat-sauce-pasta", title: "Макароны с мясным соусом", scenario: "stock", time: "30 минут", prepTime: "8 мин", cookTime: "22 мин", difficulty: "Средне", image: photo("photo-1551183053-bf91a1d81141"), servings: 3, ingredients: [{ productId: "pasta", amount: "250 г" }, { productId: "minced", amount: "250 г" }, { productId: "sauce", amount: "180 г" }, { productId: "onion", amount: "½ шт." }], steps: ["Поставь воду для макарон и отвари их согласно инструкции.", "Мелко нарежь лук. Разогрей сковороду с небольшим количеством масла.", "Обжарь лук 2 минуты, добавь фарш и разбивай комочки лопаткой.", "Готовь фарш до полной готовности, затем добавь томатный соус.", "Протуши соус 5–7 минут. При необходимости добавь немного воды от пасты.", "Смешай с макаронами или подай соус сверху."], tips: ["Фарш должен полностью приготовиться; не оставляй внутри розовых сырых участков.", "Небольшое количество воды от пасты помогает сделать соус однороднее."], substitutions: ["Фарш можно заменить мелко нарезанными грибами.", "Вместо макарон подойдёт рис."] },
  { id: "chicken-rice", title: "Курица с рисом на несколько порций", scenario: "stock", time: "30 минут", prepTime: "8 мин", cookTime: "22 мин", difficulty: "Легко", image: photo("photo-1516684732162-798a0062be99"), servings: 3, ingredients: [{ productId: "chicken", amount: "350 г" }, { productId: "rice", amount: "180 г" }, { productId: "carrot", amount: "1 шт." }, { productId: "onion", amount: "½ шт." }], steps: ["Промой рис. Нарежь курицу небольшими кусочками, морковь натри, лук измельчи.", "В глубокой сковороде или кастрюле обжарь курицу 4–5 минут.", "Добавь лук и морковь, готовь ещё 3 минуты.", "Всыпь рис, перемешай и залей горячей водой так, чтобы она покрывала рис примерно на 1 см.", "Накрой крышкой и готовь на слабом огне 15–18 минут, пока рис не впитает воду.", "Выключи нагрев и оставь под крышкой ещё на 5 минут. Перемешай перед подачей."], tips: ["Не перемешивай рис слишком часто во время томления.", "Если рис ещё твёрдый, добавь немного горячей воды и продолжи готовить."], substitutions: ["Курицу можно заменить фаршем.", "Морковь можно заменить овощной смесью."] },
  { id: "cutlet-potato", title: "Котлеты с картофельным гарниром", scenario: "stock", time: "25 минут", prepTime: "5 мин", cookTime: "20 мин", difficulty: "Легко", image: photo("photo-1547592180-85f173990554"), servings: 2, ingredients: [{ productId: "cutlets", amount: "2–4 шт. по упаковке" }, { productId: "potato", amount: "350 г" }, { productId: "butter", amount: "10 г" }], steps: ["Очисти картофель, нарежь крупными кусочками и положи в кастрюлю с холодной водой.", "Доведи до кипения, посоли и вари 15–20 минут до мягкости.", "Котлеты приготовь способом, указанным на упаковке: на сковороде или в духовке.", "Слей воду с картофеля, добавь сливочное масло и разомни толкушкой.", "Проверь готовность котлет и подавай с пюре."], tips: ["Не размораживай полуфабрикаты, если производитель не рекомендует это.", "Проверь время и температуру на упаковке котлет."], substitutions: ["Вместо пюре можно подать рис или овощи."] },

  { id: "fried-potatoes", title: "Жареная картошка с румяной корочкой", scenario: "all", time: "25 минут", prepTime: "7 мин", cookTime: "18 мин", difficulty: "Легко", image: photo("photo-1518977676601-b53f82aba655"), servings: 2, ingredients: [{ productId: "potato", amount: "500 г" }, { productId: "oil", amount: "1–2 ст. л. (если есть дома, необязательно)" }], steps: ["Картофель вымой, очисти по желанию и нарежь брусочками примерно одинаковой толщины.", "Промой нарезанный картофель от лишнего крахмала и очень хорошо обсуши полотенцем — так корочка получится лучше.", "Разогрей широкую сковороду с маслом на среднем огне. Выложи картофель одним слоем или готовь двумя партиями.", "Первые 5–6 минут не перемешивай часто: дай нижней стороне подрумяниться.", "Переворачивай лопаткой каждые 3–4 минуты и готовь ещё 10–12 минут до мягкости внутри и золотистой корочки.", "Посоли в конце приготовления и сразу подавай."], tips: ["Не накрывай сковороду крышкой, иначе картофель будет скорее тушиться.", "Если картофеля много, жарь партиями — переполненная сковорода не даст корочки."], substitutions: ["Можно добавить лук, если он есть в корзине.", "Для более хрустящего варианта используй чуть меньше картофеля за одну партию."] },
  { id: "boiled-potatoes", title: "Отварная картошка с маслом", scenario: "all", time: "25 минут", prepTime: "5 мин", cookTime: "20 мин", difficulty: "Очень легко", image: photo("photo-1518977676601-b53f82aba655"), servings: 2, ingredients: [{ productId: "potato", amount: "500 г" }, { productId: "butter", amount: "20 г (по желанию)" }], steps: ["Картофель вымой. Небольшие клубни можно варить целиком, крупные разрежь на одинаковые части.", "Положи картофель в кастрюлю и залей холодной водой так, чтобы она покрывала его на 2–3 см.", "Доведи до кипения, посоли воду и вари на умеренном огне 15–20 минут.", "Проверь готовность ножом: он должен легко входить в середину картофеля.", "Слей воду, верни кастрюлю на выключенную тёплую конфорку на 30 секунд, чтобы испарилась лишняя влага.", "Добавь сливочное масло, аккуратно встряхни кастрюлю и подавай."], tips: ["Старайся выбирать клубни примерно одного размера.", "Не переваривай картофель: он начнёт разваливаться."], substitutions: ["Сливочное масло можно заменить растительным.", "Если масла нет, подай с солью и зеленью, если она есть."] },
  { id: "baked-potatoes", title: "Картошка дольками в духовке", scenario: "all", time: "40 минут", prepTime: "8 мин", cookTime: "32 мин", difficulty: "Легко", image: photo("photo-1518977676601-b53f82aba655"), servings: 2, ingredients: [{ productId: "potato", amount: "500 г" }, { productId: "oil", amount: "1 ст. л. (если есть дома, необязательно)" }], steps: ["Разогрей духовку до 210 °C. Картофель хорошо вымой и нарежь дольками одинаковой толщины.", "Обсуши дольки, переложи в миску, добавь масло, соль и специи, если они есть.", "Перемешай, чтобы масло тонко покрыло каждый кусочек.", "Разложи картофель на противне в один слой с небольшими промежутками.", "Запекай 30–35 минут, один раз перевернув в середине приготовления.", "Достань, когда снаружи появится золотистая корочка, а внутри картофель станет мягким."], tips: ["Не накладывай дольки друг на друга — они будут париться.", "Для более хрустящей корочки можно замочить нарезанный картофель в холодной воде на 15 минут и тщательно обсушить."], substitutions: ["Растительное масло можно заменить небольшим количеством растопленного сливочного.", "Можно добавить чеснок или паприку, если они есть и нравятся."] },
  { id: "mashed-potatoes", title: "Картофельное пюре", scenario: "all", time: "30 минут", prepTime: "7 мин", cookTime: "23 мин", difficulty: "Легко", image: photo("photo-1505685296765-3a2736de412f"), servings: 2, ingredients: [{ productId: "potato", amount: "500 г" }, { productId: "milk", amount: "80 мл (по желанию)" }, { productId: "butter", amount: "25 г (по желанию)" }], steps: ["Очисти картофель и нарежь одинаковыми кусочками.", "Залей холодной водой, доведи до кипения, посоли и вари 15–20 минут до полной мягкости.", "Подогрей молоко отдельно, но не доводи до бурного кипения.", "Слей воду и разомни картофель толкушкой до исчезновения крупных комков.", "Добавь сливочное масло, затем постепенно влей тёплое молоко, каждый раз перемешивая.", "Попробуй, при необходимости добавь соль и подавай горячим."], tips: ["Не используй блендер: пюре может стать клейким.", "Добавляй молоко постепенно — нужная густота зависит от сорта картофеля."], substitutions: ["Молоко можно заменить водой от варки.", "Сливочное масло можно исключить или заменить растительным."] },
  { id: "chicken-potato-veg", title: "Курица с картошкой и овощами на сковороде", scenario: "all", time: "35 минут", prepTime: "10 мин", cookTime: "25 мин", difficulty: "Средне", image: photo("photo-1604503468506-a8da13d82791"), servings: 2, ingredients: [{ productId: "chicken", amount: "300 г" }, { productId: "potato", amount: "350 г" }, { productId: "vegetables", amount: "200 г" }, { productId: "oil", amount: "1 ст. л. (если есть дома, необязательно)" }], steps: ["Нарежь курицу небольшими кусочками, картофель — кубиками около 1,5 см.", "Разогрей сковороду с маслом. Обжарь курицу 5–6 минут, помешивая, чтобы кусочки побелели со всех сторон.", "Добавь картофель и 80–100 мл воды. Накрой крышкой и туши 12–15 минут, периодически перемешивая.", "Добавь овощную смесь, соль и перец по вкусу.", "Готовь без крышки ещё 7–9 минут, пока овощи прогреются, картофель станет мягким, а курица полностью приготовится.", "Проверь самый крупный кусочек курицы: внутри не должно быть сырого мяса. Подавай горячим."], tips: ["Нарезай картофель небольшими кубиками, чтобы он успел приготовиться вместе с курицей.", "Если сковорода сухая, добавь пару ложек воды."], substitutions: ["Куриное филе можно заменить бедром без кости.", "Замороженную смесь можно заменить свежими овощами, которые есть в корзине."] },
  { id: "chebupeli-oven", title: "Чебупели в духовке", scenario: "all", time: "20 минут", prepTime: "2 мин", cookTime: "18 мин", difficulty: "Очень легко", image: photo("photo-1601050690597-df0568f70950"), servings: 2, ingredients: [{ productId: "chebupeli", amount: "1 упаковка" }], steps: ["Разогрей духовку до температуры, указанной на упаковке продукта.", "Застели противень пергаментом и разложи чебупели с промежутками.", "Запекай столько, сколько рекомендует производитель, обычно около 15–20 минут.", "В середине приготовления переверни изделия, если это рекомендует упаковка.", "Проверь, что начинка полностью прогрелась, и подавай горячими."], tips: ["У разных производителей время и температура могут отличаться — инструкция на упаковке важнее усреднённого времени."], substitutions: ["Можно приготовить на сковороде или в аэрогриле, если это допускает инструкция производителя."] },
  { id: "instant-noodles", title: "Лапша быстрого приготовления", scenario: "all", time: "5–7 минут", prepTime: "1 мин", cookTime: "4–6 мин", difficulty: "Очень легко", image: photo("photo-1569718212165-3a8278d5f624"), servings: 1, ingredients: [{ productId: "instant-noodles", amount: "1 пачка или стакан" }], steps: ["Вскипяти воду.", "Переложи лапшу и приправы в глубокую миску или используй стакан, если он предназначен для заваривания.", "Залей кипятком до отметки или согласно инструкции на упаковке.", "Накрой и подожди время, указанное производителем, обычно 3–5 минут.", "Осторожно перемешай и проверь температуру перед едой."], tips: ["Не заливай лапшу в упаковке, если она не предназначена для заваривания.", "Время приготовления зависит от конкретного продукта."], substitutions: ["Можно добавить яйцо или сыр, если они есть в корзине и нравятся."] },
  { id: "fried-eggs-toast", title: "Яичница с тостами", scenario: "all", time: "10 минут", prepTime: "2 мин", cookTime: "8 мин", difficulty: "Очень легко", image: photo("photo-1525351484163-7529414344d8"), servings: 1, ingredients: [{ productId: "eggs", amount: "2 шт." }, { productId: "bread", amount: "2 ломтика" }, { productId: "oil", amount: "1 ч. л. (если есть дома, необязательно)" }], steps: ["Разогрей сковороду на среднем огне. Если используешь масло, добавь совсем немного.", "Аккуратно разбей яйца на сковороду, стараясь не повредить желтки.", "Готовь 2–4 минуты до желаемой степени прожарки. Если хочешь полностью схватившийся белок, накрой крышкой на минуту.", "Пока яйца готовятся, подсуши хлеб на сухой сковороде или в тостере.", "Посоли по вкусу и подавай яичницу с тостами."], tips: ["Для жидкого желтка сними яйца раньше; для полностью приготовленного подержи под крышкой."], substitutions: ["Хлеб можно не добавлять или заменить лепёшкой.", "Яичницу можно сделать без масла на хорошей антипригарной сковороде."] },
  { id: "pasta-cheese", title: "Макароны с сыром", scenario: "all", time: "15 минут", prepTime: "3 мин", cookTime: "12 мин", difficulty: "Очень легко", image: photo("photo-1551183053-bf91a1d81141"), servings: 2, ingredients: [{ productId: "pasta", amount: "180 г" }, { productId: "cheese", amount: "80 г" }, { productId: "butter", amount: "10 г (по желанию)" }], steps: ["Вскипяти воду в кастрюле, посоли и засыпь макароны.", "Вари по инструкции на упаковке до готовности, затем оставь пару ложек воды от варки.", "Слей воду, верни макароны в горячую кастрюлю.", "Добавь натёртый сыр и сливочное масло по желанию.", "Влей немного воды от макарон и перемешивай, пока сыр не расплавится и не покроет пасту.", "Сразу подавай, пока блюдо горячее."], tips: ["Добавляй воду от пасты понемногу — так сырный соус получится кремовым."], substitutions: ["Можно использовать любой сыр, который хорошо плавится.", "Для более сытного варианта добавь курицу, если она есть в корзине."] },
  { id: "chicken-vegetables", title: "Курица с овощами на сковороде", scenario: "all", time: "20 минут", prepTime: "5 мин", cookTime: "15 мин", difficulty: "Легко", image: photo("photo-1604503468506-a8da13d82791"), servings: 2, ingredients: [{ productId: "chicken", amount: "300 г" }, { productId: "vegetables", amount: "250 г" }, { productId: "oil", amount: "1 ч. л. (если есть дома, необязательно)" }], steps: ["Нарежь курицу небольшими одинаковыми кусочками.", "Разогрей сковороду. Добавь масло, если используешь, и выложи курицу.", "Обжаривай 5–7 минут, периодически перемешивая, пока кусочки не побелеют снаружи.", "Добавь овощную смесь и 2–3 столовые ложки воды.", "Накрой крышкой и готовь 7–9 минут, затем сними крышку и выпари лишнюю влагу.", "Разрежь самый крупный кусочек курицы и проверь, что внутри он полностью приготовился. Приправь и подавай."], tips: ["Не делай кусочки курицы слишком крупными — так они приготовятся равномерно."], substitutions: ["Овощную смесь можно заменить любыми овощами из корзины.", "Курицу можно заменить индейкой."] },
  { id: "fried-dumplings", title: "Жареные пельмени", scenario: "all", time: "15 минут", prepTime: "2 мин", cookTime: "13 мин", difficulty: "Легко", image: photo("photo-1562967914-608f82629710"), servings: 2, ingredients: [{ productId: "dumplings", amount: "400 г" }, { productId: "oil", amount: "1 ст. л. (если есть дома, необязательно)" }], steps: ["Разогрей сковороду на среднем огне. Добавь немного масла, если используешь.", "Выложи замороженные пельмени в один слой и обжаривай 3–4 минуты до золотистой нижней стороны.", "Осторожно влей примерно 100 мл воды и сразу накрой крышкой.", "Готовь 5–7 минут, пока вода почти полностью не испарится. Ориентируйся также на инструкцию на упаковке.", "Сними крышку и обжарь ещё 1–2 минуты, чтобы вернуть корочку.", "Проверь, что начинка полностью прогрелась, и подавай."], tips: ["Не клади пельмени слишком плотно — лучше готовить партиями.", "Будь осторожен при добавлении воды в горячую сковороду."], substitutions: ["Можно приготовить обычным способом в кипящей воде, если так удобнее."] },
  { id: "oatmeal-banana", title: "Овсянка с бананом", scenario: "all", time: "10 минут", prepTime: "2 мин", cookTime: "8 мин", difficulty: "Очень легко", image: photo("photo-1517673132405-a56a62b18caf"), servings: 1, ingredients: [{ productId: "oats", amount: "50 г" }, { productId: "milk", amount: "200 мл" }, { productId: "bananas", amount: "½–1 шт." }], steps: ["Налей молоко в небольшую кастрюлю и нагрей на среднем огне.", "Всыпь овсяные хлопья и перемешай.", "Вари 5–7 минут на слабом огне, периодически помешивая, пока каша не станет нужной густоты.", "Сними с огня и дай постоять минуту.", "Нарежь банан кружочками и добавь сверху."], tips: ["Если каша получается слишком густой, добавь немного молока или воды.", "Время варки зависит от типа хлопьев."], substitutions: ["Молоко можно заменить водой.", "Банан можно заменить яблоком, если оно есть в корзине."] },
  { id: "tuna-sandwich", title: "Бутерброды с тунцом", scenario: "all", time: "8 минут", prepTime: "6 мин", cookTime: "2 мин", difficulty: "Очень легко", image: photo("photo-1525351484163-7529414344d8"), servings: 2, ingredients: [{ productId: "tuna", amount: "½–1 банка" }, { productId: "bread", amount: "4 ломтика" }, { productId: "cheese", amount: "40 г (по желанию)" }], steps: ["Слей жидкость из банки тунца и разомни рыбу вилкой.", "Подсуши хлеб на сухой сковороде или в тостере.", "Распредели тунец по ломтикам хлеба.", "Если хочешь горячий вариант, добавь немного сыра и прогрей бутерброды под крышкой 1–2 минуты.", "Подавай сразу."], tips: ["Не добавляй слишком много начинки, чтобы бутерброды было удобно есть."], substitutions: ["Можно добавить огурец или помидор, если они есть в корзине.", "Сыр необязателен."] },
  { id: "nuggets-potato", title: "Наггетсы с картошкой", scenario: "all", time: "25 минут", prepTime: "5 мин", cookTime: "20 мин", difficulty: "Легко", image: photo("photo-1562967914-608f82629710"), servings: 2, ingredients: [{ productId: "nuggets", amount: "250 г" }, { productId: "potato", amount: "300 г" }, { productId: "oil", amount: "1 ч. л. (если есть дома, необязательно)" }], steps: ["Разогрей духовку до температуры, указанной на упаковке наггетсов, обычно около 200 °C.", "Картофель нарежь небольшими дольками, обсуши и слегка смажь маслом по желанию.", "Разложи картофель на противне и запекай 10 минут.", "Добавь наггетсы на тот же противень, если для них подходит такой режим, и готовь ещё столько, сколько указано на упаковке.", "Проверь готовность картофеля и наггетсов по инструкции производителя. Подавай горячими."], tips: ["У разных наггетсов время приготовления отличается — ориентируйся на упаковку.", "Если картофель нарезан крупно, начни запекать его раньше."], substitutions: ["Вместо картофеля можно подать овощную смесь, если она есть в корзине."] },

];

const money = (value: number) => `${Math.round(value).toLocaleString("ru-RU")} ₽`;

function Icon({ name, size = 20 }: { name: string; size?: number }) {
  const paths: Record<string, ReactNode> = {
    arrow: <>
<path d="M5 12h14" />
<path d="m12 5 7 7-7 7" />
</>,
    users: <>
<path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
<circle cx="10" cy="7" r="4" />
<path d="M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
</>,
    store: <>
<path d="M3 10h18" />
<path d="m5 10 1-6h12l1 6" />
<path d="M5 10v10h14V10" />
<path d="M9 20v-6h6v6" />
</>,
    sparkles: <>
<path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z" />
<path d="m19 14 1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3Z" />
</>,
    check: <path d="m5 12 4 4L19 6" />,
    back: <>
<path d="m15 18-6-6 6-6" />
<path d="M9 12h11" />
</>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />,
    moon: <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5 8.5 8.5 0 1 0 20.5 14.5Z" />,
    sun: <>
<circle cx="12" cy="12" r="4" />
<path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
</>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name] ?? paths.sparkles}</svg>;
}

export default function Home() {
  const [step, setStep] = useState(1);
  const [budget, setBudget] = useState(5000);
  const [customBudget, setCustomBudget] = useState("");
  const [people, setPeople] = useState(2);
  const [selectedStores, setSelectedStores] = useState<string[]>([]);
  const [anyStore, setAnyStore] = useState(true);
  const [likedFoods, setLikedFoods] = useState<string[]>([]);
  const [dislikedFoods, setDislikedFoods] = useState<string[]>([]);
  const [preferencesFinished, setPreferencesFinished] = useState(false);
  const [scenario, setScenario] = useState("day");
  const [productQty, setProductQty] = useState<Record<string, number>>({});
  const [included, setIncluded] = useState<string[]>([]);
  const [extraProductIds, setExtraProductIds] = useState<string[]>([]);
  const [openRecipe, setOpenRecipe] = useState<string | null>(null);
  const [dark, setDark] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [profileEnabled, setProfileEnabled] = useState(false);
  const [profile, setProfile] = useState<Profile>({ sex: "female", age: "", height: "", weight: "", activity: "1.4", goal: "maintenance" });

  const palette = palettes[0];
  const [primary, secondary, tint, accent, ink] = palette.colors;
  const colors = {
    primary,
    secondary,
    tint,
    accent,
    ink,
    bg: dark ? ink : "#f8f7f5",
    card: dark ? "#211d25" : "#ffffff",
    text: dark ? "#f6f0f6" : "#28332d",
    muted: dark ? "#b8adb9" : "#89948a",
    soft: dark ? "#302936" : tint,
    border: dark ? "#45394a" : "#e6e9e3",
    buttonText: "#ffffff",
  };
  const themeStyle = {
    "--app-primary": colors.primary,
    "--app-secondary": colors.secondary,
    "--app-tint": colors.tint,
    "--app-accent": colors.accent,
    "--app-ink": colors.ink,
    "--app-bg": colors.bg,
    "--app-card": colors.card,
    "--app-text": colors.text,
    "--app-muted": colors.muted,
    "--app-soft": colors.soft,
    "--app-border": colors.border,
  } as CSSProperties;

  const products = useMemo(() => {
    const ids = scenarioProductIds[scenario] ?? scenarioProductIds.day;
    const surplusExtras = profileEnabled && profile.goal === "surplus" && scenario === "day"
      ? ["peanut-butter", "nuts", "greek-yogurt"]
      : [];
    const allowedIds = new Set([...ids, ...surplusExtras, ...extraProductIds]);
    return baseProducts
      .filter((product) => allowedIds.has(product.id) && !dislikedFoods.includes(product.category))
      .sort((a, b) => Number(likedFoods.includes(b.category)) - Number(likedFoods.includes(a.category)));
  }, [scenario, dislikedFoods, likedFoods, profileEnabled, profile.goal, extraProductIds]);
  const activeProducts = products.filter((product) => included.includes(product.id));
  const total = activeProducts.reduce((sum, product) => sum + product.price * (productQty[product.id] ?? product.qty) * people / 2, 0);
  const budgetLimit = budget + 100;
  const overBudget = total > budgetLimit;

  const selectedRecipeData = useMemo(() => {
    const scenarioRecipes = [...recipes].sort((a, b) => Number(b.scenario === scenario) - Number(a.scenario === scenario));
    const activeIds = new Set(activeProducts.map((product) => product.id));
    const available: Recipe[] = [];
    const missing: { recipe: Recipe; missing: Ingredient[]; missingCost: number }[] = [];
    for (const recipe of scenarioRecipes) {
      const categories = recipe.ingredients.map((ingredient) => baseProducts.find((product) => product.id === ingredient.productId)?.category).filter(Boolean) as string[];
      if (categories.some((category) => dislikedFoods.includes(category))) continue;
      const absent = recipe.ingredients.filter((ingredient) => {
        const amount = ingredient.amount.toLowerCase();
        const optional = amount.includes("по желанию") || amount.includes("необязательно") || amount.includes("если есть дома");
        return !activeIds.has(ingredient.productId) && !optional;
      });
      if (absent.length === 0) available.push(recipe);
      else if (absent.length <= 2) missing.push({ recipe, missing: absent, missingCost: absent.reduce((sum, item) => sum + (baseProducts.find((product) => product.id === item.productId)?.price ?? 0), 0) * people / 2 });
    }
    // Сначала показываем блюда, которые используют больше уже выбранных продуктов.
    // Так курица + картофель + овощи поднимут наверх полноценное блюдо, а не просто гарнир.
    available.sort((a, b) => {
      const scoreA = a.ingredients.filter((ingredient) => activeIds.has(ingredient.productId)).length;
      const scoreB = b.ingredients.filter((ingredient) => activeIds.has(ingredient.productId)).length;
      return scoreB - scoreA || Number(b.scenario === scenario) - Number(a.scenario === scenario);
    });
    missing.sort((a, b) => a.missing.length - b.missing.length || Number(b.recipe.scenario === scenario) - Number(a.recipe.scenario === scenario));
    return { available, missing };
  }, [scenario, activeProducts, dislikedFoods, people]);

  const dailyCalories = useMemo(() => {
    const age = Number(profile.age);
    const height = Number(profile.height);
    const weight = Number(profile.weight);
    if (!profileEnabled || !age || !height || !weight || age < 14 || height < 100 || weight < 25) return null;
    const bmr = 10 * weight + 6.25 * height - 5 * age + (profile.sex === "male" ? 5 : -161);
    const maintenance = bmr * Number(profile.activity);
    const factor = profile.goal === "deficit" ? 0.85 : profile.goal === "surplus" ? 1.1 : 1;
    return Math.round(maintenance * factor);
  }, [profile, profileEnabled]);

  const mutedStyle = { color: colors.muted } as CSSProperties;
  const cardStyle = { background: colors.card, color: colors.text, border: `1px solid ${colors.border}`, boxShadow: dark ? "none" : "0 5px 20px rgba(30,40,30,.035)" } as CSSProperties;
  const buttonStyle = { background: colors.primary, color: colors.buttonText } as CSSProperties;
  const softStyle = { background: colors.soft, color: colors.primary } as CSSProperties;
  const smallLabel = { color: colors.muted } as CSSProperties;

  const toggleStore = (name: string) => {
    setAnyStore(false);
    setSelectedStores((current) => current.includes(name) ? current.filter((item) => item !== name) : [...current, name]);
  };
  const toggleFood = (name: string, kind: "like" | "dislike") => {
    if (kind === "like") {
      setLikedFoods((current) => current.includes(name) ? current.filter((item) => item !== name) : [...current, name]);
      setDislikedFoods((current) => current.filter((item) => item !== name));
    } else {
      setDislikedFoods((current) => current.includes(name) ? current.filter((item) => item !== name) : [...current, name]);
      setLikedFoods((current) => current.filter((item) => item !== name));
    }
  };
  const chooseScenario = (id: string) => {
    setScenario(id);
    const ids = scenarioProductIds[id] ?? scenarioProductIds.day;
    const surplusExtras = profileEnabled && profile.goal === "surplus" && id === "day"
      ? ["peanut-butter", "nuts", "greek-yogurt"]
      : [];
    const allowedIds = new Set([...ids, ...surplusExtras]);
    const available = baseProducts
      .filter((product) => allowedIds.has(product.id) && !dislikedFoods.includes(product.category))
      .sort((a, b) => {
        const likeDifference = Number(likedFoods.includes(b.category)) - Number(likedFoods.includes(a.category));
        if (likeDifference) return likeDifference;
        // При наборе массы приоритет — полноценные белковые и энергоёмкие продукты,
        // а не салатные добавки.
        if (id === "mass" || (profileEnabled && profile.goal === "surplus")) {
          const priority = ["chicken", "minced", "eggs", "cottage", "greek-yogurt", "rice", "pasta", "oats", "milk", "peanut-butter", "nuts", "potato", "fish", "cheese", "bananas", "vegetables"];
          return priority.indexOf(a.id) - priority.indexOf(b.id);
        }
        return 0;
      });
    const initial: string[] = [];
    let sum = 0;
    for (const product of available) {
      if (sum + product.price <= budget + 100) {
        initial.push(product.id);
        sum += product.price;
      }
    }
    // Не оставляем пустую корзину при очень маленьком бюджете: выбираем один
    // самый уместный товар для сценария и честно показываем превышение, если оно есть.
    if (initial.length === 0 && available.length > 0) initial.push(available[0].id);
    setIncluded(initial);
    setExtraProductIds([]);
    setProductQty(Object.fromEntries(available.map((product) => [product.id, product.qty])));
    setOpenRecipe(null);
    setStep(5);
  };
  const goBack = () => setStep((current) => Math.max(1, current - 1));
  const setProfileField = <K extends keyof Profile>(key: K, value: Profile[K]) => setProfile((current) => ({ ...current, [key]: value }));
  const getRecipeNutrition = (recipe: Recipe) => {
    const totals = recipe.ingredients.reduce((acc, ingredient) => {
      const product = baseProducts.find((item) => item.id === ingredient.productId);
      if (!product) return acc;
      const amount = ingredient.amount.toLowerCase();
      const numberMatch = amount.match(/(\d+(?:[.,]\d+)?|½|¼)/);
      let quantity = numberMatch ? (numberMatch[1] === "½" ? 0.5 : numberMatch[1] === "¼" ? 0.25 : Number(numberMatch[1].replace(",", "."))) : 1;
      let grams = 100;
      if (amount.includes("г")) grams = quantity;
      else if (amount.includes("мл")) grams = quantity;
      else if (amount.includes("ст. л")) grams = quantity * 15;
      else if (amount.includes("ч. л")) grams = quantity * 5;
      else if (amount.includes("ломтик")) grams = quantity * 30;
      else if (amount.includes("горсть")) grams = 30;
      else if (amount.includes("яйц") || ingredient.productId === "eggs") grams = quantity * 50;
      else if (ingredient.productId === "banana") grams = quantity * 120;
      else if (ingredient.productId === "tomato" || ingredient.productId === "apples") grams = quantity * 140;
      else if (ingredient.productId === "garlic") grams = quantity * 5;
      else if (amount.includes("шт")) grams = quantity * 100;
      else if (amount.includes("банка")) grams = quantity * 150;
      else if (amount.includes("упаков")) grams = quantity * 100;
      const factor = grams / 100;
      return {
        calories: acc.calories + product.calories * factor,
        protein: acc.protein + product.protein * factor,
        fat: acc.fat + product.fat * factor,
        carbs: acc.carbs + product.carbs * factor,
      };
    }, { calories: 0, protein: 0, fat: 0, carbs: 0 });
    return {
      calories: Math.round(totals.calories / recipe.servings),
      protein: Math.round(totals.protein / recipe.servings),
      fat: Math.round(totals.fat / recipe.servings),
      carbs: Math.round(totals.carbs / recipe.servings),
    };
  };

  const progress = [1, 2, 3, 4, 5, 6];

  return (
    <main className={`tototam-app ${dark ? "tototam-dark" : ""}`} style={themeStyle}>
      <div className="mx-auto min-h-screen w-full max-w-2xl px-4 pb-8 pt-5 sm:px-6">
        <header className="mb-6 flex items-center justify-between gap-3">
          <button onClick={() => setStep(1)} className="flex items-center gap-2 text-left" aria-label="На главную">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl text-xl" style={{ background: colors.soft }}>🌿</span>
            <span>
<span className="block text-xl font-black tracking-tight">tototam<span style={{ color: colors.primary }}>.</span>
</span>
<span className="block text-[10px]" style={mutedStyle}>Давай без лишней суеты</span>
</span>
          </button>
          <div className="flex items-center gap-2">
            <button onClick={() => setDark((value) => !value)} className="flex h-10 items-center gap-2 rounded-full border px-3 text-xs font-semibold" style={{ borderColor: colors.border, background: colors.card, color: colors.text }} aria-label="Переключить тему">
              <Icon name={dark ? "sun" : "moon"} size={16} />{dark ? "Светлая" : "Тёмная"}
            </button>

          </div>
        </header>

        <div className="mb-7 flex items-center gap-1.5" aria-label={`Шаг ${step} из 6`}>
          {progress.map((item) => <div key={item} className="h-1.5 flex-1 rounded-full" style={{ background: item <= step ? colors.primary : colors.border }} />)}
        </div>

        {step > 1 && <button onClick={goBack} className="mb-4 inline-flex items-center gap-1 text-sm font-semibold" style={{ color: colors.primary }}>
<Icon name="back" size={17} /> Назад</button>}

        {step === 1 && (
          <section className="animate-[fadeIn_.3s_ease]">
            <div className="relative mb-5 min-h-[245px] overflow-hidden rounded-[28px] bg-cover bg-center p-6 text-white sm:min-h-[280px]" style={{ backgroundImage: `linear-gradient(0deg,rgba(15,25,18,.75),rgba(15,25,18,.05) 75%),url('${photo("photo-1547592180-85f173990554", 1100)}')` }}>
              <div className="absolute right-5 top-5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur">Планируем без стресса</div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="mb-2 text-xs font-bold uppercase tracking-[.18em] text-white/80">Привет! Я tototam</div>
                <h1 className="max-w-md text-3xl font-black leading-tight sm:text-4xl">Помогу собрать еду под твой план и бюджет.</h1>
                <p className="mt-2 max-w-sm text-sm text-white/85">Хоть полноценная закупка, хоть чипсы к вечеру — всё окей.</p>
              </div>
            </div>

            <div className="rounded-[24px] p-5" style={cardStyle}>
              <div className="flex items-center justify-between gap-3">
<div>
<div className="text-sm font-bold">Какой бюджет?</div>
<p className="mt-1 text-xs" style={mutedStyle}>Это ориентир, а не строгий лимит.</p>
</div>
<span className="rounded-full px-3 py-1.5 text-sm font-bold" style={softStyle}>{money(customBudget ? Number(customBudget) || budget : budget)}</span>
</div>
              <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-4">{budgetOptions.map((amount) => <button key={amount} onClick={() => { setBudget(amount); setCustomBudget(""); }} className="rounded-xl border px-2 py-3 text-xs font-bold transition" style={{ borderColor: budget === amount && !customBudget ? colors.primary : colors.border, background: budget === amount && !customBudget ? colors.soft : colors.card, color: colors.text }}>{amount >= 1000 ? `${amount / 1000} тыс.` : `${amount} ₽`}</button>)}</div>
              <label className="mt-4 block text-xs font-semibold" style={mutedStyle}>Или введи свою сумму</label>
              <input type="number" min="1" value={customBudget} onChange={(event) => { setCustomBudget(event.target.value); if (Number(event.target.value) > 0) setBudget(Number(event.target.value)); }} placeholder="Например, 750" className="mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none" style={{ background: colors.bg, borderColor: colors.border, color: colors.text }} />
            </div>

            <div className="mt-4 rounded-[24px] p-5" style={cardStyle}>
              <div className="flex items-center gap-2 text-sm font-semibold">
<Icon name="users" size={18} />Сколько нас?</div>
              <div className="mt-4 flex items-center justify-between">
<span className="text-sm" style={mutedStyle}>Человек за столом</span>
<div className="flex items-center gap-4">
<button onClick={() => setPeople(Math.max(1, people - 1))} className="h-10 w-10 rounded-full text-xl" style={softStyle}>−</button>
<span className="min-w-5 text-center text-xl font-bold">{people}</span>
<button onClick={() => setPeople(Math.min(12, people + 1))} className="h-10 w-10 rounded-full text-xl" style={softStyle}>+</button>
</div>
</div>
            </div>

            {people === 1 && <div className="mt-4 rounded-[24px] p-5" style={cardStyle}>
              <div className="flex items-start justify-between gap-3">
<div>
<div className="text-sm font-bold">Хочешь учитывать КБЖУ?</div>
<p className="mt-1 text-xs leading-relaxed" style={mutedStyle}>Необязательно. Можно пропустить — приложение будет работать как обычно.</p>
</div>
<button onClick={() => setProfileOpen((value) => !value)} className="rounded-full px-3 py-2 text-xs font-bold" style={softStyle}>{profileOpen ? "Скрыть" : "Настроить"}</button>
</div>
              {profileOpen && <div className="mt-4 space-y-3">
                <div className="grid grid-cols-2 gap-2">
<button onClick={() => setProfileField("sex", "female")} className="rounded-xl border p-3 text-sm font-semibold" style={{ borderColor: profile.sex === "female" ? colors.primary : colors.border, background: profile.sex === "female" ? colors.soft : colors.card }}>Женский</button>
<button onClick={() => setProfileField("sex", "male")} className="rounded-xl border p-3 text-sm font-semibold" style={{ borderColor: profile.sex === "male" ? colors.primary : colors.border, background: profile.sex === "male" ? colors.soft : colors.card }}>Мужской</button>
</div>
                <div className="grid grid-cols-3 gap-2">{([["age", "Возраст", "лет"], ["height", "Рост", "см"], ["weight", "Вес", "кг"]] as const).map(([key, label, unit]) => <label key={key} className="text-xs font-semibold" style={mutedStyle}>{label}<input type="number" value={profile[key]} onChange={(event) => setProfileField(key, event.target.value)} placeholder={unit} className="mt-1 w-full rounded-xl border px-2 py-3 text-sm" style={{ background: colors.bg, borderColor: colors.border, color: colors.text }} />
</label>)}</div>
                <label className="block text-xs font-semibold" style={mutedStyle}>Активность<select value={profile.activity} onChange={(event) => setProfileField("activity", event.target.value)} className="mt-1 w-full rounded-xl border px-3 py-3 text-sm" style={{ background: colors.bg, borderColor: colors.border, color: colors.text }}>
<option value="1.2">Почти нет активности</option>
<option value="1.4">Небольшая активность</option>
<option value="1.6">Средняя активность</option>
<option value="1.75">Высокая активность</option>
<option value="1.9">Очень высокая активность</option>
</select>
</label>
                <div className="grid grid-cols-3 gap-2">{([{ id: "deficit", title: "Дефицит" }, { id: "maintenance", title: "Поддержание" }, { id: "surplus", title: "Набор" }] as const).map((goal) => <button key={goal.id} onClick={() => setProfileField("goal", goal.id)} className="rounded-xl border p-2 text-xs font-semibold" style={{ borderColor: profile.goal === goal.id ? colors.primary : colors.border, background: profile.goal === goal.id ? colors.soft : colors.card }}>{goal.title}</button>)}</div>
                <button onClick={() => { const age = Number(profile.age), height = Number(profile.height), weight = Number(profile.weight); if (age >= 14 && height >= 100 && weight >= 25) { setProfileEnabled(true); setProfileOpen(false); } }} className="w-full rounded-xl py-3 text-sm font-bold" style={buttonStyle}>Сохранить профиль</button>
                <button onClick={() => { setProfileEnabled(false); setProfileOpen(false); }} className="w-full py-2 text-xs" style={mutedStyle}>Пропустить, без КБЖУ</button>
              </div>}
              {profileEnabled && people === 1 && dailyCalories && <p className="mt-3 rounded-xl p-3 text-xs" style={softStyle}>Профиль включён · ориентир {dailyCalories.toLocaleString("ru-RU")} ккал в день</p>}
            </div>}

            <button onClick={() => setStep(2)} className="mt-6 flex w-full items-center justify-center gap-3 rounded-2xl py-4 text-base font-bold shadow-sm transition active:scale-[.99]" style={buttonStyle}>Лесгоу! <Icon name="arrow" size={19} />
</button>
          </section>
        )}

        {step === 2 && (
          <section className="animate-[fadeIn_.3s_ease]">
            <div className="mb-6">
<div className="mb-2 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold" style={softStyle}>
<Icon name="store" size={15} />Где покупаем?</div>
<h1 className="text-3xl font-bold leading-tight sm:text-4xl">Выбираем<br />магазины</h1>
<p className="mt-2 text-sm" style={mutedStyle}>Можно выбрать несколько или довериться мне.</p>
</div>
            <button onClick={() => { setAnyStore(true); setSelectedStores([]); }} className="mb-4 flex w-full items-center gap-3 rounded-2xl border p-4 text-left transition" style={{ borderColor: anyStore ? colors.primary : colors.border, background: anyStore ? colors.soft : colors.card, color: colors.text }}>
<div className="flex h-11 w-11 items-center justify-center rounded-xl" style={softStyle}>
<Icon name="sparkles" size={22} />
</div>
<div className="flex-1">
<div className="font-semibold">Неважно, ищи где дешевле</div>
<div className="mt-0.5 text-xs" style={mutedStyle}>Пусть победит выгодная корзина</div>
</div>
<div className="flex h-6 w-6 items-center justify-center rounded-full" style={{ background: anyStore ? colors.primary : "transparent", border: anyStore ? "none" : `1px solid ${colors.border}`, color: "white" }}>{anyStore && <Icon name="check" size={15} />}</div>
</button>
            <div className="mb-3 flex items-center justify-between">
<span className="text-sm font-semibold">Или выбери сам</span>
<span className="text-xs" style={mutedStyle}>{selectedStores.length > 0 ? `Выбрано: ${selectedStores.length}` : "Любимые магазины"}</span>
</div>
            <div className="grid grid-cols-2 gap-3">{stores.map((store) => { const selected = selectedStores.includes(store.name); return <button key={store.name} onClick={() => toggleStore(store.name)} className="flex min-h-[76px] items-center gap-3 rounded-2xl border p-3 text-left transition" style={{ ...cardStyle, borderColor: selected ? colors.primary : colors.border, background: selected ? colors.soft : colors.card }}>
<div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl text-xl font-black text-white" style={{ backgroundColor: store.color }}>{store.domain ? <img src={`https://www.google.com/s2/favicons?domain=${store.domain}&sz=128`} alt="" className="h-8 w-8 object-contain" onError={(event) => { event.currentTarget.style.display = "none"; }} /> : store.mark}<span className="sr-only">{store.mark}</span>
</div>
<span className="flex-1 text-sm font-semibold leading-tight">{store.name}</span>
<div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full" style={{ background: selected ? colors.primary : "transparent", border: selected ? "none" : `1px solid ${colors.border}`, color: "white" }}>{selected && <Icon name="check" size={13} />}</div>
</button>; })}</div>
            <p className="mt-4 rounded-2xl p-3 text-xs leading-relaxed" style={{ background: colors.soft, color: colors.muted }}>Пока это выбор предпочтительных сетей. Реальные остатки и сравнение актуальных цен подключим отдельно через доступные каталоги магазинов.</p>
            <button onClick={() => setStep(3)} className="mt-6 flex w-full items-center justify-center gap-3 rounded-2xl py-4 text-base font-bold shadow-sm" style={buttonStyle}>Дальше <Icon name="arrow" size={19} />
</button>
          </section>
        )}

        {step === 3 && (
          <section className="animate-[fadeIn_.3s_ease]">
            {!preferencesFinished ? <>
              <div className="mb-6">
<div className="mb-2 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold" style={softStyle}>
<Icon name="sparkles" size={15} />Немного о вкусах</div>
<h1 className="text-3xl font-bold leading-tight sm:text-4xl">Что будем<br />кушать?</h1>
<p className="mt-2 text-sm" style={mutedStyle}>Отмечай, что любишь и что лучше не предлагать.</p>
</div>
              <div className="mb-4 flex flex-wrap gap-2">
<span className="rounded-full px-3 py-2 text-xs font-semibold" style={softStyle}>❤️ Люблю: {likedFoods.length}</span>
<span className="rounded-full bg-[#f5e9e5] px-3 py-2 text-xs font-semibold text-[#a36f63]">👎 Не люблю: {dislikedFoods.length}</span>
</div>
              <div className="grid grid-cols-2 gap-3">{foodOptions.map((food) => { const liked = likedFoods.includes(food.name); const disliked = dislikedFoods.includes(food.name); return <div key={food.name} className="relative overflow-hidden rounded-[22px] transition" style={{ ...cardStyle, outline: liked ? `2px solid ${colors.primary}` : disliked ? "2px solid #d49a89" : "none" }}>
<button onClick={() => toggleFood(food.name, "like")} className="block w-full text-left">
<div className="relative h-28 bg-cover bg-center sm:h-32" style={{ backgroundImage: `url("${food.image}")` }}>
<div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
<div className="absolute bottom-2.5 left-3 right-3 flex items-end justify-between">
<span className="text-sm font-bold text-white drop-shadow">{food.name}</span>{liked && <span className="flex h-7 w-7 items-center justify-center rounded-full text-white" style={{ background: colors.primary }}>
<Icon name="check" size={16} />
</span>}</div>
</div>
</button>
<div className="flex items-center justify-between gap-1 px-2 py-2.5 sm:px-3">
<button onClick={() => toggleFood(food.name, "like")} className="rounded-full px-2 py-1.5 text-[11px] font-semibold transition sm:px-3 sm:text-xs" style={liked ? softStyle : { background: colors.bg, color: colors.muted }}>❤️ Люблю</button>
<button onClick={() => toggleFood(food.name, "dislike")} className={`rounded-full px-2 py-1.5 text-[11px] font-semibold transition sm:px-3 sm:text-xs ${disliked ? "bg-[#f5e9e5] text-[#a36f63]" : ""}`} style={!disliked ? { background: colors.bg, color: colors.muted } : undefined}>👎 Не моё</button>
</div>
</div>; })}</div>
              <button onClick={() => setPreferencesFinished(true)} className="mt-6 flex w-full items-center justify-center gap-3 rounded-2xl py-4 text-base font-bold shadow-sm" style={buttonStyle}>Всё, я определился! <Icon name="arrow" size={19} />
</button>
              <button onClick={() => { setLikedFoods([]); setDislikedFoods([]); setPreferencesFinished(true); }} className="mt-3 w-full py-3 text-sm font-medium" style={mutedStyle}>Пока пропустить, ем почти всё</button>
            </> : <div className="rounded-[28px] p-6 shadow-sm sm:p-8" style={cardStyle}>
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl" style={softStyle}>
<Icon name="sparkles" size={30} />
</div>
<h1 className="text-3xl font-bold">Отлично!</h1>
<p className="mt-2 text-sm leading-relaxed" style={mutedStyle}>Я буду учитывать ваши предпочтения при подборе еды.</p>
              <div className="mt-6 space-y-4">
<div className="rounded-2xl p-4" style={softStyle}>
<div className="mb-2 text-xs font-bold uppercase tracking-wide">❤️ Что нравится</div>
<p className="text-sm leading-relaxed">{likedFoods.length ? likedFoods.join(", ") : "Пока без предпочтений"}</p>
</div>
<div className="rounded-2xl bg-[#faf0ed] p-4 text-[#8e6259]">
<div className="mb-2 text-xs font-bold uppercase tracking-wide">👎 Что не предлагать</div>
<p className="text-sm leading-relaxed">{dislikedFoods.length ? dislikedFoods.join(", ") : "Ничего не исключаем"}</p>
</div>
</div>
              <div className="mt-5 rounded-2xl p-4 text-sm leading-relaxed" style={{ background: colors.bg, color: colors.muted }}>
<div className="font-semibold" style={{ color: colors.primary }}>Наш план</div>
<div className="mt-2">💰 Бюджет: {money(budget)}</div>
<div className="mt-1">👥 Человек: {people}</div>
<div className="mt-1">🛒 Магазины: {anyStore ? "Ищем где выгоднее" : selectedStores.join(", ") || "Не выбраны"}</div>
</div>
              <button onClick={() => setStep(4)} className="mt-6 w-full rounded-2xl py-4 font-bold" style={buttonStyle}>Подобрать еду <Icon name="arrow" size={19} />
</button>
            </div>}
          </section>
        )}

        {step === 4 && <section className="animate-[fadeIn_.3s_ease]">
<div className="mb-5">
<div className="mb-2 text-xs font-bold" style={{ color: colors.primary }}>🍽️ ВЫБИРАЕМ ПЛАН</div>
<h1 className="text-3xl font-bold">Что сегодня затеваем?</h1>
<p className="mt-2 text-sm" style={smallLabel}>Подстрою набор продуктов под задачу и бюджет.</p>
</div>
<div className="grid grid-cols-2 gap-3">{scenarios.map((item) => <button key={item.id} onClick={() => chooseScenario(item.id)} className="overflow-hidden rounded-[22px] text-left transition active:scale-[.99]" style={cardStyle}>
<div className="relative h-32 bg-cover bg-center" style={{ backgroundImage: `linear-gradient(0deg,rgba(0,0,0,.48),transparent),url('${item.image}')` }}>
<span className="absolute bottom-2 left-3 text-2xl">{item.emoji}</span>
</div>
<div className="p-3">
<b className="text-sm leading-tight">{item.title}</b>
<p className="mt-1 text-xs" style={smallLabel}>{item.desc}</p>
</div>
</button>)}</div>
<p className="mt-4 rounded-2xl p-3 text-xs leading-relaxed" style={{ background: colors.soft, color: colors.muted }}>Можно выбрать даже просто снеки к вечеру — не обязательно собирать большую закупку. Если бюджета не хватает на весь выбранный период, я покажу честную ограниченную корзину.</p>
</section>}

        {step === 5 && <section className="animate-[fadeIn_.3s_ease]">
<div className="mb-5">
<div className="mb-2 text-xs font-bold" style={{ color: colors.primary }}>🧺 ПРЕДВАРИТЕЛЬНАЯ КОРЗИНА</div>
<h1 className="text-3xl font-bold">Что положим?</h1>
<p className="mt-2 text-sm" style={smallLabel}>{scenarios.find((item) => item.id === scenario)?.title} · на {people} чел.</p>
</div>
          <div className="mb-4 rounded-2xl p-3 text-xs leading-relaxed" style={{ background: "#fff1d9", color: "#805d2d" }}>Демо-каталог: цены примерные, не из каталогов магазинов. Фото иллюстрируют продукт или блюдо; это пока не фотографии конкретных упаковок.</div>
          <div className="mb-4 flex flex-wrap gap-2">{products.map((product) => <button key={product.id} onClick={() => setIncluded((current) => current.includes(product.id) ? current.filter((id) => id !== product.id) : [...current, product.id])} className="rounded-full border px-3 py-2 text-xs font-semibold" style={{ borderColor: included.includes(product.id) ? colors.primary : colors.border, background: included.includes(product.id) ? colors.soft : colors.card, color: colors.text }}>{included.includes(product.id) ? "✓ " : "+ "}{product.name}</button>)}</div>
          <div className="space-y-3">{products.map((product) => { const qty = productQty[product.id] ?? product.qty; const checked = included.includes(product.id); const linePrice = product.price * qty * people / 2; return <div key={product.id} className="flex gap-3 rounded-2xl p-3 transition" style={{ ...cardStyle, opacity: checked ? 1 : .58 }}>
<img src={product.image} alt={product.name} className="h-20 w-20 shrink-0 rounded-xl object-cover" onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = photo("photo-1547592180-85f173990554", 500); }} />
<div className="min-w-0 flex-1">
<div className="flex items-start justify-between gap-2">
<b className="text-sm">{product.name}</b>
<button aria-label={checked ? "Убрать из корзины" : "Добавить в корзину"} onClick={() => setIncluded((current) => checked ? current.filter((id) => id !== product.id) : [...current, product.id])} className="text-lg">{checked ? "☑️" : "⬜"}</button>
</div>
<p className="mt-1 text-xs" style={smallLabel}>{product.detail}</p>{profileEnabled && people === 1 && <p className="mt-1 text-[10px]" style={smallLabel}>На 100 г: {product.calories} ккал · Б {product.protein} · Ж {product.fat} · У {product.carbs}</p>}<div className="mt-2 flex items-center justify-between gap-2">
<b className="text-sm">{money(linePrice)}</b>
<div className="flex items-center gap-3">
<button onClick={() => setProductQty((current) => ({ ...current, [product.id]: Math.max(1, qty - 1) }))} className="h-7 w-7 rounded-full" style={softStyle}>−</button>
<span className="text-sm font-semibold">{qty} {product.unit}</span>
<button onClick={() => setProductQty((current) => ({ ...current, [product.id]: qty + 1 }))} className="h-7 w-7 rounded-full" style={softStyle}>+</button>
</div>
</div>
</div>
</div>; })}</div>
          <div className="sticky bottom-3 mt-5 rounded-2xl p-4 shadow-lg" style={cardStyle}>
<div className="flex items-center justify-between">
<span className="text-sm" style={smallLabel}>Предварительная сумма</span>
<b className="text-2xl">{money(total)}</b>
</div>
<div className="mt-1 text-xs" style={{ color: overBudget ? "#d97757" : colors.muted }}>{overBudget ? `Выше бюджета с допуском на ${money(total - budgetLimit)}` : total > budget ? `В пределах допуска: бюджет превышен на ${money(total - budget)}` : `В пределах бюджета ${money(budget)}`}</div>
            {scenario === "day" && activeProducts.length < 5 && <p className="mt-2 text-xs" style={{ color: colors.muted }}>Пока корзина небольшая и может не покрыть полноценные завтрак, обед и ужин. Можно добавить продукты вручную.</p>}
            {scenario === "stock" && activeProducts.length < 8 && <p className="mt-2 text-xs" style={{ color: colors.muted }}>Эта корзина пока не выглядит полноценной закупкой на несколько дней. Добавь продукты или увеличь бюджет — я не буду выдавать маленький набор за большую закупку.</p>}
            {profileEnabled && people === 1 && dailyCalories && <div className="mt-3 rounded-xl p-3 text-xs" style={softStyle}>
<b>Ориентир питания: {dailyCalories.toLocaleString("ru-RU")} ккал/день</b>
<div className="mt-1">КБЖУ отдельных продуктов показаны на 100 г. Для точного итога по корзине нужно учитывать фактический вес каждой упаковки.</div>
<p className="mt-1 opacity-75">Это оценка по усреднённым данным продуктов, а не медицинская рекомендация.</p>
</div>}
            <button disabled={!activeProducts.length} onClick={() => { setOpenRecipe(selectedRecipeData.available[0]?.id ?? selectedRecipeData.missing[0]?.recipe.id ?? null); setStep(6); }} className="mt-3 w-full rounded-xl py-3.5 font-bold disabled:opacity-40" style={buttonStyle}>Показать рецепты →</button>
</div>
        </section>}

        {step === 6 && <section className="animate-[fadeIn_.3s_ease]">
<div className="mb-5">
<div className="mb-2 text-xs font-bold" style={{ color: colors.primary }}>👩‍🍳 ИДЕИ ИЗ КОРЗИНЫ</div>
<h1 className="text-3xl font-bold">Что приготовим?</h1>
<p className="mt-2 text-sm" style={smallLabel}>Сначала блюда из того, что уже есть в корзине.</p>
</div>
          {selectedRecipeData.available.length > 0 ? <>
<h2 className="mb-3 text-lg font-bold">Можно приготовить сейчас</h2>
<div className="space-y-4">{selectedRecipeData.available.map((recipe, recipeIndex) => <article key={recipe.id} className="overflow-hidden rounded-[24px]" style={cardStyle}>
<img src={recipe.image} alt={recipe.title} className="h-44 w-full object-cover" onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = photo("photo-1547592180-85f173990554", 900); }} />
<div className="p-4">
<div className="flex items-start justify-between gap-3">
<div>
{recipeIndex === 0 && <span className="mb-1 inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide" style={softStyle}>Мой вариант сегодня</span>}
<h3 className="text-lg font-bold">{recipe.title}</h3>
<p className="mt-1 text-xs" style={smallLabel}>⏱ {recipe.time} · {recipe.difficulty} · {recipe.servings} порц.</p>
</div>
<button onClick={() => setOpenRecipe(openRecipe === recipe.id ? null : recipe.id)} className="shrink-0 rounded-full px-3 py-2 text-sm font-semibold" style={softStyle}>{openRecipe === recipe.id ? "Свернуть" : "Открыть"}</button>
</div>
            {openRecipe === recipe.id && <div className="mt-4">
<div className="grid grid-cols-2 gap-2">
<div className="rounded-xl p-3" style={{ background: colors.bg }}>
<div className="text-[10px] uppercase" style={smallLabel}>Подготовка</div>
<b className="text-sm">{recipe.prepTime}</b>
</div>
<div className="rounded-xl p-3" style={{ background: colors.bg }}>
<div className="text-[10px] uppercase" style={smallLabel}>Готовка</div>
<b className="text-sm">{recipe.cookTime}</b>
</div>
</div>
<b className="mt-4 block text-sm">Ингредиенты</b>{profileEnabled && people === 1 && (() => { const nutrition = getRecipeNutrition(recipe); return <div className="mt-2 rounded-xl p-3 text-xs" style={softStyle}>
<b>Примерно на порцию: {nutrition.calories} ккал</b>
<div className="mt-1">Б {nutrition.protein} г · Ж {nutrition.fat} г · У {nutrition.carbs} г</div>
<div className="mt-1 opacity-75">Оценка по примерным весам ингредиентов.</div>
</div>; })()}<div className="mt-2 space-y-2">{recipe.ingredients.map((ingredient) => { const product = baseProducts.find((item) => item.id === ingredient.productId); return <div key={ingredient.productId} className="flex items-center justify-between gap-3 rounded-xl px-3 py-2 text-xs" style={{ background: colors.soft }}>
<span>{product?.name ?? ingredient.productId}</span>
<b>{ingredient.amount}</b>
</div>; })}</div>
<b className="mt-4 block text-sm">Как готовить</b>
<ol className="mt-2 space-y-3">{recipe.steps.map((text, index) => <li key={`${recipe.id}-${index}`} className="flex gap-3 text-sm leading-relaxed">
<span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white" style={{ background: colors.primary }}>{index + 1}</span>
<span>{text}</span>
</li>)}</ol>
<b className="mt-4 block text-sm">Мои подсказки</b>
<ul className="mt-2 space-y-2">{recipe.tips.map((tip) => <li key={tip} className="text-xs leading-relaxed" style={smallLabel}>• {tip}</li>)}</ul>
<b className="mt-4 block text-sm">Чем заменить</b>
<ul className="mt-2 space-y-2">{recipe.substitutions.map((substitution) => <li key={substitution} className="text-xs leading-relaxed" style={smallLabel}>• {substitution}</li>)}</ul>
</div>}</div>
</article>)}</div>
</> : <div className="rounded-2xl p-4 text-sm" style={cardStyle}>Пока нет рецептов, для которых в корзине есть все ингредиенты. Ниже можно посмотреть, что нужно докупить.</div>}
          {selectedRecipeData.missing.length > 0 && <div className="mt-7">
<h2 className="mb-1 text-lg font-bold">Можно приготовить, если докупить</h2>
<p className="mb-3 text-xs" style={smallLabel}>Показываю недостающие продукты отдельно, чтобы не было сюрпризов.</p>
<div className="space-y-3">{selectedRecipeData.missing.map(({ recipe, missing, missingCost }) => <article key={recipe.id} className="rounded-2xl p-4" style={cardStyle}>
<div className="flex items-start justify-between gap-3">
<div className="flex min-w-0 items-start gap-3"><img src={recipe.image} alt={recipe.title} className="h-16 w-16 shrink-0 rounded-xl object-cover" onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = photo("photo-1547592180-85f173990554", 500); }} /><div><h3 className="font-bold">{recipe.title}</h3>
<p className="mt-1 text-xs" style={smallLabel}>⏱ {recipe.time} · {recipe.difficulty}</p></div></div>
<button onClick={() => setOpenRecipe(openRecipe === recipe.id ? null : recipe.id)} className="shrink-0 rounded-full px-3 py-2 text-xs font-semibold" style={softStyle}>{openRecipe === recipe.id ? "Свернуть" : "Подробнее"}</button>
</div>
<div className="mt-3">
<div className="text-xs font-semibold">Не хватает:</div>
<div className="mt-2 flex flex-wrap gap-2">{missing.map((ingredient) => <span key={ingredient.productId} className="rounded-full px-3 py-1.5 text-xs" style={{ background: colors.soft }}>{baseProducts.find((product) => product.id === ingredient.productId)?.name}</span>)}</div>
<p className="mt-2 text-xs" style={smallLabel}>Ориентировочная стоимость недостающего: {money(missingCost)}</p>
</div>{openRecipe === recipe.id && <div className="mt-3 border-t pt-3" style={{ borderColor: colors.border }}>
<b className="text-sm">Ингредиенты</b>
<div className="mt-2 space-y-1">{recipe.ingredients.map((ingredient) => <p key={ingredient.productId} className="text-xs" style={smallLabel}>{baseProducts.find((product) => product.id === ingredient.productId)?.name}: {ingredient.amount}</p>)}</div>
<b className="mt-3 block text-sm">Шаги приготовления</b>
<ol className="mt-2 space-y-2">{recipe.steps.map((text, index) => <li key={`${recipe.id}-missing-${index}`} className="flex gap-2 text-xs leading-relaxed">
<b style={{ color: colors.primary }}>{index + 1}.</b>
<span>{text}</span>
</li>)}</ol>
</div>}<button onClick={() => { const ids = missing.map((item) => item.productId); setExtraProductIds((current) => Array.from(new Set([...current, ...ids]))); setIncluded((current) => Array.from(new Set([...current, ...ids]))); setProductQty((current) => ({ ...current, ...Object.fromEntries(ids.map((id) => [id, baseProducts.find((product) => product.id === id)?.qty ?? 1])) })); setOpenRecipe(recipe.id); }} className="mt-3 w-full rounded-xl py-2.5 text-xs font-bold" style={buttonStyle}>Добавить недостающие продукты</button>
</article>)}</div>
</div>}
          {selectedRecipeData.available.length === 0 && selectedRecipeData.missing.length === 0 && <p className="mt-4 rounded-2xl p-4 text-sm" style={cardStyle}>Подходящих рецептов пока нет: возможно, некоторые ингредиенты исключены в предпочтениях. Попробуй изменить корзину или предпочтения.</p>}
          {profileEnabled && people === 1 && dailyCalories && <div className="mt-5 rounded-2xl p-4" style={softStyle}>
<b className="text-sm">Твой ориентир на день</b>
<div className="mt-1 text-2xl font-black">{dailyCalories.toLocaleString("ru-RU")} ккал</div>
<p className="mt-1 text-xs leading-relaxed">Расчёт примерный, на основе введённых параметров и выбранной активности. Пищевая ценность рецептов здесь не заменяет индивидуальную консультацию специалиста.</p>
</div>}
          <button onClick={() => setStep(4)} className="mt-5 w-full rounded-2xl py-4 font-bold" style={buttonStyle}>Выбрать другой сценарий</button>
<button onClick={() => { setStep(1); setPreferencesFinished(false); setIncluded([]); setExtraProductIds([]); setOpenRecipe(null); }} className="mt-2 w-full py-3 text-sm" style={smallLabel}>Начать заново</button>
        </section>}

        <footer className="mt-10 pb-4 text-center text-xs" style={{ color: colors.muted }}>tototam. · Давай без лишней суеты.</footer>
      </div>
      <style jsx global>{`
        .tototam-app { min-height: 100vh; background: var(--app-bg); color: var(--app-text); transition: background .2s ease, color .2s ease; }
        .tototam-app * { box-sizing: border-box; }
        .tototam-app input, .tototam-app select, .tototam-app button { font: inherit; }
        .tototam-app button { -webkit-tap-highlight-color: transparent; }
        .tototam-app button:focus-visible, .tototam-app input:focus-visible, .tototam-app select:focus-visible { outline: 2px solid var(--app-primary); outline-offset: 2px; }
        .tototam-app .rounded-2xl, .tototam-app .rounded-\[24px\], .tototam-app .rounded-\[28px\] { transition: border-color .18s ease, background-color .18s ease; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </main>
  );
}
