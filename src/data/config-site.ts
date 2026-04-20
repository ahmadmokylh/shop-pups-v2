const metaData = {
  titel: 'مناحل الثنيان',
  description: 'أعسال طبيعية مكفولة من انتاج مناحلنا',
  img: './logo2.png',
  url: 'https://www.althinayan.com/',
}

export const meta = [
  { title: metaData.titel },
  { name: 'description', content: metaData.description },
  // Open Graph
  { property: 'og:title', content: metaData.titel },
  { property: 'og:description', content: metaData.description },
  { property: 'og:image', content: metaData.img },
  { property: 'og:type', content: 'article' },
  { property: 'og:url', content: metaData.url },

  // Facebook card
  { name: 'facebook:card', content: 'summary_large_image' },
  { name: 'facebook:title', content: metaData.titel },
  { name: 'facebook:description', content: metaData.description },
  { name: 'facebook:image', content: metaData.img },
  { name: 'facebook:url', content: metaData.url },

  // Twitter Card
  { name: 'twitter:card', content: 'summary_large_image' },
  { name: 'twitter:title', content: metaData.titel },
  { name: 'twitter:description', content: metaData.description },
  { name: 'twitter:image', content: metaData.img },
  { name: 'twitter:url', content: metaData.url },
]
