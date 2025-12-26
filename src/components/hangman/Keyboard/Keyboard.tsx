import { Key } from "./Key";

const alphabet = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
];

const Keyboard = () => {
    return (
        <div className="flex flex-wrap justify-center max-w-lg mx-auto gap-2.5">
            {alphabet.map((letter) => (
                <Key value={letter} variant="idle" key={letter} />
            ))}
        </div>
    );
};

export { Keyboard };
