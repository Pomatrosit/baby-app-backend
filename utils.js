import jwt from "jsonwebtoken"

export const verifyJwt = (req, secretKey) => {
  const obj = {
    err: false,
    id: null,
  }

  const token = req.headers.authorization.split(" ")[1]
  jwt.verify(token, secretKey, (err, payload) => {
    if (err) obj.err = true
    obj.id = payload?.id
  })

  return obj
}
