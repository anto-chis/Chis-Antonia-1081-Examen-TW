export function actionIsFulfilled(action){
    return `${action}_FULFILLED`
}
export function actionIsPending(action){
    return `${action}_PENDING`
}
export function actionIsRejected(action){
    return `${action}_REJECTED`
}