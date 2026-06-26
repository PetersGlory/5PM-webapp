import { Link } from "react-router-dom";
import { ArrowRight, Shield, TrendingUp, Building2, CheckCircle, Star } from "lucide-react";
import { Button } from "../../components/common";
import { ROUTES } from "../../constants";

const products = [
  { name: "Nexus Income Vault", description: "Stable fixed-income investment with monthly returns.", roi: "12-18% p.a.", min: "₦100,000" },
  { name: "Fractional Real Estate", description: "Own a piece of prime real estate with fractional ownership.", roi: "15-25% p.a.", min: "₦500,000" },
  { name: "Wealth Plans", description: "Long-term wealth building with diversified portfolios.", roi: "10-20% p.a.", min: "₦50,000" },
];

const stats = [
  { value: "5,000+", label: "Active Investors" },
  { value: "₦2.5B+", label: "Assets Under Management" },
  { value: "50+", label: "Projects Funded" },
];

const testimonials = [
  { name: "Adebayo O.", text: "The transparency and regular updates give me confidence in my investments.", rating: 5 },
  { name: "Chioma E.", text: "Fractional real estate made it possible for me to invest in property I never thought I could afford.", rating: 5 },
  { name: "Emeka N.", text: "Their platform makes investing simple and straightforward. Highly recommended!", rating: 5 },
];

function LandingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-brand-700 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Invest in Your Future with <span className="text-brand-300">5PM Nexus</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">
              Premium digital wealth and investment platform. Access asset-backed investment opportunities, fractional real estate, and wealth plans.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to={ROUTES.REGISTER}>
                <Button size="lg" className="bg-white text-navy-900 hover:bg-gray-100">
                  Start Investing <ArrowRight size={20} />
                </Button>
              </Link>
              <Link to={ROUTES.LOGIN}>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Sign In
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap gap-8 mt-12">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-bold text-brand-300">{stat.value}</p>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Why Choose 5PM Nexus Invest</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">We prioritize trust, transparency, and simplicity in everything we do.</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: "Trust & Security", description: "Your investments are secured with industry-leading security protocols and regulatory compliance." },
              { icon: TrendingUp, title: "Asset-Backed Investments", description: "Every investment opportunity is backed by tangible assets, reducing your risk exposure." },
              { icon: Building2, title: "Fractional Ownership", description: "Access high-value real estate investments with fractional ownership starting from as little as ₦500,000." },
            ].map((item) => (
              <div key={item.title} className="text-center p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 mx-auto mb-6 bg-brand-50 rounded-2xl flex items-center justify-center">
                  <item.icon className="text-brand-500" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Products */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Investment Products</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">Choose from our range of carefully curated investment opportunities.</p>
          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.name} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{product.name}</h3>
                <p className="text-gray-600 mb-6">{product.description}</p>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm"><span className="text-gray-500">Target ROI</span><span className="font-semibold text-brand-500">{product.roi}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-gray-500">Minimum</span><span className="font-semibold text-gray-900">{product.min}</span></div>
                </div>
                <Link to={ROUTES.REGISTER} className="block text-center text-brand-500 font-semibold hover:text-brand-600">Learn More →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How It Works</h2>
          <div className="grid md:grid-cols-5 gap-8">
            {["Register", "Complete KYC", "Fund Wallet", "Invest", "Earn Returns"].map((step, i) => (
              <div key={step} className="text-center relative">
                <div className="w-14 h-14 mx-auto mb-4 bg-brand-500 rounded-full flex items-center justify-center text-white font-bold text-xl">{i + 1}</div>
                <h3 className="font-semibold text-gray-900">{step}</h3>
                {i < 4 && <div className="hidden md:block absolute top-7 left-[60%] w-[80%] h-0.5 border-t-2 border-dashed border-brand-200" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">What Our Investors Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <div className="flex gap-1 mb-4">{Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={16} className="fill-amber-400 text-amber-400" />)}</div>
                <p className="text-gray-600 mb-4">"{t.text}"</p>
                <p className="font-semibold text-gray-900">— {t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              { q: "How do I start investing?", a: "Create an account, complete your KYC verification, fund your wallet, and start exploring investment opportunities." },
              { q: "What is the minimum investment?", a: "Minimum investments start from ₦50,000 for Wealth Plans, ₦100,000 for the Nexus Income Vault, and ₦500,000 for Fractional Real Estate." },
              { q: "How are my returns paid?", a: "Returns are paid directly to your wallet according to the investment terms—monthly, quarterly, or at maturity." },
              { q: "Is my investment secure?", a: "Yes. All investments are asset-backed and we employ industry-standard security measures to protect your funds and data." },
            ].map((faq) => (
              <details key={faq.q} className="group bg-gray-50 rounded-xl p-5">
                <summary className="flex items-center justify-between cursor-pointer font-semibold text-gray-900">
                  {faq.q}
                  <ArrowRight size={16} className="group-open:rotate-90 transition-transform" />
                </summary>
                <p className="mt-3 text-gray-600 text-sm">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-brand-500 to-navy-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Start Your Investment Journey?</h2>
          <p className="text-lg text-white/80 mb-8">Join thousands of smart investors building wealth with 5PM Nexus Invest.</p>
          <Link to={ROUTES.REGISTER}>
            <Button size="lg" className="bg-white text-navy-900 hover:bg-gray-100">
              Get Started Free <ArrowRight size={20} />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}

export default LandingPage;
