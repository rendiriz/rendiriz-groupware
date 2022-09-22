import jwt from 'jsonwebtoken';

const secret = process.env.NEXTAUTH_SECRET;

export const verify = (token: string) => {
  const payload: any = jwt.verify(token, secret as string, {
    algorithms: ['HS256'],
  });
  return payload;
};
