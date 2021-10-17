import { HTTPMethod } from '@choseohwan/utils/constant';
import { NextFunction, Request, Response } from 'express';
import request from 'supertest';

import Application from '~/Application';

interface Router {
    method: HTTPMethod;
    path: string;
    handler: jest.Mock;
}

const makeApp = (
    beforeMiddlewares: jest.Mock[] = [],
    routers: Router[] = [],
    afterMiddlewares: jest.Mock[] = []
): Application['app'] => {
    class TestApp extends Application {
        protected initBeforeMiddleware() {
            beforeMiddlewares.forEach((middleware) => {
                this.app.use(
                    (req: Request, res: Response, next: NextFunction) => {
                        middleware();

                        next();
                    }
                );
            });
        }

        protected initRouter() {
            routers.forEach(({ method, path, handler }) => {
                const app = this.app;

                if (typeof app[method] === 'function') {
                    app[method](path, handler);
                }
            });
        }

        protected initAfterMiddleware() {
            afterMiddlewares.forEach((middleware) => {
                this.app.use(
                    (req: Request, res: Response, next: NextFunction) => {
                        middleware();

                        next();
                    }
                );
            });
        }
    }

    return new TestApp().getApp();
};

describe('Application', () => {
    it('beforeMiddleware 호출 확인', async () => {
        const beforeMiddleware = [jest.fn(), jest.fn(), jest.fn()];
        const router: Router[] = [
            {
                path: '/test',
                method: HTTPMethod.GET,
                handler: jest.fn((req: Request, res: Response) => {
                    res.send(req.originalUrl);
                })
            }
        ];

        const app = makeApp(beforeMiddleware, router);
        await request(app).get('/test');

        beforeMiddleware.forEach((middleware) => {
            expect(middleware).toBeCalled();
        });
    });

    it('router 호출 확인', async () => {
        const router: (Router & { originalPath: string })[] = [
            {
                path: '/test',
                originalPath: '/test',
                method: HTTPMethod.GET,
                handler: jest.fn((req: Request, res: Response) => {
                    res.send(req.originalUrl);
                })
            },
            {
                path: '/test/:id',
                originalPath: '/test/choseohwan',
                method: HTTPMethod.PATCH,
                handler: jest.fn((req: Request, res: Response) => {
                    res.send(req.originalUrl);
                })
            }
        ];

        const app = makeApp([], router);

        await Promise.all(
            router.map(async ({ originalPath, handler, method }) => {
                await request(app)[method](originalPath);

                expect(handler).toBeCalled();
            })
        );
    });

    it('afterMiddleware 호출 확인', async () => {
        const afterMiddlewares = [jest.fn(), jest.fn(), jest.fn(), jest.fn()];
        const router: Router[] = [
            {
                path: '/test',
                method: HTTPMethod.GET,
                handler: jest.fn(
                    (req: Request, res: Response, next: NextFunction) => {
                        res.send(req.originalUrl);

                        next();
                    }
                )
            }
        ];

        const app = makeApp([], router, afterMiddlewares);

        await request(app).get('/test');

        afterMiddlewares.forEach((middleware) => {
            expect(middleware).toBeCalled();
        });
    });
});
