<!--
author:   André Dietrich
email:    LiaScript@web.de
version:  0.0.1
language: de
narrator: Deutsch Female
comment:  Python im Browser (Skulpt) mit verstecktem Prüfteil und Rückmeldung – für Selbstlernkurse ohne Lehrkraft.

import:   https://raw.githubusercontent.com/LiaTemplates/Skulpt/0.0.7/README.md

script:   ./python-pruefung.js

@PythonCheck.eval: @PythonCheck.eval_(@uid)

@PythonCheck.eval_
<script>
window.PythonCheck.runAll("@'input(0)", "@'input(1)", { visible: "pc_vis_@0", hidden: "pc_hid_@0" }, send, console)
"LIA: terminal"
</script>
<div id="pc_hid_@0" style="display:none"></div>
@end

@PythonCheck.turtle: @PythonCheck.turtle_(@uid)

@PythonCheck.turtle_
<script>
window.PythonCheck.runAll("@'input(0)", "@'input(1)", { visible: "pc_vis_@0", hidden: "pc_hid_@0" }, send, console)
"LIA: terminal"
</script>
<div class="persistent" id="pc_vis_@0" role="img" aria-label="Zeichenfläche der Turtle" style="width: 400px; max-width: 100%; height: 400px; border: 1px solid #ccc;"></div>
<div id="pc_hid_@0" style="display:none"></div>
@end

@PythonCheck.krater: @PythonCheck.krater_(@uid)

