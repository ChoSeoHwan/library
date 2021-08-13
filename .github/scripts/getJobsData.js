/**
 * jobs 데이터 조회
 * @param {Record<string, any>} github
 * @param {Record<string, any>} context
 * @param {Record<string, any>} core
 * @return {Promise<*>}
 */
module.exports = async ({github, context, core}) => {
    const params = {
        owner: context.repo.owner,
        repo: context.repo.repo,
        job_id: context.runId
    }

    core.info(`Getting Jobs #${params.job_id} from ${params.owner}/${params.repo}`)
    try {
        /**
         * @name github.actions.listJobsForWorkflowRun
         * @type {any}
         */
        const result = await github.actions.listJobsForWorkflowRun(params);
        core.info(`Got jobs data: ${JSON.stringify(result.data)}`)
        return result.data
    } catch (err) {
        core.setFailed(`Request failed with error ${err}`)
    }
}