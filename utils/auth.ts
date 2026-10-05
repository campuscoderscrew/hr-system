import { type Request, type Response, type NextFunction } from "express";
import type { SessionData } from "express-session";
import { type Login } from "./model/LoginModels";

// Adding username and userType to express-session SessionData interface
declare module "express-session" {
    interface SessionData {
        user: {
            username: string;
            userType: string;
        };
    }
}

// Credential Verifier Function
export function verifyCredentials(credentials: Login): boolean {
    const { Username, Password, UserType } = credentials;

    // Admin check
    // For now, we are using a hardcoded password check for demonstration
    const isAdmin = Username === "admin" && Password === "supersecret" && UserType === "ADMIN";
    // HR check
    const isHR = Username === "hr_user" && Password === "hrsecret" && UserType === "HR";

    return isAdmin || isHR;
}

// Authentication Middleware Function
export function requireAuth(req: Request, res: Response, next: NextFunction): void {
    // Check if the user object exists on current session (is logged in)
    if (req.session && req.session.user) {
        
        // Check if logged-in user has either Admin or HR role
        const role = req.session.user.userType;
        if (role === "ADMIN" || role === "HR") {
            next();
        } else {
            res.status(403).json({ error: "Forbidden: Only Admin and HR can perform this action." });
        }

    } else { 
        // The user is not logged in, reject the request
        res.status(401).json({ error: "Unauthorized access. Please log in first." });
    }
}
