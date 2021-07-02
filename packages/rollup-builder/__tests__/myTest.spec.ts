describe('test', () => {
    it('should match', () => {
        const testVar = {
            test: 'test1'
        };

        expect(testVar).toStrictEqual({
            test: 'test1'
        });
    });
});
