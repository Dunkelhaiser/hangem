import { faker } from "@faker-js/faker";
import type { Language } from "../languages/alphabets";

const categories = [
    { name: "Animal", generator: () => faker.animal.type() },
    { name: "Product", generator: () => faker.commerce.product() },
    { name: "Month", generator: () => faker.date.month() },
    { name: "Day", generator: () => faker.date.weekday() },
    { name: "Vegetable", generator: () => faker.food.vegetable() },
    { name: "Fruit", generator: () => faker.food.fruit() },
    { name: "Ingredient", generator: () => faker.food.ingredient() },
    { name: "Spice", generator: () => faker.food.spice() },
    { name: "Country", generator: () => faker.location.country() },
    { name: "Continent", generator: () => faker.location.continent() },
    { name: "Direction", generator: () => faker.location.direction() },
    { name: "Unit", generator: () => faker.science.unit().name },
    { name: "Element", generator: () => faker.science.chemicalElement().name },
    { name: "Color", generator: () => faker.color.human() },
    { name: "Music", generator: () => faker.music.genre() },
    { name: "Job", generator: () => faker.person.jobType() },
    { name: "Vehicle", generator: () => faker.vehicle.type() },
    { name: "Adjective", generator: () => faker.word.adjective() },
] as const;

const ukCategories = [
    {
        name: "Тварина",
        words: ["кіт"],
    },
    {
        name: "Місяць",
        words: ["січень"],
    },
    {
        name: "Фрукт",
        words: ["яблуко"],
    },
    {
        name: "Овоч",
        words: ["морква"],
    },
    {
        name: "Країна",
        words: ["Україна", "Польща", "Німеччина", "Франція", "Італія", "Фландрія", "Румунія"],
    },
];

const MAX_ATTEMPTS = 100;

export const generateWord = (playedCombinations?: Set<string>, language: Language = "en") => {
    if (language === "uk") {
        for (let i = 0; i < MAX_ATTEMPTS; i++) {
            const category = ukCategories[Math.floor(Math.random() * ukCategories.length)];
            const word = category.words[Math.floor(Math.random() * category.words.length)];
            const key = `${word.toLowerCase()}:${category.name.toLowerCase()}:${language}`;
            if (!playedCombinations?.has(key)) {
                return { word, category: category.name };
            }
        }
        return null;
    }
    for (let i = 0; i < MAX_ATTEMPTS; i++) {
        const category = faker.helpers.arrayElement(categories);
        const word = category.generator();
        const key = `${word.toLowerCase()}:${category.name.toLowerCase()}:${language}`;

        if (!playedCombinations?.has(key)) {
            return { word, category: category.name };
        }
    }

    return null;
};
