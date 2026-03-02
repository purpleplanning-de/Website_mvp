# Lemon Squeezy Integration Plan

## Architektur-Übersicht

```
┌─────────────────────────────────────────────────────────┐
│  Browser (React SPA)                                    │
│                                                         │
│  CartContext.jsx ──→ CartSidebar.jsx                    │
│       │                    │                            │
│       │              [Checkout Button]                  │
│       │                    │                            │
│       ▼                    ▼                            │
│  Cart-Daten        POST /api/checkout.php               │
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│  IONOS Server (htdocs/)                                 │
│                                                         │
│  api/checkout.php                                       │
│    1. Empfängt Cart-Items (JSON)                        │
│    2. Mapped Produkt-IDs → Lemon Squeezy Variant-IDs   │
│    3. Erstellt Checkout-Session via LS API              │
│    4. Gibt Checkout-URL zurück                          │
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│  Lemon Squeezy (Hosted Checkout)                        │
│                                                         │
│  - Kunde bezahlt (Kreditkarte / PayPal)                 │
│  - Lemon Squeezy = Merchant of Record                   │
│  - VAT/OSS wird automatisch abgewickelt                 │
│  - Download-Links werden generiert                      │
│                                                         │
│  Nach Zahlung:                                          │
│  ├── Webhook → E-Mail mit Download-Links                │
│  └── Redirect → /checkout/success auf eurer Seite       │
└─────────────────────────────────────────────────────────┘
```

---

## Phase 1: Lemon Squeezy Setup (manuell, kein Code)

### 1.1 Account erstellen
- Account auf lemonsqueezy.com erstellen
- Store anlegen (Name: "PurplePlanning" o.ä.)
- Payout-Daten hinterlegen (Bankkonto)

### 1.2 Produkte anlegen

Für jedes Produkt aus `src/data/products.js`:

| Produkt-ID (intern) | Name | Preis | LS-Typ |
|:---:|------|------:|--------|
| 1 | Digital Planner V.1 | €24,90 | Digital Download |
| 2 | Sticker Set "Minimal" | €9,90 | Digital Download |
| 3 | Focus Journal | €18,50 | Digital Download |
| 4 | Vision Board Pro | €12,00 | Digital Download |
| 5 | Meal Planner Kit | €14,90 | Digital Download |
| 6 | Finance Tracker | €19,90 | Digital Download |
| 7 | Content Creator Kit | €29,90 | Digital Download |
| 8 | Executive Strategy Deck | €39,90 | Digital Download |
| 9 | Deep Work Workbook | €16,50 | Digital Download |

Für jedes Produkt:
- Preis in Lemon Squeezy setzen (Preis muss mit Frontend übereinstimmen)
- Digitale Datei hochladen (PDF/ZIP)
- Variant-ID notieren → wird in `api/checkout.php` gemapped

### 1.3 Discount-Codes anlegen

Bestehende Codes aus `src/data/discountCodes.js` in Lemon Squeezy nachbauen:

| Code | Rabatt | Typ |
|------|-------:|-----|
| WELCOME10 | 10% | Prozentual |
| BALANCE15 | 15% | Prozentual |
| CEO20 | 20% | Prozentual |
| CREATOR15 | 15% | Prozentual |

**Wichtig:** Discount-Codes werden in Lemon Squeezy validiert, nicht mehr im Frontend.

### 1.4 API-Key generieren
- In Lemon Squeezy Dashboard → Settings → API
- API-Key erstellen (Store-Level)
- Sicher notieren → wird in `api/config.php` hinterlegt

---

## Phase 2: PHP Backend (IONOS)

### 2.1 Dateistruktur

```
htdocs/
├── api/
│   ├── .htaccess         ← Schützt config.php vor direktem Zugriff
│   ├── config.php        ← API-Key + Produkt-Mapping (NICHT im Git!)
│   └── checkout.php      ← Einziger Endpunkt
├── index.html
├── assets/
└── .htaccess
```

### 2.2 api/.htaccess

Verhindert direkten Zugriff auf config.php:

```apache
# Deny access to config file
<Files "config.php">
    Require all denied
</Files>

# Allow POST to checkout.php only
<LimitExcept POST OPTIONS>
    Require all denied
</LimitExcept>
```

### 2.3 api/config.php

```php
<?php
// NICHT in Git einchecken! Manuell auf IONOS deployen.
return [
    'api_key' => 'ls_live_xxxxxxxxxxxxxxxxxxxxx',
    'store_id' => 'DEINE_STORE_ID',

    // Mapping: interne Produkt-ID → Lemon Squeezy Variant-ID
    'variants' => [
        1 => 'LS_VARIANT_ID_PLANNER',
        2 => 'LS_VARIANT_ID_STICKER',
        3 => 'LS_VARIANT_ID_FOCUS',
        4 => 'LS_VARIANT_ID_VISION',
        5 => 'LS_VARIANT_ID_MEAL',
        6 => 'LS_VARIANT_ID_FINANCE',
        7 => 'LS_VARIANT_ID_CONTENT',
        8 => 'LS_VARIANT_ID_STRATEGY',
        9 => 'LS_VARIANT_ID_DEEPWORK',
    ],

    // Erlaubte Origins für CORS
    'allowed_origins' => [
        'https://purpleplanning.de',
        'https://www.purpleplanning.de',
    ],
];
```

