// Modelltests für python-pruefung: node --test lia-templates/python-pruefung/check.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";

const require = createRequire(import.meta.url);
const pc = require("./python-pruefung.js");

test("Prüfpunkt 2: feste Eingaben werden aus '# eingaben:' gelesen", () => {
  assert.deepEqual(pc.parseInputs("# eingaben: 3, 7, hallo\nerwarte(True)"), ["3", "7", "hallo"]);
  assert.deepEqual(pc.parseInputs("  #Eingaben:42"), ["42"]);
  assert.deepEqual(pc.parseInputs("erwarte(True)"), []);
  assert.deepEqual(pc.parseInputs("# eingaben:"), []);
});

test("Terminal-Eingabe: Zeilenumbruch am Ende fällt weg, wie bei Pythons input()", () => {
  assert.equal(pc.cleanInput("vor\n"), "vor");
  assert.equal(pc.cleanInput("vor\r\n"), "vor");
  assert.equal(pc.cleanInput(" vor "), " vor ");
  assert.equal(pc.cleanInput(undefined), "");
});

test("Eingaben mit Sonderzeichen werden sichere Python-Strings", () => {
  assert.equal(pc.pyString('Er sagt "hi"\\'), '"Er sagt \\"hi\\"\\\\"');
  assert.equal(pc.pyString("a\nb"), '"a\\nb"');
});

test("Prüfpunkt 1: das Prüfprogramm hängt den Prüfteil hinter den Schüler-Code", () => {
  const p = pc.buildCheckProgram('print("SCHILDI")', '# eingaben: 5\nerwarte("SCHILDI" in ausgabe(), "fehlt print?")');
  const iLearner = p.code.indexOf('print("SCHILDI")');
  const iMark = p.code.indexOf(pc.MARK);
  const iCheck = p.code.indexOf("erwarte(\"SCHILDI\"");
  assert.ok(iLearner > 0 && iLearner < iMark && iMark < iCheck);
  assert.deepEqual(p.inputs, ["5"]);
  assert.match(p.code, /_pc_eingaben = \["5"\]/);
});

test("Prüfpunkt 2: Vorspann ersetzt print und input und bietet die Prüf-Bausteine", () => {
  const pre = pc.prelude(["1"]);
  for (const name of ["def print(", "def input(", "def ausgabe(", "def erwarte(", "def turtle_linien("]) {
    assert.ok(pre.includes(name), name);
  }
});

test("Prüfpunkt 2 (Turtle): Aufzeichnung baut immer auf der Original-Turtle auf und wird danach abgebaut", () => {
  const pre = pc.prelude([]);
  assert.ok(pre.includes("_pc_turtle._pc_original = _pc_turtle.Turtle"), "Original wird einmal gemerkt");
  assert.ok(pre.includes("_PcOrig = _pc_turtle._pc_original"), "Aufzeichnung erbt vom Original, nicht von einer früheren Aufzeichnung");
  assert.ok(!pre.includes("_PcOrig = _pc_turtle.Turtle"), "nie von der (evtl. schon ersetzten) aktuellen Turtle erben");
  const restore = pc.restoreProgram();
  assert.match(restore, /_pc_turtle\.Turtle = _pc_turtle\._pc_original/);
});

test("Turtle-Korrekturen: werden genau einmal angewendet und melden fehlende Stellen", () => {
  const src = pc.TURTLE_PATCHES.map(([from]) => from).join("|");
  const r = pc.patchTurtleSource(src);
  assert.equal(r.missing.length, 0);
  for (const [, to] of pc.TURTLE_PATCHES) assert.ok(r.src.includes(to));
  assert.equal(pc.patchTurtleSource(r.src).src, r.src, "zweites Anwenden ändert nichts");
  assert.equal(pc.patchTurtleSource("anderer Code").missing.length, pc.TURTLE_PATCHES.length);
});

