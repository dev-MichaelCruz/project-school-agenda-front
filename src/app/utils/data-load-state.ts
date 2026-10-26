export const DATA_LOAD_TIMEOUT_MS = 30_000;

export type DataLoadState = 'idle' | 'loading' | 'loaded' | 'timeout' | 'error';
