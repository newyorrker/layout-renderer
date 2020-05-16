import { ServerContext } from '../server/context'

class VueRenderer {
    private serverContext: ServerContext;

    constructor(serverContext: ServerContext) {
        this.serverContext = serverContext
    }
    
    public async ready() {
        await this.readyPromise();
    }

    private async readyPromise() {
        this.serverContext.renderMachine.hook('build:resources', mfs => this.loadResources(mfs))
    }

    private loadResources(_fs: any) {
        console.log('resurces loading...');
    }
}

export {
    VueRenderer
}