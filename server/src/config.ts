import path from 'path'

export const config = {
  base_path: process.env.NODE_ENV === 'production' ? '/hjelpemidler/brillekalkulator/' : '/',
  build_path: path.join(__dirname, '../../client/dist'),
  port: process.env.PORT || 5000,
  node_env: process.env.NODE_ENV || 'production',
  nais_cluster_name: process.env.NAIS_CLUSTER_NAME || 'dev-gcp',
  use_msw: process.env.USE_MSW === 'true',
  git_commit: process.env.GIT_COMMIT || 'Ukjent',
  api: {
    brille_api_base_url: process.env.BRILLE_API_BASE_URL || 'http://localhost:9090',
  },
}
