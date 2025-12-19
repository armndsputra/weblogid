// pagination
export const _page_breaker = async ( limit, offset) => {

    if (isNaN(limit) || isNaN(offset)) {
        throw new Error('NOT_NUMBER');
    }

    if (limit < 0 || offset < 0) {
            throw new Error('NEGATIVE_VALUES_NOT_ALLOWED')
    }

    return { limit, offset }
}