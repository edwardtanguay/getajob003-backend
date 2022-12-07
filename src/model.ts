import fs from 'fs';
import * as model from './model.js';
import { Job, Skill, nullObjectSkill } from './types.js';


const jobs: Job[] = JSON.parse(fs.readFileSync('./src/data/jobs.json', 'utf8'));
const skillInfos: any = JSON.parse(fs.readFileSync('./src/data/skillInfos.json', 'utf8'));

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
	<li><a href="skills">/skills</a> - array of skills with all fields</li>
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
	const skills: Skill[] = [];
	jobs.forEach(job => {
		const skillIdCodes = job.skillList.split(',').map(m => m.trim());
		skillIdCodes.forEach(skillIdCode => {
			const skill: Skill = model.lookupSkill(skillIdCode);
			skills.push(skill);
		})
	});
	return skills;
}

export const lookupSkill = (idCode: string): Skill => {
	const _skill = skillInfos[idCode];
	if (_skill === undefined) {
		return {
			...nullObjectSkill,
			idCode
		}
	} else {
		return {
			..._skill,
			idCode,
		}
	}
} 