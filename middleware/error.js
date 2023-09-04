module.exports = (err, req, res, next) => {
   err.message = err.message || "Internal Server Error";
   err.statusCode = err.statusCode || 500;

   res.status(statusCode).json({
      success: false,
      message: err.message,
      error: err,
   });
   next();
};
