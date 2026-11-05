import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  Send,
  CheckCircle
} from "lucide-react";
import { toast } from "sonner";

const serviceOptions = [
  "Asphalt Paving",
  "Concrete Work",
  "Sealcoating",
  "Site Grading",
  "Repairs & Patching",
  "ADA Compliance",
  "Other",
];

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    toast.info("Mockup complete — no information was sent.");
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-primary py-16 md:py-24">
        <div className="container-wide">
          <div className="max-w-3xl">
            <p className="text-accent font-heading uppercase tracking-widest mb-4">
              Contact Us
            </p>
            <h1 className="text-4xl md:text-5xl font-heading text-primary-foreground mb-6">
              Get Your Free Quote Today
            </h1>
            <p className="text-lg text-primary-foreground/80">
              Ready to start your project? Fill out the form below and we'll provide 
              a detailed estimate within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-8">
              <div>
                <h2 className="font-heading text-2xl text-foreground mb-6">
                  Get In Touch
                </h2>
                <p className="text-muted-foreground mb-8">
                  Have questions or ready for a quote? Contact us by phone, email, 
                  or use the form and we'll get back to you promptly.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-accent/10 p-3 rounded-full">
                    <Phone className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Main Phone</h3>
                    <a 
                      href="tel:+16019394493" 
                      className="text-muted-foreground hover:text-accent transition-colors"
                    >
                      (601) 939-4493
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-accent/10 p-3 rounded-full">
                    <MapPin className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Location</h3>
                    <p className="text-muted-foreground">
                      1353 Flowood Drive<br />
                      Flowood, Mississippi 39208
                    </p>
                    <p className="text-muted-foreground text-sm mt-1">
                      <strong>Mailing:</strong> P.O. Box 54246<br />
                      Jackson, Mississippi 39288
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-accent/10 p-3 rounded-full">
                    <Clock className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Hours</h3>
                    <p className="text-muted-foreground">
                      Monday - Friday<br />
                      7:00 AM - 5:00 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="bg-muted rounded-lg p-6">
                <h3 className="font-heading text-lg text-foreground mb-4">
                  Why Choose Us
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    Free, no-obligation estimates
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    35+ years of experience
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    BBB A+ rated company
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    Fully licensed & insured
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-lg p-8 shadow-lg">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="bg-accent/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="h-10 w-10 text-accent" />
                    </div>
                    <h3 className="font-heading text-2xl text-foreground mb-4">
                      Mockup Complete
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      This is a design preview. Your quote request was not sent or stored.
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => setSubmitted(false)}
                    >
                      Try the Demo Again
                    </Button>
                  </div>
                ) : (
                  <>
                    <h2 className="font-heading text-2xl text-foreground mb-6">
                      Request a Free Quote
                    </h2>
                    <p className="mb-6 text-sm text-muted-foreground" role="note">
                      Demo form only — information entered here is not sent or stored.
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
                            First Name *
                          </label>
                          <Input 
                            id="firstName"
                            name="firstName"
                            required
                            placeholder="John"
                          />
                        </div>
                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">
                            Last Name *
                          </label>
                          <Input 
                            id="lastName"
                            name="lastName"
                            required
                            placeholder="Smith"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                            Email *
                          </label>
                          <Input 
                            id="email"
                            name="email"
                            type="email"
                            required
                            placeholder="john@example.com"
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                            Phone *
                          </label>
                          <Input 
                            id="phone"
                            name="phone"
                            type="tel"
                            required
                            placeholder="(601) 555-1234"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                          Company / Organization
                        </label>
                        <Input 
                          id="company"
                          name="company"
                          placeholder="Optional"
                        />
                      </div>

                      <div>
                        <label htmlFor="service" className="block text-sm font-medium text-foreground mb-2">
                          Service Needed *
                        </label>
                        <select 
                          id="service"
                          name="service"
                          required
                          className="w-full h-10 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        >
                          <option value="">Select a service</option>
                          {serviceOptions.map((service) => (
                            <option key={service} value={service}>{service}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="projectDetails" className="block text-sm font-medium text-foreground mb-2">
                          Project Details *
                        </label>
                        <Textarea 
                          id="projectDetails"
                          name="projectDetails"
                          required
                          rows={5}
                          placeholder="Please describe your project, including approximate size, location, and any specific requirements..."
                        />
                      </div>

                      <div>
                        <label htmlFor="timeline" className="block text-sm font-medium text-foreground mb-2">
                          Preferred Timeline
                        </label>
                        <select 
                          id="timeline"
                          name="timeline"
                          className="w-full h-10 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        >
                          <option value="">Select timeline</option>
                          <option value="asap">As soon as possible</option>
                          <option value="1-2weeks">1-2 weeks</option>
                          <option value="1month">Within 1 month</option>
                          <option value="2-3months">2-3 months</option>
                          <option value="flexible">Flexible</option>
                        </select>
                      </div>

                      <Button 
                        type="submit" 
                        variant="cta" 
                        size="xl" 
                        className="w-full"
                      >
                        Preview Quote Request
                        <Send className="ml-2 h-5 w-5" />
                      </Button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Department Directory Section */}
      <section className="section-padding bg-muted">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl text-foreground mb-4">
              Department Directory
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Reach the right department directly. Call (601) 939-4493 and use the extension below.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <h3 className="font-heading text-lg text-foreground mb-3">Plant Manager</h3>
              <div className="space-y-2 text-sm">
                <a href="tel:+16019394493,22" className="block text-muted-foreground hover:text-accent transition-colors">
                  Stacey Coffey: <span className="font-semibold">ext. 22</span>
                </a>
                <a href="tel:+16019394493,21" className="block text-muted-foreground hover:text-accent transition-colors">
                  Control Tower: <span className="font-semibold">ext. 21</span>
                </a>
              </div>
            </div>
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <h3 className="font-heading text-lg text-foreground mb-3">Proposals & Estimating</h3>
              <div className="space-y-2 text-sm">
                <a href="tel:+16019394493,16" className="block text-muted-foreground hover:text-accent transition-colors">
                  Clyde Edwards, III: <span className="font-semibold">ext. 16</span>
                </a>
                <a href="tel:+16019394493,33" className="block text-muted-foreground hover:text-accent transition-colors">
                  Tim Kirby: <span className="font-semibold">ext. 33</span>
                </a>
              </div>
            </div>
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <h3 className="font-heading text-lg text-foreground mb-3">Project Superintendent</h3>
              <div className="space-y-2 text-sm">
                <a href="tel:+16019394493,32" className="block text-muted-foreground hover:text-accent transition-colors">
                  Greg Case: <span className="font-semibold">ext. 32</span>
                </a>
              </div>
            </div>
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <h3 className="font-heading text-lg text-foreground mb-3">Accounting</h3>
              <div className="space-y-2 text-sm">
                <a href="tel:+16019394493,12" className="block text-muted-foreground hover:text-accent transition-colors">
                  Mollie Murphey: <span className="font-semibold">ext. 12</span>
                </a>
                <a href="tel:+16019394493,14" className="block text-muted-foreground hover:text-accent transition-colors">
                  Amber Coffey: <span className="font-semibold">ext. 14</span>
                </a>
                <a href="tel:+16019394493,10" className="block text-muted-foreground hover:text-accent transition-colors">
                  Brigette Herring: <span className="font-semibold">ext. 10</span>
                </a>
              </div>
            </div>
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <h3 className="font-heading text-lg text-foreground mb-3">Safety</h3>
              <div className="space-y-2 text-sm">
                <a href="tel:+16019394493,13" className="block text-muted-foreground hover:text-accent transition-colors">
                  Trey Hollingsworth: <span className="font-semibold">ext. 13</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
