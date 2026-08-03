import type { UserType } from "./types";

export interface Login {
    Username: string;
    Password: string;
    UserType: UserType;
}

export interface LoginModel {
    logins: Login[];
}