### 2.4 api/checkout.php

```php
<?php
// ============================================
// PurplePlanning – Lemon Squeezy Checkout API
// ============================================
// Einziger Endpunkt: POST /api/checkout.php
// Erstellt eine Lemon Squeezy Checkout-Session
// mit allen Cart-Items.

header('Content-Type: application/json');

// Config laden
$config = require __DIR__ . '/config.php';

// CORS
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $config['allowed_origins'])) {
    header("Access-Control-Allow-Origin: $origin");
}
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Nur POST erlauben
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Request Body lesen
$input = json_decode(file_get_contents('php://input'), true);
if (!$input || empty($input['items'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Cart items required']);
    exit;
}

// Cart-Items validieren und Variant-IDs zuordnen
$lineItems = [];
foreach ($input['items'] as $item) {
    $productId = (int) $item['id'];
    $qty = max(1, (int) ($item['qty'] ?? 1));

    if (!isset($config['variants'][$productId])) {
        http_response_code(400);
        echo json_encode(['error' => "Unknown product ID: $productId"]);
        exit;
    }

    $lineItems[] = [
        'variant_id' => (int) $config['variants'][$productId],
        'quantity' => $qty,
    ];
}

// Checkout-Session bei Lemon Squeezy erstellen
$checkoutData = [
    'data' => [
        'type' => 'checkouts',
        'attributes' => [
            'checkout_data' => [
                'line_items' => $lineItems,
            ],
            'checkout_options' => [
                'dark' => false,
                'logo' => true,
            ],
            'product_options' => [
                'redirect_url' => ($origin ?: 'https://purpleplanning.de') . '/checkout/success',
            ],
        ],
        'relationships' => [
            'store' => [
                'data' => [
                    'type' => 'stores',
                    'id' => $config['store_id'],
                ],
            ],
        ],
    ],
];

// Discount-Code hinzufügen wenn vorhanden
if (!empty($input['discount_code'])) {
    $checkoutData['data']['attributes']['checkout_data']['discount_code'] =
        strtoupper($input['discount_code']);
}

// Lemon Squeezy API aufrufen
$ch = curl_init('https://api.lemonsqueezy.com/v1/checkouts');
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => json_encode($checkoutData),
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        'Accept: application/vnd.api+json',
        'Content-Type: application/vnd.api+json',
        'Authorization: Bearer ' . $config['api_key'],
    ],
    CURLOPT_TIMEOUT => 15,
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

if ($curlError) {
    http_response_code(502);
    echo json_encode(['error' => 'Payment service unavailable']);
    exit;
}

if ($httpCode !== 201) {
    http_response_code(502);
    echo json_encode(['error' => 'Checkout creation failed']);
    exit;
}

$result = json_decode($response, true);
$checkoutUrl = $result['data']['attributes']['url'] ?? null;

if (!$checkoutUrl) {
    http_response_code(502);
    echo json_encode(['error' => 'No checkout URL received']);
    exit;
}

echo json_encode(['checkout_url' => $checkoutUrl]);
```

---

## Phase 3: Frontend-Anpassungen

### 3.1 Checkout-Funktion in CartContext.jsx

Neue Funktion `checkout()` hinzufügen, die:
1. Cart-Items an `/api/checkout.php` sendet
2. Checkout-URL empfängt
3. Zum Lemon Squeezy Checkout weiterleitet

```javascript
// Neue Funktion im CartContext
const checkout = async () => {
  setCheckoutLoading(true);
  setCheckoutError(null);

  try {
    const response = await fetch('/api/checkout.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: cart.map(item => ({
          id: item.id,
          qty: item.qty,
        })),
        discount_code: appliedDiscount?.code || null,
      }),
    });

    if (!response.ok) {
      throw new Error('Checkout failed');
    }

    const { checkout_url } = await response.json();

    // Zum Lemon Squeezy Checkout weiterleiten
    window.location.href = checkout_url;
  } catch (err) {
    setCheckoutError('Checkout konnte nicht gestartet werden. Bitte versuche es erneut.');
  } finally {
    setCheckoutLoading(false);
  }
};
```

### 3.2 Checkout-Button in CartSidebar.jsx

Den bestehenden Button (Zeile ~327) mit der `checkout()`-Funktion verbinden:

```jsx
<button
  className={actionButtonStyle}
  onClick={checkout}
  disabled={checkoutLoading || cart.length === 0}
>
  {checkoutLoading
    ? t('cart', 'processing') || 'Wird verarbeitet...'
    : t('cart', 'checkout')
  }
  {!checkoutLoading && <ArrowRight size={18} />}
  {checkoutLoading && <Loader className="animate-spin" size={18} />}
</button>

{checkoutError && (
  <p className="text-red-500 text-sm text-center mt-2">{checkoutError}</p>
)}
```

