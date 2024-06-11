# Moment 4, _Autentisering och säkerhet_
Den här README-filen har skapats för att förklara momentets syfte, kort redogöra för arbetsprocessen och beskriva installationen och användningen av webbtjänsten.

## Momentets syfte

- Kunna skapa funktionalitet för autentisering med registrering av användarkonton samt inloggning.
- Kunna använda JWT's (JSON Web Token) för sessionshantering för att förhindra obehörig åtkomst till resurser.
- Kunna skydda känslig data så som lösenord i databasen.

## Arbetsprocess

1. Utvecklingsmiljön förbereddes med NPM och Nodemon som dependencie för en live-reload-server.
2. Nödvändiga dependencies för uppgiften installerades: Express, Dotenv, Router och Mongoose. 
3. En katalog för routes skapades och häri en authroutes.js-fil. 
4. I authroutes.js-filen gjordes anslutningen till en lokal MongoDB-databas (via Compass) och routes skapades för att registrera samt logga in en användare, båda med metoden POST. 
4. Routes för registrering och inloggningen testades i ThunderClient vilket gav positivt resultat.

I koden implementeras delar av **CRUD**; create (POST), read (GET).

## Installation och anslutning till databas

Webbtjänsten använder en lokal MongoDB-databas. För att installera projektet, klona ner källkodsfilerna från detta repo och kör kommandot _npm install_ för att installera nödvändiga npm-paket beskrivna som dependencies och devDependencies i package.json-filen.

## Användning av API

Här nedan beskrivs användningen av API:et:

| **Metod** | **Endpoint**  | **Beskrivning**         |
|:---------:|:-------------:|-------------------------|
| GET       | /api          | Grundläggande sökväg.   |
| POST      | /api/register | Skapar en ny användare. |
| POST      | /api/login    | Loggar in en användare. |                                                                                                               |

### Output

Ett objekt returneras/skickas i JSON-format med följande struktur:
```
{
   ...
}
```

#### _Skapad av Jenny Lind, jeli2308_.