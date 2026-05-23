# REST API – Work Experience

Detta repository innehåller kod för ett enklare REST API byggt med Express. APIet är byggt för att hantera arbetslivserfarenheter. Grundläggande funktionalitet för CRUD (Create, Read, Update, Delete) är implementerad.

---

## Länk

En lokal version av API:et körs på:

http://localhost:3000/api/workexperience

---

## Installation & databas

API:et använder en MySQL-databas. Klona ner källkodsfilerna, kör kommando npm install för att installera nödvändiga npm-paket. Kör installations-skriptet install.js. Installations-skriptet skapar databastabeller enligt nedanstående:

| **workexperience** |
| ------------------ | ------------ | --------------- |
| **Fält**           | **Typ**      | **Beskrivning** |
| ------             | -----        | -------         |
| id                 | INT (PK, AI) | Unikt ID        |
| ------             | -----        | -------         |
| companyname        | VARCHAR(255) | Företag         |
| ------             | -----        | -------         |
| jobtitle           | VARCHAR(255) | Jobbtitel       |
| ------             | -----        | -------         |
| location           | VARCHAR(255) | Plats           |
| ------             | -----        | -------         |
| startdate          | DATE         | Startdatum      |
| ------             | -----        | -------         |
| enddate            | DATE         | Slutdatum       |
| ------             | -----        | -------         |
| description        | TEXT         | Beskrivning     |
| ------             | -----        | -------         |

---

## Användning

| **Metod** | **Ändpunkt**        | **Beskrivning**                                                                   |
| --------- | ------------------- | --------------------------------------------------------------------------------- |
| GET       | /workexperience     | Hämtar alla tillgängliga poster.                                                  |
| -------   |
| GET       | /workexperience/:ID | Hämtar en specifik post med angivet ID.                                           |
| ------    |
| POST      | /workexperience     | Lagrar en ny post. Kräver att ett objekt skickas med.                             |
| -------   |
| PUT       | workexperience/:ID  | Uppdaterar en existerande post med angivet ID. Kräver att ett objekt skickas med. |
| -------   |
| DELETE    | workexperience/:ID  | Raderar en post med angivet ID.                                                   |
| ------    |

Ett objekt returneras/skickas som JSON med följande struktur:

{
"companyname": "Jobb",

"jobtitle": "Developer",

"location": "Stockholm",

"startdate": "2024-01-01",

"enddate": "2024-12-31",

"description": "Jobbade med webbutveckling"
}
