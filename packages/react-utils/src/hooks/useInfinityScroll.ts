import { RefObject, useEffect } from 'react';
import { throttle } from 'throttle-debounce';

interface ScrollHandlerInterface {
    (event: Event, currentTarget: Event['currentTarget']): void;
}

const useInfinityScroll = <T extends HTMLElement>(
    handler: EventListener,
    object?: RefObject<T>
): void => {
    useEffect(() => {
        let scrollHandler: ScrollHandlerInterface | null = null,
            element: Window | T | null = null;

        if (object === undefined) {
            // window 객체 세팅
            element = window;

            // 스크롤 시 발생 이벤트
            scrollHandler = (event) => {
                if (
                    window.scrollY + window.innerHeight >=
                    document.body.offsetHeight
                ) {
                    handler(event);
                }
            };
        } else if (
            typeof object.current === 'object' &&
            object.current !== null &&
            typeof object.current.addEventListener === 'function'
        ) {
            // element 세팅
            element = object.current;

            // 해당 element 에 이벤트 부여
            scrollHandler = (event, currentTarget) => {
                const target = currentTarget as T;

                if (
                    target.scrollTop + target.clientHeight >=
                    target.scrollHeight
                ) {
                    handler(event);
                }
            };
        }

        if (element === null || scrollHandler === null) return;

        const throttledHandler = throttle(100, scrollHandler);
        const eventHandler = (event: Event) => {
            const currentTarget = event.currentTarget;
            throttledHandler(event, currentTarget);
        };

        element.addEventListener('scroll', eventHandler);

        return () => {
            if (element === null) return;

            element.removeEventListener('scroll', eventHandler);
        };
    }, [handler, object]);
};

export default useInfinityScroll;
