function PrivacyPolicy() {
  const sections = [
    { title: "Information We Collect", content: "We collect personal information you provide during registration, including your name, email address, phone number, BVN/NIN, and investment preferences. We also collect usage data to improve our platform experience." },
    { title: "How We Use Your Information", content: "Your information is used to process investments, verify your identity, comply with regulatory requirements, communicate updates about your portfolio, and improve our services." },
    { title: "Data Protection & Security", content: "We implement industry-standard security measures including encryption, secure servers, and access controls to protect your personal and financial information from unauthorized access." },
    { title: "Information Sharing", content: "We do not sell your personal information. We may share data with regulatory authorities as required by law, and with trusted service providers who assist in platform operations." },
    { title: "Data Retention", content: "We retain your personal information for as long as your account is active and as required by applicable regulations. You may request deletion of your data subject to legal requirements." },
    { title: "Your Rights", content: "You have the right to access, correct, or delete your personal information. You can update your profile settings or contact us to exercise these rights." },
    { title: "Cookies", content: "Our platform uses essential cookies for authentication and security. We may also use analytics cookies to improve our service. You can control cookie preferences through your browser settings." },
    { title: "Changes to This Policy", content: "We may update this privacy policy from time to time. Changes will be posted on this page with an updated effective date. We encourage you to review this policy periodically." },
    { title: "Contact Us", content: "If you have questions about this privacy policy or how we handle your data, please contact us at privacy@5pmnexus.com." },
  ];

  return (
    <div>
      <section className="bg-gradient-to-br from-navy-900 via-navy-800 to-brand-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-xl text-gray-300 max-w-3xl">Last Updated: March 2026</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <p className="text-gray-600">
            At 5PM Nexus Invest, we take your privacy seriously. This policy describes how we collect, use, and protect your personal information.
          </p>
          {sections.map((s, i) => (
            <div key={s.title}>
              <h2 className="text-xl font-bold text-gray-900 mb-3">{i + 1}. {s.title}</h2>
              <p className="text-gray-600">{s.content}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default PrivacyPolicy;
