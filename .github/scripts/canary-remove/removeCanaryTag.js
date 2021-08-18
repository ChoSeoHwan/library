/**
 * publish 된 패키지 이름 조회
 * @param {Record<string, any>} core
 * @return {Promise<*>}
 */
module.exports = async ({core}) => {
    const exec = require('@actions/exec');

    const { NUMBER, REF } = process.env;

    let { LIST } = process.env;
    const parsedList = JSON.parse(LIST);

    const tag = REF === 'release' ? 'next' : `alpha-${NUMBER}`;

    const packageList = parsedList.map((item) => item.name);

    const removedPackages = [];

    core.info('start unpublish canary version');

    for (const name of packageList) {
        core.startGroup(name);

        let removed = false;

        try {
            core.info(`Try to unpublish tag: ${name}@${tag}`);
            await exec.exec(`npm dist-tag rm ${name} ${tag}`);

            core.info(`Unpublish tag success: ${name}@${tag}`);
            removed = true;
        } catch (error) {
            core.warning(`Unpublish tag failed: ${name}@${tag}`);
        }

        let versionList = [];
        try {
            core.info('Get version info from tag');

            const outputList = [];
            let error = false;

            await exec.exec(`npm view ${name} versions --json`, [], {
                listeners: {
                    stdout: (data) => {
                        outputList.push(data.toString());
                    },
                    stderr: () => {
                        error = true;
                    }
                }
            });

            if (error) throw new Error('get version failed');

            versionList = JSON.parse(outputList.join(''));
        } catch (error) {
            core.warning(`Get version info failed: ${name}@${tag}`);
            return;
        }

        core.info(`all version list : ${JSON.stringify(versionList)}`);

        const versionRegexp = new RegExp(`(([\\d]+\\.){2}[\\d]+)-(${tag})\\.`, 'g');
        const canaryVersionList = versionList.filter((version) => {
            const test = versionRegexp.test(version);
            core.info(`version: ${version}, test: ${test}`);
            return test;
        });

        core.info(`canary version list : ${JSON.stringify(canaryVersionList)}`);

        for (const version of canaryVersionList) {
            try {
                core.info(`Try to remove canary version: ${name}@${version}`);
                await exec.exec(`npm unpublish ${name}@${version}`);

                core.info(`Remove canary version success: ${name}@${version}`);
                removed = true;
            } catch (error) {
                core.warning(`Remove canary version failed: ${name}@${version}`);
            }
        }

        if (removed) removedPackages.push(name);

        core.endGroup();
    }

    core.info('finish unpublish canary version');

    return removedPackages;
}