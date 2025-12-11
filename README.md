# hm-brillekalkulator

Åpen kalkulator på nav.no for å gi en indikasjon på om barn kan få støtte til briller og hvilken sats. 
https://www.nav.no/hjelpemidler/brillekalkulator/

Koden er delt i to separate moduler:

- `server` – Go-backend
- `client` – React-frontend

## Kom i gang

### Forutsetninger

- Node ≥ 20
- Go (for serveren)

### PNPM

Prosjektet bruker **pnpm** som pakkehåndterer. Hvis du:

- aldri har brukt pnpm før, eller
- har klonet repoet tidligere da det brukte npm

gjør følgende først:

```bash
corepack enable
```

Deretter, én gang etter at du har hentet ned pnpm-endringene:

```bash
# i prosjektroten
rm -rf node_modules package-lock.json
pnpm install

# i client
cd client
rm -rf node_modules package-lock.json
pnpm install
```

Etter dette holder det med:

- `pnpm install` i rot når du får nye root-avhengigheter
- `cd client && pnpm install` når `client/package.json` endrer seg

### Client

For å kjøre frontend lokalt:

```bash
cd client
pnpm run dev
```

MSW brukes da for å interecepte request-er til API-et.

### Server

Installer Go:

```bash
brew install go
```

### Henvendelser
Spørsmål knyttet til koden eller prosjektet kan rettes mot https://github.com/orgs/navikt/teams/teamdigihot

### Slack
- `#digihot`
- `#digihot-teknisk`
