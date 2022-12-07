import fs from 'fs';

type Job = {
	id: number;
	title: string;
	company: string;
	url: string;
	description: string;
	skillList: string;
	todo: string;
}

type Skill = {
	idCode: string;
	name: string;
	url: string;
	description: string;
}

const jobs: Job[] = JSON.parse(fs.readFileSync('./src/data/jobs.json', 'utf8'));

export const getApiInstructionsHtml = () => {
	return `
<style>
a, h1 {
	background-color: #ddd;
	font-family: courier;
}
</style>
<h1>GETAJOB API</h1>	
<ul>
	<li><a href="jobs">/jobs</a> - array of job listings will all fields</li>
	<li><a href="todos">/todos</a> - array of todos with todo/company/title fields</li>
</ul>
	`;
}

export const getJobs = () => {
	return jobs;
}

export const getTodos = () => {
	return jobs.map((job: Job) => {
		return {
			todo: job.todo,
			company: job.company,
			title: job.title
		}
	});
}

export const getSkills = () => {
	
}