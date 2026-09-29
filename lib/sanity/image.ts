import createImageUrlBuilder from '@sanity/image-url';
import { dataset, projectId } from './client';

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
});

export const urlForImage = (source: Parameters<typeof imageBuilder.image>[0]) => {
  if (!source || !(source as Record<string, unknown>).asset) return null;
  return imageBuilder?.image(source).auto('format').fit('max');
};
