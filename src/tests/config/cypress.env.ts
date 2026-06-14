type EnvKey = keyof typeof envs;

const envs = {
  dev: { apiUrl: 'http://localhost:8080', frontendUrl: 'http://localhost:4201' },
  staging: { apiUrl: 'https://staging-api.tdappy.fr/admin', frontendUrl: 'https://staging.tdappy.fr' },
  production: { apiUrl: 'https://production-api.tdappy.fr/admin', frontendUrl: 'https://tdappy.fr' },
};

const envKey = (process.env['ENV'] ?? 'dev') as EnvKey;
export const cypressEnv = envs[envKey];
