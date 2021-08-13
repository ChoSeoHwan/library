import '~src/prototypes/Number';

describe('prototypes/Number', () => {
    describe('addSeparator()', () => {
        it('구분자(쉼표) 추가 확인', () => {
            const number = 123456789;
            expect(number.addSeparator()).toBe('123,456,789');
        });

        it('소수점 숫자도 구분자 추가 확인', () => {
            const number = 912345.6789101;
            expect(number.addSeparator()).toBe('912,345.6789101');
        });

        it('음수 구분자 추가 확인', () => {
            const number = -123456789;
            expect(number.addSeparator()).toBe('-123,456,78');
        });

        it('음수+소수점 구분자 추가 확인', () => {
            const number = -123456789.10111213;
            expect(number.addSeparator()).toBe('-123,456,789.10111213');
        });
    });

    describe('convertKorean()', () => {
        it('천단위 확인', () => {
            const number = 1234;
            expect(number.convertKorean()).toBe('1.2천');
        });

        it('만단위 확인', () => {
            let number = 12345;
            expect(number.convertKorean()).toBe('1.2만');

            number = 123456;
            expect(number.convertKorean()).toBe('12.3만');

            number = 1234567;
            expect(number.convertKorean()).toBe('123.4만');

            number = 12345678;
            expect(number.convertKorean()).toBe('1234.5만');
        });

        it('억단위 확인', () => {
            let number = 123456789;
            expect(number.convertKorean()).toBe('1.2억');

            number = 1234567890;
            expect(number.convertKorean()).toBe('12.3억');

            number = 12345678901;
            expect(number.convertKorean()).toBe('123.4억');

            number = 123456789012;
            expect(number.convertKorean()).toBe('1234.5억');
        });

        it('조단위 확인', () => {
            let number = 1234567890123;
            expect(number.convertKorean()).toBe('1.2조');

            number = 12345678901234;
            expect(number.convertKorean()).toBe('12.3조');

            number = 123456789012345;
            expect(number.convertKorean()).toBe('123.4조');

            number = 1234567890123456;
            expect(number.convertKorean()).toBe('1234.5조');
        });
    });
});
