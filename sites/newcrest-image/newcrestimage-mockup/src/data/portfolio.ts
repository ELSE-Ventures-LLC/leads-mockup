import americanBank2 from "@/assets/portfolio/american-bank-2.jpg";
import americanBank3 from "@/assets/portfolio/american-bank-3.jpg";
import corestack2 from "@/assets/portfolio/corestack-2.jpg";
import corestack3 from "@/assets/portfolio/corestack-3.jpg";
import coury2 from "@/assets/portfolio/coury-2.jpg";
import coury3 from "@/assets/portfolio/coury-3.jpg";
import dvc2 from "@/assets/portfolio/dvc-2.jpg";
import dvc3 from "@/assets/portfolio/dvc-3.jpg";
import realestate2 from "@/assets/portfolio/realestate-2.jpg";
import realestate3 from "@/assets/portfolio/realestate-3.jpg";
import summit2 from "@/assets/portfolio/summit-2.jpg";
import summit3 from "@/assets/portfolio/summit-3.jpg";
import texana2 from "@/assets/portfolio/texana-2.jpg";
import texana3 from "@/assets/portfolio/texana-3.jpg";

export type PortfolioItem = {
  slug: string;
  name: string;
  sector: string;
  tagline: string;
  img: string;
  gallery: string[];
  description: string[];
  website?: { label: string; href: string };
};

