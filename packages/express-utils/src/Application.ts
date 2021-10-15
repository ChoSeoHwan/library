import express from 'express';

abstract class Application {
    protected app;

    constructor() {
        this.app = express();

        // before middleware 세팅
        this.initBeforeMiddleware && this.initBeforeMiddleware();

        // router 세팅
        this.initRouter && this.initRouter();

        // after middleware 세팅
        this.initAfterMiddleware && this.initAfterMiddleware();
    }

    protected initBeforeMiddleware?(): void;
    protected initAfterMiddleware?(): void;
    protected initRouter?(): void;

    /**
     * app 전달
     *
     * @returns {ReturnType<typeof express>} app
     */
    public getApp(): ReturnType<typeof express> {
        return this.app;
    }
}

export default Application;
