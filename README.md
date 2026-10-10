# Blue Talent Partners

Statisk nettside for Blue Talent Partners. Nettsiden bruker vanlig HTML, CSS og JavaScript og trenger ingen byggeprosess.

## Filer

- `index.html` – innhold, navigasjon og kontaktskjema
- `styles.css` – layout og visuell stil
- `script.js` – mobilmeny og automatisk årstall i bunnteksten
- `Kevin.jpg` – portrettet som vises i «Om»-seksjonen

## Lokal forhåndsvisning

Kjør fra prosjektmappen:

```bash
python3 -m http.server 8000
```

Åpne deretter http://localhost:8000.

## Publisering med Netlify

Koble Git-repositoriet til Netlify. Siden er statisk, så la byggekommandoen stå tom og bruk prosjektroten (`.`) som publiseringsmappe.

## Kontakt og skjema

Kontaktinformasjonen og skjemaet ligger i `index.html`. Skjemaet bruker foreløpig `mailto:` til `jorgensen.recruitment@gmail.com`, som åpner besøkendes e-postprogram. Når Netlify Forms er konfigurert, oppdater skjemaet der.