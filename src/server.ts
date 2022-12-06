import express from 'express';
import fs from 'fs';
import cors from 'cors';

const app = express();
app.use(cors());
const port = 3011;

type Job = {
	id: number;
	title: string;
	company: string;
	url: string;
	description: string;
	skillList: string;
	todo: string;
}

const jobs = JSON.parse(fs.readFileSync('./src/data/jobs.json', 'utf8'));

app.get('/', (req: express.Request, res: express.Response) => {
	res.send('job site api');
});

app.get('/jobs', (req: express.Request, res: express.Response) => {
	res.json(jobs);
});

app.get('/todos', (req: express.Request, res: express.Response) => {
	res.json(jobs.map((job: Job) => {
		return {
			todo: job.todo,
			company: job.company,
			title: job.title
		}
	}));
});

app.listen(port, () => {
	console.log(`listening on http://localhost:${port}`);
});
