import type { Metadata } from "next";
import Link from "next/link";
import styles from "../legal/legal.module.css";

export const metadata: Metadata = {
  title: "Privacy Statement",
  description: "Jawly's formal privacy statement for our website, classroom services, and media practices.",
  alternates: { canonical: "/privacy" },
};

const sections = [
  ["scope", "Scope"], ["principles", "Our principles"], ["collect", "Information we collect"],
  ["use", "How we use information"], ["disclose", "How we disclose information"],
  ["children", "Children's privacy"], ["media", "Classroom media"], ["retention", "Retention and security"],
  ["rights", "Your choices and rights"], ["third-parties", "Third-party services"],
  ["changes", "Changes"], ["contact", "Contact us"],
] as const;

export default function PrivacyPage() {
  return <main className={styles.page}>
    <header className={styles.hero}><div className={styles.heroInner}>
      <p className={styles.eyebrow}>PRIVACY STATEMENT</p>
      <h1>Privacy should be clear, specific, and built into the experience.</h1>
      <p className={styles.intro}>This statement explains how Jawly collects, uses, discloses, and protects personal information through jawly.kids, our business communications, and our classroom services.</p>
      <p className={styles.effective}>Effective September 30, 2026</p>
    </div></header>
    <div className={styles.layout}>
      <nav className={styles.toc} aria-label="Privacy statement sections"><strong>On this page</strong>{sections.map(([id,label])=><a key={id} href={`#${id}`}>{label}</a>)}</nav>
      <article className={styles.content}>
        <section id="scope"><h2>1. Scope</h2>
          <p>This Privacy Statement applies to Jawly, including our website, inquiries, availability checks, waitlists, demonstrations, and classroom enrichment services. In this statement, “Jawly,” “we,” “us,” and “our” refer to the Jawly business.</p>
          <p>This statement does not govern information collected independently by a school, childcare center, early-learning program, or other customer. Those organizations control their own records, family communications, photography, and privacy practices.</p>
        </section>
        <section id="principles"><h2>2. Our privacy principles</h2>
          <div className={styles.callout}><p><strong>Jawly is not, and will never be, in the business of children’s data.</strong></p><p>Our classroom experience is designed to work without accounts for children, child profiles, facial or voice recognition, behavioral histories, or targeted advertising based on a child’s activity.</p></div>
          <p>Our trained performers may notice and respond to children in the room. That human attention is part of the live experience. It does not require the Jawly character system to identify a child or create a persistent record about that child.</p>
        </section>
        <section id="collect"><h2>3. Information we collect</h2>
          <h3>Information you provide</h3><ul>
            <li>Contact information, such as an adult’s name, business email address, telephone number, and organization.</li>
            <li>School or center information, including location, ZIP code, age group, class size, scheduling preferences, and selected program.</li>
            <li>Inquiry, waitlist, booking, survey, testimonial, and other communications you choose to send us.</li>
            <li>Transaction and service information if you purchase or arrange services. Payment information may be processed by a payment provider and is not necessarily stored by Jawly.</li>
          </ul>
          <h3>Information collected automatically</h3><p>When an adult visits our website, our hosting infrastructure and service providers may receive standard technical information such as IP address, browser and device type, operating system, referring page, pages requested, timestamps, and diagnostic or security logs. We may also receive information needed to remember preferences, operate forms, prevent abuse, and understand website performance.</p>
          <h3>Information from other sources</h3><p>We may receive business-contact information from a school, referral partner, service provider, or publicly available professional source. We may also receive confirmation from a center concerning scheduling, permissions, or authorized media activity.</p>
        </section>
        <section id="use"><h2>4. How we use information</h2><p>We use personal information to:</p><ul>
          <li>respond to inquiries and communicate with adult representatives of schools, centers, and families;</li><li>check service availability, maintain waitlists, schedule visits, and deliver programs;</li><li>operate, secure, troubleshoot, and improve our website and services;</li><li>manage customer relationships, payments, records, and legal obligations;</li><li>send service messages and, where permitted, relevant business updates;</li><li>protect children, customers, performers, Jawly, and the public from fraud, misuse, or safety risks; and</li><li>establish, exercise, or defend legal rights.</li>
        </ul><p>We do not use children’s classroom participation to create advertising audiences or data products.</p></section>
        <section id="disclose"><h2>5. How we disclose information</h2><p>We may disclose personal information only as reasonably necessary:</p><ul>
          <li><strong>To service providers.</strong> Vendors may support website hosting, email, scheduling, communications, media hosting, form delivery, payment processing, security, and professional services. They may use information only to perform services for us, subject to their agreements and applicable law.</li>
          <li><strong>To the relevant school or center.</strong> We may share scheduling, service, safety, or administrative information with the organization arranging a Jawly visit.</li>
          <li><strong>For legal and safety reasons.</strong> We may respond to lawful process or protect rights, safety, property, and the integrity of our services.</li>
          <li><strong>In a business transaction.</strong> Information may be reviewed or transferred in connection with financing, diligence, reorganization, merger, sale, or transfer of all or part of our business, subject to appropriate protections.</li>
          <li><strong>With your direction or consent.</strong> We may make another disclosure when you ask us to or clearly authorize it.</li>
        </ul><p><strong>We do not sell personal information. We do not share personal information for cross-context behavioral advertising.</strong></p></section>
        <section id="children"><h2>6. Children’s privacy</h2>
          <p>Jawly’s public website and its inquiry, waitlist, and booking features are intended for adults. Children should not submit personal information through the website.</p>
          <p>The live Jawly classroom experience does not require a child account, login, name, email address, persistent identifier, faceprint, voiceprint, or individual profile. The character system is not designed to automatically record classroom audio, video, or photographs, and it does not retain children’s answers or participation after a visit.</p>
          <p>If we learn that personal information was submitted online directly by a child under 13 without legally sufficient authorization, we will take reasonable steps to delete it. A parent or guardian who believes a child has submitted information may contact us using the details below.</p>
          <p>For more about our classroom approach, read <Link href="/trust-safety">Trust, Safety &amp; Privacy</Link>.</p>
        </section>
        <section id="media"><h2>7. Classroom photography and video</h2>
          <h3>Media created by a school or center</h3><p>Schools and centers commonly photograph or record classroom activities for private family communications. That documentation is created and controlled by the school or center under its own policies. Jawly does not control those independent practices.</p>
          <h3>Media created by Jawly</h3><p>Jawly may occasionally arrange a distinct, planned photography or filming activity using an external camera or phone for galleries, demonstrations, training, or other company materials. We coordinate that activity with the center and rely on the permissions and restrictions established for the session. Public-facing classroom galleries use altered children’s faces to reduce identifiability and disclose that treatment.</p>
          <p>Face alteration does not mean an original recording never existed. We treat original classroom recordings as sensitive media, limit access to people with a business need, and retain them only for legitimate purposes consistent with permissions, agreements, and law. A center or parent may contact us with a question about Jawly-created media.</p>
        </section>
        <section id="retention"><h2>8. Retention and security</h2>
          <p>We keep personal information only for as long as reasonably necessary for the purpose collected, including service delivery, customer relationships, recordkeeping, dispute resolution, security, and legal compliance. Retention periods vary with the type of information, our relationship with you, contractual commitments, permissions, and applicable law.</p>
          <p>We use reasonable administrative, technical, and physical safeguards appropriate to the nature of the information. No storage or transmission method is completely secure, so we cannot guarantee absolute security.</p>
        </section>
        <section id="rights"><h2>9. Your choices and privacy rights</h2>
          <p>You may ask to access, correct, or delete personal information that Jawly holds about you, or withdraw consent where our processing relies on consent. You may also opt out of nonessential marketing emails by using the unsubscribe method in the message or contacting us.</p>
          <p>Depending on where you live and whether the relevant law applies to Jawly, you may have additional rights, such as confirming whether we process your information, obtaining a portable copy, limiting certain uses of sensitive information, or appealing a denied request. We will not discriminate against you for exercising a privacy right.</p>
          <p>To make a request, email <a href="mailto:privacy@jawly.kids?subject=Privacy%20request">privacy@jawly.kids</a>. We may need to verify your identity and authority. An authorized agent may submit a request where permitted by law. We do not currently sell or share personal information for cross-context behavioral advertising, so there is no sale or advertising-sharing opt-out to exercise.</p>
        </section>
        <section id="third-parties"><h2>10. Third-party services and links</h2>
          <p>Our website may link to or display content from third parties, including video, scheduling, email, payment, or social services. Those providers may receive technical information when you load or use their content, and their own privacy policies govern their practices. A link does not mean Jawly controls or endorses a third party’s privacy practices.</p>
          <p>We do not currently use website information for targeted advertising. If our tracking or advertising practices materially change, we will update this statement and provide any notice or choice required by law.</p>
        </section>
        <section id="changes"><h2>11. Changes to this statement</h2><p>We may update this Privacy Statement as our services, practices, or legal obligations change. We will post the revised statement here and change the effective date. If a change materially affects how we use information already collected, we will provide additional notice or obtain consent when required.</p></section>
        <section id="contact"><h2>12. Contact us</h2><p>Questions, concerns, and privacy requests are welcome.</p><p><strong>Jawly</strong><br/>Email: <a href="mailto:privacy@jawly.kids">privacy@jawly.kids</a><br/>Telephone: <a href="tel:+18887752959">1-888-77-JAWLY</a></p></section>
      </article>
    </div>
  </main>;
}
