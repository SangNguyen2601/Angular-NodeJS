export interface jwtService{
    signToken(any);
    verifyToken(any);
    decode(any);
}