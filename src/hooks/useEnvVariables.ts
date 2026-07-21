export default function useEnvVariables() {
    const metaEnv = import.meta.env;
    const UNDER_CONSTRUCTION = metaEnv.VITE_UNDER_CONSTRUCTION === 'true';
    return { UNDER_CONSTRUCTION };
}
