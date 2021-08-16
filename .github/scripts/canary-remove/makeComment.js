/**
 * canary-remove 에 맞는 댓글 생성
 * @return {Promise<*>}
 */
module.exports = async () => {
    const { STATUS, TAG, ACTION_URL, REMOVED_PACKAGES } = process.env;

    let message = "> /canary-remove\r\n\r\n";

    switch (STATUS) {
        case 'success':
            const removedPackageList = JSON.parse(REMOVED_PACKAGES);

            message += `🎉 canary remove complete!\r\nRemoved tag is \`${TAG}\`\r\n\r\n`;
            message += '**List of packages with tags removed**\r\n';
            if (removedPackageList.length > 0) {
                removedPackageList.forEach((name) => {
                    message += `- \`${name}\`\r\n`
                });
            } else {
                message += '*No packages have been unpublished*';
            }

            break;

        case 'failure':
            message += `❗ canary remove failed.\r\nCheck error in github [action page](${ACTION_URL}).\r\n`;
            break;
    }

    return { message };
}