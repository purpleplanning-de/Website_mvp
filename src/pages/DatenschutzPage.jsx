import { fontSerif, fontSans } from '../data/styles';
import { useCookieConsent } from '../hooks/useCookieConsent';

export default function DatenschutzPage() {
  const { resetConsent } = useCookieConsent();

  return (
    <div className="max-w-4xl mx-auto px-6 py-20 animate-in fade-in pt-16">
      <h2 style={fontSerif} className="text-4xl mb-8 text-center">
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
          [PROVIDER NAME EINFÜGEN, z.B. IONOS / VERCEL / NETLIFY]
        </p>

        <h3 className="font-bold text-lg mt-6">4. Cookies & Einwilligung</h3>
        <p>
          Beim ersten Besuch unserer Seite zeigen wir dir ein Cookie-Banner. Du entscheidest,
          welche Cookies du zulässt:
        </p>
        <ul className="list-disc list-inside space-y-1 ml-4">
          <li>
            <strong>Notwendige Cookies:</strong> Immer aktiv. Sie sorgen dafür, dass dein
            Warenkorb, dein gewähltes Theme und deine Spracheinstellung funktionieren
            (Art. 6 Abs. 1 lit. f DSGVO – berechtigtes Interesse).
          </li>
          <li>
            <strong>Analyse-Cookies:</strong> Nur mit deiner Einwilligung. Helfen uns zu verstehen,
            wie Besucher die Seite nutzen (Art. 6 Abs. 1 lit. a DSGVO).
          </li>
          <li>
            <strong>Marketing-Cookies:</strong> Nur mit deiner Einwilligung. Ermöglichen
            personalisierte Inhalte (Art. 6 Abs. 1 lit. a DSGVO).
          </li>
        </ul>
        <p>
          Du kannst deine Cookie-Einstellungen jederzeit ändern:
        </p>
        <button
          onClick={resetConsent}
          className="inline-block mt-2 px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider border border-purple-300 hover:border-purple-500 text-purple-600 hover:text-purple-800 transition-colors"
        >
          Cookie-Einstellungen ändern
        </button>

        <h3 className="font-bold text-lg mt-6">5. Was wir sammeln und warum</h3>
        <p>
          <strong>LocalStorage:</strong> Wir speichern deine Warenkorb-Daten, Sprachauswahl,
          Theme-Einstellung und Cookie-Einwilligung lokal in deinem Browser. Diese Daten verlassen
          deinen Rechner nicht.
        </p>
        <p>
          <strong>Bestellungen:</strong> Wenn du etwas kaufst, brauchen wir natürlich deinen Namen
          und deine E-Mail-Adresse, um dir den Download-Link zu schicken. Diese Daten speichern wir
          zur Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO).
        </p>
        <p>
          <strong>Kontaktformular:</strong> Wenn du uns über das Kontaktformular schreibst, werden
          deine Daten über Formspree (formspree.io) an uns weitergeleitet. Formspree verarbeitet
          deine Daten in den USA. Rechtsgrundlage ist deine Einwilligung (Art. 6 Abs. 1 lit. a DSGVO).
        </p>

        <h3 className="font-bold text-lg mt-6">6. Google Fonts</h3>
        <p>
          Wir nutzen Schriftarten von Google Fonts. Beim Laden der Seite stellt dein Browser eine
          Verbindung zu Google-Servern (fonts.googleapis.com / fonts.gstatic.com) her. Dabei wird
          deine IP-Adresse an Google übermittelt. Rechtsgrundlage ist unser berechtigtes Interesse
          an einer einheitlichen Darstellung (Art. 6 Abs. 1 lit. f DSGVO).
        </p>
        <p className="text-red-600 font-bold">
          [HINWEIS: Für maximale DSGVO-Konformität sollten Google Fonts lokal gehostet werden.
          Siehe: google-webfonts-helper]
        </p>

        <h3 className="font-bold text-lg mt-6">7. Deine Rechte</h3>
        <p>Du hast jederzeit folgende Rechte:</p>
        <ul className="list-disc list-inside space-y-1 ml-4">
          <li><strong>Auskunft</strong> – Erfahre, welche Daten wir über dich gespeichert haben (Art. 15 DSGVO)</li>
          <li><strong>Berichtigung</strong> – Lass fehlerhafte Daten korrigieren (Art. 16 DSGVO)</li>
          <li><strong>Löschung</strong> – Verlange die Löschung deiner Daten (Art. 17 DSGVO)</li>
          <li><strong>Einschränkung</strong> – Schränke die Verarbeitung ein (Art. 18 DSGVO)</li>
          <li><strong>Datenübertragbarkeit</strong> – Erhalte deine Daten in einem gängigen Format (Art. 20 DSGVO)</li>
          <li><strong>Widerspruch</strong> – Widerspreche der Verarbeitung (Art. 21 DSGVO)</li>
          <li><strong>Widerruf</strong> – Widerrufe erteilte Einwilligungen jederzeit (Art. 7 Abs. 3 DSGVO)</li>
        </ul>
        <p>Schreib uns einfach eine E-Mail an hello@purpleplanning.de.</p>

        <h3 className="font-bold text-lg mt-6">8. Beschwerderecht</h3>
        <p>
          Du hast das Recht, dich bei einer Datenschutz-Aufsichtsbehörde zu beschweren,
          wenn du der Meinung bist, dass die Verarbeitung deiner Daten gegen die DSGVO verstößt
          (Art. 77 DSGVO).
        </p>

        <h3 className="font-bold text-lg mt-6">9. SSL/TLS-Verschlüsselung</h3>
        <p>
          Diese Seite nutzt aus Sicherheitsgründen eine SSL- bzw. TLS-Verschlüsselung.
          Du erkennst das am Schloss-Symbol in der Adresszeile deines Browsers.
        </p>
      </div>
    </div>
  );
}
