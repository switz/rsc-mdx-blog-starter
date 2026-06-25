import { defineSegmentParams } from '@timber-js/app/segment-params';
import { z } from 'zod/v4';

export const segmentParams = defineSegmentParams({
  slug: z.string(),
});
