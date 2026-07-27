/**
 * Seed script — loads initial posts and products into DynamoDB via AppSync.
 *
 * Usage:
 *   node scripts/seed.mjs
 *
 * Requires amplify_outputs.json to be present (run `npx ampx sandbox` first).
 */

import { readFileSync } from 'fs';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/data';

const outputs = JSON.parse(readFileSync(new URL('../amplify_outputs.json', import.meta.url)));
Amplify.configure(outputs);
const client = generateClient();

const posts = [
  {
    slug: 'best-laptop-stands-coffee-shop',
    title: 'The 7 Best Laptop Stands for Coffee Shop Warriors (2024)',
    excerpt: 'Neck pain from hunching over your MacBook? These portable stands fold flat in your bag and turn any table into an ergonomic workstation.',
    category: 'Gear',
    date: 'June 2, 2024',
    readTime: '6 min read',
    emoji: '🖥️',
    published: true,
    sortOrder: 30,
    body: `
      <h2>Why You Need a Portable Laptop Stand</h2>
      <p>Working from coffee shops is a dream — until your neck starts screaming after two hours. The average table puts your laptop screen about 10 inches below eye level, forcing you into a hunched posture that compounds over time.</p>
      <p>A good portable stand fixes this instantly. The best ones weigh under 300g and fold small enough to slip in the side pocket of any backpack.</p>
      <h2>Our Top Picks</h2>
      <h3>1. Nexstand K2 — Best Overall</h3>
      <p>The Nexstand K2 is the gold standard for coffee shop workers. It's adjustable to six heights, holds laptops up to 17", and folds to the size of a water bottle. Incredibly stable for the price.</p>
      <div class="affiliate-box">
        <strong>💛 Our Pick: Nexstand K2 Laptop Stand</strong>
        Lightweight, packable, and genuinely sturdy. Worth every cent for daily nomads.
        <br/><a href="#" rel="noopener noreferrer">Check price on Amazon →</a>
      </div>
      <h3>2. Rain Design mStand360 — Best for Style</h3>
      <p>If you care about aesthetics and don't mind a heavier option, the mStand360 lets you rotate your laptop 360° and matches Apple's aluminum perfectly.</p>
      <h3>3. Majextand — Thinnest Option</h3>
      <p>Sticks to the bottom of your laptop and unfolds when you need it. Zero additional bag space required.</p>
      <h2>What to Look For</h2>
      <ul>
        <li><strong>Weight:</strong> Under 300g is the sweet spot for daily carry</li>
        <li><strong>Height range:</strong> Look for at least 3 height settings</li>
        <li><strong>Stability:</strong> Rubber feet are non-negotiable on cafe tables</li>
        <li><strong>Packed size:</strong> It needs to fit in a bag you're already carrying</li>
      </ul>
      <h2>The Bottom Line</h2>
      <p>If you work from cafes more than twice a week, a portable stand is the highest-ROI purchase you can make for your health and productivity.</p>
    `,
  },
  {
    slug: 'best-portable-chargers-remote-workers',
    title: 'Best Portable Chargers for Remote Workers Who Live on the Go',
    excerpt: "Running out of battery mid-meeting is not an option. Here are the power banks that keep laptops, phones, and earbuds alive all day.",
    category: 'Power',
    date: 'May 18, 2024',
    readTime: '8 min read',
    emoji: '🔋',
    published: true,
    sortOrder: 20,
    body: `
      <h2>Power Anxiety Is Real</h2>
      <p>You're 45 minutes into a client call and your laptop hits 8%. Sound familiar? A capable power bank eliminates this entirely. The trick is finding one that can actually charge a laptop — many can't.</p>
      <h2>What "Laptop-Capable" Actually Means</h2>
      <p>To charge a modern laptop via USB-C, you need a power bank that outputs at least 45W (preferably 65W+). Most phone power banks top out at 18–20W, which will slow-drain your laptop even while "charging" it.</p>
      <h3>Best for MacBook Users: Anker 737 (PowerCore 26K)</h3>
      <p>140W output, 26,800mAh capacity, and a display that shows wattage in real time.</p>
      <div class="affiliate-box">
        <strong>💛 Our Pick: Anker 737 Power Bank</strong>
        The only power bank that genuinely replaces the wall for a full work day.
        <br/><a href="#" rel="noopener noreferrer">Check price on Amazon →</a>
      </div>
      <h2>Key Numbers to Know</h2>
      <ul>
        <li>13" MacBook Air: ~50Wh battery</li>
        <li>13" MacBook Pro: ~58Wh battery</li>
        <li>15" MacBook Pro: ~70Wh battery</li>
        <li>Most Windows ultrabooks: 40–65Wh</li>
      </ul>
    `,
  },
  {
    slug: 'work-from-anywhere-setup-guide',
    title: "The Complete Work-From-Anywhere Setup: 12 Items That Fit in One Bag",
    excerpt: "A full mobile office — laptop, monitors, audio, power — packed into a 20L daypack. Here's exactly what we carry and why.",
    category: 'Setup',
    date: 'April 30, 2024',
    readTime: '12 min read',
    emoji: '🎒',
    published: true,
    sortOrder: 10,
    body: `
      <h2>The One-Bag Philosophy</h2>
      <p>The best mobile setup is one you'll actually carry. The goal is a complete, capable office that fits in a single 20–26L backpack.</p>
      <h2>The Core 12</h2>
      <h3>1. Laptop</h3><p>MacBook Air M3 or a 13" Windows ultrabook. Thin, light, long battery life.</p>
      <h3>2. Portable Laptop Stand</h3><p>Nexstand K2 or similar.</p>
      <h3>3. Compact Wireless Keyboard</h3><p>Logitech MX Keys Mini. Full-key feel at 60% the footprint.</p>
      <div class="affiliate-box">
        <strong>💛 Our Pick: Logitech MX Keys Mini</strong>
        Multi-device pairing, great key feel, rechargeable.
        <br/><a href="#" rel="noopener noreferrer">Check price on Amazon →</a>
      </div>
      <h3>4. Compact Mouse</h3><p>Logitech MX Anywhere 3. Works on any surface including glass and fabric.</p>
      <h3>5. USB-C Hub</h3><p>Anker 7-in-1 or similar.</p>
      <h3>6. Portable Charger</h3><p>65W+ minimum.</p>
      <h3>7. Noise-Cancelling Earbuds</h3><p>Sony WF-1000XM5 or AirPods Pro.</p>
      <h3>8–12. The Rest</h3><p>Laptop sleeve, short USB-C cables, cable organizer pouch, and the right backpack (Aer Travel Pack 2 or Peak Design 20L).</p>
      <h2>Total Weight</h2>
      <p>With all 12 items, expect around 3–4kg total.</p>
    `,
  },
];

