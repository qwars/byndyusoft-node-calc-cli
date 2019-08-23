# byndyusoft-node-calc-cli
Тестовое задание для byndyusoft.com

**Mail**

> в качестве тестового задания предлагаем написать на Node.js консольный калькулятор (можно с веб-интерфейсом), который принимает входную строку, содержащую математическое выражение (целые и десятично-дробные числа, знаки +, -, *, / и скобки) и выводит в консоль результат его вычисления.
>
> Главным критерием при оценке задания является использование при разработке TDD и принципов SOLID. Архитектура решения должна обеспечивать расширение списка поддерживаемых операций при минимальном и максимально безболезненном для существующей функциональности внесении изменений в исходный код. Код должен быть легко читаем и отформатирован в едином стиле, содержать минимальное число поясняющих комментариев.
>
> Пример консольного ввода:
> Введите выражение: 1+2-3
> Результат: 0
>
> Результатом будет публично доступный репозиторий на GitHub с исходным кодом тестового задания.
>
> Ждем фидбек, когда приступите к выполнению или решите не делать тестовое. Пожалуйста, в ответе поставьте метку "ответить всем"
>
> -- 
> Best wishes,
> Margarita Milberger
> HR-manager at Byndyusoft http://byndyusoft.com

## Установка и настройка

Для установки понадобиться:

[nodejs](https://nodejs.org/ "nodejs") ```$ sudo apt install nodejs```
[yarn](https://yarnpkg.com/ "yarn") ```$ sudo npm i -g yarn```

Для настройки: ```yarn install```

Разработка тесты: ```yarn test```

Публикация для WEB: ```yarn build:web``` - создает мини сайт в 'public'

Публикация для CLI: ```yarn build:cli``` - создает сжатый 'modules/node-calculator-cli/index.js'

Разработка для WEB: ```yarn develop:web```

Разработка для CLI: ```yarn develop:cli```

## Использование

```
const Calculator = ( fn => new fn() )( require(  './modules/node-calculator-cli' ).default );

var result = Calculator.calculate('.....');

```

или

```
const Calculator = require(  './modules/node-calculator-cli' ).default;

var result = Calculator('.....');
```

или

```
const Calc = require(  './modules/node-calculator-cli' ).default;

const Calculator = new Calc()

var result = Calculator.calculate('.....');
```


## Методы

`calculate( exp )` - вычисляет выражение `exp`

`syntax( exp )` - проверяет синтаксис  выражения `exp`

`divide( a, b )` - a / b

`sum( a, b )` - a + b

`subtract( a, b )` - a - b

`multiply( a, b )` - a * b
