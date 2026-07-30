/**
 * Permanent record of every approved post/product. This is what
 * scripts/seed.mjs reads from — never clear an entry out of here once
 * added, or a fresh environment (a new branch, a rebuilt sandbox) won't
 * have it anymore. Only append.
 *
 * To seed an environment: generate that backend's amplify_outputs.json,
 * make sure a confirmed Cognito user exists there, then
 *   node scripts/clear.mjs && node --experimental-strip-types scripts/seed.mjs
 * (with OUTPUTS_PATH set for anything other than the local sandbox).
 */

import type { ContentPost, ContentProduct } from './contentTypes';

export const publishedPosts: ContentPost[] = [
  {
    slug: 'fast-charging-explained-how-to-choose-a-brick',
    title: "Fast Charging, Explained: How to Actually Choose a Charging Brick",
    excerpt: "USB-PD, PPS, GaN, EPR — the spec sheet on a charging brick reads like alphabet soup. Here's what each term actually means and how to figure out the wattage and features you really need.",
    category: 'Power',
    date: 'July 28, 2026',
    readTime: '9 min read',
    emoji: '⚡',
    image: 'https://images.unsplash.com/photo-1517320069935-381614f8c1e5?fm=jpg&q=80&w=1600&auto=format&fit=crop',
    imageAlt: 'Shallow focus photo of a white travel power adapter',
    published: true,
    sortOrder: 40,
    body: `
      <p class="post-disclosure"><em>This post contains affiliate links. If you buy through one, we may earn a commission at no extra cost to you.</em></p>

      <h2>⚡ Why "Fast Charging" Isn't One Thing</h2>
      <p>"Fast charging" isn't a single standard — it's a handful of overlapping protocols, each with its own wattage ceiling and device compatibility. A charger that's blazing fast for one phone can trickle-charge another, even if both bricks are rated "65W." Sorting through thousands of near-identical-looking bricks starts with understanding what's actually being measured.</p>

      <h2>🔢 The Three Numbers That Matter</h2>
      <p>Charging speed comes down to three values, and wattage is just the product of the other two:</p>
      <ul>
        <li><strong>Voltage (V):</strong> The electrical "pressure." Standard USB is 5V; fast charging pushes higher — 9V, 15V, 20V, and beyond.</li>
        <li><strong>Current (A):</strong> The rate of electron flow, measured in amps.</li>
        <li><strong>Wattage (W):</strong> Voltage × current. A charger listing "65W" might deliver that as 20V at 3.25A, or another combination — the total power is what matters most, but the combination affects compatibility.</li>
      </ul>

      <h2>📋 The Protocols You'll See on a Spec Sheet</h2>
      <h3>USB Power Delivery (USB-PD)</h3>
      <p>The dominant standard across phones, tablets, and laptops. USB-PD 3.0 covers up to 100W (the "Standard Power Range," or SPR). USB-PD 3.1 added "Extended Power Range" (EPR), which pushes the ceiling to 240W by introducing higher voltage steps (28V, 36V, 48V) instead of just more current. A charger rated above 100W is using EPR — and needs an EPR-rated cable to actually hit those speeds.</p>

      <div class="affiliate-box">
        <strong>🔌 Example of an EPR-rated cable</strong>
        Anker 240W USB-C to USB-C Cable — rated for the full 240W EPR ceiling, so it won't bottleneck a high-wattage charger.
        <br/><a href="https://www.amazon.com/dp/B0CCXT4QZR?tag=schiesslestor-20" target="_blank" rel="nofollow sponsored noopener noreferrer">Check price on Amazon →</a>
      </div>

      <h3>PPS (Programmable Power Supply)</h3>
      <p>A USB-PD extension that lets the charger and device negotiate voltage in small increments (as fine as 20mV) rather than fixed steps. This allows more precise, more efficient charging and is required for the fastest charging speeds on many Samsung Galaxy phones. If you're buying for a Samsung device, confirm PPS support specifically — a non-PPS 45W charger won't fast-charge a PPS-dependent phone at full speed.</p>
      <h3>Qualcomm Quick Charge (QC)</h3>
      <p>An older, proprietary standard still found on some Android devices and budget chargers. Largely superseded by USB-PD industry-wide, but still relevant if you're charging an older device.</p>
      <h3>GaN (Gallium Nitride)</h3>
      <p>Not a charging protocol at all — it's the semiconductor material inside the brick. GaN chargers run cooler and more efficiently than older silicon-based ones, which is why modern high-wattage bricks can be dramatically smaller than their predecessors. A "GaN charger" claim tells you about size and heat, not about which protocols it supports.</p>

      <h2>🔌 How Much Wattage Do You Actually Need?</h2>
      <p>More watts isn't automatically better — a charger only delivers as much power as the connected device requests, but matching wattage to your actual devices avoids both underpowering and paying for headroom you'll never use.</p>
      <table class="post-table">
        <thead>
          <tr><th>Device</th><th>Typical fast-charge wattage</th></tr>
        </thead>
        <tbody>
          <tr><td>Phones</td><td>20–45W</td></tr>
          <tr><td>Tablets</td><td>30–45W</td></tr>
          <tr><td>Ultrabooks</td><td>~65W</td></tr>
          <tr><td>16" MacBook Pro / gaming laptops</td><td>96–140W+</td></tr>
        </tbody>
      </table>
      <p><strong>Charging multiple devices at once:</strong> multi-port chargers split their total wattage across active ports, usually unevenly (the primary port gets priority). A "100W" charger feeding a laptop and a phone simultaneously might allocate 65W and 35W rather than 50/50 — check the port-by-port breakdown, not just the headline number.</p>

      <h2>💰 Picks at Every Price Point</h2>
      <p>You don't need to spend $60 on a charger if you're only ever topping off a phone — but you also don't want to underspend and end up slow-charging a laptop. Here's a real option at each tier:</p>
      <table class="post-table">
        <thead>
          <tr><th>Tier</th><th>Wattage</th><th>Good for</th><th>Typical price</th></tr>
        </thead>
        <tbody>
          <tr><td>Budget</td><td>20W</td><td>Phone only</td><td>~$16</td></tr>
          <tr><td>Mid-range</td><td>33W</td><td>Phone + earbuds/tablet</td><td>~$20</td></tr>
          <tr><td>Everyday</td><td>65–67W</td><td>Phone, tablet, and ultrabook</td><td>~$55</td></tr>
          <tr><td>High-power</td><td>100W</td><td>Full-speed laptop charging + more</td><td>~$60</td></tr>
        </tbody>
      </table>

      <div class="affiliate-box">
        <strong>💵 Budget: Anker Nano Pro 20W</strong>
        Single-port, pocket-sized, enough to fast-charge a phone. Not laptop-capable — this is the "I just need my phone charged" pick.
        <br/><a href="https://www.amazon.com/dp/B099F2H5KH?tag=schiesslestor-20" target="_blank" rel="nofollow sponsored noopener noreferrer">Check price on Amazon →</a>
      </div>

      <div class="affiliate-box">
        <strong>⚖️ Mid-range: Anker 323 33W 2-Port</strong>
        Adds a second port over the budget tier, so you can charge a phone and earbuds/tablet at once without doubling up on bricks.
        <br/><a href="https://www.amazon.com/dp/B0B2MM3252?tag=schiesslestor-20" target="_blank" rel="nofollow sponsored noopener noreferrer">Check price on Amazon →</a>
      </div>

      <div class="affiliate-box">
        <strong>🧳 Everyday: Anker Prime 67W GaN Charger</strong>
        A single 65–67W port comfortably covers most phones, tablets, and ultrabooks in one compact brick — the "one charger for almost everything" pick.
        <br/><a href="https://www.amazon.com/dp/B0C4YTB56H?tag=schiesslestor-20" target="_blank" rel="nofollow sponsored noopener noreferrer">Check price on Amazon →</a>
      </div>

      <div class="affiliate-box">
        <strong>🚀 High-power: Anker Prime 100W GaN, 3-Port</strong>
        Enough headroom for full-speed 16" MacBook Pro-class laptop charging, with two more ports left over for a phone and tablet.
        <br/><a href="https://www.amazon.com/dp/B0CZ6LXL8R?tag=schiesslestor-20" target="_blank" rel="nofollow sponsored noopener noreferrer">Check price on Amazon →</a>
      </div>

      <h2>✅ A Practical Buying Checklist</h2>
      <ul>
        <li><strong>Match wattage to your highest-demand device</strong>, not your phone alone, if you'll ever charge a laptop from the same brick.</li>
        <li><strong>Check for PPS support</strong> by name if you own a Samsung device that supports it — "USB-PD compatible" doesn't guarantee PPS.</li>
        <li><strong>Confirm cable ratings separately from the charger.</strong> A 240W-capable brick paired with a basic 60W cable will bottleneck at 60W.</li>
        <li><strong>Count your ports against your real usage</strong> — an idle second or third port isn't a downside, but paying extra for ports you'll never use is.</li>
        <li><strong>GaN is a size/efficiency perk, not a speed guarantee</strong> — check the wattage and protocol support independently of whether it's GaN.</li>
      </ul>

      <h2>🎯 The Bottom Line</h2>
      <p>Skip the marketing language and check three things: total wattage against your actual devices, protocol support (especially PPS if you need it), and whether your cable can keep up. Everything else on the box — GaN, port count, colorways — is secondary.</p>
    `,
  },
];