@PythonCheck.krater_
<script>
window.PythonCheck.runAll("@'input(0)", "@'input(1)", { visible: "pc_vis_@0", hidden: "pc_hid_@0", mars: true }, send, console)
"LIA: terminal"
</script>
<div class="persistent" id="pc_vis_@0" data-fullwidth="true" role="img" aria-label="Zeichenfläche: Schildi im Krater" style="width: 100%; height: 400px; border: 1px solid #ccc; background-size: cover; background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiB2aWV3Qm94PSIwIDAgNDAwIDQwMCI+CiAgPGRlZnM+CiAgICA8cmFkaWFsR3JhZGllbnQgaWQ9InNlbmtlIiBjeD0iNTAlIiBjeT0iNTIlIiByPSI3MCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiM1ZTNhMmMiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIwLjU1IiBzdG9wLWNvbG9yPSIjN2E0NDMwIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMC44NSIgc3RvcC1jb2xvcj0iI2E1NTgzYSIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNjOTc3NGYiLz4KICAgIDwvcmFkaWFsR3JhZGllbnQ+CiAgICA8cmFkaWFsR3JhZGllbnQgaWQ9ImdsYW56IiBjeD0iNTAlIiBjeT0iNTAlIiByPSI1MCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNiZmVlZjUiIHN0b3Atb3BhY2l0eT0iMC45Ii8+CiAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzJBOURCMCIgc3RvcC1vcGFjaXR5PSIwIi8+CiAgICA8L3JhZGlhbEdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0idXJsKCNzZW5rZSkiLz4KICA8IS0tIEtyYXRlcnJhbmQ6IGhlbGxlcmVyIFJpbmcgYW4gZGVuIFLDpG5kZXJuIC0tPgogIDxyZWN0IHg9IjYiIHk9IjYiIHdpZHRoPSIzODgiIGhlaWdodD0iMzg4IiByeD0iMTYwIiBmaWxsPSJub25lIiBzdHJva2U9IiNkOTkwNjgiIHN0cm9rZS13aWR0aD0iMTAiIG9wYWNpdHk9IjAuMzUiLz4KICA8IS0tIFNjaGF0dGVuIGRlciBzdGVpbGVuIFdhbmQgb2JlbiAtLT4KICA8cGF0aCBkPSJNMCwwIEg0MDAgVjYwIEMzMDAsMzAgMTAwLDMwIDAsNjAgWiIgZmlsbD0iIzNlMjIxOSIgb3BhY2l0eT0iMC4zNSIvPgogIDwhLS0gR2Vyw7ZsbCAtLT4KICA8ZyBmaWxsPSIjNGEyYTFlIiBvcGFjaXR5PSIwLjciPgogICAgPGVsbGlwc2UgY3g9IjcwIiBjeT0iMzIwIiByeD0iNyIgcnk9IjQiLz4KICAgIDxlbGxpcHNlIGN4PSIzMzAiIGN5PSIzMDAiIHJ4PSI5IiByeT0iNSIvPgogICAgPGVsbGlwc2UgY3g9IjI1MCIgY3k9IjkwIiByeD0iNSIgcnk9IjMiLz4KICAgIDxlbGxpcHNlIGN4PSIxMjAiIGN5PSIxNDAiIHJ4PSI2IiByeT0iNCIvPgogICAgPGVsbGlwc2UgY3g9IjMwMCIgY3k9IjIwMCIgcng9IjQiIHJ5PSIzIi8+CiAgICA8ZWxsaXBzZSBjeD0iMTYwIiBjeT0iMzYwIiByeD0iNiIgcnk9IjMiLz4KICA8L2c+CiAgPCEtLSBFaXNrcmlzdGFsbGUgbWl0IEdsYW56IC0tPgogIDxnPgogICAgPGNpcmNsZSBjeD0iOTAiIGN5PSI5MCIgcj0iMTYiIGZpbGw9InVybCgjZ2xhbnopIi8+CiAgICA8cGF0aCBkPSJNOTAsODAgTDk0LDkwIEw5MCwxMDAgTDg2LDkwIFoiIGZpbGw9IiNkZmY3ZmIiLz4KICAgIDxjaXJjbGUgY3g9IjMyMCIgY3k9IjEyMCIgcj0iMTQiIGZpbGw9InVybCgjZ2xhbnopIi8+CiAgICA8cGF0aCBkPSJNMzIwLDExMSBMMzIzLDEyMCBMMzIwLDEyOSBMMzE3LDEyMCBaIiBmaWxsPSIjZGZmN2ZiIi8+CiAgICA8Y2lyY2xlIGN4PSIzMDAiIGN5PSIzNTAiIHI9IjE4IiBmaWxsPSJ1cmwoI2dsYW56KSIvPgogICAgPHBhdGggZD0iTTMwMCwzMzkgTDMwNSwzNTAgTDMwMCwzNjEgTDI5NSwzNTAgWiIgZmlsbD0iI2RmZjdmYiIvPgogICAgPGNpcmNsZSBjeD0iNjAiIGN5PSIyMzAiIHI9IjEyIiBmaWxsPSJ1cmwoI2dsYW56KSIvPgogICAgPHBhdGggZD0iTTYwLDIyMiBMNjMsMjMwIEw2MCwyMzggTDU3LDIzMCBaIiBmaWxsPSIjZGZmN2ZiIi8+CiAgICA8Y2lyY2xlIGN4PSIyMTAiIGN5PSIzMDAiIHI9IjEwIiBmaWxsPSJ1cmwoI2dsYW56KSIvPgogICAgPHBhdGggZD0iTTIxMCwyOTMgTDIxMiwzMDAgTDIxMCwzMDcgTDIwOCwzMDAgWiIgZmlsbD0iI2RmZjdmYiIvPgogIDwvZz4KICA8IS0tIGZlaW5lciBTdGF1YiAtLT4KICA8ZyBmaWxsPSIjZTJhMjdlIiBvcGFjaXR5PSIwLjQiPgogICAgPGNpcmNsZSBjeD0iMTUwIiBjeT0iNjAiIHI9IjEuNSIvPjxjaXJjbGUgY3g9IjI2MCIgY3k9IjI1MCIgcj0iMS41Ii8+PGNpcmNsZSBjeD0iMzUwIiBjeT0iNjAiIHI9IjEuNSIvPgogICAgPGNpcmNsZSBjeD0iNDAiIGN5PSIzODAiIHI9IjEuNSIvPjxjaXJjbGUgY3g9IjE5MCIgY3k9IjIwMCIgcj0iMS4yIi8+PGNpcmNsZSBjeD0iMzcwIiBjeT0iMjQwIiByPSIxLjIiLz4KICA8L2c+Cjwvc3ZnPgo=);"></div>
<div id="pc_hid_@0" style="display:none"></div>
@end

@PythonCheck.mars: @PythonCheck.mars_(@uid)

