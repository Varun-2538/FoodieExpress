import dotenv from 'dotenv';

dotenv.config();

interface EnvConfig {
  port: number;
  nodeEnv: string;
  supabase: {
    url: string;
    anonKey: string;
    serviceRoleKey: string;
  };
  google: {
    clientId: string;
    clientSecret: string;
  };
  frontendUrl: string;
  jwtSecret: string;
}

const getEnvVar = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

export const config: EnvConfig = {
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  supabase: {
    url: getEnvVar('SUPABASE_URL'),
    anonKey: getEnvVar('SUPABASE_ANON_KEY'),
    serviceRoleKey: getEnvVar('SUPABASE_SERVICE_ROLE_KEY'),
  },
  google: {
    clientId: getEnvVar('GOOGLE_CLIENT_ID'),
    clientSecret: getEnvVar('GOOGLE_CLIENT_SECRET'),
  },
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  jwtSecret: getEnvVar('JWT_SECRET'),
};