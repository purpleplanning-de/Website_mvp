import { fontSerif, fontSans } from '../data/styles';

export default function AGBPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 animate-in fade-in pt-16">
      <h2 style={fontSerif} className="text-4xl mb-8 text-center">
        Allgemeine Geschäftsbedingungen
      </h2>
      <div style={fontSans} className="space-y-6 opacity-70 max-w-2xl mx-auto text-left">
        <p className="font-bold">Stand: Februar 2026</p>

        {/* === AGB === */}
        <h3 className="font-bold text-lg mt-6">§ 1 Geltungsbereich</h3>
        <p>
          Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Bestellungen, die
          Verbraucher und Unternehmer (nachfolgend „Kunde") über unseren Online-Shop bei der
          Purple Planning Studio GmbH (nachfolgend „Anbieter") abschließen.
        </p>
        <p className="text-red-600 font-bold">
          [HINWEIS: AGB müssen von einem Rechtsanwalt geprüft werden, bevor sie live geschaltet
          werden. Diese Vorlage dient nur als Orientierung.]
        </p>

        <h3 className="font-bold text-lg mt-6">§ 2 Vertragsschluss</h3>
        <p>
          (1) Die Darstellung der Produkte im Online-Shop stellt kein rechtlich bindendes Angebot
          dar, sondern eine Aufforderung zur Abgabe einer Bestellung.
        </p>
        <p>
          (2) Durch Anklicken des Buttons „Jetzt kaufen" geben Sie eine verbindliche Bestellung der
          im Warenkorb enthaltenen Waren ab.
        </p>
        <p>
          (3) Die Annahme der Bestellung erfolgt durch Zusendung einer Bestellbestätigung per E-Mail
          oder durch Bereitstellung des digitalen Downloads.
        </p>

        <h3 className="font-bold text-lg mt-6">§ 3 Preise und Zahlung</h3>
        <p>
          (1) Alle angegebenen Preise sind Endpreise und enthalten die gesetzliche Umsatzsteuer.
        </p>
        <p>
          (2) Die verfügbaren Zahlungsmethoden werden im Bestellprozess angezeigt.
        </p>
        <p className="text-red-600 font-bold">
          [ZAHLUNGSANBIETER EINFÜGEN, z.B. Stripe, PayPal, etc.]
        </p>

        <h3 className="font-bold text-lg mt-6">§ 4 Lieferung digitaler Produkte</h3>
        <p>
          (1) Unsere Produkte sind digitale Inhalte (PDF-Dateien, digitale Planer). Die Lieferung
          erfolgt durch Bereitstellung eines Download-Links per E-Mail unmittelbar nach
          Zahlungseingang.
        </p>
        <p>
          (2) Versandkosten fallen bei digitalen Produkten nicht an.
        </p>

        <h3 className="font-bold text-lg mt-6">§ 5 Eigentum und Nutzungsrechte</h3>
        <p>
          (1) Mit vollständiger Bezahlung erhält der Kunde ein einfaches, nicht übertragbares
          Nutzungsrecht an den erworbenen digitalen Produkten für den persönlichen Gebrauch.
        </p>
        <p>
          (2) Eine Weitergabe, Vervielfältigung oder kommerzielle Nutzung der Produkte ist ohne
          ausdrückliche schriftliche Genehmigung des Anbieters nicht gestattet.
        </p>

        <h3 className="font-bold text-lg mt-6">§ 6 Mängelhaftung</h3>
        <p>
          Es gelten die gesetzlichen Mängelhaftungsrechte. Bei digitalen Produkten umfasst dies
          die Bereitstellung eines funktionsfähigen Downloads. Bei technischen Problemen bitten
          wir um Kontaktaufnahme per E-Mail.
        </p>

        <h3 className="font-bold text-lg mt-6">§ 7 Streitbeilegung</h3>
        <p>
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
          https://ec.europa.eu/consumers/odr. Wir sind nicht verpflichtet, an einem
          Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
        </p>

        {/* === Widerrufsbelehrung === */}
        <div className="border-t border-purple-200/40 pt-8 mt-10">
          <h2 style={fontSerif} className="text-3xl mb-6">
            Widerrufsbelehrung
          </h2>

          <h3 className="font-bold text-lg mt-6">Widerrufsrecht</h3>
          <p>
            Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu
            widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsschlusses.
          </p>
          <p>
            Um Ihr Widerrufsrecht auszuüben, müssen Sie uns
          </p>
          <p className="ml-4">
            <strong>Purple Planning Studio GmbH</strong><br />
            Musterstraße 123, 10115 Berlin<br />
            E-Mail: hello@purpleplanning.de
          </p>
          <p>
            mittels einer eindeutigen Erklärung (z. B. ein mit der Post versandter Brief oder
            E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren.
          </p>

          <h3 className="font-bold text-lg mt-6">Folgen des Widerrufs</h3>
          <p>
            Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen
            erhalten haben, unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag
            zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf bei uns eingegangen ist.
          </p>

          <h3 className="font-bold text-lg mt-6">Besonderer Hinweis: Digitale Inhalte</h3>
          <p>
            <strong>Wichtig:</strong> Das Widerrufsrecht erlischt vorzeitig, wenn wir mit der
            Ausführung des Vertrags (Bereitstellung des digitalen Downloads) begonnen haben,
            nachdem Sie ausdrücklich zugestimmt haben, dass wir mit der Ausführung des Vertrags
            vor Ablauf der Widerrufsfrist beginnen, und Sie Ihre Kenntnis davon bestätigt haben,
            dass Sie durch Ihre Zustimmung mit Beginn der Ausführung des Vertrags Ihr
            Widerrufsrecht verlieren (§ 356 Abs. 5 BGB).
          </p>
          <p className="text-red-600 font-bold mt-4">
            [HINWEIS: Diese Widerrufsbelehrung muss ebenfalls anwaltlich geprüft werden.
            Für digitale Produkte ist der Hinweis auf den vorzeitigen Erlöschensgrund besonders
            wichtig. Die Checkbox im Checkout muss implementiert werden.]
          </p>
        </div>
      </div>
    </div>
  );
}
