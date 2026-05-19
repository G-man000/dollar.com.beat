import { jsx, jsxs } from "react/jsx-runtime";
const updated = "May 13, 2026";
function Legal({
  title,
  updated: updated2,
  children
}) {
  return /* @__PURE__ */ jsxs("article", { className: "container mx-auto max-w-3xl px-6 py-12 my-8 rounded-2xl border border-border/40 bg-black/40 backdrop-blur-md shadow-xl", children: [
    /* @__PURE__ */ jsx("p", { className: "font-mono text-xs uppercase tracking-widest text-vault font-semibold", children: "Legal" }),
    /* @__PURE__ */ jsx("h1", { className: "mt-2 font-display text-4xl font-bold md:text-5xl text-white", children: title }),
    /* @__PURE__ */ jsxs("p", { className: "mt-2 text-sm text-white/60", children: [
      "Last updated: ",
      updated2
    ] }),
    /* @__PURE__ */ jsx("div", { className: "prose prose-invert mt-8 max-w-none space-y-4 text-white/80 [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-white [&_li]:ml-4 [&_li]:list-disc [&_b]:text-white [&_strong]:text-white [&_a]:text-vault [&_a]:font-semibold", children })
  ] });
}
function H2({
  children
}) {
  return /* @__PURE__ */ jsx("h2", { children });
}
const SplitComponent = () => /* @__PURE__ */ jsxs(Legal, { title: "Privacy Policy", updated, children: [
  /* @__PURE__ */ jsx("p", { children: 'This Privacy Policy explains how dollar.com.beat ("dollar.com.beat", "we", "us", "our") collects, uses, discloses and protects information when you use our website, applications and services (collectively, the "Service"). By using the Service, you consent to the practices described here. If you do not agree, do not use the Service.' }),
  /* @__PURE__ */ jsx(H2, { children: "1. Information we collect" }),
  /* @__PURE__ */ jsxs("ul", { children: [
    /* @__PURE__ */ jsxs("li", { children: [
      /* @__PURE__ */ jsx("b", { children: "Account data:" }),
      " name, display name, email, hashed password, profile details you provide."
    ] }),
    /* @__PURE__ */ jsxs("li", { children: [
      /* @__PURE__ */ jsx("b", { children: "Transactional data:" }),
      " purchase history and order records. Card data is processed by our payment providers; we do not store full card numbers."
    ] }),
    /* @__PURE__ */ jsxs("li", { children: [
      /* @__PURE__ */ jsx("b", { children: "Usage and device data:" }),
      " IP address, browser, device identifiers, operating system, pages viewed, beats played, referrers, and timestamps. This may be collected automatically through cookies and similar technologies."
    ] }),
    /* @__PURE__ */ jsxs("li", { children: [
      /* @__PURE__ */ jsx("b", { children: "Communications:" }),
      " messages you send to support, and marketing preferences."
    ] })
  ] }),
  /* @__PURE__ */ jsx(H2, { children: "2. How we use information" }),
  /* @__PURE__ */ jsxs("ul", { children: [
    /* @__PURE__ */ jsx("li", { children: "To operate, maintain, secure, and improve the Service." }),
    /* @__PURE__ */ jsx("li", { children: "To process transactions and deliver beat files to Buyers." }),
    /* @__PURE__ */ jsx("li", { children: "To personalize content, recommendations, and search results." }),
    /* @__PURE__ */ jsx("li", { children: "To communicate service updates, security alerts, and (with your consent where required) marketing." }),
    /* @__PURE__ */ jsx("li", { children: "To detect, prevent and address fraud, abuse, security incidents and unlawful activity." }),
    /* @__PURE__ */ jsx("li", { children: "To comply with legal obligations and enforce our Terms of Service." })
  ] }),
  /* @__PURE__ */ jsx(H2, { children: "3. Legal bases for processing" }),
  /* @__PURE__ */ jsx("p", { children: "Where applicable law requires a legal basis, we rely on: performance of our contract with you; your consent (which you may withdraw at any time); our legitimate interests in operating and securing the Service; and compliance with legal obligations." }),
  /* @__PURE__ */ jsx(H2, { children: "4. How we share information" }),
  /* @__PURE__ */ jsx("p", { children: "We do not sell personal information. We may share information with:" }),
  /* @__PURE__ */ jsxs("ul", { children: [
    /* @__PURE__ */ jsxs("li", { children: [
      /* @__PURE__ */ jsx("b", { children: "Service providers" }),
      " who process data on our behalf (hosting, payments, analytics, email, customer support)."
    ] }),
    /* @__PURE__ */ jsxs("li", { children: [
      /* @__PURE__ */ jsx("b", { children: "Buyers" }),
      " as necessary to fulfill a transaction (delivering beat files and order confirmations)."
    ] }),
    /* @__PURE__ */ jsxs("li", { children: [
      /* @__PURE__ */ jsx("b", { children: "Legal and safety" }),
      ": to comply with law, lawful requests, court orders, or to protect rights, property, or safety of dollar.com.beat, our users, or the public."
    ] }),
    /* @__PURE__ */ jsxs("li", { children: [
      /* @__PURE__ */ jsx("b", { children: "Business transfers" }),
      ": in connection with a merger, acquisition, financing, or sale of assets."
    ] }),
    /* @__PURE__ */ jsxs("li", { children: [
      /* @__PURE__ */ jsx("b", { children: "With your consent" }),
      ": in any other case with your express consent."
    ] })
  ] }),
  /* @__PURE__ */ jsx(H2, { children: "5. Cookies and tracking" }),
  /* @__PURE__ */ jsxs("p", { children: [
    "We use cookies and similar technologies for authentication, preferences, security, analytics and (where you consent) marketing. See our",
    " ",
    /* @__PURE__ */ jsx("a", { href: "/cookie-notice", className: "text-vault hover:underline", children: "Cookie Notice" }),
    " for details and controls."
  ] }),
  /* @__PURE__ */ jsx(H2, { children: "6. International transfers" }),
  /* @__PURE__ */ jsx("p", { children: "Your information may be transferred to, stored, and processed in countries outside your country of residence, including jurisdictions whose data protection laws may differ from your own. By using the Service you consent to such transfers." }),
  /* @__PURE__ */ jsx(H2, { children: "7. Data retention" }),
  /* @__PURE__ */ jsx("p", { children: "We retain personal information for as long as your account is active and as needed to provide the Service, comply with legal obligations (including tax and audit requirements), resolve disputes, and enforce our agreements. Specific retention periods vary by data type and may extend beyond account closure where required by law." }),
  /* @__PURE__ */ jsx(H2, { children: "8. Your rights" }),
  /* @__PURE__ */ jsxs("p", { children: [
    "Depending on your jurisdiction, you may have rights to access, correct, delete, restrict or object to processing of your personal information, to withdraw consent, and to data portability. To exercise any right, email",
    " ",
    /* @__PURE__ */ jsx("a", { href: "mailto:kkingsley265@gmail.com", className: "text-vault hover:underline", children: "kkingsley265@gmail.com" }),
    ". We will respond within the time required by applicable law. We may need to verify your identity before acting on your request and may decline requests that are unfounded, excessive, or that we are legally entitled to refuse."
  ] }),
  /* @__PURE__ */ jsx(H2, { children: "9. Security" }),
  /* @__PURE__ */ jsxs("p", { children: [
    "We use commercially reasonable administrative, technical, and physical safeguards designed to protect personal information. ",
    /* @__PURE__ */ jsx("b", { children: "However, no method of transmission or storage is 100% secure." }),
    " ",
    "We cannot and do not guarantee the security of any information you transmit to or store on the Service, and you do so at your own risk."
  ] }),
  /* @__PURE__ */ jsx(H2, { children: "10. Children" }),
  /* @__PURE__ */ jsx("p", { children: "The Service is not intended for children under 18, and we do not knowingly collect personal information from children. If you believe a child has provided us information, contact us and we will take appropriate steps to delete it." }),
  /* @__PURE__ */ jsx(H2, { children: "11. Third-party services" }),
  /* @__PURE__ */ jsx("p", { children: "The Service may contain links to or integrations with third-party websites and services. We are not responsible for the privacy practices of those third parties. We encourage you to review their privacy policies." }),
  /* @__PURE__ */ jsx(H2, { children: "12. NO WARRANTIES; LIMITATION OF LIABILITY" }),
  /* @__PURE__ */ jsx("p", { className: "uppercase", children: "TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, DOLLAR.COM.BEAT MAKES NO WARRANTY, EXPRESS OR IMPLIED, REGARDING THE SECURITY, ACCURACY, OR INTEGRITY OF ANY INFORMATION PROCESSED THROUGH THE SERVICE. IN NO EVENT WILL DOLLAR.COM.BEAT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATING TO THIS PRIVACY POLICY OR ANY PROCESSING OF YOUR INFORMATION, INCLUDING ANY UNAUTHORIZED ACCESS, BREACH, OR DATA LOSS, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. OUR TOTAL CUMULATIVE LIABILITY UNDER OR RELATING TO THIS POLICY WILL NOT EXCEED THE GREATER OF (A) THE FEES YOU PAID TO DOLLAR.COM.BEAT IN THE THREE (3) MONTHS PRECEDING THE CLAIM, OR (B) USD $50." }),
  /* @__PURE__ */ jsxs("p", { children: [
    "The limits in this Section apply together with, and do not replace, the limitations in our",
    " ",
    /* @__PURE__ */ jsx("a", { href: "/terms-and-conditions", className: "text-vault hover:underline", children: "Terms of Service" }),
    "."
  ] }),
  /* @__PURE__ */ jsx(H2, { children: "13. Changes to this policy" }),
  /* @__PURE__ */ jsx("p", { children: 'We may update this Privacy Policy from time to time. The updated version will be indicated by a new "Last updated" date and is effective when posted. Your continued use of the Service after changes constitutes acceptance.' }),
  /* @__PURE__ */ jsx(H2, { children: "14. Contact" }),
  /* @__PURE__ */ jsxs("p", { children: [
    "Email: ",
    /* @__PURE__ */ jsx("a", { href: "mailto:kkingsley265@gmail.com", className: "text-vault hover:underline", children: "kkingsley265@gmail.com" })
  ] })
] });
export {
  H2,
  Legal,
  SplitComponent as component
};
