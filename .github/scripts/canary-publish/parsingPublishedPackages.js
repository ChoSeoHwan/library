/**
 * publish 된 패키지 이름 조회
 * @param {Record<string, any>} core
 * @return {Promise<*>}
 */
module.exports = async ({core}) => {
    const { PUBLISHED } = process.env;

    core.startGroup('publish command result');
    core.info(PUBLISHED);
    core.endGroup();

    const regexp = /(?<=Successfully published:)( - ([\w@/.\-+]+))*/gm;
    if (!regexp.test(PUBLISHED)) {
        core.setFailed('can not found published packages.');
        return [];
    }

    const listText = PUBLISHED.match(regexp)[0];

    core.startGroup('parsed package list by text');
    core.info(`list text : \n${listText}`);
    core.endGroup();

    const packageListRegexp = /(?<= - )([\w@/.\-+]+)/g
    const packageList = listText.match(packageListRegexp);

    core.startGroup('published packages');
    packageList.forEach((name) => {
        core.info(`${name}\n`);
    });
    core.endGroup();

    return packageList;
}