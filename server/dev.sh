#!/usr/bin/env sh
export BIND_ADDRESS=:9000

# hm-mocks
export NAIS_CLUSTER_NAME=local
export BRILLE_API_BASE_URL=http://localhost:4040

go run .