@PythonCheck.mars_
<script>
window.PythonCheck.runAll("@'input(0)", "@'input(1)", { visible: "pc_vis_@0", hidden: "pc_hid_@0", mars: true }, send, console)
"LIA: terminal"
</script>
<div class="persistent" id="pc_vis_@0" data-fullwidth="true" role="img" aria-label="Zeichenfläche: Schildi auf dem Marsboden" style="width: 100%; height: 400px; border: 1px solid #ccc; background-size: cover; background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiB2aWV3Qm94PSIwIDAgNDAwIDQwMCI+CiAgPGRlZnM+CiAgICA8cmFkaWFsR3JhZGllbnQgaWQ9InNhbmQiIGN4PSI1MCUiIGN5PSI0NSUiIHI9Ijc1JSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2Q5ODI0ZiIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNiNTUzMmEiLz4KICAgIDwvcmFkaWFsR3JhZGllbnQ+CiAgICA8cmFkaWFsR3JhZGllbnQgaWQ9ImtyYXRlciIgY3g9IjUwJSIgY3k9IjUwJSIgcj0iNTAlIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjOWM0NDIxIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMC43IiBzdG9wLWNvbG9yPSIjYTk1MDJhIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2M5NmEzYSIvPgogICAgPC9yYWRpYWxHcmFkaWVudD4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9InVybCgjc2FuZCkiLz4KICA8Y2lyY2xlIGN4PSIzMTAiIGN5PSI5MCIgcj0iMzgiIGZpbGw9InVybCgja3JhdGVyKSIvPgogIDxjaXJjbGUgY3g9IjMxMCIgY3k9IjkwIiByPSIzOCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZTNhMDc0IiBzdHJva2Utd2lkdGg9IjMiIG9wYWNpdHk9IjAuNiIvPgogIDxjaXJjbGUgY3g9IjgwIiBjeT0iMzAwIiByPSIyMiIgZmlsbD0idXJsKCNrcmF0ZXIpIi8+CiAgPGNpcmNsZSBjeD0iODAiIGN5PSIzMDAiIHI9IjIyIiBmaWxsPSJub25lIiBzdHJva2U9IiNlM2EwNzQiIHN0cm9rZS13aWR0aD0iMiIgb3BhY2l0eT0iMC42Ii8+CiAgPGcgZmlsbD0iIzhhM2IxYyIgb3BhY2l0eT0iMC44Ij4KICAgIDxlbGxpcHNlIGN4PSI2MCIgY3k9IjcwIiByeD0iOSIgcnk9IjYiLz4KICAgIDxlbGxpcHNlIGN4PSIxNTAiIGN5PSIzNDAiIHJ4PSI2IiByeT0iNCIvPgogICAgPGVsbGlwc2UgY3g9IjM0MCIgY3k9IjI2MCIgcng9IjExIiByeT0iNyIvPgogICAgPGVsbGlwc2UgY3g9IjIzMCIgY3k9IjQwIiByeD0iNSIgcnk9IjMiLz4KICAgIDxlbGxpcHNlIGN4PSIyNzAiIGN5PSIzNTAiIHJ4PSI3IiByeT0iNSIvPgogICAgPGVsbGlwc2UgY3g9IjMwIiBjeT0iMTkwIiByeD0iNSIgcnk9IjQiLz4KICA8L2c+CiAgPGcgZmlsbD0iI2U4YTc3YyIgb3BhY2l0eT0iMC41Ij4KICAgIDxjaXJjbGUgY3g9IjEyMCIgY3k9IjEyMCIgcj0iMiIvPjxjaXJjbGUgY3g9IjIwMCIgY3k9IjI2MCIgcj0iMiIvPjxjaXJjbGUgY3g9IjM2MCIgY3k9IjE3MCIgcj0iMiIvPgogICAgPGNpcmNsZSBjeD0iMjUwIiBjeT0iMTUwIiByPSIxLjUiLz48Y2lyY2xlIGN4PSIxMDAiIGN5PSIyMzAiIHI9IjEuNSIvPjxjaXJjbGUgY3g9IjE4MCIgY3k9IjgwIiByPSIxLjUiLz4KICA8L2c+Cjwvc3ZnPgo=);"></div>
<div id="pc_hid_@0" style="display:none"></div>
@end
-->

