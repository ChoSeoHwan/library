/**
 * 시간 지연 함수
 *
 * @param {number} time 지연시킬 시간
 * @returns {Promise<void>} promise
 */
export const delay = (time: number): Promise<void> =>
    new Promise((resolve) => {
        setTimeout(resolve, time);

        console.log('임시 테스트4');
    });
