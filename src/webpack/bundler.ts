import AsyncMFS from './utils/async-mfs'

interface WebpackBuildContext {
    options: Options;
}

interface Options {
    dev: boolean;
}


export class WebpackBuilder {

    buildContext: WebpackBuildContext;
    mfs: AsyncMFS;

    constructor(buildContext: WebpackBuildContext) {
        
        buildContext = buildContext;

        if(buildContext.options.dev) {
            this.mfs = new AsyncMFS()
        }
           
    }
}