### 3.3 Discount-Code Änderung

Discount-Codes werden **doppelt** validiert:
1. **Frontend (sofort):** Behält die bestehende Validierung für visuelles Feedback
2. **Backend (beim Checkout):** Lemon Squeezy validiert den Code nochmal serverseitig

Der Discount-Code wird über `discount_code` im Checkout-Request mitgeschickt.
Lemon Squeezy rechnet den Rabatt auf seiner Seite ab (Preis-Hoheit liegt bei LS).

### 3.4 Checkout Success Page

Neue Route `/checkout/success` erstellen:

```jsx
// src/pages/CheckoutSuccessPage.jsx
const CheckoutSuccessPage = () => {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart(); // Warenkorb leeren nach erfolgreichem Kauf
  }, []);

  return (
    <div className="text-center py-20">
      <CheckCircle size={64} className="text-green-500 mx-auto mb-6" />
      <h1>Vielen Dank für deine Bestellung!</h1>
      <p>Du erhältst in Kürze eine E-Mail mit deinen Download-Links.</p>
    </div>
  );
};
```

---

## Phase 4: .htaccess Anpassungen

### 4.1 CSP-Header erweitern

`connect-src` muss den eigenen API-Endpunkt erlauben.
Da `/api/checkout.php` auf der gleichen Domain liegt, reicht `'self'`.

Falls Lemon Squeezy JS-Overlay statt Redirect gewünscht:
```
script-src 'self' 'unsafe-inline' https://app.lemonsqueezy.com;
frame-src 'self' https://app.lemonsqueezy.com;
```

### 4.2 API-Verzeichnis von SPA-Routing ausschließen

Die Rewrite-Rule muss `/api/` ausnehmen, damit PHP-Requests nicht zu index.html umgeleitet werden:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # API-Verzeichnis NICHT umleiten
  RewriteRule ^api/ - [L]

  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^(.*)$ /index.html [QSA,L]
</IfModule>
```

---

## Phase 5: Deployment

### 5.1 Dateien die auf IONOS deployt werden

```
htdocs/
├── api/
│   ├── .htaccess          ← Schützt config.php
│   ├── config.php         ← MANUELL deployen (nicht im Git!)
│   └── checkout.php       ← Via Git/FTPS deployen
├── index.html             ← Vite Build Output
├── assets/                ← Vite Build Output
└── .htaccess              ← Apache Config
```

### 5.2 .gitignore Ergänzung

```
# Lemon Squeezy API credentials
api/config.php
```

### 5.3 Deployment-Checklist

- [ ] Lemon Squeezy Account + Store erstellt
- [ ] Alle 9 Produkte angelegt, Variant-IDs notiert
- [ ] Discount-Codes in LS angelegt
- [ ] Digitale Dateien (PDFs) in LS hochgeladen
- [ ] `api/config.php` mit echten IDs auf IONOS deployt
- [ ] `api/checkout.php` deployt
- [ ] `api/.htaccess` deployt
- [ ] CSP-Header in `.htaccess` aktualisiert
- [ ] Rewrite-Rule für `/api/` ergänzt
- [ ] Testbestellung durchführen (LS Test-Mode)
- [ ] Webhook in LS konfiguriert (E-Mail-Delivery)
- [ ] Live schalten (LS Live-Mode)

---

## Phase 6: Was NICHT gebaut werden muss

Dank Lemon Squeezy als MoR entfällt:

| Feature | Status | Warum |
|---------|--------|-------|
| Rechnungserstellung | Nicht nötig | LS erstellt Rechnungen |
| VAT/OSS-Berechnung | Nicht nötig | LS berechnet + meldet |
| Download-Link-System | Nicht nötig | LS hosted Downloads |
| E-Mail-Versand (Bestellung) | Nicht nötig | LS sendet automatisch |
| Refund-Management | Nicht nötig | Über LS Dashboard |
| Subscription-Billing | Nicht nötig | LS Built-in (wenn benötigt) |
| User-Accounts / Login | Nicht nötig | LS Customer Portal |
| Datenbank | Nicht nötig | LS speichert alle Orders |

---

## Zusammenfassung

| Komponente | Aufwand | Dateien |
|------------|---------|---------|
| Lemon Squeezy Setup | Manuell, einmalig | Dashboard |
| PHP Backend | ~80 Zeilen, 3 Dateien | `api/checkout.php`, `api/config.php`, `api/.htaccess` |
| Frontend Checkout | Kleine Änderung | `CartContext.jsx`, `CartSidebar.jsx` |
| Success Page | Neue Seite | `CheckoutSuccessPage.jsx` |
| .htaccess Update | 2 Zeilen | `public/.htaccess` |
| Router Update | 1 Route | `App.jsx` |

**Gesamtaufwand Code:** ~150-200 Zeilen neuer Code + kleine Anpassungen an bestehenden Dateien.
**Keine neuen Abhängigkeiten**, keine neuen externen Accounts (außer Lemon Squeezy selbst).
