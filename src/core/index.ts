import { Server } from '../server';
import Hookable from 'hookable';
import consola from 'consola';

class RenderMachine extends Hookable {
    
    public server: Server;
    protected renderer: Server;
    protected render: any;

    constructor() {
        super(consola);

        this.initServer();
        this.init();
    }

    async init() {

        if (this.server) {
            await this.server.ready()
        }

    }

    ready() {
        
    }

    private initServer(): void {
        this.server = new Server(this);
        this.renderer = this.server;
        this.render = this.server.app;
    }
}

export {
    RenderMachine
}