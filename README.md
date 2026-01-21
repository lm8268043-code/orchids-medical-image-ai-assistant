# MediCare AI - Medical AI Assistant

A Next.js 15 web application that provides instant AI-powered analysis of medical images including medicines, prescriptions, and lab reports. Fully responsive and optimized for all devices.

## Features

- 🔍 **Medicine Analysis** - Identify tablets, capsules, and understand their uses
- 📋 **Prescription Reader** - Decode doctor's prescriptions with ease
- 🧪 **Lab Report Insights** - Understand your medical test results
- 🛡️ **Drug Interactions** - Check potential medication conflicts
- 📱 **Fully Responsive** - Works flawlessly on mobile, tablet, and desktop
- 🚀 **Fast & Optimized** - Built with Next.js 15 and optimized for Vercel

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Groq API key (set in `.env.local`)

### Installation

```bash
# Install dependencies
npm install
# or
bun install
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
GROQ_API_KEY=your_groq_api_key_here
```

### Development

Run the development server:

```bash
npm run dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build

```bash
npm run build
npm start
```

## Deploy on Vercel

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/medicare-ai)

### Manual Deploy

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import your repository to Vercel
3. Add your environment variables in Vercel project settings:
   - `GROQ_API_KEY`: Your Groq API key
4. Deploy!

### Environment Variables on Vercel

Go to your project settings on Vercel and add:

- `GROQ_API_KEY` - Your Groq API key for AI analysis

## Mobile Compatibility

This application is fully optimized for mobile devices with:

- Responsive sidebar with hamburger menu on mobile
- Touch-optimized buttons (44px minimum touch targets)
- Adaptive text sizes and spacing
- Mobile-first design approach
- Optimized images for all screen sizes
- Progressive Web App (PWA) support

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **AI**: Groq SDK with Llama Vision model
- **Type Safety**: TypeScript
- **Deployment**: Vercel

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── api/chat/        # API route for AI chat
│   │   ├── page.tsx         # Main application page
│   │   ├── layout.tsx       # Root layout with metadata
│   │   └── globals.css      # Global styles
│   ├── components/
│   │   └── ui/              # Reusable UI components
│   └── lib/
│       └── hooks/           # Custom React hooks
├── public/
│   └── manifest.json        # PWA manifest
├── next.config.ts           # Next.js configuration
├── vercel.json             # Vercel deployment config
└── tailwind.config.ts      # Tailwind configuration
```

## Performance Optimizations

- Image optimization with Next.js Image component
- Code splitting and lazy loading
- Optimized package imports
- HTTP/2 server push
- Compression enabled
- Proper caching headers
- AVIF and WebP image formats

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Disclaimer

This tool provides information for educational purposes only. Always consult a qualified healthcare professional for medical advice.

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
