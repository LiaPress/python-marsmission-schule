# Figuren und Szenen der Station Tharsis

Die elf Geschichten in der Kursdatei verwenden dieselben Figuren wie die Sprecher beim Vorlesen. Amara und Jonas erhalten dafür eigene Frontalporträts aus demselben Figurenentwurf. Der lokale Zusatz `tharsis.js` erweitert die bereits importierte PixiJS-Vorlage 0.5.1 und nutzt den dokumentierten LiaScript-Sprecher-Hook. Die bisherigen Sprecher-Markierungen bleiben gültig.

## Figuren

| Figur | Erscheinung | Aufgabe und Darstellung |
|---|---|---|
| Amara Okoye | Dunkle Haut, Lockenknoten, cremefarbener Fluganzug mit petrolfarbenen Flächen und orangefarbenem Abzeichen, Tablet | Ruhige Kommandantin. Arbeitet innerhalb der Station; außen ausschließlich als gerahmtes Funkbild sichtbar. |
| Jonas Berg | Kupferbraunes Haar, runde Brille, kurzer Bart, passender Fluganzug, Werkzeug | Neugieriger Techniker. Meldet sich aus dem Kontrollraum; kein Aufenthalt ohne Helm im Freien. |
| Schildi | Schildkrötenförmiger Solar-Rover, sechs Räder, Antenne, cyanfarbenes Pixelgesicht | Fährt draußen auf dem Mars. Derselbe Pixelzeichensatz steuert das Borddisplay und den Sprecher beim Vorlesen. |
| Glimmis | Kleine, durchscheinende Leuchtkügelchen, bläuliche Kolonie im Eis | Werden erst in Modul 5 sichtbar. Sanftes Schweben und Farbwechsel, keine menschliche Stimme. |

## Orte und Szenenlogik

„Funkkontakt“ beginnt im geschützten Kontrollraum bei Amara. Der anschließende Schnitt zeigt die Landestelle mit Schildi. Amara bleibt in der Station und ist jetzt in einem beschrifteten Bildfunk-Fenster zu sehen. Alle weiteren Außenansichten folgen dieser Trennung. Auch wenn Crew und Rover gleichzeitig gezeigt werden, befinden sie sich an unterschiedlichen Orten.

| Geschichten | Außenansicht |
|---|---|
| Funkkontakt, Schildi antwortet, Neuer Auftrag, Die Markierung leuchtet, Felsen auf der Route | Landestelle und Route nahe der Station |
| Der Krater kommt näher, Der blaue Schimmer, Der Sturm zieht auf | Kraterrand und Eis |
| Funkstille, Es lebt!, Erster Kontakt | Kratereis mit Staubschicht; im Finale legt sich der Sturm |

Die Funkbilder sind als „STATION THARSIS / FUNK · INNENANSICHT“ beschriftet und zeigen den Kontrollraum hinter den Figuren. Sie sind eine gleichzeitige Erzählansicht, keine Behauptung einer verzögerungsfreien Verbindung zur Erde. Die Texte behalten die mehrminütige Funklaufzeit bei.

[Vorschau: Schildi und Amaras Funkbild](funkkontakt-vorschau.webp)

## Animation und Bedienung

- Einblendungen und Schildis Einfahrt strukturieren die Dialoge.
- Funkimpulse erscheinen als sanft auslaufende Ringe, ohne grelle Vollbildblitze.
- Bewegte Staubpartikel und Dunst unterscheiden ruhige Außenansichten vom Sturm. Das Wetter liegt über dem Außenhintergrund und hinter den Funkfenstern; die Station bleibt geschützt.
- Die Glimmis schweben sanft und wechseln beim Kontakt von Blau zu Grün.
- `prefers-reduced-motion` deaktiviert die eigenen Bewegungen und Impulse; PixiJS berücksichtigt die Einstellung zusätzlich bei seinen Übergängen.
- Sprecher werden auf jeder Kursseite initialisiert, auch beim direkten Einstieg in ein späteres Kapitel.

## Bilddateien und Herkunft

Die Illustrationen wurden für diesen Kurs mit dem eingebauten Bildgenerator erzeugt. PNG-Dateien bleiben als Originale erhalten; der Kurs lädt komprimierte WebP-Dateien. Die Szenenfiguren stammen aus dem gemeinsamen Bildbogen; die Frontalporträts wurden anhand dieses Bogens erzeugt. Die Glimmis und Displayanimationen sind mit PixiJS beziehungsweise Canvas gezeichnet.

