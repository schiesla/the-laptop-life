
/**
 * @returns Environment variables set in the Amplify console. Not dynamic, so these
 * are read at build time and if changed in the console, a re-deploy is necessary to pull
 * new values.
 */
 export default function useEnvVariables() {
    const metaEnv = import.meta.env;
    const UNDER_CONSTRUCTION = metaEnv.VITE_UNDER_CONSTRUCTION === 'true';
    const ENABLE_NEWSLETTER = metaEnv.VITE_ENABLE_NEWSLETTER === 'true';
    return { UNDER_CONSTRUCTION, ENABLE_NEWSLETTER };
}
