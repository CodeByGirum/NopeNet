# NopeNet Setup Guide

This document provides step-by-step instructions for setting up the NopeNet Intelligent Intrusion Detection System in your local environment.

## Prerequisites

- Node.js (v18 or later)
- npm or yarn package manager
- OpenAI API key

## Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/CodeByGirum/nopenet.git
   cd nopenet
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Variables**
   Create a `.env` file in the root directory and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Access the application**
   Open your browser and navigate to `http://localhost:5000`

## Configuration Options

### OpenAI Model Selection

By default, the application uses the GPT-4o model for AI assistant capabilities. You can modify this in the `server/routes.ts` file if needed.

### Styling Customization

The application uses Tailwind CSS for styling. You can customize the appearance by modifying the following files:
- `theme.json` - For primary color theme settings
- `tailwind.config.ts` - For Tailwind configuration
- `client/src/index.css` - For global CSS styles

## Deployment

For deployment to production environments, build the application:

```bash
npm run build
# or
yarn build
```

Then serve the static files and backend API using a Node.js server:

```bash
npm run start
# or
yarn start
```

## Troubleshooting

### API Key Issues
If you encounter issues with the AI assistant, ensure your OpenAI API key is valid and has sufficient quota.

### Port Conflicts
If port 5000 is already in use, you can modify the port in `server/index.ts`.

---

For more detailed documentation, refer to the [README.md](README.md) file.