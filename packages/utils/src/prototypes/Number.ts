declare global {
    interface Number {
        addSeparator: () => string;
        convertKorean: () => string;
    }
}

if (!Number.prototype.addSeparator) {
    /**
     * 숫자에 컴마 추가
     *
     * @returns {string} 구분자 추가 된 숫자
     */
    Number.prototype.addSeparator = function () {
        const regex = /(?<!\.[^.]*)\B(?=(\d{3})+(?!\d))/g;
        return this.toString().replace(regex, ',');
    };
}

if (!Number.prototype.convertKorean) {
    /**
     * 숫자를 한국 표현식으로 변경
     *
     * @returns {string} 한국 단위 적용된 숫자 string
     */
    Number.prototype.convertKorean = function () {
        const koreanSeparator = [
            {
                size: 1000,
                separator: '천'
            },
            {
                size: 10000,
                separator: '만'
            },
            {
                size: 100000000,
                separator: '억'
            },
            {
                size: 1000000000000,
                separator: '조'
            }
        ];

        let koreanNumber = String(this);

        // 각 단위에 맞춰 나누어 한국어로 변경
        koreanSeparator.forEach(({ size, separator }) => {
            const shortNumber = Math.trunc(((this as number) / size) * 10) / 10;
            if (Math.abs(shortNumber) >= 1) {
                koreanNumber = String(shortNumber) + separator;
            }
        });

        return koreanNumber;
    };
}

export {};
