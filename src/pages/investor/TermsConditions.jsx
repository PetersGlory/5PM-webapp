import useAuthStore from "../../store/authStore";

function TermsConditions() {
  const { user } = useAuthStore();

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Terms & Conditions</h1>
        <p className="text-gray-600 mb-8">Last Updated: March 2026</p>
        <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
          {[1,2,3,4,5,6,7,8,9,10,11,12,13].map((num) => (
            <section key={num}>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {num}. {["Agreement to Terms","Use License","Investment Risk Disclaimer","Account Responsibility","Acceptable Use Policy","Limitation of Liability","Intellectual Property Rights","Third-Party Links","Privacy Policy","Modifications to Terms","Termination","Governing Law","Contact Us"][num-1]}
              </h2>
              <p>
                {num === 1 && "By accessing and using the 5PM Nexus Invest investor portal, you accept and agree to be bound by and comply with these Terms and Conditions."}
                {num === 2 && "Permission is granted to temporarily download one copy of the materials for personal, non-commercial transitory viewing only."}
                {num === 3 && "Investments carry inherent risks. Past performance does not guarantee future results. All investments are subject to market risks."}
                {num === 4 && "You are responsible for maintaining the confidentiality of your account information, including your password."}
                {num === 5 && "You agree not to use the platform for any unlawful purposes, to harass others, or to engage in fraudulent practices."}
                {num === 6 && "In no event shall 5PM Nexus Invest be liable for any indirect, incidental, or consequential damages."}
                {num === 7 && "All content on the platform is the property of 5PM Nexus Invest or its content suppliers."}
                {num === 8 && "The platform may contain links to third-party websites. We are not responsible for their content."}
                {num === 9 && "Your use is also governed by our Privacy Policy. Please review it to understand our practices."}
                {num === 10 && "We reserve the right to modify these terms at any time. Continued use constitutes acceptance."}
                {num === 11 && "We reserve the right to suspend or terminate your account at any time for any reason."}
                {num === 12 && "These terms are governed by the laws of Nigeria."}
                {num === 13 && "If you have any questions, please contact us at support@5pmnexus.com."}
              </p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TermsConditions;
