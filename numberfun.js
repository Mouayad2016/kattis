const readline = require("readline");
// *** Read user input by readline
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});
// ** Here, I save all inputs to later use them in my code to obtain the number that needs to be handled and extract the first number from the first line;
const inputs = [];
rl.on("line", (input) => {
	inputs.push(input);
}).on("close", () => {
	processInput(inputs);
});
// ** Here i do basic math to determine if the number passed to my funciton are able to produce a third given number
function handleUserInput(fNum, sNum, tNum) {
	let result; // ! Variable for saving results
	let checkDivision; // ! This is only used for checking conditions

	//** List of 2 Lists with one string value to return whether the operation is (Possible) or (Impossible)
	const possible = "Possible";
	const impossible = "Impossible";
	result = fNum + sNum; // ?Addition
	if (result === tNum) return possible;

	result = fNum - sNum; // ?Subtraction
	if (result === tNum) return possible;

	result = sNum - fNum; // ?Reverse subtraction
	if (result === tNum) return possible;

	result = fNum * sNum; // ?Multiplication
	if (result === tNum) return possible;

	result = fNum / sNum; // ?Division
	checkDivision = result * sNum;
	if (result === tNum && checkDivision === fNum) return possible;

	result = sNum / fNum; // ?Reversee division
	checkDivision = result * fNum;
	if (isCorrect(result, tNum) && isCorrect(checkDivision, sNum))
		return possible;

	return impossible;
}
//* This function will return whether our result is equal to the thirdNumber. This should return true or false.
function isCorrect(result, thirdNumber) {
	return result === thirdNumber;
}
function processInput(inputs) {
	//! We get user input without the first item.
	const mathCases = inputs.slice(1);
	//? We loop through the user input as a List without the first element because it is the number of operations not a operation
	for (const i of mathCases) {
		//? We are getting a String "1 2 3". We need to convert it to a List and then to Integer.
		const parts = i.split(" ");
		const numbers = parts.map((str) => Number(str));
		const first = numbers[0];
		const second = numbers[1];
		const third = numbers[2];
		//? And we show our result
		console.log(handleUserInput(first, second, third));
	}
	rl.close();
}
