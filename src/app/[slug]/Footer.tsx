import { getPost } from '@/lib/getPosts';
import { PostProps } from './page';
import config from '../config';

export default async function Footer(props: PostProps) {
  const params = await props.params;

  const blog = getPost(params.slug);

  return (
    <footer className="mt-12 border-t-2 border-white/25 pb-6 pt-4 text-sm">
      that's the end. if you have a thought, please:&nbsp;
      <a href={`mailto:blog+${params.slug}@${config.domain}?subject=Thoughts on "${blog?.title}"`}>
        email me
      </a>
      .
    </footer>
  );
}
