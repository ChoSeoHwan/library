import { delay } from '~/utils';

afterEach(() => {
    jest.useRealTimers();
});

describe('utils', () => {
    describe('delay()', () => {
        it.only('1초 지연 확인', async () => {
            jest.useFakeTimers();

            const fn = jest.fn();

            // 1초 딜레이 후 함수 호출
            const promise = (async () => {
                await delay(1000);

                fn();
            })();

            // 함수 1초 딜레이 후 호출 확인
            expect(fn).not.toBeCalled();

            jest.runAllTimers();
            await promise;

            expect(fn).toBeCalled();
        });
    });
});
