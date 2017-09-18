const pa11y = require('pa11y');
const chalk = require('chalk');

const test = pa11y();

const urls = [
	'http://code-computerlove-fe-components.surge.sh/tabs/index.html'
];


urls.forEach(url => {
	test.run(url, function (error, results) {
		if(error) throw error;

		let errors = results.filter(result => {
			return result.type === 'error';
		});

		if(errors.length > 0) {
			errors.forEach(error => {
				console.log(chalk.blue(`Error: ${error.message}`));
				console.log(chalk.grey(error.code));
				console.log(chalk.grey(error.selector));
				console.log(chalk.grey(error.context));
			});

			process.exit(0);
		}


	});
});
