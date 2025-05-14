import getPosts, { getPost } from '@/lib/getPosts';
import { ImageResponse } from 'next/og';
import { PostProps } from './page';
import emoji from '../config';
import config from '../config';

// Image metadata

export const alt = 'Blog Post';
export const size = {
  width: 1200,
  height: 630,
};

export const dynamic = 'force-static';
export const runtime = 'nodejs';
export const contentType = 'image/png';

const getFonts = async () => {
  return await Promise.all(
    ([400, 900] as const).map(async (weight) => {
      const fontRes = await fetch(
        `https://cdn.jsdelivr.net/fontsource/fonts/merriweather@latest/latin-${weight}-normal.woff`
      );
      const font = await fontRes.arrayBuffer();
      return { name: 'Merriweather', data: font, style: 'normal' as const, weight };
    })
  );
};

// Image generation
export default async function Image(props: PostProps) {
  const params = await props.params;

  const post = getPost(params.slug, 'true');
  const title = post?.title;

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          background: '#252A31',
          color: '#F8F7F8',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          textWrap: 'pretty',
          fontFamily: 'Merriweather,serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            bottom: 36,
            left: 36,
            fontSize: 42,
            filter: 'grayscale(100%)',
            alignItems: 'center',
            gap: 16,
          }}
        >
          {config.emoji} <div style={{ fontSize: 24 }}>{config.domain}</div>
        </div>
        <div
          style={{
            fontSize: 96,
            fontWeight: 900,
            textWrap: 'pretty',
            maxWidth: '80%',
          }}
        >
          {title?.trim()}
        </div>
        {post?.subtitle && (
          <div
            style={{
              fontSize: 32,
            }}
          >
            {post?.subtitle}
          </div>
        )}
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
      fonts: await getFonts(),
    }
  );
}

export async function generateStaticParams() {
  return getPosts('true').map((post) => ({
    slug: post.slug,
    // bypass: post.is_draft ? 'true' : undefined,
  }));
}
