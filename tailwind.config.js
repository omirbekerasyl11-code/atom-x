export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: { extend: {
    colors: { navy: { 950:'#060B1F', 900:'#0A1230', 800:'#111C45', 700:'#1B2A60' }, cyanx:'#22D3EE', violetx:'#8B5CF6' },
    fontFamily: { sans: ['Inter','system-ui','sans-serif'], display: ['"Space Grotesk"','Inter','sans-serif'] },
    keyframes: {
      fadeUp: { '0%':{opacity:0,transform:'translateY(16px)'}, '100%':{opacity:1,transform:'none'} },
      float: { '0%,100%':{transform:'translateY(0)'}, '50%':{transform:'translateY(-10px)'} },
      orbit: { to:{ transform:'rotate(360deg)' } },
      glow: { '0%,100%':{opacity:.5}, '50%':{opacity:1} } },
    animation: { fadeUp:'fadeUp .6s ease-out both', float:'float 6s ease-in-out infinite', orbit:'orbit 12s linear infinite', glow:'glow 3s ease-in-out infinite' } } },
  plugins: [] }
