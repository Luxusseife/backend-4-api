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
5. Routes för registrering och inloggning testades i ThunderClient vilket gav positivt resultat.
6. En katalog för models skapades och häri en user.js-fil.
7. I user.js-filen skapades struktur för användaruppgifter med ett schema.
8. En import av användarmodellen gjordes till authRouter.js-filen och i sektionen som avser registering lades denna till med _new User_.
9. Funktionalitet för registrering testades i ThunderClient och nya konton kunde ses i databasen via MongoDB Compass.
10. En funktion som hashar lösenordet för samtliga registrerade användare lades till. Lösenorden kan då inte ses i ren skrift i databasen.
11. I user.js-filen skapades funktioner för inloggning och kontroll/jämförelse av hashade lösenord. 
12. I sektionen för inloggning lades det till en ordentlig kontroll av registrerat användarnamn samt kontroll av hashat lösenord. 
13. I sektionen för inloggning lades en JWT-token till som skapas vid lyckad inloggning.
14. Funktionalitet för inloggning testades i ThunderClient vilket gav positivt resultat.
15. En skyddad route läggs till i server.js-filen och en funktion som körs vid inloggning för att verifiera token och JWT.
16. Funktionalitet för åtkomst till skyddad route via inloggning testades i ThunderClient vilket gav positivt resultat.

I koden implementeras delar av **CRUD**; create (POST) samt read (GET).

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

Ett användarobjekt returneras/skickas i JSON-format med följande struktur:
```
{
   _id: ObjectId('66684e5b8e6ac19a0afe970e')
   username: "JennyLind"
   password: "$2b$10$eo5cYNQIMxV1WJDnMSNpluH2XswLd0M2.HOXhMbTzdliXEqKvNd7W"
   created: 2024-06-11T13:21:28.361+00:00
}
```

#### _Skapad av Jenny Lind, jeli2308_.