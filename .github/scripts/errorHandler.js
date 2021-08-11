module.exports = async ({github, context}) => {
    const { SUCCESS_MSG, ERROR_MSG, STATUS } = process.env;

    let message = '';
    switch (STATUS) {
        case 'success':
            message = SUCCESS_MSG;
            break;

        case 'failure':
            message = ERROR_MSG;
            break;
    }

    if (github.hasOwnProperty('issues')) {
        github.issues.createComment({
            issue_number: context.issue.number,
            owner: context.repo.owner,
            repo: context.repo.repo,
            body: message
        });
    } else {
        throw new Error('Failed to register a comment');
    }
}