# python-pruefung

Python im Browser mit **verstecktem Prüfteil**: Der Code der Schüler:innen läuft wie gewohnt mit Skulpt; danach prüft ein zweiter, unsichtbarer Durchlauf das Programm und meldet „Geschafft!“ oder einen Hinweis.

Einbinden (im Projekt):

`import: ./lia-templates/python-pruefung/README.md`

## Ausgabe prüfen

Der erste Kasten ist der Code der Schüler:innen, der zweite (mit `-` im Namen, zugeklappt) der Prüfteil. `@PythonCheck.eval` steht direkt darunter.

```python
print("SCHILDI, hörst du mich?")
```
```python -Prüfung
erwarte("SCHILDI" in ausgabe(), "Schildi hat nichts empfangen – fehlt print oder der Name SCHILDI?")
```
@PythonCheck.eval

## Variablen prüfen

```python
akku = 80
strecke = 12
```
```python -Prüfung
erwarte(akku == 80, "Der Akkustand soll 80 sein.")
erwarte(strecke > 10, "Schildi soll mehr als 10 Meter fahren.")
```
@PythonCheck.eval

## Funktionen mit Testwerten prüfen

```python
def addiere(a, b):
    return a + b
```
```python -Prüfung
erwarte(addiere(2, 3) == 5, "addiere(2, 3) soll 5 ergeben.")
erwarte(addiere(-1, 1) == 0, "Auch mit negativen Zahlen rechnen – addiere(-1, 1) soll 0 ergeben.")
```
@PythonCheck.eval

## Feste Eingaben prüfen

Die Zeile `# eingaben:` legt fest, was `input()` im Prüflauf bekommt (durch Kommas getrennt). Beim sichtbaren Lauf tippen die Schüler:innen selbst.

```python
zahl = int(input("Wie viele Proben? "))
print("Ich sammle", zahl, "Proben.")
```
```python -Prüfung
# eingaben: 3
erwarte("3 Proben" in ausgabe(), "Bei Eingabe 3 soll 'Ich sammle 3 Proben.' erscheinen.")
```
@PythonCheck.eval

## Turtle-Zeichnung prüfen

`turtle_linien()` liefert die gezeichneten Strecken als `(x1, y1, x2, y2)`.

```python
import turtle
schildi = turtle.Turtle()
for i in range(4):
    schildi.forward(50)
    schildi.left(90)
```
```python -Prüfung
linien = turtle_linien()
erwarte(len(linien) == 4, "Die Landemarkierung braucht genau 4 Seiten.")
for (x1, y1, x2, y2) in linien:
    laenge = ((x2 - x1) ** 2 + (y2 - y1) ** 2) ** 0.5
    erwarte(abs(laenge - 50) < 2, "Jede Seite soll 50 Schritte lang sein.")
erwarte(linien[-1][2] == linien[0][0] and linien[-1][3] == linien[0][1], "Die Markierung soll geschlossen sein – Schildi muss wieder am Start ankommen.")
```
@PythonCheck.turtle

Hinweis: Aufgezeichnet werden `forward`/`fd`, `backward`/`back` und `goto` eines `turtle.Turtle()`-Objekts – nicht die Befehle direkt auf dem Modul (`turtle.forward(…)`).

## Schildi auf dem Mars

`@PythonCheck.mars` bringt eine Zeichenfläche in voller Breite mit Marsboden mit. Jede neue `turtle.Turtle()` ist automatisch **Schildi** (passende Draufsicht des neuen Solar-Rovers mit sechs Rädern; Pixel-Display = vorn, Antenne = hinten). Das Bild dreht sich mit – im Code muss dafür nichts stehen. Zeilennummern in Fehlermeldungen zählen ohne diese Einrichtung. Die PNG-Grafik ist in die SVG-Form eingebettet und wird auch in beiden Sensorkegeln verwendet.

```python
import turtle
schildi = turtle.Turtle()
schildi.color("#FBF7F2")
schildi.pensize(3)
for i in range(4):
    schildi.forward(80)
    schildi.left(90)
```
```python -Prüfung
erwarte(len(turtle_linien()) == 4, "Die Landemarkierung braucht genau 4 Seiten.")
```
@PythonCheck.mars

