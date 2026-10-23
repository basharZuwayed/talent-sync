export const config = {
  port: parseInt(process.env.PORT || '4000', 10),
  host: process.env.HOST || '0.0.0.0',
  nodeEnv: process.env.NODE_ENV || 'development',
  isDev: (process.env.NODE_ENV || 'development') === 'development',
  isProd: process.env.NODE_ENV === 'production',

  db: {
    url: process.env.DATABASE_URL || 'postgresql://postgres:postgrespassword@localhost:5432/talentsync'
  }
} as const;
