import type { UserType } from "./types";

export interface Login {
    username: string;
    password: string;
    userType: UserType;
}

export interface LoginModel {
    logins: Login[];
}

export interface EmailCode {
    email: string;
    timestamp: Date;
    code: string;
}