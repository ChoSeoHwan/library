/**
 * canary-publish 에 맞는 댓글 생성
 * @return {Promise<*>}
 */
module.exports = async () => {
    const { STATUS, TAG, ACTION_URL, PACKAGES } = process.env;

    let message = "> /canary-publish\r\n\r\n";
    switch (STATUS) {
        case 'success':
            const packageList = JSON.parse(PACKAGES);

            message += `🎉 canary publish complete!\r\n`;
            message += `You can install canary version via \`yarn add package@${TAG}\`\r\n\r\n`
            message += '**Published package list**\r\n'

            // published package list 추가
            if (Array.isArray(packageList) && packageList.length > 0) {
                packageList.forEach((name) => {
                    message += `- \`${name}\`\r\n`
                });
            } else {
                message += '*No packages have been published*';
            }

            break;

        case 'failure':
            message += `❗ canary publish failed.\r\nCheck error in github [action page](${ACTION_URL}).\r\n`;
            break;
    }

    return { message };
}