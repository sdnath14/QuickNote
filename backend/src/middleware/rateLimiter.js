import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    const identifier = req.ip; // you can also use req.user.id for authenticated routes
    const { success } = await ratelimit.limit(identifier);

    console.log(`Rate limit status for ${identifier}: ${success}`);

    if (!success) {
      return res.status(429).json({
        message: "Too many requests, please try again later",
      });
    }

    next();
  } catch (error) {
    console.error("Rate limit error:", error);
    next(error);
  }
};

export default rateLimiter;
