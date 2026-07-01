const applyRoleFilter = (user, resource) => {
    // Admin & management see everything 
    if (["admin", "management"].includes(user.role)) {
        return {};
    }
    switch (resource) {
        case "payments":
        case "wallets":
        case "enrollments":
        return { user: user._id };
        case "courseBatches":
        return { students: user._id };
        case "courses":
        return { students: user._id };
        case "classes":
        return { students: user._id };
        case "attendance":
        return { student: user._id };
        
        return {};
        default:
        return {};
    }
    };
module.exports = applyRoleFilter;
    
