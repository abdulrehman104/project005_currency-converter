import inquirer from "inquirer";
let currencyRate = {
    USD: 1,
    EUR: 0.91,
    GBP: 0.79,
    JPY: 142.62,
    PKR: 276.52,
    INR: 83.33,
    CAD: 1.32,
    AUD: 1.47,
    NZD: 1.58,
};
const currencyConverter = async () => {
    const converter = await inquirer.prompt([
        {
            type: "list",
            name: "Currency",
            message: "Enter your currency",
            choices: Object.keys(currencyRate),
        },
        {
            type: "input",
            name: "amount",
            message: "Enter your amount",
            validate: (value) => {
                if (isNaN(Number(value))) {
                    return "Invalid Syntax: Enter a valid number.";
                }
                return true;
            },
        },
        {
            type: "list",
            name: "ConvertTo",
            message: "Enter your currency you want to convert",
            choices: Object.keys(currencyRate),
        },
    ]);
    const { Currency, amount, ConvertTo } = converter;
    const convertedAmount = (currencyRate[ConvertTo] / currencyRate[Currency]) * Number(amount);
    console.log(`${amount} ${Currency} = ${convertedAmount.toFixed(2)} ${ConvertTo}`);
};
// currencyConverter();
const main = async () => {
    let again;
    do {
        await currencyConverter();
        const response = await inquirer.prompt([
            {
                type: "confirm",
                name: "again",
                message: "Convert Again?",
            },
        ]);
        again = response.again;
        if (!again) {
            console.log("Thank you for using currency converter");
        }
    } while (again);
};
main();
