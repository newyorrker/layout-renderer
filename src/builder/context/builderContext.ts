import { Builder } from '../'
import { RenderMachine } from '../../core'

export default class BuilderContext {

    builder: Builder;
    renderMachine: RenderMachine;
    options: RenderMachine

    constructor(builder: Builder) {
        this.builder = builder;
        this.renderMachine = builder.renderMachine;
    }
}