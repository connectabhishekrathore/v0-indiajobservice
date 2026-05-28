import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Star, Zap, Crown, Bell, FileText, Headphones } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: 0,
    period: "",
    description: "Basic access to job listings",
    features: [
      "View all job notifications",
      "Basic search filters",
      "Email alerts (limited)",
      "Ads supported",
    ],
    cta: "Current Plan",
    disabled: true,
    popular: false,
  },
  {
    name: "Premium",
    price: 299,
    period: "/ month",
    description: "Everything you need to stay ahead",
    features: [
      "Ad-free experience",
      "Instant notifications",
      "Download PDF materials",
      "Priority support",
      "Save unlimited jobs",
      "Advanced filters",
    ],
    cta: "Get Premium",
    disabled: false,
    popular: true,
  },
  {
    name: "Premium Plus",
    price: 999,
    period: "/ year",
    description: "Best value for serious aspirants",
    features: [
      "All Premium features",
      "Exclusive study materials",
      "Previous year papers",
      "Mock test access",
      "1-on-1 career guidance",
      "WhatsApp alerts",
    ],
    cta: "Get Premium Plus",
    disabled: false,
    popular: false,
  },
];

const premiumBenefits = [
  {
    icon: Zap,
    title: "Instant Alerts",
    description: "Get job notifications before others",
  },
  {
    icon: FileText,
    title: "PDF Downloads",
    description: "Download syllabus, papers & more",
  },
  {
    icon: Bell,
    title: "WhatsApp Alerts",
    description: "Receive updates on WhatsApp",
  },
  {
    icon: Headphones,
    title: "Priority Support",
    description: "Get help when you need it",
  },
];

export function PremiumSection() {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-4">
            <Crown className="h-4 w-4" />
            Premium Membership
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Upgrade Your Job Search
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get instant notifications, ad-free experience, and exclusive study
            materials to boost your government job preparation.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {premiumBenefits.map((benefit) => (
            <Card key={benefit.title} className="border-border">
              <CardContent className="p-4 text-center">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <benefit.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground text-sm mb-1">
                  {benefit.title}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative ${
                plan.popular
                  ? "border-primary shadow-lg shadow-primary/10"
                  : "border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                    <Star className="h-3 w-3" />
                    Most Popular
                  </div>
                </div>
              )}
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {plan.description}
                  </p>
                  <div className="flex items-baseline justify-center gap-1">
                    {plan.price > 0 && (
                      <span className="text-2xl text-muted-foreground">₹</span>
                    )}
                    <span className="text-4xl font-bold text-foreground">
                      {plan.price === 0 ? "Free" : plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-muted-foreground">{plan.period}</span>
                    )}
                  </div>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-success shrink-0 mt-0.5" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                  disabled={plan.disabled}
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
