/**
 * Pull request 데이터 조회
 * @param {Record<string, any>} github
 * @param {Record<string, any>} context
 * @param {Record<string, any>} core
 * @return {Promise<*>}
 */
module.exports = async ({github, context, core}) => {
    core.info(`jobs : ${JSON.stringify(context.job)}`);
    // const request = {
    //     owner: context.repo.owner,
    //     repo: context.repo.repo,
    //     pull_number: context.issue.number
    // }
    //
    // core.info(`Getting PR #${request.pull_number} from ${request.owner}/${request.repo}`)
    // try {
    //     const result = await github.pulls.get(request)
    //     core.info(`Got PR: ${JSON.stringify(result.data)}`)
    //     return result.data
    // } catch (err) {
    //     core.setFailed(`Request failed with error ${err}`)
    // }
}