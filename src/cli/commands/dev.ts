import { RenderMachine } from '../../core'
import consola from 'consola'
import minimist from 'minimist'
import { Builder } from '../../builder';

import { Configurator } from '../../config'


interface ExtraOptions {
    dev?: boolean; 
    command?: string;
    cli?: boolean;
}

interface MiniMistOptions {
    alias: {};
    boolean: [],
    string: [],
    default: {}
}

class DevComand {
    public name: string;

    private _argv: string[];
    private parsedArgv: minimist.ParsedArgs = null;
    
    constructor(cmd = { name: '', usage: '', description: '' }, argv = process.argv.slice(2), hooks = {}) {
        this.name = 'dev'
        this._argv = Array.from(argv);
    }

    
    public get argv () {
        if (!this.parsedArgv) {
            const minimistOptions = this.GetMinimistOptions();
            this.parsedArgv = minimist(this._argv, minimistOptions);
        }
        return this.parsedArgv
    }
    

    async startDev() {
        let renderMachine;

        try {
            renderMachine = this._listenDev();
        }
        catch(error) {
            consola.fatal(error)
            return
        }

        try {
            renderMachine = this._buildDev();
        }
        catch(error) {
            consola.fatal(error)
            return
        }
        
    }

    async getRenderMachine(): Promise<RenderMachine> {
        return await new RenderMachine();
    }

    async getBuilder(): Promise<Builder> {
        
        // const { BundleBuilder } = new Webpack;

        return await new Builder();
    }

    GetMachineConfig(extraOptions: ExtraOptions = {} ) {
        
        extraOptions.cli = true;

        const context: ExtraOptions = {
            command: this.name,
            dev: !!extraOptions.dev
        }

        const config = this.LoadMachineConfig(context);
        const options = Object.assign(config, extraOptions);

        return options;
    }

    LoadMachineConfig(context: ExtraOptions) {
        const configurator = new Configurator();

        return configurator.LoadConfig()
    }

    async _listenDev() {

        const configurator = new Configurator();

        const config = this.GetMachineConfig()
        // const options
        
        // const config = await cmd.getMainConfig({ dev: true });

        consola.info("start listen");
        const renderMachine = await this.getRenderMachine();

        await renderMachine.ready();

        await renderMachine.server.listen();

    }

    async _buildDev() {
        consola.info("start build");
        const builder = await this.getBuilder();

        

        // Start Build
        await builder.build()
    }

    private GetMinimistOptions () {

        const minimistOptions: MiniMistOptions = {
            alias: {},
            boolean: [],
            string: [],
            default: {}
        };

        // for (const name of Object.keys(this.options)) {
        //     const option = this.cmd.options[name];

        //     if (option.alias) {
        //         minimistOptions.alias[option.alias] = name;
        //     }
        //     if (option.type) {
        //         minimistOptions[option.type].push(option.alias || name);
        //     }
        //     if (option.default) {
        //         minimistOptions.default[option.alias || name] = this._getDefaultOptionValue(option);
        //     }
        // }

        return minimistOptions
    }

}


export  {
    DevComand
}