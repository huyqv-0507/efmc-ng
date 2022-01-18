export interface JwtTokenModel {
    userId: number;
    userName: string;
    expire?: number;
    issuer?: string;
    audience?: string;
}
