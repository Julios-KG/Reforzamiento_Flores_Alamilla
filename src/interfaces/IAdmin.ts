import { IRole } from "./IRole";

export interface IAdmin {
    idAdmin: number,
    name: string,
    lastName: string,
    email: string,
    password: string,
    idRole: number,
    role: IRole,
}