import { exportData } from "./scraper";

// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const dotenv = require('dotenv');

dotenv.config();

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const baseUrl = "https://www.sazentea.com";

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// Log in to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);

/**
 * Builds an embed message to be sent by the Discord bot
 * @returns 
 */
export function buildEmbed() {
	const [availableProducts, unavailableProducts] = exportData();
	const availableString = generateValue(availableProducts);
	const unavailableString = generateValue(unavailableProducts);

	const embed = new EmbedBuilder()
		.setColor(0x44624A)
		.setTitle("Sazen Tea")
		.setURL(baseUrl)
		.addFields(
			{ name: "✅  Available Products", value: availableString },
			{ name: "❌  Unavailable Products", value: unavailableString },
		)
		.setTimestamp();

	return embed;
}

export function generateValue(products: any[]) {
	let valueString = "";
	for (let i = 0; i < products.length; i++) {
		valueString += `[${products[i].name}](${products[i].url}) + ${(i < products.length - 1 ? "\n" : "")}`;
	}

	return valueString;
}