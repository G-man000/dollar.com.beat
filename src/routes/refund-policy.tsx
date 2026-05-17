import { createFileRoute } from "@tanstack/react-router";
import { Legal, H2 } from "./privacy-policy";

export const Route = createFileRoute("/refund-policy")({
  head: () => ({
    meta: [
      { title: "Refund Policy — dollar.com.beat" },
      { name: "description", content: "Refund eligibility, the 48-hour reporting window and dispute process." },
    ],
  }),
  component: () => (
    <Legal title="Refund Policy" updated="May 10, 2026">
      <p>dollar.com.beat sells digital goods. Because beats are non-returnable once downloaded, all sales are generally final.</p>

      <H2>1. No refunds after download</H2>
      <p>Once a beat file (WAV/MP3) has been downloaded from your library, the purchase is non-refundable. The license is considered consumed at the moment of download.</p>

      <H2>2. When refunds are available</H2>
      <p>We will issue a full refund only in the following cases:</p>
      <ul>
        <li><b>Duplicate charge</b> — you were billed twice for the same purchase.</li>
        <li><b>Technical failure</b> — payment was successful but no order was created or files cannot be delivered.</li>
        <li><b>Wrong file delivered</b> — the file delivered is materially different from the beat previewed on the product page.</li>
        <li><b>Producer takedown</b> — the beat is removed for IP infringement before you have downloaded the file.</li>
      </ul>

      <H2>3. 48-hour reporting window</H2>
      <p>You must report any issue within <b>48 hours</b> of purchase by emailing <a href="mailto:kkingsley265@gmail.com" className="text-vault hover:underline">kkingsley265@gmail.com</a> with your order number, the issue, and any supporting evidence (screenshots, file hash).</p>

      <H2>4. Dispute process</H2>
      <ol className="ml-4 list-decimal space-y-2">
        <li>Submit a report within the 48-hour window.</li>
        <li>Our support team acknowledges within 24 hours.</li>
        <li>We investigate with the producer and may request additional information.</li>
        <li>A decision is issued within 7 business days. Approved refunds are returned to the original payment method within 5–10 business days.</li>
        <li>If you remain dissatisfied, you may escalate to your bank or to the Nigeria Data Protection Commission for payment-data complaints.</li>
      </ol>

      <H2>5. Chargebacks</H2>
      <p>Filing a chargeback without first contacting support may result in account suspension while the dispute is investigated.</p>

      <H2>6. Beat removal after purchase</H2>
      <p>Once a beat is purchased, it is removed from the public store. Refunds at that stage are handled case-by-case and only granted for the limited reasons in section 2.</p>

      <H2>7. Contact</H2>
      <p><a href="mailto:kkingsley265@gmail.com" className="text-vault hover:underline">kkingsley265@gmail.com</a></p>
    </Legal>
  ),
});