export const portfolioItems: PortfolioItem[] = [
  {
    slug: "american-bank",
    name: "American Bank",
    sector: "Financial Services",
    tagline: "Community-rooted. Builder of relationships. Texas banking institution.",
    img: "https://newcrestimage.com/wp-content/uploads/2022/01/ZIZ2240-scaled-e1642028010939-uai-1107x1107.jpg",
    gallery: [
      "https://newcrestimage.com/wp-content/uploads/2022/01/ZIZ2240-scaled-e1642028010939-uai-1107x1107.jpg",
      americanBank2,
      americanBank3,
    ],
    description: [
      "In 2019, the partners of NewcrestImage wholly acquired Dallas-based American Bank with nearly $55 million in assets. Since the acquisition, the bank opened a new location in Irving, TX, quadrupled in assets, and has been profitable every month under a new growth strategy established by its owners.",
      "American Bank is dedicated to creating a culture of care in the communities it serves and helping others find their paths to success. The bank makes every attempt to help individuals and businesses make thoughtful, sound financial decisions to accomplish their goals and dreams — small enough to know you, large enough to be your primary financial institution. American Bank has full-service branches in Dallas and Irving, TX.",
    ],
    website: { label: "abdallas.bank", href: "https://www.abdallas.bank" },
  },
  {
    slug: "corestack",
    name: "CoreStack",
    sector: "Cloud Governance",
    tagline: "Multi-cloud operator. Governance pioneer. Enterprise scale.",
    img: "https://newcrestimage.com/wp-content/uploads/2022/01/CoreStack.jpg",
    gallery: [
      "https://newcrestimage.com/wp-content/uploads/2022/01/CoreStack.jpg",
      corestack2,
      corestack3,
    ],
    description: [
      "CoreStack is a next-generation multi-cloud governance platform that empowers enterprises to rapidly achieve autonomous and continuous cloud governance and compliance at scale. CoreStack is used today by many leading global enterprises across multiple industries.",
    ],
    website: { label: "corestack.io", href: "https://www.corestack.io" },
  },
  {
    slug: "coury-hospitality",
    name: "Coury Hospitality",
    sector: "Hospitality",
    tagline: "Boutique hotelier. Storytellers in stay. Crafted experiences.",
    img: "https://newcrestimage.com/wp-content/uploads/2023/06/Coury-Hospitality-scaled-uai-1707x1707.jpg",
    gallery: [
      "https://newcrestimage.com/wp-content/uploads/2023/06/Coury-Hospitality-scaled-uai-1707x1707.jpg",
      coury2,
      coury3,
    ],
    description: [
      "Coury Hospitality is a hospitality management company skilled in every facet of hotel, restaurant, and venue operations and development. Known for historic renovations, exceptional guest service, and curated new-build design and construction, Coury Hospitality employs cutting-edge management techniques — from accounting and revenue management to e-commerce and asset management — to transform buildings new and old into world-class, full-service boutique hotels that deliver unforgettable travel and dining experiences.",
    ],
    website: { label: "couryhospitality.com", href: "https://www.couryhospitality.com" },
  },
  {
    slug: "dallas-venture-capital",
    name: "Dallas Venture Capital",
    sector: "Venture",
    tagline: "Early-stage backer. Enterprise software focus. Founder ally.",
    img: "https://newcrestimage.com/wp-content/uploads/2022/01/DVC.jpg",
    gallery: ["https://newcrestimage.com/wp-content/uploads/2022/01/DVC.jpg", dvc2, dvc3],
    description: [
      "Dallas Venture Capital (DVC) is a Dallas-based early-stage venture fund investing in AI/ML, IoT, XR, and other emerging technologies launched by enterprise-focused entrepreneurs.",
      "In addition to providing capital, DVC's investment philosophy centers around guiding business development, product, and technology strategy for portfolio companies through 'DVC Advantage' to achieve successful outcomes. Operating from the USA and India, the firm aims to create a bridge that connects two large global markets.",
    ],
    website: { label: "dallasvc.com", href: "https://www.dallasvc.com" },
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    sector: "Portfolio",
    tagline: "Long-hold investor. Place-maker. Cycle-tested operator.",
    img: "https://newcrestimage.com/wp-content/uploads/2022/01/dalsn-exterior-0003-hor-clsc-uai-938x938.jpeg",
    gallery: [
      "https://newcrestimage.com/wp-content/uploads/2022/01/dalsn-exterior-0003-hor-clsc-uai-938x938.jpeg",
      realestate2,
      realestate3,
    ],
    description: [
      "NewcrestImage's real estate portfolio has predominantly been focused on the lodging industry, having transacted in over 270 assets valued at more than $2.7 billion.",
      "We analyze the market for needs that can be served by the revitalization of a distressed property or the ground-up construction of a new one. After evaluating the feasibility of each prospect, we pursue those that make the most sense for the growth of our portfolio.",
      "With a spectrum of top talent in development, construction, and operations, we have assembled the right team to orchestrate a seamless project — from concept and funding to construction and beyond. Ongoing management, whether efficient operations or market repositioning, maximizes the value of each investment.",
    ],
  },
  {
    slug: "summit-hotel-properties",
    name: "Summit Hotel Properties",
    sector: "Lodging REIT",
    tagline: "Public market leader. Premium-branded select-service portfolio.",
    img: "https://newcrestimage.com/wp-content/uploads/2022/01/summit-ri3-scaled-uai-1920x1920.jpg",
    gallery: [
      "https://newcrestimage.com/wp-content/uploads/2022/01/summit-ri3-scaled-uai-1920x1920.jpg",
      summit2,
      summit3,
    ],
    description: [
      "In 2022, an affiliate of NewcrestImage became one of the largest shareholders of Summit Hotel Properties, Inc. (NYSE: INN) — a publicly-traded real estate investment trust focused on owning premium-branded hotels with efficient operating models, primarily in the upscale segment of the lodging industry.",
      "As of February 23, 2022, the Company's portfolio consisted of 100 hotels, 61 of which are wholly-owned, with a total of 15,051 guestrooms located in 24 states.",
    ],
    website: { label: "shpreit.com", href: "https://www.shpreit.com" },
  },
  {
    slug: "texana-bank",
    name: "Texana Bank",
    sector: "Community Banking",
    tagline: "Local steward. Main-street capital. Generations of trust.",
    img: "https://newcrestimage.com/wp-content/uploads/2022/01/about-texana-min-uai-900x900.jpeg",
    gallery: [
      "https://newcrestimage.com/wp-content/uploads/2022/01/about-texana-min-uai-900x900.jpeg",
      texana2,
      texana3,
    ],
    description: [
      "In 2018, the partners of NewcrestImage made a multi-million-dollar investment in Texana Bank based in Texarkana, TX.",
      "Texana Bank first opened its doors in 1914 in Linden, Texas. The bank now boasts four full-service branches throughout East Texas, in addition to one branch in Arkansas.",
    ],
    website: { label: "texanabank.com", href: "https://www.texanabank.com" },
  },
];
