# 🚀 FinCoach Vercel Deployment Guide

## Quick Deploy (5 minutes)

### Option 1: Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

### Option 2: GitHub Integration

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repo: `PoH1305/fincoach-app`
4. Configure:
   - Framework: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: `.next`

## Environment Variables

Add these in Vercel Dashboard → Settings → Environment Variables:

```env
GEMINI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Post-Deployment

1. **Update Firebase**:
   - Add Vercel domain to Firebase authorized domains
   - Deploy Firestore rules: `firebase deploy --only firestore:rules`

2. **Test Features**:
   - Health Score ✓
   - AI Chat ✓
   - Voice Assistant ✓
   - Premium Plans ✓
   - Export ✓

3. **Custom Domain** (Optional):
   - Vercel Dashboard → Domains
   - Add your domain
   - Update DNS records

## Deployment Commands

```bash
# Production deployment
vercel --prod

# Preview deployment
vercel

# Check deployment status
vercel ls

# View logs
vercel logs
```

## Troubleshooting

**Build fails?**
- Check Node version: 18+
- Run `npm install` locally
- Check environment variables

**API errors?**
- Verify GEMINI_API_KEY is set
- Check Firebase config

**404 errors?**
- Ensure `next.config.js` is correct
- Check file paths are lowercase

## Performance

- **Edge Functions**: `/api/chat/v2` runs on edge
- **Static Pages**: Dashboard, Landing pre-rendered
- **CDN**: All assets cached globally
- **Region**: Mumbai (bom1) for India users

## Monitoring

- Vercel Analytics: Auto-enabled
- Error tracking: Add Sentry (optional)
- Performance: Vercel Speed Insights

---

**Your app will be live at**: `https://fincoach-app.vercel.app`

🎉 **Deployment complete!**
