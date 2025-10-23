export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: 'men' | 'women' | 'kids';
  description: string;
  features: string[];
}

interface ContentfulAsset {
  sys?: {
    id?: string;
  };
  fields?: {
    file?: {
      url?: string;
    };
  };
}

interface ContentfulEntry {
  sys?: {
    id?: string;
    contentType?: {
      sys?: {
        id?: string;
      };
    };
  };
  fields?: Record<string, unknown>;
}

interface ContentfulEntriesResponse {
  items?: ContentfulEntry[];
  includes?: {
    Asset?: ContentfulAsset[];
  };
}

const SPACE_ID = 'l19phsq5uz9j';
const ENVIRONMENT = 'master';
const ACCESS_TOKEN = 'vk0QVD1KmLlRNZntBIsmow_USIhrRQBy9WGJJWvVjrc';

export const fallbackProducts: Product[] = [
  {
    id: 'precision-putter',
    name: 'Precision Putter',
    price: 249.99,
    image: '/Gemini_Generated_Image_9pmrtr9pmrtr9pmr.png',
    category: 'men',
    description:
      'Engineered for accuracy and control, the Precision Putter features a matte black finish with optimal weight distribution for consistent putting performance.',
    features: [
      'CNC milled face for precise ball control',
      'Premium matte black finish',
      'Optimized weight distribution',
      'Tour-proven design',
      'Includes premium headcover',
    ],
  },
  {
    id: 'signature-driver-cover',
    name: 'Signature Driver Cover',
    price: 79.99,
    image: '/Gemini_Generated_Image_d1hrxcd1hrxcd1hr.png',
    category: 'men',
    description:
      'Protect your most valuable club with our premium leather driver headcover. Features the iconic Lag Daddy Golf Co logo and superior padding.',
    features: [
      'Premium synthetic leather construction',
      'Plush interior lining',
      'Embroidered Lag Daddy Golf Co logo',
      'Easy on/off magnetic closure',
      'Water-resistant exterior',
    ],
  },
  {
    id: 'tour-stand-bag',
    name: 'Tour Stand Bag',
    price: 399.99,
    image: '/Gemini_Generated_Image_wsy8wjwsy8wjwsy8.png',
    category: 'men',
    description:
      'The ultimate golf bag for serious players. Lightweight yet durable with 14-way top divider and premium organizational features.',
    features: [
      '14-way full-length dividers',
      'Lightweight carbon fiber stand',
      'Multiple insulated pockets',
      'Integrated cart strap system',
      'Premium waterproof fabric',
    ],
  },
  {
    id: 'lag-daddy-divot-fixer',
    name: 'Lag Daddy Divot Fixer',
    price: 34.99,
    image: '/Gemini_Generated_Image_baz6ilbaz6ilbaz6.png',
    category: 'kids',
    description:
      'Compact and ergonomic, the Lag Daddy Divot Fixer helps junior players repair greens with ease while showcasing the signature monogram.',
    features: [
      'Lightweight aircraft-grade aluminum construction',
      'Dual-prong design for effortless divot repair',
      'Integrated magnetic ball marker with Lag Daddy crest',
      'Soft-touch grip sized for junior golfers',
      'Course-approved accessory for growing players',
    ],
  },
];

let cachedProducts: Product[] | null = null;
let inFlightRequest: Promise<Product[]> | null = null;

const FALLBACK_CATEGORY: Product['category'] = 'men';

const contentfulEndpoint = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/${ENVIRONMENT}/entries?access_token=${ACCESS_TOKEN}`;

const ALLOWED_CATEGORIES: Product['category'][] = ['men', 'women', 'kids'];

const slugify = (value: string): string => {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 100);
};

const ensureHttpsUrl = (url?: string): string | undefined => {
  if (!url) {
    return undefined;
  }

  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  if (url.startsWith('//')) {
    return `https:${url}`;
  }

  if (url.startsWith('/')) {
    return url;
  }

  return `https://${url}`;
};

const createAssetMap = (assets: ContentfulAsset[] = []): Map<string, string> => {
  return assets.reduce((map, asset) => {
    const id = asset.sys?.id;
    const url = ensureHttpsUrl(asset.fields?.file?.url);

    if (id && url) {
      map.set(id, url);
    }

    return map;
  }, new Map<string, string>());
};

const extractRichText = (value: unknown): string => {
  if (!value) {
    return '';
  }

  if (typeof value === 'string') {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(extractRichText).join(' ');
  }

  if (typeof value === 'object') {
    const objectValue = value as { content?: unknown; value?: unknown };

    if (objectValue.value && typeof objectValue.value === 'string') {
      return objectValue.value;
    }

    if (objectValue.content) {
      return extractRichText(objectValue.content);
    }
  }

  return '';
};

