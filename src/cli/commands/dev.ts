import { RenderMachine } from '../../core'
import consola from 'consola'
import { Builder } from '../../builder';


class DevComand {
    public name: string
    
    constructor() {
        this.name = 'dev'
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
        return await new Builder();
    }

    async _listenDev() {
        //const config = await cmd.getMainConfig({ dev: true });

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

}


export  {
    DevComand
}