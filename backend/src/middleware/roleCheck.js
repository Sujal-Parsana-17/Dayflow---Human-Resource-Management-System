export const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Required roles: ${allowedRoles.join(", ")}`,
      });
    }

    next();
  };
};

export const checkSelfOrAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "User not authenticated",
    });
  }

  const requestedId = req.params.id;
  const userId = req.user._id.toString();

  if (
    req.user.role !== "admin" &&
    req.user.role !== "hr" &&
    userId !== requestedId
  ) {
    return res.status(403).json({
      success: false,
      message: "Access denied. You can only view your own data.",
    });
  }

  next();
};

export default checkRole;