## Fehler im Code

Ein Fehler erscheint wie gewohnt; geprüft wird erst, wenn das Programm läuft.

```python
print("SCHILDI, hörst du mich?)
```
```python -Prüfung
erwarte("SCHILDI" in ausgabe(), "Schildi hat nichts empfangen.")
```
@PythonCheck.eval

## Endlosschleife und Stopp

Eine Schleife, die nie endet, bricht nach 5 Sekunden ab (mit Turtle nach 30 Sekunden). Die Zeile wird markiert. Der Browser bleibt dabei bedienbar, und **Stopp** beendet das Programm sofort.

Hier fehlt `akku = akku - 10` – probier einmal abwarten und einmal Stopp:

```python
akku = 50
while akku > 20:
    print(akku)
```
```python -Prüfung
erwarte(True)
```
@PythonCheck.eval

Und mit der richtigen Zeile endet die Schleife von selbst:

```python
akku = 50
while akku > 20:
    akku = akku - 10
print(akku)
```
```python -Prüfung
erwarte(akku == 20, "Am Ende soll der Akku bei 20 stehen.")
```
@PythonCheck.eval

## Kraterfeld mit Sensor

Mit `# felsen: x y, x y` im Prüfteil liegen Felsen auf dem Marsboden (`@PythonCheck.mars`). Schildi trägt dann einen Lichtkegel: `schildi.hindernis()` ist `True`, wenn ein Felsen im Viertelkreis vor ihm liegt. Mit `# pruef-felsen:` liegt im unsichtbaren Prüflauf ein **anderes** Feld – ein Programm, das nur für das sichtbare Feld passt, fällt dort durch. `turtle_ziel()` liefert Schildis Endpunkt.

**1. Fahren bis zum Felsen** – Schildi hält von selbst an:

```python
import turtle
schildi = turtle.Turtle()
while not schildi.hindernis():
    schildi.forward(10)
```
```python -Prüfung
# felsen: 150 0
# pruef-felsen: 90 0
erwarte("hindernis()" in code(), "Lass Schildi mit dem Sensor entscheiden.")
erwarte(turtle_ziel()[0] > 0, "Schildi soll bis vor den Felsen fahren.")
```
@PythonCheck.mars

**2. Zusammenstoß** – ohne Sensor fährt Schildi gegen den Felsen (die Zeile wird markiert):

```python
import turtle
schildi = turtle.Turtle()
schildi.forward(300)
```
```python -Prüfung
# felsen: 150 0
erwarte(True)
```
@PythonCheck.mars

**3. Durchs Kraterfeld** – bei einem Felsen nach links drehen, sonst fahren. Im Prüflauf liegen die Felsen anders:

```python
import turtle
schildi = turtle.Turtle()
for i in range(40):
    if schildi.hindernis():
        schildi.left(90)
    else:
        schildi.forward(10)
```
```python -Prüfung
# felsen: 120 0, 60 120
# pruef-felsen: 80 0, 0 140
erwarte(len(turtle_linien()) > 10, "Schildi soll ein gutes Stück durchs Feld fahren.")
```
@PythonCheck.mars

**4. Fest einprogrammierte Route** – passt im sichtbaren Feld, aber nicht im Prüffeld:

```python
import turtle
schildi = turtle.Turtle()
schildi.forward(60)
schildi.left(90)
schildi.forward(100)
```
```python -Prüfung
# felsen: 120 0
# pruef-felsen: 60 60
erwarte(True)
```
@PythonCheck.mars

## Schildi im Krater

`@PythonCheck.krater` funktioniert wie `@PythonCheck.mars`, nur mit dem Kraterboden als Hintergrund – auch mit Felsen und Sensor.

```python
import turtle
schildi = turtle.Turtle()
for i in range(6):
    schildi.forward(60)
    schildi.left(60)
```
```python -Prüfung
# felsen: 120 -80
erwarte(len(turtle_linien()) == 6, "Ein Sechseck hat 6 Seiten.")
```
@PythonCheck.krater