test("Mars: Einrichtung macht jede neue Turtle zu Schildi und baut auf der aktuellen Turtle auf", () => {
  const s = pc.marsSetup();
  assert.match(s, /register_shape\("data:image\/svg\+xml;base64,/);
  assert.match(s, /_MarsBase = _mars_t\.Turtle/);
  assert.match(s, /_mars_t\._pc_original = _mars_t\.Turtle/);
  const p = pc.buildCheckProgram("schildi = turtle.Turtle()", "erwarte(True)", s);
  assert.ok(p.code.indexOf("_pc_turtle.Turtle = Turtle") < p.code.indexOf("_mars_t.Turtle = Turtle"), "Aufzeichnung zuerst, Schildi-Form darüber");
  assert.ok(p.code.indexOf("_mars_t.Turtle = Turtle") < p.code.lastIndexOf("schildi = turtle.Turtle()"), "Schüler-Code läuft nach der Einrichtung (das erste Vorkommen ist nur der Text für code())");
});

test("Fehlermeldungen nennen die Klasse „Turtle“, nicht einen internen Namen", () => {
  const code = pc.prelude([]) + pc.marsSetup();
  assert.ok(!/class _\w*Turtle/.test(code), "keine Hilfsklasse mit internem Namen");
  assert.equal((code.match(/del Turtle/g) || []).length, 2, "der Name Turtle bleibt nicht im Programm des Schülers liegen");
});

test("Mars: Zeilennummern in Fehlermeldungen zählen ohne die Einrichtung", () => {
  const n = pc.marsSetup().split("\n").length - 1;
  assert.equal(pc.fixLineNumbers("NameError: name 'x' is not defined on line " + (n + 3), n), "NameError: name 'x' is not defined on line 3");
  assert.equal(pc.fixLineNumbers("SyntaxError: bad input on line 1", 0), "SyntaxError: bad input on line 1");
});

test("code() liefert den Schüler-Code als Text (z. B. um str( oder eine Variable im Code zu finden)", () => {
  const p = pc.buildCheckProgram('print("Akku: " + str(akku))', 'erwarte("str(" in code())');
  assert.match(p.code, /_pc_code = "print\(\\"Akku: \\" \+ str\(akku\)\)"/);
  assert.match(p.code, /def code\(\):/);
});

test("Zeitlimit: Programme ohne Turtle 5 s, mit Turtle (langsame Animation) 60 s", () => {
  assert.equal(pc.timeLimitFor("akku = 50\nwhile akku > 20:\n    x = 1"), 5000);
  assert.equal(pc.timeLimitFor("import turtle\nschildi = turtle.Turtle()"), 60000);
  assert.equal(pc.timeLimitFor(pc.marsSetup() + "print(1)"), 60000, "Mars-Seiten zeichnen immer");
  assert.match(pc.marsSetup(), /self\.speed\(2\)/, "auch ohne Felsen fährt Schildi gemächlich");
  assert.match(pc.marsSetup(null, { draw: false }), /self\.speed\(0\)/, "Prüflauf ohne Felsen: sofort");
});

test("Zeitlimit: Skulpts Meldung wird zum Funkspruch, die Zeile bleibt für die Markierung", () => {
  const msg = pc.friendlyTimeLimit("TimeLimitError: Program exceeded run time limit. on line 3");
  assert.match(msg, /^⏱️ Schildi stoppt: Dein Programm läuft zu lange\. Endet deine Schleife\? on line 3$/);
  assert.equal(pc.friendlyTimeLimit("NameError: name 'x' is not defined on line 2"), "NameError: name 'x' is not defined on line 2", "andere Fehler bleiben unverändert");
  assert.equal(pc.classifyError(msg).kind, "error", "ein Zeitlimit ist kein Prüf-Hinweis");
});

test("Stopp-Knopf: Skulpt läuft normal weiter, bis gestoppt wird – dann endet es mit „Gestoppt“", async () => {
  let stopped = false;
  const h = pc.stopHandlers(() => stopped)["*"];
  assert.equal(h(), undefined, "ohne Stopp übernimmt Skulpt die Pause selbst");
  stopped = true;
  await assert.rejects(h(), (e) => pc.isStopError(e));
  assert.equal(pc.isStopError(new Error("NameError")), false);
});

test("Kraterfeld: '# felsen:' und '# pruef-felsen:' werden getrennt gelesen", () => {
  const check = "# felsen: 100 0, 60 80\n# pruef-felsen: 140 0\nerwarte(True)";
  assert.deepEqual(pc.parseRocks(check, "felsen"), [[100, 0], [60, 80]]);
  assert.deepEqual(pc.parseRocks(check, "pruef-felsen"), [[140, 0]]);
  assert.equal(pc.parseRocks("erwarte(True)", "felsen"), null, "ohne Zeile kein Kraterfeld");
});

test("Kraterfeld: Einrichtung bringt Sensor und Zusammenstoß, zeichnet Felsen nur im sichtbaren Lauf", () => {
  const vis = pc.marsSetup([[100, 0]]);
  const hid = pc.marsSetup([[100, 0]], { draw: false });
  for (const s of [vis, hid]) {
    assert.match(s, /def hindernis\(self\):/);
    assert.match(s, /class Zusammenstoss\(Exception\):/);
    assert.match(s, /_mars_felsen = \[\(100, 0\)\]/);
  }
  assert.match(vis, /_mars_flaeche\(_mars_ecken\(/, "sichtbar: Felsen als graue, kantige Brocken zeichnen");
  assert.match(vis, /#8d939c/, "Felsen sind grau");
  assert.ok(!hid.includes("_mars_stift"), "Prüflauf: nichts zeichnen");
  assert.match(vis, /self\.speed\(2\)/, "sichtbar: Schildi fährt langsam");
  assert.match(hid, /self\.speed\(0\)/, "Prüflauf: sofort, damit das Zeitlimit reicht");
  assert.ok(!pc.marsSetup().includes("hindernis"), "ohne Felsen bleibt Schildi wie in Modul 2");
  assert.ok(!/class _\w*Turtle/.test(vis), "keine Hilfsklasse mit internem Namen");
});

test("Kraterfeld: Lichtkegel-Form ist ein gültiges SVG mit Schildi darin", () => {
  const svg = Buffer.from(pc.sensorShape().split(",")[1], "base64").toString("utf8");
  assert.match(svg, /^<svg /);
  assert.match(svg, /fill-opacity="0\.22"/);
  assert.match(svg, /<image [^>]*href="data:image\/png;base64,/, "neue Rover-Draufsicht ist direkt eingebettet");
  const body = Buffer.from(pc.SCHILDI_SVG.split(",")[1], "base64").toString("utf8");
  assert.equal(body, readFileSync(new URL("./assets/schildi-oben.svg", import.meta.url), "utf8"), "Laufzeit und Quelldatei verwenden dieselbe Grafik");
  assert.match(body, /width="48" height="48" viewBox="-24 -24 48 48"/, "Bildgröße und Drehmittelpunkt bleiben erhalten");
  const png = Buffer.from(body.match(/href="data:image\/png;base64,([^"]+)"/)[1], "base64");
  assert.deepEqual(png, readFileSync(new URL("./assets/schildi-oben.png", import.meta.url)), "das eingebettete Bild entspricht der optimierten PNG-Datei");
  assert.ok(svg.includes(body.match(/<image [^>]+\/>/)[0]), "der Sensor enthält dieselbe Draufsicht");
  const alarm = Buffer.from(pc.sensorShape(true).split(",")[1], "base64").toString("utf8");
  assert.match(alarm, /#D64545/, "Felsen erkannt: roter Kegel");
  assert.match(pc.marsSetup([[100, 0]]), /if gesehen else/, "hindernis() färbt den Kegel um");
});

test("Kraterfeld: Zusammenstoß nennt die Zeile im Schüler-Code, nicht in der Einrichtung", () => {
  const err = { traceback: [{ lineno: 49 }, { lineno: 52 }] };
  assert.equal(pc.learnerLine(err, 48), 1, "erste Zeile hinter der Einrichtung");
  assert.equal(pc.learnerLine(err, 60), null);
  assert.equal(pc.isCollision("Zusammenstoss: 💥 on line 49"), true);
  assert.equal(pc.friendlyCollision("Zusammenstoss: 💥", 4), "💥 Schildi ist gegen einen Felsen gefahren! on line 4");
});

test("Kraterboden: @PythonCheck.krater verhält sich wie der Marsboden, nur mit anderem Hintergrund", async () => {
  const { readFile } = await import("node:fs/promises");
  const readme = await readFile(new URL("./README.md", import.meta.url), "utf8");
  const krater = readme.slice(readme.indexOf("@PythonCheck.krater_"), readme.indexOf("@end", readme.indexOf("@PythonCheck.krater_")));
  assert.match(krater, /mars: true/, "Schildi, Felsen und Sensor wie auf dem Marsboden");
  assert.match(krater, /data-fullwidth="true"/);
  assert.match(krater, /aria-label="Zeichenfläche: Schildi im Krater"/);
  assert.match(krater, /"LIA: terminal"/, "Stopp-Knopf bei jedem Lauf");
});

test("Prüfpunkt 3: Hinweise aus erwarte() werden von echten Fehlern unterschieden", () => {
  assert.deepEqual(pc.classifyError("_PruefFehler: fehlt print? on line 12"), { kind: "hint", text: "fehlt print?" });
  assert.equal(pc.classifyError("NameError: name 'x' is not defined on line 3").kind, "error");
});
