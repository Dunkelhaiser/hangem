import { faker } from "@faker-js/faker";

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

const MAX_ATTEMPTS = 100;

export const generateWord = (playedCombinations?: Set<string>) => {
    for (let i = 0; i < MAX_ATTEMPTS; i++) {
        const category = faker.helpers.arrayElement(categories);
        const word = category.generator();
        const key = `${word.toLowerCase()}:${category.name.toLowerCase()}`;

        if (!playedCombinations?.has(key)) {
            return { word, category: category.name };
        }
    }

    return null;
};
