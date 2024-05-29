export type AuthenticationState = {
  readonly refreshToken: string | null;
  readonly accessToken: string | null;
} | null;