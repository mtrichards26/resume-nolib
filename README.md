# Resume Builder (No-lib)

Simple Html/Javascript resume builder that builds a resume from a json file using only native javascript.

###Example Resume Data

```json
{
	"name": "Slim Pickins",
	"location": "San Diego, CA",
	"email": "blah@gmail.com",
	"telephone": "(555) 111-1111",
	"skills": {
		"Languages": [
			"Proficient in: C#/.NET, TypeScript, JavaScript/Node.js, HTML, SQL, XSLT",
			"Familiar with: Python, PHP, Java/Groovy, Visual Basic"
		],
		"software": [
			"Database: Microsoft SQL Server, Snowflake, MongoDB, Oracle, MySQL",
			"Cloud: AWS and Azure Experience",
			"Development Tools: Visual Studio, VS Code, GIT, Subversion",
			"Queue/Streaming: Rabbit, Kafka, IBM MQ",
			"CI/CD: Azure DevOps, TeamCity"
		]
	},
	"education": [
		{
			"name": "University of California San Diego",
			"degree": "Bachelor of Science - Magic",
			"dates": "Jun 2022",
			"location": "San Diego, CA"
		}
	],
	"jobs": [
		{
			"companyName": "That Co.",
			"location": "San Diego, CA",
			"startDate": 2020,
			"endDate": null,
			"title": "Senior Analyst",
			"items": ["Analyzed a lot of things.", "Documented analysis findings."]
		},
		{
			"companyName": "That Co.",
			"location": "San Diego, CA",
			"startDate": 2019,
			"endDate": "Jan 2018",
			"title": "Senior Analyst",
			"items": ["Analyzed a lot of things.", "Documented analysis findings."]
		},
		{
			"companyName": "Orchard Hardware Supply",
			"location": "San Ramon, CA",
			"startDate": 2015,
			"endDate": 2017,
			"title": "Cashier",
			"items": [
				"Answer customer questions.",
				"Assist with loading and unloading of store product.",
				"Check out customers and maintain balanced cash drawer.",
				"Cut keys."
			]
		}
	]
}
```
