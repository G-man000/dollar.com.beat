import { createFileRoute } from "@tanstack/react-router";

const updated = "May 13, 2026";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — dollar.com.beat" },
      { name: "description", content: "How dollar.com.beat collects, uses and protects your data — and the limits of our liability." },
    ],
  }),
  component: () => (
    <Legal title="Privacy Policy" updated={updated}>
      <p>
        This Privacy Policy explains how dollar.com.beat ("dollar.com.beat", "we", "us", "our") collects,
        uses, discloses and protects information when you use our website, applications and services
        (collectively, the "Service"). By using the Service, you consent to the practices described here. If
        you do not agree, do not use the Service.
      </p>

      <H2>1. Information we collect</H2>
      <ul>
        <li><b>Account data:</b> name, display name, email, hashed password, profile details you provide.</li>
        <li><b>Transactional data:</b> purchase history and order records. Card data is processed by our payment providers; we do not store full card numbers.</li>
        <li><b>Usage and device data:</b> IP address, browser, device identifiers, operating system, pages viewed, beats played, referrers, and timestamps. This may be collected automatically through cookies and similar technologies.</li>
        <li><b>Communications:</b> messages you send to support, and marketing preferences.</li>
      </ul>

      <H2>2. How we use information</H2>
      <ul>
        <li>To operate, maintain, secure, and improve the Service.</li>
        <li>To process transactions and deliver beat files to Buyers.</li>
        <li>To personalize content, recommendations, and search results.</li>
        <li>To communicate service updates, security alerts, and (with your consent where required) marketing.</li>
        <li>To detect, prevent and address fraud, abuse, security incidents and unlawful activity.</li>
        <li>To comply with legal obligations and enforce our Terms of Service.</li>
      </ul>

      <H2>3. Legal bases for processing</H2>
      <p>
        Where applicable law requires a legal basis, we rely on: performance of our contract with you;
        your consent (which you may withdraw at any time); our legitimate interests in operating and
        securing the Service; and compliance with legal obligations.
      </p>

      <H2>4. How we share information</H2>
      <p>We do not sell personal information. We may share information with:</p>
      <ul>
        <li><b>Service providers</b> who process data on our behalf (hosting, payments, analytics, email, customer support).</li>
        <li><b>Buyers</b> as necessary to fulfill a transaction (delivering beat files and order confirmations).</li>
        <li><b>Legal and safety</b>: to comply with law, lawful requests, court orders, or to protect rights, property, or safety of dollar.com.beat, our users, or the public.</li>
        <li><b>Business transfers</b>: in connection with a merger, acquisition, financing, or sale of assets.</li>
        <li><b>With your consent</b>: in any other case with your express consent.</li>
      </ul>

      <H2>5. Cookies and tracking</H2>
      <p>
        We use cookies and similar technologies for authentication, preferences, security, analytics and
        (where you consent) marketing. See our{" "}
        <a href="/cookie-notice" className="text-vault hover:underline">Cookie Notice</a> for details and
        controls.
      </p>

      <H2>6. International transfers</H2>
      <p>
        Your information may be transferred to, stored, and processed in countries outside your country of
        residence, including jurisdictions whose data protection laws may differ from your own. By using the
        Service you consent to such transfers.
      </p>

      <H2>7. Data retention</H2>
      <p>
        We retain personal information for as long as your account is active and as needed to provide the
        Service, comply with legal obligations (including tax and audit requirements), resolve disputes, and
        enforce our agreements. Specific retention periods vary by data type and may extend beyond account
        closure where required by law.
      </p>

      <H2>8. Your rights</H2>
      <p>
        Depending on your jurisdiction, you may have rights to access, correct, delete, restrict or object
        to processing of your personal information, to withdraw consent, and to data portability. To
        exercise any right, email{" "}
        <a href="mailto:kkingsley265@gmail.com" className="text-vault hover:underline">kkingsley265@gmail.com</a>.
        We will respond within the time required by applicable law. We may need to verify your identity
        before acting on your request and may decline requests that are unfounded, excessive, or that we are
        legally entitled to refuse.
      </p>

      <H2>9. Security</H2>
      <p>
        We use commercially reasonable administrative, technical, and physical safeguards designed to
        protect personal information. <b>However, no method of transmission or storage is 100% secure.</b>{" "}
        We cannot and do not guarantee the security of any information you transmit to or store on the
        Service, and you do so at your own risk.
      </p>

      <H2>10. Children</H2>
      <p>
        The Service is not intended for children under 18, and we do not knowingly collect personal
        information from children. If you believe a child has provided us information, contact us and we
        will take appropriate steps to delete it.
      </p>

      <H2>11. Third-party services</H2>
      <p>
        The Service may contain links to or integrations with third-party websites and services. We are not
        responsible for the privacy practices of those third parties. We encourage you to review their
        privacy policies.
      </p>

      <H2>12. NO WARRANTIES; LIMITATION OF LIABILITY</H2>
      <p className="uppercase">
        TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, DOLLAR.COM.BEAT MAKES NO WARRANTY, EXPRESS OR
        IMPLIED, REGARDING THE SECURITY, ACCURACY, OR INTEGRITY OF ANY INFORMATION PROCESSED THROUGH THE
        SERVICE. IN NO EVENT WILL DOLLAR.COM.BEAT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
        CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATING TO THIS PRIVACY POLICY OR ANY
        PROCESSING OF YOUR INFORMATION, INCLUDING ANY UNAUTHORIZED ACCESS, BREACH, OR DATA LOSS, EVEN IF WE
        HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. OUR TOTAL CUMULATIVE LIABILITY UNDER OR
        RELATING TO THIS POLICY WILL NOT EXCEED THE GREATER OF (A) THE FEES YOU PAID TO DOLLAR.COM.BEAT IN
        THE THREE (3) MONTHS PRECEDING THE CLAIM, OR (B) USD $50.
      </p>
      <p>
        The limits in this Section apply together with, and do not replace, the limitations in our{" "}
        <a href="/terms-and-conditions" className="text-vault hover:underline">Terms of Service</a>.
      </p>

      <H2>13. Changes to this policy</H2>
      <p>
        We may update this Privacy Policy from time to time. The updated version will be indicated by a new
        "Last updated" date and is effective when posted. Your continued use of the Service after changes
        constitutes acceptance.
      </p>

      <H2>14. Contact</H2>
      <p>
        Email: <a href="mailto:kkingsley265@gmail.com" className="text-vault hover:underline">kkingsley265@gmail.com</a>
      </p>
    </Legal>
  ),
});

export function Legal({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <article className="container mx-auto max-w-3xl px-6 py-12 my-8 rounded-2xl border border-border/40 bg-black/40 backdrop-blur-md shadow-xl">
      <p className="font-mono text-xs uppercase tracking-widest text-vault font-semibold">Legal</p>
      <h1 className="mt-2 font-display text-4xl font-bold md:text-5xl text-white">{title}</h1>
      <p className="mt-2 text-sm text-white/60">Last updated: {updated}</p>
      <div className="prose prose-invert mt-8 max-w-none space-y-4 text-white/80 [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-white [&_li]:ml-4 [&_li]:list-disc [&_b]:text-white [&_strong]:text-white [&_a]:text-vault [&_a]:font-semibold">
        {children}
      </div>
    </article>
  );
}

export function H2({ children }: { children: React.ReactNode }) { return <h2>{children}</h2>; }