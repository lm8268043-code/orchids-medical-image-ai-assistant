# Vercel Deployment Guide for MediCare AI

## Pre-Deployment Checklist

### ✅ Required Environment Variables

Before deploying to Vercel, ensure you have:

1. **GROQ_API_KEY** - Your Groq API key for AI analysis
   - Get it from: https://console.groq.com/keys
   - Required for the chat API to function

### ✅ Build Configuration

The project is configured with:

- ✅ `next.config.ts` - Optimized for Vercel with image optimization and compression
- ✅ `vercel.json` - Security headers and caching configuration
- ✅ `package.json` - Build scripts properly configured
- ✅ `.gitignore` - Proper exclusions for Vercel deployment
- ✅ TypeScript and ESLint properly configured
- ✅ Mobile-responsive design implemented

## Deployment Methods

### Method 1: One-Click Deploy (Recommended)

1. Click the "Deploy to Vercel" button:

   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/medicare-ai)

2. Connect your GitHub account if not already connected
3. Configure environment variables:
   - Add `GROQ_API_KEY` with your API key
4. Click "Deploy"
5. Wait for the build to complete (usually 2-3 minutes)
6. Your app will be live at `https://your-project.vercel.app`

### Method 2: Import from Git Repository

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Import your Git repository (GitHub/GitLab/Bitbucket)
4. Configure project settings:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next` (auto-detected)
   - Install Command: `npm install --legacy-peer-deps`
5. Add environment variables:
   - `GROQ_API_KEY`: Your Groq API key
6. Click "Deploy"

### Method 3: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# Follow the prompts and add environment variables when asked
```

## Environment Variables Setup on Vercel

1. Go to your project dashboard on Vercel
2. Navigate to "Settings" → "Environment Variables"
3. Add the following variable:

   | Name | Value | Environment |
   |------|-------|-------------|
   | `GROQ_API_KEY` | Your Groq API key | Production, Preview, Development |

4. Click "Save"
5. Redeploy your application for changes to take effect

## Post-Deployment Verification

After deployment, verify the following:

### 1. Homepage Loads
- Visit your deployed URL
- Check that the homepage renders correctly
- Verify mobile responsiveness by opening on a mobile device or using browser DevTools

### 2. Mobile Compatibility
- Test hamburger menu on mobile (< 1024px viewport)
- Verify sidebar overlay works correctly
- Check touch targets are accessible (44px minimum)
- Test image upload on mobile devices

### 3. AI Analysis Works
- Upload a test medical image
- Verify the analysis completes successfully
- Check follow-up questions work

### 4. Performance
- Run Lighthouse audit (should score 90+ on all metrics)
- Check page load time (should be < 3 seconds)
- Verify images are optimized (WebP/AVIF formats)

## Troubleshooting

### Build Fails

**Issue**: `Build command exited with 1`

**Solutions**:
1. Check that `GROQ_API_KEY` is set in environment variables
2. Verify `package.json` dependencies are correct
3. Check build logs for specific errors
4. Ensure Node.js version is 18.x or higher

### API Route Returns 500

**Issue**: `/api/chat` returns internal server error

**Solutions**:
1. Verify `GROQ_API_KEY` is correctly set in Vercel environment variables
2. Check API key is valid at https://console.groq.com/keys
3. Review function logs in Vercel dashboard

### Images Not Loading

**Issue**: Uploaded images fail to display

**Solutions**:
1. Check that images are under 10MB
2. Verify file types are JPG, PNG, or GIF
3. Check browser console for errors

### Mobile Sidebar Not Working

**Issue**: Hamburger menu doesn't open on mobile

**Solutions**:
1. Clear browser cache and hard reload
2. Verify JavaScript is enabled
3. Check browser console for errors

## Custom Domain Setup

1. Go to your project on Vercel
2. Navigate to "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions
5. Wait for DNS propagation (usually 5-60 minutes)

## Performance Optimization

The following optimizations are already configured:

- ✅ Image optimization with Next.js Image component
- ✅ Automatic code splitting
- ✅ AVIF and WebP image formats
- ✅ Gzip/Brotli compression
- ✅ HTTP/2 server push
- ✅ Proper caching headers
- ✅ Optimized package imports (lucide-react, radix-ui)

## Mobile-Specific Features

✅ **Fully Responsive Design**
- Mobile-first approach
- Breakpoints: 640px (sm), 768px (md), 1024px (lg)
- Touch-optimized buttons (44px minimum)
- Adaptive text sizes and spacing

✅ **Mobile Navigation**
- Hamburger menu on mobile devices
- Sidebar overlay with backdrop
- Smooth transitions and animations

✅ **PWA Support**
- Web app manifest configured
- Installable on mobile devices
- Offline-ready (service worker can be added)

## Continuous Deployment

Vercel automatically deploys when you push to your repository:

- **Production**: Pushes to `main` or `master` branch
- **Preview**: Pushes to other branches or pull requests

## Monitoring

Monitor your deployment:

1. **Analytics**: View in Vercel dashboard
2. **Logs**: Function logs available in dashboard
3. **Performance**: Built-in Web Vitals tracking

## Cost Estimation

**Free Tier (Hobby)**:
- 100GB bandwidth/month
- Unlimited deployments
- Automatic HTTPS
- Preview deployments

**Pro Tier** ($20/month):
- 1TB bandwidth/month
- Team collaboration
- Advanced analytics
- Custom analytics

## Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Groq API Documentation](https://console.groq.com/docs)

## Security Notes

- ✅ Security headers configured in `vercel.json`
- ✅ HTTPS enforced by default
- ✅ API keys stored securely in environment variables
- ✅ No sensitive data in client-side code
- ✅ CORS properly configured

## Backup and Rollback

To rollback to a previous deployment:

1. Go to Vercel dashboard
2. Navigate to "Deployments"
3. Find the previous working deployment
4. Click "..." → "Promote to Production"

---

**Last Updated**: January 2026  
**Maintained By**: MediCare AI Team
