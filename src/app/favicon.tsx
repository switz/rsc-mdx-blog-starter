import { ImageResponse } from 'takumi-js/response';
import config from './config';

// Served at /favicon.ico (timber keeps the .ico URL for browser compatibility).
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/x-icon';

// Favicon generation — emits a real ICO via takumi's `format: 'ico'`.
export default function Favicon() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 18,
        fontWeight: 'bold',
        background: '#252A31',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        borderRadius: 6,
      }}
    >
      {config.emoji}
    </div>,
    {
      ...size,
      format: 'ico',
    }
  );
}
