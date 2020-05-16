import chalk from 'chalk'

import { Builder } from '../builder'

import { DevComand } from './commands/dev'


enum Comand {
    dev,
    prod
}

function runComand(comand: Comand) {

    const dev = new DevComand();

    if(comand == Comand.dev) {
        dev.startDev();
    }

}


export function cli(args: []) {

    runComand(Comand.dev);
    
}