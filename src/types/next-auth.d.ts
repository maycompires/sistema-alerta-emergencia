import 'next-auth';

type Role = 'ADMIN' | 'AUTHORITY' | 'EMERGENCY_SERVICE' | 'CITIZEN';

declare module 'next-auth' {
  interface User {
    id: string;
    role: Role;
  }

  interface Session {
    user: User & {
      id: string;
      role: Role;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: Role;
  }
} 