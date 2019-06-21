const Calculator = ( fn => new fn() )( require(  './modules/node-calculator-cli' ).default );

const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
    prompt: 'Введите выражение: '
});

rl.prompt();

rl.on('line', function (line) {
    if( line && Calculator.syntax( line ) ) console.log('Результат: ', Calculator.calculate(line.trim()) );    
    rl.prompt();
})

.on('SIGINT', () => rl.close() )
.on('close',  () => {
	console.log('Have a great day!');
	process.exit(0);
});