| Datei unter `assets/images/` | Inhalt |
|---|---|
| `tharsis-crew.webp` | Gemeinsamer transparenter Figurenbogen mit Amara, Jonas und Schildi |
| `mars-landestelle.webp` | Mars-Landestelle mit Station und Reifenspuren |
| `station-tharsis.webp` | Kontrollraum mit Mars-Panoramafenster |
| `krater-eis.webp` | Marskrater mit cyanfarbenem Eis |
| `amara-speaker.webp` | Amara frontal: ruhend, sprechend, blinzelnd und zwinkernd |
| `jonas-speaker.webp` | Jonas frontal: ruhend, sprechend, blinzelnd und zwinkernd |

Die Turtle-Aufgaben verwenden zusätzlich eine passende Draufsicht in `lia-templates/python-pruefung/assets/schildi-oben.png`. Das Original wurde mit dem eingebauten Bildgenerator anhand des gemeinsamen Figurenbogens erzeugt; die optimierte PNG-Datei wird in die 48 × 48 große SVG-Form eingebettet. Dadurch funktionieren die Drehung und beide Sensorkegel ohne zusätzliche Bildabfragen. Das Pixel-Display kennzeichnet die Vorderseite, die Antenne sitzt hinten.

**Prompt für die Draufsicht:** Matching Schildi rover from the right-hand figure of the crew reference, strictly overhead orthographic plan view, front pointing up, six dark wheels with three on each side, petrol-blue solar dome with cream ribs, cream and petrol chassis, orange accents, cyan pixel display at the front, antenna with cyan tip near the rear. Centered square sprite with transparent margins, simplified for 48 × 48 display, no ground, shadow, people or text. Reference: `assets/images/tharsis-crew.png`.

## Verwendete Bildprompts

Gemeinsame Vorgaben: Illustration für Jugendliche, Retro-Raumfahrtplakat, klare nachtblaue Konturen, cremefarbene und petrolfarbene Technik, rostrote Marslandschaft und cyanfarbene Lichtakzente. Keine Beschriftungen in den erzeugten Bildern; deutsche Beschriftungen werden im Programm ergänzt.

1. **Figurenbogen:** Transparent character sprite atlas, three subjects: commander Amara Okoye, adult Black woman with tightly curled hair in a high bun, cream and petrol flight suit, orange shoulder badge, mission tablet; technician Jonas Berg, light skin, tousled copper-brown hair, short stubble, round glasses, matching flight suit and utility belt, wrench; Schildi, turtle-shaped six-wheel Mars rover with solar dome, antenna and cyan pixel display. Coherent flat retro space-poster illustration, front three-quarter poses, full bodies, no helmets, no text, transparent background. Requested canvas: 1536 × 1024.
2. **Landestelle:** Wide 16:9 retro space-poster background, rust-red rocky plain, wheel tracks curving toward a cream and petrol habitat dome and radio antenna, distant mesas, low sun and deep navy sky. Warm low sunlight and long shadows. Open foreground for character sprites and dialogue. No people, no rover, no text.
3. **Station:** Wide 16:9 retro space-poster background, protected Mars habitat interior, cream curved ribs and petrol consoles, cyan graphs and amber lights, large panoramic window onto Mars mesas at dawn. Open foreground, no people, no robots, no labels.
4. **Krater:** Wide 16:9 retro space-poster background, terraced rust-red crater walls, deep blue sky, translucent cyan ice crystals in dark rock, frozen channel, amber rim light against cool reflected ice light. Open lower foreground, no characters, no rover, no creatures, no lettering.

## Technische Grundlage