export const publishedProducts: ContentProduct[] = [
  {
    name: 'Anker Nano Pro 20W USB-C Charger',
    category: 'Power',
    price: '$11.99',
    description: 'Single-port, pocket-sized, and enough to fast-charge a phone. The budget pick if you just need your phone charged.',
    emoji: '⚡',
    affiliateUrl: 'https://www.amazon.com/dp/B099F2H5KH?tag=schiesslestor-20',
    badge: null,
    published: true,
    sortOrder: 10,
  },
  {
    name: 'Anker 323 33W 2-Port Charger',
    category: 'Power',
    price: '$18.99',
    description: 'Adds a second port over the budget tier, so a phone and earbuds or a tablet can charge at once without doubling up on bricks.',
    emoji: '⚡',
    affiliateUrl: 'https://www.amazon.com/dp/B0B2MM3252?tag=schiesslestor-20',
    badge: null,
    published: true,
    sortOrder: 20,
  },
  {
    name: 'Anker Prime 67W GaN Charger',
    category: 'Power',
    price: '$39.99',
    description: 'A single 65–67W port comfortably covers most phones, tablets, and ultrabooks in one compact brick — one charger for almost everything.',
    emoji: '⚡',
    affiliateUrl: 'https://www.amazon.com/dp/B0C4YTB56H?tag=schiesslestor-20',
    badge: "Editor's Pick",
    published: true,
    sortOrder: 30,
  },
  {
    name: 'Anker Prime 100W GaN Charger, 3-Port',
    category: 'Power',
    price: '$59.99',
    description: 'Enough headroom for full-speed 16" MacBook Pro-class laptop charging, with two more ports left over for a phone and tablet.',
    emoji: '⚡',
    affiliateUrl: 'https://www.amazon.com/dp/B0CZ6LXL8R?tag=schiesslestor-20',
    badge: null,
    published: true,
    sortOrder: 40,
  },
  {
    name: 'Anker 240W USB-C to USB-C Cable',
    category: 'Cables',
    price: '$15.99',
    description: 'Rated for the full 240W EPR ceiling, so it won\'t bottleneck a high-wattage charger — pairs with any of the higher-power picks above.',
    emoji: '🔌',
    affiliateUrl: 'https://www.amazon.com/dp/B0CCXT4QZR?tag=schiesslestor-20',
    badge: null,
    published: true,
    sortOrder: 50,
  },
];
