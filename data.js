const DEFAULT_PORTFOLIO_DATA = {
  hero: {
    eyebrow: "Creative Designer · Livingstone, Zambia",
    headline: "Brand visuals that turn<br>concepts into <em>real business results.</em>",
    lede: "I'm Ignatius Simfukwe — a creative designer with 5+ years of experience across branding, print, packaging and digital design, working under my own creative studio, CRS Media FX. I help agencies, hotels, restaurants, NGOs and product brands turn ideas into visuals people trust.",
    stats: [
      { value: "5+", label: "Years of experience" },
      { value: "15+", label: "Brands & clients served" },
      { value: "6", label: "Design disciplines" }
    ],
    portrait: "assets/mr crs.png",
    tag: "CRS Media FX — Creative Studio",
    ctas: [
      { text: "View My Work", href: "#work", style: "primary" },
      { text: "See Full Behance Portfolio", href: "https://www.behance.net/ignatiuscrs5", style: "outline", external: true },
      { text: "Download CV", href: "resume.html", style: "outline" }
    ]
  },
  about: {
    eyebrow: "Who I am",
    headline: "Design built on functionality, not just looks",
    paragraphs: [
      "I'm a creative designer based in Zambia, currently residing in Livingstone. Artwork and illustration were what first drew me into the creative industry — and my passion for functionality and structure grew out of that early love for visual design.",
      "Starting with basic designs several years ago, I've grown into handling complex, end-to-end projects: visually appealing brand identities, marketing collateral, and creative interfaces across multiple touchpoints. A user-centred mindset and sensitivity for detail have made collaborating with agencies, clients and brands — to develop digital concepts and solve real problems together — the perfect fit for how I like to work."
    ],
    skills: {
      software: [
        "Adobe Photoshop",
        "Adobe Illustrator",
        "Adobe Premiere Pro",
        "Adobe After Effects",
        "CorelDRAW",
        "Microsoft Office Suite"
      ],
      production: [
        "Large-format printing",
        "Plotter cutting",
        "Heat press"
      ],
      core: [
        "Art & Design",
        "Brand identity",
        "Packaging design",
        "Motion graphics"
      ]
    }
  },
  work: {
    eyebrow: "Selected work",
    headline: "Real projects, real clients",
    description: "A cross-section of branding, print, packaging and campaign design work delivered for businesses across Zambia and the Victoria Falls / Livingstone region.",
    categories: [
      { key: "all", label: "All Work" },
      { key: "branding", label: "Branding & Identity" },
      { key: "print", label: "Print & Brochures" },
      { key: "packaging", label: "Packaging" },
      { key: "campaign", label: "Campaigns & Social" },
      { key: "billboard", label: "Billboards & Banners" },
      { key: "poster", label: "Posters & Stickers" },
      { key: "brandpkg", label: "Branding & Packaging" },
      { key: "menu", label: "Menus" }
    ],
    projects: [
      { img: "assets/proj-zepi.jpg", title: "Zepi Enterprise", cat: "print", label: "Print & Brochures", desc: "Business profile brochure for a grains & fresh-food distribution company." },
      { img: "assets/proj-luxe.jpg", title: "Luxe Countryside Convention Center", cat: "print", label: "Print & Brochures", desc: "Business profile for an event venue near Victoria Falls." },
      { img: "assets/proj-muya.jpg", title: "Muya Easy Cash", cat: "branding", label: "Branding & Identity", desc: "Flyer and business card suite for a quick-loan finance brand." },
      { img: "assets/proj-elitrasmart.jpg", title: "Elitrasmart Medical Supplies", cat: "print", label: "Print & Brochures", desc: "First-edition company newsletter covering healthcare community stories." },
      { img: "assets/proj-ddunkah.jpg", title: "Ddunkah Investments", cat: "branding", label: "Branding & Identity", desc: "Business card design for a Lusaka-based investment firm." },
      { img: "assets/proj-travel.jpg", title: "Victoria Falls Travel Brochure", cat: "print", label: "Print & Brochures", desc: "Tri-fold brochure for safari, rafting and Victoria Falls tour packages." },
      { img: "assets/proj-carrent.jpg", title: "Car Rental Flyer", cat: "campaign", label: "Campaigns & Social", desc: "Promotional PSD flyer template for a vehicle rental service." },
      { img: "assets/proj-eagle.jpg", title: "Eagle Energy Drink", cat: "packaging", label: "Packaging", desc: "Can label and packaging design for an energy drink brand." },
      { img: "assets/proj-hairfood.jpg", title: "Hair Food — Golden Oil", cat: "packaging", label: "Packaging", desc: "Product label and bottle packaging for a hair-care oil range." },
      { img: "assets/proj-kasensa.jpg", title: "Kasensa Mineral Water", cat: "campaign", label: "Campaigns & Social", desc: "Social media advertising creative for a mineral water brand." },
      { img: "assets/proj-healingbalm.jpg", title: "The Healing Balm Foundation", cat: "print", label: "Print & Brochures", desc: "Awareness flyer for an NGO focused on gender justice and disability inclusion." },
      { img: "assets/proj-kawama.jpg", title: "Kawama Aka", cat: "packaging", label: "Packaging", desc: "Can design for an orange-flavoured soft drink." },
      { img: "assets/proj-eroyal.jpg", title: "E.Royal Modeling Management Org", cat: "branding", label: "Branding & Identity", desc: "Company profile cover design for a modeling management agency." },
      { img: "assets/proj-menu.jpg", title: "Restaurant Food Menu", cat: "menu", label: "Menus", desc: "Promotional food menu flyer for a Mosi-oa-Tunya Road restaurant." },
      { img: "assets/proj-weekend.jpg", title: "Weekend Special Table Tent", cat: "campaign", label: "Campaigns & Social", desc: "In-restaurant table tent card promoting a weekend giveaway." }
    ]
  },
  experience: {
    eyebrow: "Track record",
    headline: "Experience & clients",
    roles: [
      { year: "2021", role: "Graphic Designer (Contract)", org: "ebet Zambia" },
      { year: "2022–2023", role: "Digital Marketing & Motion Graphics", org: "Limpo's Pub & Grill" },
      { year: "2022–2023", role: "Lead Designer", org: "Zambezi Junction Lodge & Serengeti Restaurant" },
      { year: "", role: "Primary Video Editor", org: "Seed Co Gala Dinner" },
      { year: "", role: "Primary Video Editor", org: "Absa Gala Dinner" },
      { year: "", role: "Digital & Creative Design", org: "Evolution Extreme Fitness Gym" },
      { year: "", role: "Branding", org: "Orange Peel General Dealers" },
      { year: "", role: "Promotional Design", org: "Africa Rainbow Tours" },
      { year: "", role: "Video Editor — Social Media Assets", org: "CRS Media FX" }
    ],
    remoteClients: [
      "Fairmount Hotel",
      "Noble Tours",
      "Orange Peel General Dealers",
      "Kasensa Mineral Water",
      "Vic Falls Boxing Academy",
      "Livingstone Boxing Academy"
    ],
    featuredClients: [
      "Zepi Enterprise",
      "Luxe Countryside Convention Center",
      "Muya Easy Cash",
      "Elitrasmart Medical Supplies",
      "Ddunkah Investments",
      "Eagle Energy Drink",
      "Hair Food",
      "The Healing Balm Foundation",
      "Kawama Aka",
      "E.Royal Modeling Management Org"
    ]
  },
  contact: {
    eyebrow: "Let's work together",
    headline: "Have a project in mind?",
    description: "Whether it's a brand identity, a product package, or a full marketing campaign — I'd love to help bring it to life.",
    email: "ignatiuscrs5@gmail.com",
    phone: "+260 979 645 122 · +260 954 157 963",
    behance: "https://www.behance.net/ignatiuscrs5",
    location: "Livingstone, Zambia",
    cardTitle: "Start a project",
    cardDescription: "Send a brief and I'll get back to you with a quote and timeline."
  },
  footer: {
    copyright: "© 2026 Ignatius Simfukwe — CRS Media FX. All work shown is original design produced for real clients.",
    behance: "https://www.behance.net/ignatiuscrs5",
    email: "ignatiuscrs5@gmail.com"
  },
  site: {
    title: "Ignatius Simfukwe — Creative Designer | CRS Media FX",
    description: "Ignatius Simfukwe is a creative designer based in Livingstone, Zambia, with 5+ years of experience in branding, print, packaging and digital design under CRS Media FX.",
    ogImage: "assets/proj-eroyal.jpg",
    logo: "assets/logo-mark.jpg"
  }
};

function getPortfolioData() {
  const stored = localStorage.getItem('portfolioData');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      return DEFAULT_PORTFOLIO_DATA;
    }
  }
  return DEFAULT_PORTFOLIO_DATA;
}

function savePortfolioData(data) {
  localStorage.setItem('portfolioData', JSON.stringify(data));
}
