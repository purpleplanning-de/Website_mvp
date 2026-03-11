<?php
// ============================================
// PurplePlanning – Lemon Squeezy Checkout API
// ============================================
// Single endpoint: POST /api/checkout.php
// Creates a Lemon Squeezy checkout session with all cart items.

header('Content-Type: application/json');

$configFile = __DIR__ . '/config.php';
if (!file_exists($configFile)) {
    http_response_code(500);
    error_log('FATAL: config.php is missing at ' . $configFile);
    echo json_encode(['error' => 'Internal server error']);
    exit;
}
$config = require $configFile;

// CORS — validate origin against allowlist (also used for redirect_url)
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$validatedOrigin = null;
if (in_array($origin, $config['allowed_origins'], true)) {
    $validatedOrigin = $origin;
    header("Access-Control-Allow-Origin: $origin");
}
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Only POST allowed
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Read request body
$input = json_decode(file_get_contents('php://input'), true);
if (!$input || empty($input['items'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Cart items required']);
    exit;
}

// Validate cart items and map to Lemon Squeezy variant IDs
$lineItems = [];
foreach ($input['items'] as $item) {
    $productId = (int) $item['id'];
    $qty = max(1, (int) ($item['qty'] ?? 1));

    if (!isset($config['variants'][$productId]) || $config['variants'][$productId] === 0) {
        http_response_code(400);
        echo json_encode(['error' => "Unknown product: $productId"]);
        exit;
    }

    $lineItems[] = [
        'variant_id' => (int) $config['variants'][$productId],
        'quantity' => $qty,
    ];
}

// Build checkout request for Lemon Squeezy API
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
                'redirect_url' => ($validatedOrigin ?? 'https://purpleplanning.de') . '/checkout/success',
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

// Add discount code if provided
if (!empty($input['discount_code'])) {
    $checkoutData['data']['attributes']['checkout_data']['discount_code'] =
        strtoupper(trim($input['discount_code']));
}

// Call Lemon Squeezy API
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
    error_log('Lemon Squeezy cURL error: ' . $curlError);
    echo json_encode(['error' => 'Payment service unavailable']);
    exit;
}

if ($httpCode !== 201) {
    http_response_code(502);
    error_log("Lemon Squeezy API error. HTTP $httpCode. Response: $response");
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
