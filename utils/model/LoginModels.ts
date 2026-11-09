import type { UserType } from "./types";

export interface Login {
    username: string;
    password: string;
    usertype: UserType;
}

export type CurrentUser = Omit<Login, "password">;

export interface LoginModel {
    logins: Login[];
}

export interface EmailCode {
    email: string;
    timestamp: Date;
    code: string;
}