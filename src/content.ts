import { camelCase } from 'lodash-es';
import axios from 'axios';

const message = 'Welcome to this info site.';
const messageIdCode = camelCase(message);

type Noun = {
	article: string,
	singular: string,
	plural: string
}

const url = 'https://edwardtanguay.vercel.app/share/germanNouns.json';
const options = {
	method: 'GET',
	url: url,
	headers: {
		'Accept-Encoding': 'application/json'
	}
};
const nouns = (await axios.request(options)).data;

export const mainContent = `
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>Info Site</title>
	<style>
		body {
			font-family: sans-serif;
			padding: 0 1rem;
		}
	</style>
</head>
<body>
	<h1>Info Site</h1>	
	<p>${message}</p>
	<p>idCode: ${messageIdCode}</p>

	<h2>Nouns</h2>
	${nouns.map((noun) => {
	return `<div class="noun">
			<div class="singular">${noun.article} ${noun.singular}</div>	
		</div>`
	}).join('')}
</body>
</html>
`;
