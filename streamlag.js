const readline = require("readline");
// *** Read user input by readline
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

// ** Here, I save all inputs to later use them in my code;
const inputs = [];

rl.on("line", (input) => {
	inputs.push(input);
}).on("close", () => {
	getInput(inputs);
});

//* countLag shows correct results on samples but seems to be incorrect overall.
//* In this example, we calculate in a different way.
function lagCount(packets) {
	let lagCount = 0; // * We start by setting lagCount to zero, so there is no initial lag

	// * We loop through our packets without any sorting.
	for (const sp of packets) {
		// * We calculate the delay, which is the difference between seconds and packets.
		// * Here sp[0] is second and sp[1] is packet

		const currentLag = sp[0] - sp[1];
		// * We pick the largest number as the delay for our case.
		if (currentLag > lagCount) {
			lagCount = currentLag;
		}
	}
	// * Simply, the largest number is our total delay.
	return lagCount;
}

// function countLag(packet) {
// 	let lagCount = 0; // * We start by setting lagCount to zero, so there is no initial lag
// 	let expectedTime = 0; // * We Track the ideal expected time for a pack in our sequence

// 	// * We sort the packets by their packet numbers (Packet 1, Packet 2) while keeping the arrival times associated with them in the original order.
// 	// * We simulate the ideal packet order while keeping the arrival times as they are.
// 	// * This allows us to simplify the problem and calculate the lag.
// 	const sortedPacket = packet.sort((a, b) => a[1] - b[1]);
// 	// * We loop through our sortedPacket
// 	for (const [s, p] of sortedPacket) {
// 		// * If the arrival time is greater than the packet number, then the packet is delayed.
// 		// * We don't care if the packet number is greater than the arrival time, as this will not cause any delay.
// 		// * In other words, if packet 2 arrives at second 3, then it's 1 second delayed.
// 		// * But if packet 2 arrives at second 1, then this is better as it will not cause any delay and will be ready to play when its time comes.

// 		if (s > p) {
// 			// * A lag is the delay when the packet arrives later than what we expect it to arrive.
// 			// * Our total lag is the difference between the orginal time (s) and (expectedTime).
// 			// * Each packet should ideally arrive at or before its corresponding second.
// 			// * We get the lag only when the packet arrives later than the expectedTime.

// 			if (s > expectedTime) {
// 				// * This is our lag wicth is the difference between our (s) orginal packet time and the expected ideal time (expectedTime).
// 				lagCount += s - expectedTime;
// 				// * Then our expectedTime is (s). If we don't do so we cannot expect correct time for the next packet.
// 				expectedTime = s;
// 			}
// 		}
// 		// * Our next ideal time (expectedTime) is the greater of the current time or the packet number plus one.
// 		// * We make sure that each packet takes its expected one second time slot.
// 		// * As streaming requires packets to be played in the correct sequence.
// 		// * If a packet arrives earlier than what we expect, it should not affect our expectedTime.
// 		expectedTime = (expectedTime > p ? expectedTime : p) + 1;
// 	}
// 	return lagCount;
// }

function getInput(inputs) {
	//! We get user input without the first item.
	const streamPackWithScounds = inputs.slice(1);
	const packets = [];

	//? We loop through the user input as a List without the first item.
	for (const i of streamPackWithScounds) {
		//? We are getting a String ex: "1 2". We need to convert it to a List and then to Integer.
		const parts = i.split(" ");
		const numbers = parts.map((str) => Number(str));
		const secounds = numbers[0];
		const packetNum = numbers[1];

		packets.push([secounds, packetNum]);
	}
	//? And we show our result
	//console.log(countLag(packets));
	console.log(lagCount(packets));

	rl.close();
}
