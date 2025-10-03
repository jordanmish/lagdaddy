import { useEffect } from 'react';

export const SITE_URL = 'https://www.lagdaddygolf.co';
export const DEFAULT_SOCIAL_IMAGE =
  'https://storage.googleapis.com/agent-bench-assets/kt4Q6FhKiP98o2zS7/2f81c8cf-7413-468d-8fa8-0088469cd756.png';

type PageMetadataOptions = {
  title: string;
  description: string;
  keywords?: string[];
  canonicalPath?: string;
  openGraph?: {
    type?: string;
    image?: string;
  };
};

const setMetaTag = (attribute: 'name' | 'property', attributeValue: string, content: string) => {
  if (typeof document === 'undefined') {
    return;
  }

  let element = document.head.querySelector(`meta[${attribute}="${attributeValue}"]`) as HTMLMetaElement | null;

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, attributeValue);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
};

const setLinkTag = (rel: string, href: string) => {
  if (typeof document === 'undefined') {
    return;
  }

  let element = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;

  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }

  element.setAttribute('href', href);
};

export const usePageMetadata = ({
  title,
  description,
  keywords = [],
  canonicalPath = '/',
  openGraph,
}: PageMetadataOptions) => {
  const keywordContent = keywords.join(', ');
  const keywordSignature = keywords.join('|');
  const socialImage = openGraph?.image ?? DEFAULT_SOCIAL_IMAGE;
  const ogType = openGraph?.type ?? 'website';

  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    const canonicalUrl = canonicalPath.startsWith('http') ? canonicalPath : `${SITE_URL}${canonicalPath}`;

    document.title = title;

    setMetaTag('name', 'description', description);
    if (keywordContent) {
      setMetaTag('name', 'keywords', keywordContent);
    }

    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:image', socialImage);
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', socialImage);

    setLinkTag('canonical', canonicalUrl);
  }, [
    title,
    description,
    keywordSignature,
    canonicalPath,
    socialImage,
    ogType,
  ]);
};
