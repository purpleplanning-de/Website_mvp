import { fontSerif, fontSans } from '../data/styles';

export default function ImpressumPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 animate-in fade-in">
      <h2 style={fontSerif} className="text-4xl italic mb-8 text-center">
        Impressum
      </h2>
      <div style={fontSans} className="space-y-8 opacity-70 max-w-2xl mx-auto text-left">
        <div>
          <h3 className="font-bold text-lg mb-2">Angaben gemäß § 5 TMG</h3>
          <p>Purple Planning Studio GmbH</p>
          <p>Musterstraße 123</p>
          <p>10115 Berlin</p>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-2">Kontakt</h3>
          <p>
            Telefon:{' '}
            <span className="text-red-600 font-bold">[TELEFONNUMMER FEHLT]</span>
          </p>
          <p>E-Mail: hello@purpleplanning.de</p>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-2">Vertretungsberechtigte Geschäftsführer</h3>
          <p>
            Michelle [Nachname fehlt -{' '}
            <span className="text-red-600 font-bold">BITTE ERGÄNZEN</span>]
          </p>
          <p>
            Eric [Nachname fehlt -{' '}
            <span className="text-red-600 font-bold">BITTE ERGÄNZEN</span>]
          </p>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-2">Registereintrag</h3>
          <p>Eintragung im Handelsregister.</p>
          <p>
            Registergericht:{' '}
            <span className="text-red-600 font-bold">[AMTSGERICHT BERLIN CHARLOTTENBURG?]</span>
          </p>
          <p>
            Registernummer:{' '}
            <span className="text-red-600 font-bold">[HRB NUMMER FEHLT]</span>
          </p>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-2">Umsatzsteuer-ID</h3>
          <p>Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:</p>
          <p>
            <span className="text-red-600 font-bold">[DE XXXXXXXX]</span>
          </p>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-2">Streitschlichtung</h3>
          <p>
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
            https://ec.europa.eu/consumers/odr.
          </p>
          <p>Unsere E-Mail-Adresse finden Sie oben im Impressum.</p>
          <p>
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </div>
      </div>
    </div>
  );
}
