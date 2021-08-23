import { fireEvent, render } from '@testing-library/react';
import React, { FC, useRef } from 'react';

import useInfinityScroll from '~src/hooks/useInfinityScroll';

const scrollEnd = jest.fn();

const originalOffsetHeight = Object.getOwnPropertyDescriptor(
    HTMLElement.prototype,
    'offsetHeight'
);

const originalWindowHeight = Object.getOwnPropertyDescriptor(
    window,
    'innerHeight'
);

beforeEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
});

afterEach(() => {
    Object.defineProperty(
        HTMLElement.prototype,
        'offsetHeight',
        originalOffsetHeight as PropertyDescriptor
    );

    Object.defineProperty(
        window,
        'innerHeight',
        originalWindowHeight as PropertyDescriptor
    );
});

describe('hooks/useInfinityScroll', () => {
    const WindowScroll: FC = () => {
        useInfinityScroll(scrollEnd);

        return <div />;
    };

    const DomScroll: FC = () => {
        const scrollRef = useRef<HTMLDivElement>(null);

        useInfinityScroll(scrollEnd, scrollRef);

        return (
            <div
                data-testid="scroll-container"
                ref={scrollRef}
                style={{
                    overflowY: 'scroll',
                    height: 100
                }}>
                <div
                    style={{
                        height: 500
                    }}>
                    test
                </div>
            </div>
        );
    };

    it('window scroll end 이벤트 실행 확인', () => {
        jest.useFakeTimers();

        // 창 크기 설정
        Object.defineProperty(window, 'innerHeight', {
            writable: true,
            configurable: true,
            value: 150
        });

        // 문서 전체 크기 설정
        Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
            configurable: true,
            value: 300
        });

        // window scroll render
        render(<WindowScroll />);

        // 최초 이벤트 미실행 확인
        expect(scrollEnd).not.toBeCalled();

        // 100 까지 스크롤 후 이벤트 미실행 확인
        fireEvent.scroll(window, { target: { scrollY: 100 } });
        jest.runAllTimers();
        expect(scrollEnd).not.toBeCalled();

        // 150 까지 스크롤 후 이벤트 실행 확인
        fireEvent.scroll(window, { target: { scrollY: 150 } });
        jest.runAllTimers();
        expect(scrollEnd).toBeCalled();
    });

    it('dom scroll end 이벤트 실행 확인', () => {
        jest.useFakeTimers();

        // window scroll render
        const { getByTestId } = render(<DomScroll />);
        const scrollContainer = getByTestId('scroll-container');

        Object.defineProperty(scrollContainer, 'clientHeight', {
            configurable: true,
            value: 100
        });

        Object.defineProperty(scrollContainer, 'scrollHeight', {
            configurable: true,
            value: 500
        });

        // 최초 이벤트 미실행 확인
        expect(scrollEnd).not.toBeCalled();

        // 100 까지 스크롤 후 이벤트 미실행 확인
        fireEvent.scroll(scrollContainer, {
            target: { scrollTop: 300 }
        });
        jest.runAllTimers();
        expect(scrollEnd).not.toBeCalled();

        // 150 까지 스크롤 후 이벤트 실행 확인
        fireEvent.scroll(scrollContainer, {
            target: { scrollTop: 400 }
        });
        jest.runAllTimers();
        expect(scrollEnd).toBeCalled();
    });
});
