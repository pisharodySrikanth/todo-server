type JwtPayload = {
  sub: number;
  userName: string;
  iat: number;
  exp: number;
};

export default JwtPayload;
