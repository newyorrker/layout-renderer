import { Server } from './index';
import { RenderMachine } from '../core/index'

class ServerContext {

    public renderMachine: RenderMachine;

    constructor(server: Server) {
        this.renderMachine = server.renderMachine
        // this.globals = server.globals
        // this.options = server.options
        // this.resources = server.resources
    }
}

export {
    ServerContext
}