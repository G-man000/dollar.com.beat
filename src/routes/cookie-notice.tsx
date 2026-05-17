import { createFileRoute } from "@tanstack/react-router";
import { Legal, H2 } from "./privacy-policy";

export const Route = createFileRoute("/cookie-notice")({
  head: () => ({
    meta: [
      { title: "Cookie Notice — dollar.com.beat" },
      { name: "description", content: "Cookies and tracking technologies used by dollar.com.beat." },
    ],
  }),
  component: () => (
    <Legal title="Cookie Notice" updated="May 10, 2026">
      <p>This Notice explains how dollar.com.beat uses cookies and similar tracking technologies on our website.</p>

      <H2>1. What are cookies?</H2>
      <p>Cookies are small text files placed on your device. They help the site function, remember preferences and measure performance.</p>

      <H2>2. Categories we use</H2>
      <ul>
        <li><b>Strictly necessary</b> — authentication, cart, security. Cannot be disabled.</li>
        <li><b>Analytics</b> — anonymous usage statistics so we can improve the platform (e.g. Plausible, PostHog).</li>
        <li><b>Marketing</b> — measure conversion of paid campaigns. Only set with your consent.</li>
      </ul>

      <H2>3. Your choices</H2>
      <p>
        On your first visit you see a banner letting you <b>Accept all</b>, <b>Analytics only</b>, or <b>Reject all</b>.
        You can change your choice at any time by clearing your browser storage and reloading, or by emailing
        <a href="mailto:kkingsley265@gmail.com" className="text-vault hover:underline"> kkingsley265@gmail.com</a>.
      </p>

      <H2>4. Third-party cookies</H2>
      <p>Stripe, Paystack and Cloudflare may set their own cookies for fraud prevention and content delivery. Their use is governed by their own privacy policies.</p>

      <H2>5. Do Not Track</H2>
      <p>We honor the Global Privacy Control signal where supported. When detected, optional cookies are not set.</p>

      <H2>6. Contact</H2>
      <p><a href="mailto:kkingsley265@gmail.com" className="text-vault hover:underline">kkingsley265@gmail.com</a></p>
    </Legal>
  ),
});