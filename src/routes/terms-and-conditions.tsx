import { createFileRoute } from "@tanstack/react-router";
import { Legal, H2 } from "./privacy-policy";

export const Route = createFileRoute("/terms-and-conditions")({
  head: () => ({
    meta: [
      { title: "Terms of Service — dollar.com.beat" },
      { name: "description", content: "Terms of service for dollar.com.beat. Use of the platform is at your sole risk." },
    ],
  }),
  component: () => (
    <Legal title="Terms of Service" updated="May 13, 2026">
      <p>
        These Terms of Service ("Terms") form a binding agreement between you and dollar.com.beat
        ("dollar.com.beat", "we", "us", "our"). By accessing or using the website, applications, or any
        related services (collectively, the "Service"), you agree to be bound by these Terms. If you do not
        agree, do not use the Service.
      </p>

      <H2>1. Eligibility</H2>
      <p>
        You must be at least 18 years old (or the age of majority in your jurisdiction) and able to form a
        legally binding contract. By using the Service you represent and warrant that you meet these
        requirements.
      </p>

      <H2>2. The Service</H2>
      <p>
        dollar.com.beat is an online store operated by K. Kingsley ("we", "us") that sells original beats
        produced in-house directly to users ("Buyers"). Each beat is sold for a single one-time price.
        On purchase, the Buyer receives a non-exclusive right to use the beat in commercial and
        non-commercial works, subject to these Terms.
      </p>

      <H2>3. User accounts</H2>
      <p>
        You are solely responsible for: (a) maintaining the confidentiality of your credentials; (b) all
        activity that occurs under your account; and (c) any losses or damages arising from unauthorized use
        of your account. We are not liable for any loss caused by unauthorized access, even if caused in
        whole or in part by our acts or omissions.
      </p>

      <H2>4. User Content and license to dollar.com.beat</H2>
      <p>
        You retain ownership of User Content you upload. By uploading, you grant dollar.com.beat a worldwide,
        royalty-free, sublicensable, transferable, perpetual and irrevocable license to host, store, cache,
        reproduce, transmit, publicly display, publicly perform, distribute, modify, adapt, and create
        derivative works of the User Content for the purpose of operating, promoting, and improving the
        Service. You waive any moral rights to the maximum extent permitted by law.
      </p>
      <p>
        You represent and warrant that you own or have all necessary rights to your User Content and that it
        does not infringe any third-party right. You agree to indemnify and hold dollar.com.beat harmless from
        any claim arising out of your User Content (see Section 12).
      </p>

      <H2>5. Prohibited conduct</H2>
      <p>You will not, and will not attempt to:</p>
      <ul>
        <li>Upload malware, harmful code, or content that is unlawful, defamatory, hateful, harassing, sexually exploitative of minors, or otherwise objectionable.</li>
        <li>Reverse engineer, scrape, mirror, or attempt to derive source code or audio masters from the Service.</li>
        <li>Bypass technical protections, signed URLs, watermarks, or rate limits.</li>
        <li>Resell, redistribute or share downloaded beat files as standalone audio outside of finished derivative works.</li>
        <li>Use the Service to launder funds, evade taxes, or violate any applicable law.</li>
      </ul>

      <H2>6. Use rights granted on purchase</H2>
      <p>
        Each purchase grants the Buyer a worldwide, non-exclusive, perpetual right to use the beat in
        original musical works, audio-visual productions, advertisements, livestreams, and other
        commercial or non-commercial creative works. Buyers may not resell, sublicense, or redistribute
        the raw beat file as standalone audio. We reserve the right to keep using and promoting the beat
        on this Service and our channels.
      </p>

      <H2>7. Payments, fees and taxes</H2>
      <p>
        Payments are processed by third-party providers. <b>You are solely responsible for all taxes</b>
        arising from your purchase, including VAT and sales tax. All prices are shown in Nigerian naira
        unless stated otherwise.
      </p>

      <H2>8. Refunds</H2>
      <p>Refunds are governed by our <a href="/refund-policy" className="text-vault hover:underline">Refund Policy</a>, which is incorporated into these Terms.</p>

      <H2>9. Intellectual property of dollar.com.beat</H2>
      <p>
        The Service, including its design, code, trademarks, logos, and aggregated metadata, is owned by
        dollar.com.beat and protected by intellectual property laws. No license is granted to you except as
        expressly set out in these Terms.
      </p>

      <H2>10. DMCA / copyright complaints</H2>
      <p>
        If you believe content on the Service infringes your copyright, send a notice to{" "}
        <a href="mailto:kkingsley265@gmail.com" className="text-vault hover:underline">kkingsley265@gmail.com</a>{" "}
        including: (i) identification of the work; (ii) identification of the allegedly infringing material
        with URL; (iii) your contact information; (iv) a statement of good-faith belief; (v) a statement
        under penalty of perjury that you are authorized to act; and (vi) your physical or electronic
        signature. We may remove allegedly infringing content and terminate repeat infringers in our sole
        discretion.
      </p>

      <H2>11. DISCLAIMERS — THE SERVICE IS PROVIDED "AS IS"</H2>
      <p className="uppercase">
        TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, THE SERVICE, INCLUDING ALL CONTENT, BEATS, FILES,
        AND USER CONTENT, IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, WHETHER
        EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE. DOLLAR.COM.BEAT EXPRESSLY DISCLAIMS ALL WARRANTIES,
        INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, NON-INFRINGEMENT,
        QUIET ENJOYMENT, ACCURACY, AND THAT THE SERVICE WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE.
      </p>
      <p>
        We do not warrant that any beat is free of third-party claims, that any license is enforceable in
        your jurisdiction, that any payout will be made on a particular date, or that any data or file will
        be retained. Your use of the Service and any User Content is <b>at your sole risk</b>.
      </p>

      <H2>12. LIMITATION OF LIABILITY</H2>
      <p className="uppercase">
        TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT WILL DOLLAR.COM.BEAT, ITS AFFILIATES,
        OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, LICENSORS, OR SERVICE PROVIDERS BE LIABLE FOR ANY INDIRECT,
        INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, REVENUE,
        GOODWILL, DATA, USE, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR RELATING TO THESE TERMS OR THE
        SERVICE, WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), STATUTE, OR ANY OTHER
        LEGAL THEORY, AND WHETHER OR NOT WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
      </p>
      <p className="uppercase">
        OUR TOTAL CUMULATIVE LIABILITY TO YOU FOR ALL CLAIMS ARISING OUT OF OR RELATING TO THESE TERMS OR
        THE SERVICE WILL NOT EXCEED THE GREATER OF (A) THE TOTAL AMOUNT YOU PAID TO DOLLAR.COM.BEAT IN THE
        THREE (3) MONTHS PRECEDING THE EVENT GIVING RISE TO THE CLAIM, OR (B) NGN ₦20,000.
      </p>
      <p>
        Some jurisdictions do not allow the exclusion or limitation of certain damages. In such
        jurisdictions, our liability is limited to the smallest amount permitted by law. The limitations in
        this Section apply even if a remedy fails of its essential purpose.
      </p>

      <H2>13. Indemnification</H2>
      <p>
        You agree to defend, indemnify and hold harmless dollar.com.beat and its affiliates, officers,
        directors, employees and agents from and against any and all claims, damages, obligations, losses,
        liabilities, costs and expenses (including reasonable attorneys' fees) arising from: (a) your use of
        the Service; (b) your User Content; (c) your violation of these Terms; (d) your violation of any
        third-party right, including intellectual property or privacy; or (e) any dispute between you and
        another user.
      </p>

      <H2>14. Termination</H2>
      <p>
        We may suspend or terminate your account or access to the Service <b>at any time, for any reason or
          no reason, with or without notice</b>, including for suspected violation of these Terms. Upon
        termination, your right to use the Service ceases immediately. Sections that by their nature should
        survive termination (including IP, disclaimers, limitation of liability, indemnification, and
        dispute resolution) survive.
      </p>

      <H2>15. Governing law and dispute resolution</H2>
      <p>
        These Terms are governed by the laws of the Federal Republic of Nigeria, without regard to its
        conflict-of-law principles. <b>You agree that any dispute will be resolved exclusively in the courts
          of Lagos, Nigeria</b>, and you consent to personal jurisdiction there. To the maximum extent
        permitted by law, you waive any right to a jury trial and any right to participate in a class
        action, class arbitration, or any other representative proceeding.
      </p>

      <H2>16. Changes</H2>
      <p>
        We may modify these Terms at any time by posting the revised version on the Service. Changes are
        effective immediately upon posting. Your continued use of the Service after changes constitutes
        acceptance.
      </p>

      <H2>17. Miscellaneous</H2>
      <p>
        These Terms, together with the Privacy Policy and Refund Policy, constitute the entire agreement
        between you and dollar.com.beat. If any provision is held unenforceable, the remaining provisions
        remain in full force. Our failure to enforce any right is not a waiver. You may not assign these
        Terms; we may assign them freely.
      </p>

      <H2>18. Contact</H2>
      <p><a href="mailto:kkingsley265@gmail.com" className="text-vault hover:underline">kkingsley265@gmail.com</a></p>
    </Legal>
  ),
});