const products = [
  { name: 'Nexstand K2 Laptop Stand', category: 'Stands', price: '$39', description: 'Foldable, adjustable, and lighter than a paperback. The go-to stand for cafe workers.', emoji: '🖥️', affiliateUrl: '#', badge: "Editor's Pick", published: true, sortOrder: 10 },
  { name: 'Anker 737 Power Bank 140W', category: 'Power', price: '$99', description: 'The only power bank that truly replaces your wall charger for a full work day.', emoji: '🔋', affiliateUrl: '#', badge: 'Best Seller', published: true, sortOrder: 20 },
  { name: 'Logitech MX Keys Mini', category: 'Keyboards', price: '$99', description: 'Full-size key feel at 60% the footprint. Pairs to three devices simultaneously.', emoji: '⌨️', affiliateUrl: '#', badge: null, published: true, sortOrder: 30 },
  { name: 'Sony WF-1000XM5', category: 'Audio', price: '$249', description: 'Industry-leading noise cancellation in the smallest form factor yet. Cafe essential.', emoji: '🎧', affiliateUrl: '#', badge: 'Top Rated', published: true, sortOrder: 40 },
  { name: 'Anker 7-in-1 USB-C Hub', category: 'Connectivity', price: '$35', description: 'HDMI 4K, 3× USB-A, USB-C PD, SD & microSD. One cable to rule them all.', emoji: '🔌', affiliateUrl: '#', badge: null, published: true, sortOrder: 50 },
  { name: 'Lepow 15.6" Portable Monitor', category: 'Displays', price: '$179', description: 'Plug-and-play USB-C. Thin as a notebook, sharp as your desk monitor.', emoji: '🖥️', affiliateUrl: '#', badge: null, published: true, sortOrder: 60 },
];

async function seed() {
  console.log('Seeding posts...');
  for (const post of posts) {
    const { errors } = await client.models.Post.create(post);
    if (errors) console.error(`  ✗ ${post.slug}`, errors);
    else console.log(`  ✓ ${post.slug}`);
  }

  console.log('Seeding products...');
  for (const product of products) {
    const { errors } = await client.models.Product.create(product);
    if (errors) console.error(`  ✗ ${product.name}`, errors);
    else console.log(`  ✓ ${product.name}`);
  }

  console.log('Done.');
}

seed().catch(console.error);