- [PixiJS-Vorlage 0.5.1: Figuren, Erweiterungen und Animationen](https://github.com/LiaTemplates/pixijs/tree/0.5.1)
- LiaScript-Sprecher-Hook (`LIA.narrator.registerAvatar`): `tharsis.js` meldet das eigene Sprecherbild `tharsis-speaker` direkt an. Das Makro `@Tharsis.speaker(okoye|berg)` im Kopf von `README.md` legt vor einem Vorlese-Kommentar fest, wer spricht. Schildi hat ein eigenes Makro `@Tharsis.schildi`, das zusätzlich die Stimme verändert (`data-pitch="2"`, `data-rate="1.05"`), damit er sich von Jonas abhebt – beide nutzen „Deutsch Male“. Die Vorlage „Virtual Speaker“ (2 MB) wird dafür seit Version 1.0.2 nicht mehr gebraucht.

Die eigenen Sprecher zeigen Amara und Jonas frontal. Zwei Bildbögen enthalten je vier Zustände in einem 2 × 2-Raster: ruhend, sprechend, blinzelnd und zwinkernd. Aus dem unveränderten Grundporträt werden nur die Mund- und Augenbereiche ausgetauscht; Kopf, Haare und Schultern bleiben ruhig. Mundbewegungen folgen dem Vorlesestatus und den Wortgrenzen, mit einem rhythmischen Wechsel zwischen offen und geschlossen. Es handelt sich nicht um eine Analyse einzelner Laute.

Das Sprecherbild wirkt wie eine Funkübertragung: feine Bildzeilen, leichtes Rauschen, ein langsam durchlaufender Lichtstreifen und zuckende Einzelzeilen. Alle 1,5–5 Sekunden kommt eine kurze Störung, zufällig eine von fünf Arten: verrutschende Bildstreifen, ein Riss mit versetzter unterer Bildhälfte, ein Geisterbild, ein kurzes Durchrutschen des Bildes nach unten oder ein Signalausfall mit starkem Rauschen. Grelle Blitze gibt es nicht. Bei „reduzierter Bewegung“ bleiben nur die ruhigen Bildzeilen. Lädt ein Porträt nicht, versucht `tharsis.js` es zweimal erneut und zeigt solange den Kopf aus dem Figurenbogen; fehlt auch dieser, zeigt das Fenster Bildrauschen statt einer leeren Fläche.

Pause, Stopp und Fehler schließen den Mund sofort. Blinzeln erfolgt auch im Ruhezustand in Abständen von ungefähr 3,5–6,5 Sekunden. Nach einem Sprechabschnitt ist gelegentlich ein kurzes Zwinkern möglich, höchstens einmal in 15 Sekunden. Schildis virtueller Sprecher zeigt ausschließlich cyanfarbene Pixelaugen und den animierten Mund auf transparentem Hintergrund, ohne Monitorgehäuse, Rahmen oder Funkstörungen. Er kann ebenfalls blinzeln und zwinkern. Bei reduzierter Bewegung bleiben die Porträts ruhig; die Funkanzeige der Crew zeigt den Sprechstatus weiterhin an.

**Prompts für die Sprecher:** Je ein frontal ausgerichteter Kopf-und-Schultern-Bildbogen anhand des gemeinsamen Figurenbogens, direkte Blickrichtung in die Kamera, identische Position und Größe in vier Rasterzellen. Amara mit dunkler Haut und hohem Lockenknoten; Jonas mit kupferbraunem Haar, runder Brille und kurzem Bart. Cremefarbene und petrolfarbene Fluganzüge mit orangefarbenen Details. Oben links Mund geschlossen und Augen offen; oben rechts natürlich geöffneter Mund; unten links beide Augen geschlossen; unten rechts ein Auge zwinkernd geschlossen. Transparenter Hintergrund, keine Beschriftung, keine Hände oder Werkzeuge. Mit dem eingebauten Bildgenerator erzeugt; Referenz: `assets/images/tharsis-crew.png`.

## Prüfung am 27.10.2026

1. Die technische Kursprüfung mit dem vorhandenen `check-material.mjs` ist bei 1280 × 900 und 390 × 844 bestanden: 68 Seiten, 34 dargestellte Quizfragen, keine fehlenden Bilder und keine Laufzeitfehler. Einige Quizfragen brauchen wie bisher Scrollen.
2. Alle elf Geschichten sind mit der tatsächlich verwendeten PixiJS-Version ohne Parserfehler geprüft und in Chromium gestartet und weitergeschaltet worden. Funkkontakt, Stations-Funkfenster, Sturm und Glimmi-Darstellung wurden zusätzlich anhand von Bildschirmaufnahmen angesehen.
3. Schildis eigenes Sprecher-Display wurde im Browser dargestellt. Alle 68 Kursseiten initialisieren den Sprecher gesondert, damit ein direkter Einstieg in spätere Kapitel funktioniert.
4. Die bisherige didaktische Kursfreigabe wurde nicht durch diesen technischen Test ersetzt. Bedienung und Vorlesen auf einem echten Smartphone bleiben als Vorbereitung im Journal vermerkt.
5. Die Frontal-Sprecher wurden gesondert im Browser geprüft: wechselnde Mundöffnung beim Sprechen, Pause/Fortsetzen/Stopp, Blinzeln in Ruhe, Zwinkern, reduzierte Bewegung, Sprecherwechsel sowie Entfernen des Avatars ohne zurückbleibende Ereignisbehandlung. Keine Browserfehler.
