import chalk from 'chalk'
import fs from 'fs'

import commandList from './commands'


enum Command {
    start = 'start',
    dev = 'dev',
    prod = 'prod'
}

class CLI {

    private argv: string[];
    private commands: Command[];
    private command: Command;

    constructor(argv: string[]) {
        this.argv = argv ? Array.from(argv) : process.argv.slice(2);
    }

    RunCommand() {

        const argv = this.argv;
        let command = this.GetCommand(argv[0]);        

        // Matching `nuxt` or `nuxt [dir]` or `nuxt -*` for `nuxt dev` shortcut
        if (!command && (!argv[0] || argv[0][0] === '-' || fs.existsSync(argv[0]))) {
            argv.unshift('dev');
            command = this.GetCommand('dev');
        }

        command
    }

    GetCommand(commandName: string) {

        let commands: { [item: string]: any };

        commands = commandList;

        return commands[commandName];

    }
}

export function cli(argv: []) {
    const cli = new CLI(argv);
    cli.RunCommand();
}