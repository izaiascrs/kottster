import { createApp, createIdentityProvider } from '@kottster/server';
import schema from '../../kottster-app.json';

/* 
 * For security, consider moving the secret data to environment variables.
 * See https://kottster.app/docs/deploying#before-you-deploy
 */
export const app = createApp({
  schema,
  secretKey: 'r7Hij094CS3Abntye_BVNXgq1TR57X6_',
  kottsterApiToken: 'oxW37C5z5ZPODUptr9TcSsKmV4EzNr8I',

  /*
   * The identity provider configuration.
   * See https://kottster.app/docs/app-configuration/identity-provider
   */
  identityProvider: createIdentityProvider('sqlite', {
    fileName: 'app.db',

    passwordHashAlgorithm: 'bcrypt',
    jwtSecretSalt: 'io2ywdjv1sxcdEE2',
    
    /* The root admin user credentials */
    rootUsername: 'admin',
    rootPassword: '123456789',
  }),
});