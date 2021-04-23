
function handleError(handle) {
    return async (req , res , next) => {
        try
        {
            await handle(req, res);
        }
        catch(err)
        {
            next(err);
        }
    }
}

module.exports.handleError = handleError;