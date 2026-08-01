import { getPost } from '@/lib/getPosts';
import config from '../config';
import { getSegmentParams } from '@timber-js/app/server';
import { SEGMENT_PATH } from './$segment';

export default async function Footer() {
  const { slug } = getSegmentParams(SEGMENT_PATH);

  const blog = getPost(slug);

  return (
    <footer className="mt-12 border-t-2 border-white/25 pb-6 pt-4 text-sm">
      that's the end. if you have a thought, please:&nbsp;
      <a href={`mailto:blog+${slug}@${config.domain}?subject=Thoughts on "${blog?.title}"`}>
        email me
      </a>
      .
    </footer>
  );
}
