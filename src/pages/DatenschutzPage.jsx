import { fontSerif, fontSans } from '../data/styles';

export default function DatenschutzPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 animate-in fade-in pt-16">
      <h2 style={fontSerif} className="text-4xl italic mb-8 text-center">
        Datenschutzerklärung
      </h2>
      <div style={fontSans} className="space-y-6 opacity-70 max-w-2xl mx-auto text-left">
        <p className="font-bold">Stand: Februar 2026</p>
        <h3 className="font-bold text-lg mt-6">1. Deine Privatsphäre ist uns wichtig</h3>
        <p>
          Hallo! Schön, dass du da bist. Datenschutz klingt oft kompliziert und trocken, aber
          eigentlich geht es um Respekt. Wir respektieren deine Privatsphäre und wollen transparent
          sein, was mit deinen Daten passiert, wenn du unsere Seite besuchst. Kurz gesagt: Wir
          sammeln nur das, was wirklich nötig ist.
        </p>
        <h3 className="font-bold text-lg mt-6">2. Wer wir sind</h3>
        <p>
          Verantwortlich für deine Daten auf dieser Website ist:
          <br />
          <strong>Purple Planning Studio GmbH</strong>
          <br />
          Musterstraße 123, 10115 Berlin
          <br />
          E-Mail: hello@purpleplanning.de
        </p>
        <h3 className="font-bold text-lg mt-6">3. Hosting (Wo deine Daten wohnen)</h3>
        <p>
          Damit diese Website überhaupt erreichbar ist, nutzen wir einen Dienstleister (Hoster).
          Dieser verarbeitet automatisch Daten wie deine IP-Adresse, damit die Seite technisch
          ausgeliefert werden kann.
        </p>
        <p className="text-red-600 font-bold">
          [PROVIDER NAME EINFÜGEN, z.B. VERCEL / NETLIFY / STRATO]
        </p>
        <h3 className="font-bold text-lg mt-6">4. Was wir sammeln und warum</h3>
        <p>
          <strong>Cookies:</strong> Wir nutzen kleine Textdateien (Cookies), damit dein Warenkorb
          funktioniert und du nicht alles verlierst, wenn du die Seite neu lädst. Das sind technisch
          notwendige Cookies (gemäß Art. 6 Abs. 1 lit. f DSGVO). Wir tracken dich nicht durchs
          ganze Internet.
        </p>
        <p>
          <strong>Bestellungen:</strong> Wenn du etwas kaufst, brauchen wir natürlich deinen Namen
          und deine E-Mail-Adresse, um dir den Download-Link zu schicken. Diese Daten speichern wir
          zur Vertragserfüllung.
        </p>
        <p>
          <strong>Kontakt:</strong> Wenn du uns schreibst, speichern wir deine Nachricht, um dir zu
          antworten.
        </p>
        <h3 className="font-bold text-lg mt-6">5. Deine Rechte</h3>
        <p>
          Du hast jederzeit das Recht zu erfahren, was wir über dich wissen (Auskunft). Du kannst
          verlangen, dass wir falsche Daten korrigieren oder deine Daten löschen, sofern wir sie
          nicht aus steuerlichen Gründen aufbewahren müssen. Schreib uns einfach eine Mail.
        </p>
      </div>
    </div>
  );
}
