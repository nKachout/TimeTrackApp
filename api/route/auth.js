const jwt = require('jsonwebtoken');
const auth = (req, res, next) => {
try{
const token = req.header("x-auth-token");
if(!token)
return res.status(401).json({ severity : "Access Denied",
message: "No authentication token, access denied",
});
const verified = jwt.verify(token, process.env.JWT_SECRET);
if(!verified)
return res.status(401).json({ severity : "Authorization Denied",
message: "Token verification failed, authorization denied",
});
req.user = verified.id;
next();
} catch (err) {
res.status(500).json({ severity : "Authorization Denied",
message: err.message,
});
}
}
module.exports = auth;