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
    slug: 'power-bank-capacity-explained-mah-vs-wh',
    title: "Power Bank Capacity Explained: mAh vs. Wh, and What You Can Actually Charge",
    excerpt: "A 20,000mAh power bank sounds like it should charge your phone five times over — until it doesn't. Here's what capacity numbers actually mean, and how to pick the right one.",
    category: 'Power',
    date: 'July 30, 2026',
    readTime: '8 min read',
    emoji: '🔋',
    image: 'https://images.unsplash.com/photo-1706275399494-fb26bbc5da63?fm=jpg&q=80&w=1600&auto=format&fit=crop',
    imageAlt: 'A silver portable power bank on a white table',
    published: true,
    sortOrder: 50,
    body: `
      <p class="post-disclosure"><em>This post contains affiliate links. If you buy through one, we may earn a commission at no extra cost to you.</em></p>

      <h2>🔋 Why "mAh" Is a Marketing Number, Not a Useful One</h2>
      <p>Milliamp-hours (mAh) measure electric charge, not energy — and charge alone doesn't tell you how much a battery can actually power. A power bank's mAh rating is measured at the battery cell's own voltage (typically 3.6–3.7V for lithium-ion), but it outputs power to your devices at USB voltages (5V, 9V, 15V, 20V). Comparing mAh numbers across products only works if they're built on the same cell voltage — which manufacturers rarely disclose clearly.</p>

      <h2>⚡ The Real Unit: Watt-Hours (Wh)</h2>
      <p>Watt-hours measure actual stored energy, and they're the number that lets you compare battery packs, phone batteries, and laptop batteries on equal footing. The formula is simple:</p>
      <p><strong>Wh = (mAh ÷ 1000) × V</strong></p>
      <p>A "20,000mAh" power bank built on a 3.7V cell stores about 74Wh — regardless of what voltage it outputs to your devices. This is also the number airlines actually regulate (more on that below), and the one worth checking before comparing two packs with similar mAh ratings but different actual capacity.</p>
      <p>Worth separating from Wh here, since the two look similar but measure different things: Wh describes how much energy a pack stores, while W (watts) describes how fast it can actually deliver that energy to a device. A power bank can have huge Wh capacity and still charge things slowly if its W rating is weak. See our <a href="/blog/fast-charging-explained-how-to-choose-a-brick">guide to fast-charging wattage</a> for how to read a W rating on a charger or power bank.</p>

      <h2>📉 Why Your Power Bank "Loses" Capacity</h2>
      <p>Converting the battery's internal voltage up to USB output voltages isn't lossless — expect roughly 80–85% real-world efficiency. That "74Wh" pack delivers closer to 60–63Wh to your devices in practice. This is normal and true of every power bank on the market, not a defect — it's why a 20,000mAh pack won't literally give you "four full charges" of a 5,000mAh phone; the math looks close on paper but the conversion loss eats into it.</p>

      <h2>✈️ The Airline Rule That Actually Matters</h2>
      <p>The FAA and TSA regulate power banks by watt-hours, not mAh, and the thresholds are strict:</p>
      <table class="post-table">
        <thead>
          <tr><th>Capacity</th><th>Rule</th></tr>
        </thead>
        <tbody>
          <tr><td>Up to 100Wh</td><td>Allowed in carry-on, no quantity limit</td></tr>
          <tr><td>100–160Wh</td><td>Requires airline approval, max 2 per passenger</td></tr>
          <tr><td>Over 160Wh</td><td>Prohibited on commercial flights entirely</td></tr>
        </tbody>
      </table>
      <p>Power banks must always travel in carry-on luggage, never checked bags, regardless of capacity. This is also why most travel-oriented power banks top out around 25,000–27,000mAh (roughly 90–99Wh at typical cell voltages) — manufacturers deliberately stay under the 100Wh line so the product needs no special approval to fly.</p>

      <h2>🔢 How Much Capacity Do You Actually Need?</h2>
      <p>Match capacity to what you're actually trying to recharge, accounting for that ~80–85% real-world efficiency:</p>
      <table class="post-table">
        <thead>
          <tr><th>Device</th><th>Typical battery size</th></tr>
        </thead>
        <tbody>
          <tr><td>Phone</td><td>~12–17Wh</td></tr>
          <tr><td>Tablet</td><td>~30–40Wh</td></tr>
          <tr><td>13" ultrabook</td><td>~50–60Wh</td></tr>
          <tr><td>16" MacBook Pro-class laptop</td><td>~95–100Wh</td></tr>
        </tbody>
      </table>
      <p>A 10,000mAh pack (~37Wh, ~31Wh usable) is good for roughly two phone charges. A 20,000mAh pack (~74Wh, ~60–63Wh usable) covers a phone several times over or one tablet with room to spare. A 25,000mAh pack (~92Wh, ~78Wh usable) can take a 13" ultrabook to a full charge, or get a 16" MacBook Pro-class laptop most of the way there — remember that a laptop-class battery is itself close to the 100Wh airline limit, so a power bank can never fully out-charge one and stay travel-legal.</p>

      <h2>💰 Picks at Every Capacity Tier</h2>
      <table class="post-table">
        <thead>
          <tr><th>Tier</th><th>Capacity</th><th>Good for</th><th>Typical price</th></tr>
        </thead>
        <tbody>
          <tr><td>Budget</td><td>10,000mAh (~37Wh)</td><td>Phone only, light travel</td><td>~$50</td></tr>
          <tr><td>Everyday</td><td>20,000mAh (~74Wh)</td><td>Phone + tablet, multi-day</td><td>~$60</td></tr>
          <tr><td>Laptop-capable</td><td>25,000mAh (~92Wh)</td><td>Laptop, flight-ready, under the 100Wh line</td><td>~$120</td></tr>
        </tbody>
      </table>

      <div class="affiliate-box">
        <strong>💵 Budget: Anker Nano Power Bank, 10,000mAh</strong>
        Built-in USB-C cable, compact enough for daily carry — good for topping off a phone on the go, not laptop-capable.
        <br/><a href="https://www.amazon.com/dp/B0C9CJKCH3?tag=schiesslestor-20" target="_blank" rel="nofollow sponsored noopener noreferrer">Check price on Amazon →</a>
      </div>

      <div class="affiliate-box">
        <strong>⚖️ Everyday: Anker 20,000mAh Travel Essential</strong>
        A comfortable multi-day capacity for a phone and tablet without pushing into airline-approval territory.
        <br/><a href="https://www.amazon.com/dp/B0CXDXP8VR?tag=schiesslestor-20" target="_blank" rel="nofollow sponsored noopener noreferrer">Check price on Amazon →</a>
      </div>

      <div class="affiliate-box">
        <strong>🧳 Laptop-capable: Anker 25,000mAh Laptop Power Bank, 165W</strong>
        Rated for laptop charging with 100W max per port, built-in retractable cables, and flight-ready capacity that stays under the 100Wh threshold.
        <br/><a href="https://www.amazon.com/dp/B0DCBB2YTR?tag=schiesslestor-20" target="_blank" rel="nofollow sponsored noopener noreferrer">Check price on Amazon →</a>
      </div>

      <h2>✅ A Practical Buying Checklist</h2>
      <ul>
        <li><strong>Convert mAh to Wh</strong> before comparing two packs — the formula is (mAh ÷ 1000) × cell voltage, and most brands list Wh directly on the spec sheet if you look.</li>
        <li><strong>Expect ~80–85% real-world efficiency</strong> — a pack's rated capacity is never what actually reaches your device.</li>
        <li><strong>Check the Wh rating against airline limits</strong> if you'll ever fly with it — 100Wh is the line that matters, not any particular mAh number.</li>
        <li><strong>Capacity and output wattage are separate specs</strong> — a huge pack with a weak port still charges slowly.</li>
        <li><strong>Match capacity to your actual device</strong>, not the biggest number available — extra capacity you never use is just extra weight in your bag.</li>
      </ul>

      <h2>🎯 The Bottom Line</h2>
      <p>Ignore the mAh number on the box and look for Wh — it's the one figure that lets you compare packs honestly, predict airline compliance, and estimate real-world charges. Everything else on the spec sheet, including the giant mAh figure manufacturers lead with, is secondary.</p>
    `,
  },
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
  {
    name: 'UGREEN Nexode 65W GaN Charger',
    category: 'Power',
    price: '$27.99',
    description: 'A compact 3-port GaN charger covering most phones, tablets, and ultrabooks at 65W — a lower-priced alternative to the Anker 67W pick above.',
    emoji: '⚡',
    affiliateUrl: 'https://www.amazon.com/dp/B091BGMKYS?tag=schiesslestor-20',
    badge: null,
    published: true,
    sortOrder: 60,
  },
  {
    name: 'UGREEN Nexode Pro 100W GaN Charger, 3-Port',
    category: 'Power',
    price: '$59.99',
    description: 'Full-speed laptop charging with PPS support and two more ports for a phone and tablet — a direct alternative to the Anker 100W pick above.',
    emoji: '⚡',
    affiliateUrl: 'https://www.amazon.com/dp/B0CCVQB7MY?tag=schiesslestor-20',
    badge: null,
    published: true,
    sortOrder: 70,
  },
  {
    name: 'Belkin USB-C to USB-C 240W Cable, 2-Pack',
    category: 'Cables',
    price: '$22.10',
    description: 'Rated for the full 240W EPR ceiling like the Anker pick above, in a 2-pack — an alternative-brand option if you want a spare on hand.',
    emoji: '🔌',
    affiliateUrl: 'https://www.amazon.com/dp/B0F643KWGQ?tag=schiesslestor-20',
    badge: null,
    published: true,
    sortOrder: 80,
  },
  {
    name: 'Anker Nano Power Bank, 10,000mAh',
    category: 'Power Banks',
    price: '$49.99',
    description: 'Built-in USB-C cable, compact enough for daily carry — good for topping off a phone on the go, not laptop-capable.',
    emoji: '🔋',
    affiliateUrl: 'https://www.amazon.com/dp/B0C9CJKCH3?tag=schiesslestor-20',
    badge: null,
    published: true,
    sortOrder: 90,
  },
  {
    name: 'Anker 20,000mAh Travel Essential',
    category: 'Power Banks',
    price: '$59.98',
    description: 'A comfortable multi-day capacity for a phone and tablet without pushing into airline-approval territory.',
    emoji: '🔋',
    affiliateUrl: 'https://www.amazon.com/dp/B0CXDXP8VR?tag=schiesslestor-20',
    badge: "Editor's Pick",
    published: true,
    sortOrder: 100,
  },
  {
    name: 'Anker 25,000mAh Laptop Power Bank, 165W',
    category: 'Power Banks',
    price: '$119.99',
    description: 'Rated for laptop charging with 100W max per port, built-in retractable cables, and flight-ready capacity that stays under the 100Wh threshold.',
    emoji: '🔋',
    affiliateUrl: 'https://www.amazon.com/dp/B0DCBB2YTR?tag=schiesslestor-20',
    badge: null,
    published: true,
    sortOrder: 110,
  },
];
