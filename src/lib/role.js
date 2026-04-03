export const requireRole = (user, roles) => {
    if (!roles.includes(user.role)) {
        throw new Error("Forbidden");
    }
};