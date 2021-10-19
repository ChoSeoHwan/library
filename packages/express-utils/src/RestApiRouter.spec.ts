import { HTTPMethod } from '@choseohwan/utils/constant';
import express, { NextFunction, Request, Response } from 'express';
import request from 'supertest';

import RestApiRouter, {
    makeRouter,
    RestApiRouterConstructor
} from '~/RestApiRouter';
import { Handler } from '~/type';

const makeApp = (router: RestApiRouterConstructor) => {
    const app = express();

    app.use('/', makeRouter(router));
    return app;
};

describe('RestApiRouter', () => {
    describe('기본 RestApi router 확인', () => {
        const router = {
            index: jest.fn(),
            show: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            store: jest.fn()
        };

        class BasicRouter extends RestApiRouter {
            protected index(req: Request, res: Response, next: NextFunction) {
                router.index();

                res.json({
                    method: req.method,
                    url: req.url
                });

                next();
            }

            protected show(req: Request, res: Response, next: NextFunction) {
                router.show();

                res.json({
                    method: req.method,
                    url: req.url
                });

                next();
            }

            protected update(req: Request, res: Response, next: NextFunction) {
                router.update();

                res.json({
                    method: req.method,
                    url: req.url
                });

                next();
            }

            protected delete(req: Request, res: Response, next: NextFunction) {
                router.delete();

                res.json({
                    method: req.method,
                    url: req.url
                });

                next();
            }

            protected store(req: Request, res: Response, next: NextFunction) {
                router.store();

                res.json({
                    method: req.method,
                    url: req.url
                });

                next();
            }
        }

        it('index 라우터 확인', async () => {
            const app = makeApp(BasicRouter);

            const response = await request(app).get('/');

            expect(router.index).toBeCalled();
            expect(response.body).toEqual({
                method: 'GET',
                url: '/'
            });
        });

        it('show 라우터 확인', async () => {
            const app = makeApp(BasicRouter);

            const response = await request(app).get('/50');

            expect(router.show).toBeCalled();
            expect(response.body).toEqual({
                method: 'GET',
                url: '/50'
            });
        });

        it('update 라우터 확인', async () => {
            const app = makeApp(BasicRouter);

            const response = await request(app).patch('/50');

            expect(router.update).toBeCalled();
            expect(response.body).toEqual({
                method: 'PATCH',
                url: '/50'
            });
        });

        it('store 라우터 확인', async () => {
            const app = makeApp(BasicRouter);

            const response = await request(app).post('/');

            expect(router.store).toBeCalled();
            expect(response.body).toEqual({
                method: 'POST',
                url: '/'
            });
        });
    });

    describe('커스텀 라우터 확인', () => {
        const router = {
            getApi: jest.fn(),
            postApi: jest.fn()
        };

        class CustomRouter extends RestApiRouter {
            @RestApiRouter.registerRouter(HTTPMethod.GET, '/post')
            protected getApi(req: Request, res: Response, next: NextFunction) {
                router.getApi();

                res.json({
                    method: req.method,
                    url: req.url
                });

                next();
            }

            @RestApiRouter.registerRouter(HTTPMethod.POST, '/post/:id')
            protected postApi(req: Request, res: Response, next: NextFunction) {
                router.postApi();

                res.json({
                    method: req.method,
                    url: req.url
                });

                next();
            }
        }

        it('getApi 라우터 확인', async () => {
            const app = makeApp(CustomRouter);

            const response = await request(app).get('/post');

            expect(router.getApi).toBeCalled();
            expect(response.body).toEqual({
                method: 'GET',
                url: '/post'
            });
        });

        it('postApi 라우터 확인', async () => {
            const app = makeApp(CustomRouter);

            const response = await request(app).post('/post/50');

            expect(router.postApi).toBeCalled();
            expect(response.body).toEqual({
                method: 'POST',
                url: '/post/50'
            });
        });
    });

    describe('커스텀 미들웨어 등록 라우터 확인', () => {
        const middlewareFunction = (
            req: Request,
            res: Response,
            next: NextFunction
        ) => {
            next();
        };

        const middlewares = [
            jest.fn().mockImplementation(middlewareFunction),
            jest.fn().mockImplementation(middlewareFunction)
        ];

        const middlewareDecorators = {
            firstMiddleware: jest.fn(),
            secondMiddleware: jest.fn()
        };

        class MiddlewareRouter extends RestApiRouter {
            protected index(req: Request, res: Response, next: NextFunction) {
                res.json({
                    method: req.method,
                    url: req.url
                });

                next();
            }

            protected addMiddleware(): Handler[] {
                return middlewares;
            }

            @RestApiRouter.registerMiddleware
            protected firstMiddleware(
                req: Request,
                res: Response,
                next: NextFunction
            ) {
                middlewareDecorators.firstMiddleware();

                next();
            }

            @RestApiRouter.registerMiddleware
            protected secondMiddleware(
                req: Request,
                res: Response,
                next: NextFunction
            ) {
                middlewareDecorators.secondMiddleware();

                next();
            }
        }

        it('addMiddleware 로 지정한 middleware 호출 확인', async () => {
            const app = makeApp(MiddlewareRouter);

            await request(app).get('/');

            middlewares.forEach((middleware) => {
                expect(middleware).toBeCalled();
            });
        });

        it('decorator 로 지정한 middleware 호출 확인', async () => {
            const app = makeApp(MiddlewareRouter);

            await request(app).get('/');

            expect(middlewareDecorators.firstMiddleware).toBeCalled();
            expect(middlewareDecorators.secondMiddleware).toBeCalled();
        });
    });
});
