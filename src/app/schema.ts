import { defineSchema } from '@timber-js/app/params';
import { codec } from '@timber-js/app/codec';

export default defineSchema({
  segmentParams: {
    '[slug]': codec.string,
  },
});
