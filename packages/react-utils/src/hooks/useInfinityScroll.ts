import { RefObject, useEffect } from 'react';
import { throttle } from 'underscore';

const useInfinityScroll = (
    handler: (event: Event) => void,
    object?: RefObject<HTMLElement>
): void => {
    useEffect(() => {
        let scrollHandler: ((event: Event) => void) | null = null,
            element: null | Window | HTMLElement = null;

        if (object === undefined) {
            // window 객체 세팅
            element = window;

            // 스크롤 시 발생 이벤트
            scrollHandler = (event: Event) => {
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
            scrollHandler = (event: Event) => {
                const target = event.currentTarget as HTMLElement;

                if (
                    target.scrollTop + target.clientHeight >=
                    target.scrollHeight
                ) {
                    handler(event);
                }
            };
        }

        if (element === null || scrollHandler === null) return;

        scrollHandler = throttle(scrollHandler, 100);
        element.addEventListener('scroll', scrollHandler);

        return () => {
            if (element === null || scrollHandler === null) return;

            element.removeEventListener('scroll', scrollHandler);
        };
    }, [handler, object]);
};

export default useInfinityScroll;
