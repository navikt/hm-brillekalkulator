package main

import (
	"os"

	"github.com/navikt/hotbff"
	"github.com/navikt/hotbff/decorator"
	"github.com/navikt/hotbff/proxy"
)

func main() {
	opts := &hotbff.Options{
		BasePath: "/hjelpemidler/brillekalkulator/",
		RootDir:  "dist",
		DecoratorOpts: &decorator.Options{
			Context: "privatperson",
			Chatbot: new(bool),
		},
		Proxy: proxy.Map{
			"/api/": &proxy.Options{
				Target:      os.Getenv("BRILLE_API_BASE_URL"),
				StripPrefix: false,
			},
		},
		IDP:     "",
		EnvKeys: []string{},
	}
	hotbff.Start(opts)
}
