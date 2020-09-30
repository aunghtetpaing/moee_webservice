export interface JwtPayload {
    uuid: string,
    active: boolean,
    roles: string,
    iat: string;
    exp: string;
}