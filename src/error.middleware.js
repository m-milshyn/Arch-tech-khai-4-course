export const errorResponder = (err, request, response, next) => {
    response.header("Content-Type", 'application/json');
    response.status(err.statusCode || 500).send(JSON.stringify({ error: err.message }));
};