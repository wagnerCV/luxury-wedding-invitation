// Hardcoded admin credentials (2 users only)
const ADMIN_USERS = [
  {
    email: process.env.ADMIN_EMAIL_GROOM || 'groom@wedding.com',
    password: process.env.ADMIN_PASSWORD_GROOM || 'groom123',
    name: 'Jorge (Noivo)',
  },
  {
    email: process.env.ADMIN_EMAIL_BRIDE || 'bride@wedding.com',
    password: process.env.ADMIN_PASSWORD_BRIDE || 'bride123',
    name: 'Ana (Noiva)',
  },
];

export interface AdminUser {
  email: string;
  name: string;
}

export function validateCredentials(email: string, password: string): AdminUser | null {
  const user = ADMIN_USERS.find(
    (u) => u.email === email && u.password === password
  );

  if (user) {
    return {
      email: user.email,
      name: user.name,
    };
  }

  return null;
}

export function isValidAdmin(email: string): boolean {
  return ADMIN_USERS.some((u) => u.email === email);
}
