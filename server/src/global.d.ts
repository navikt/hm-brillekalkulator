declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV?: 'development' | 'test' | 'production'
    NAIS_CLUSTER_NAME?: 'dev-gcp' | 'prod-gcp'

    BRILLE_API_BASE_URL?: string

    PORT?: string

    GIT_COMMIT?: string

    USE_MSW?: 'true' | 'false'
  }
}
