import { Link } from "react-router-dom";
import { Phone, FileText, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTABar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-primary/95 backdrop-blur-sm border-t border-primary-foreground/10 lg:hidden">
      <div className="flex items-center justify-around py-2">
        <a 
          href="tel:+16019394493"
          className="flex flex-col items-center gap-1 p-2 text-primary-foreground hover:text-accent transition-colors"
          aria-label="Call Adcamp Inc"
        >
          <Phone className="h-5 w-5" />
          <span className="text-xs font-heading uppercase">Call</span>
        </a>
        <Link 
          to="/contact"
          className="flex flex-col items-center gap-1"
        >
          <Button variant="cta" size="sm" className="px-6">
            <FileText className="h-4 w-4" />
            Free Quote
          </Button>
        </Link>
        <Link 
          to="/contact"
          className="flex flex-col items-center gap-1 p-2 text-primary-foreground hover:text-accent transition-colors"
          aria-label="Contact Adcamp Inc"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="text-xs font-heading uppercase">Contact</span>
        </Link>
      </div>
    </div>
  );
}
