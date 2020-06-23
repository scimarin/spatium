import { sayHello } from './greet';

function showHello(divName: string) {
    const elt = document.getElementById(divName);
    elt.innerText = sayHello();
}

showHello('greeting');