const normaliseFeatures = (value: unknown): string[] => {
  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (typeof item === 'string') {
          return item;
        }

        if (item && typeof item === 'object') {
          const itemRecord = item as { fields?: Record<string, unknown>; value?: unknown };

          if (typeof itemRecord.value === 'string') {
            return itemRecord.value;
          }

          const fields = itemRecord.fields ?? {};
          const candidate =
            fields.feature ??
            fields.text ??
            fields.title ??
            fields.name ??
            fields.label ??
            fields.copy;

          if (typeof candidate === 'string') {
            return candidate;
          }
        }

        return undefined;
      })
      .filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
      .map((item) => item.trim());
  }

  if (typeof value === 'string') {
    return value
      .split(/\r?\n|\u2022|\*/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

const resolveImageUrl = (imageField: unknown, assets: Map<string, string>): string | undefined => {
  if (!imageField) {
    return undefined;
  }

  if (typeof imageField === 'string') {
    return ensureHttpsUrl(imageField);
  }

  if (Array.isArray(imageField)) {
    for (const item of imageField) {
      const url = resolveImageUrl(item, assets);
      if (url) {
        return url;
      }
    }
    return undefined;
  }

  if (typeof imageField === 'object') {
    const linkedAsset = imageField as {
      sys?: { id?: string };
      fields?: { file?: { url?: string } };
    };

    const directUrl = ensureHttpsUrl(linkedAsset.fields?.file?.url);

    if (directUrl) {
      return directUrl;
    }

    const assetId = linkedAsset.sys?.id;
    if (assetId && assets.has(assetId)) {
      return assets.get(assetId);
    }
  }

  return undefined;
};

const normaliseCategory = (value: unknown): Product['category'] => {
  if (typeof value === 'string') {
    const normalised = value.trim().toLowerCase();

    if (ALLOWED_CATEGORIES.includes(normalised as Product['category'])) {
      return normalised as Product['category'];
    }
  }

  return FALLBACK_CATEGORY;
};

const mapEntryToProduct = (
  entry: ContentfulEntry,
  assetMap: Map<string, string>
): Product | null => {
  const fields = entry.fields ?? {};

  const nameCandidate =
    fields.name ??
    fields.title ??
    fields.productName ??
    fields.heading ??
    fields.productTitle;

  if (typeof nameCandidate !== 'string' || nameCandidate.trim().length === 0) {
    return null;
  }

  const name = nameCandidate.trim();

  const slugSource =
    fields.slug ??
    fields.handle ??
    fields.identifier ??
    fields.productSlug ??
    fields.id ??
    name ??
    entry.sys?.id;

  const slug = typeof slugSource === 'string' && slugSource.trim().length > 0
    ? slugify(slugSource)
    : slugify(name);

  const rawPrice =
    fields.price ??
    fields.msrp ??
    fields.cost ??
    fields.productPrice ??
    fields.basePrice;

  const priceNumber =
    typeof rawPrice === 'number'
      ? rawPrice
      : typeof rawPrice === 'string'
        ? Number.parseFloat(rawPrice)
        : NaN;

  const price = Number.isFinite(priceNumber) ? priceNumber : 0;

  const rawDescription =
    fields.description ??
    fields.productDescription ??
    fields.summary ??
    fields.body ??
    fields.copy ??
    fields.seoDescription;

  const descriptionText = extractRichText(rawDescription).trim();

  const description = descriptionText.length > 0
    ? descriptionText
    : 'Explore premium golf gear, apparel, and accessories from Lag Daddy Golf Co.';

  const imageField =
    fields.image ??
    fields.heroImage ??
    fields.mainImage ??
    fields.thumbnail ??
    fields.featuredImage ??
    fields.gallery;

  const resolvedImage = resolveImageUrl(imageField, assetMap) ?? fallbackProducts[0]?.image;

  const featuresField =
    fields.features ??
    fields.featureList ??
    fields.productFeatures ??
    fields.bulletPoints ??
    fields.highlights ??
    fields.keyFeatures;

  const features = normaliseFeatures(featuresField);

  const category = normaliseCategory(
    fields.category ?? fields.collection ?? fields.department ?? fields.gender ?? fields.segment
  );

  return {
    id: slug,
    name,
    price,
    image: resolvedImage,
    category,
    description,
    features,
  };
};

const fetchProductsFromApi = async (): Promise<Product[]> => {
  const response = await fetch(contentfulEndpoint);

  if (!response.ok) {
    throw new Error(`Contentful request failed: ${response.status} ${response.statusText}`);
  }

  const payload: ContentfulEntriesResponse = await response.json();

  const entries = payload.items ?? [];
  const assetMap = createAssetMap(payload.includes?.Asset);

  return entries
    .map((entry) => mapEntryToProduct(entry, assetMap))
    .filter((product): product is Product => product !== null);
};

export const fetchProductsFromContentful = async (): Promise<Product[]> => {
  if (cachedProducts) {
    return cachedProducts;
  }

  if (inFlightRequest) {
    return inFlightRequest;
  }

  inFlightRequest = fetchProductsFromApi()
    .then((products) => {
      cachedProducts = products;
      inFlightRequest = null;

      return cachedProducts;
    })
    .catch((error) => {
      inFlightRequest = null;
      throw error;
    });

  return inFlightRequest;
};

export const getCachedProducts = (): Product[] | null => cachedProducts;

export const setCachedProducts = (products: Product[]): void => {
  cachedProducts = products;
};
