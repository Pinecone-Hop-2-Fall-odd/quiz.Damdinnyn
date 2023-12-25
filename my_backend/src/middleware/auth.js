import jwt from "jsonwebtoken"
export const verifyToken = (request, response, next) => {
    const token = request.headers["token"] || request.body.token
    if (!token) {
        return response.status(401).json({ message: "errror" })
    } else {
        try {
            const decoded = jwt.verify(token, "SomeSecretKey");
            request.user = decoded
        } catch (err) {
            return response.status(401).json({})
        }
    }
    next()
}