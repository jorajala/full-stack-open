```mermaid
sequenceDiagram
participant browser
participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    Note right of browser: Browser adds the note to its list, redraws and sends it to the server

    server->>browser: 201 created
    deactivate server
```
