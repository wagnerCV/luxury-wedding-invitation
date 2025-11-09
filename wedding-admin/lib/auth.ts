// Hardcoded admin credentials (2 users only)
const ADMIN_USERS = [
  {
    email: process.env.ADMIN_EMAIL_1 || 'admin1@wedding.com',
    password: process.env.ADMIN_PASSWORD_1 || 'admin123',
    name: 'Admin 1',
  },
  {
    email: process.env.ADMIN_EMAIL_2 || 'admin2@wedding.com',
    password: process.env.ADMIN_PASSWORD_2 || 'admin123',
    name: 'Admin 2',
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
