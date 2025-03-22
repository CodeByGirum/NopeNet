# NopeNet: Intelligent Intrusion Detection System

![NopeNet](generated-icon.png)

A futuristic intrusion detection dashboard with animated UI elements, real-time visualizations, and educational components. This project combines advanced cybersecurity concepts with a modern, intuitive user interface to provide a comprehensive network security monitoring solution.

## Features

### Dashboard
- Real-time network intrusion monitoring
- Interactive attack distribution visualization
- Recent attack types tracker with change indicators
- Comprehensive intrusion logs with filtering and status management

### Network Scanning
- Real-time network scanning functionality
- Vulnerability detection and assessment
- Port scanning and service identification
- Smart recommendations for fixing detected vulnerabilities

### AI Assistant
- OpenAI-powered cybersecurity assistant
- Context-aware conversation with security focus
- Markdown support for formatted responses
- Network scanning integration for real-time analysis

### Educational Resources
- Detailed information about common attack types
- Interactive security cards with prevention tips
- Animated visualizations of attack vectors

### Dataset & Model Visualization
- Comprehensive KDD Cup dataset information
- Dynamic attack category distribution visualization
- Interactive model architecture diagrams
- Detection pipeline workflow visualization

## Technology Stack

### Frontend
- React with TypeScript
- TanStack Query for data fetching
- Recharts for interactive visualizations
- Tailwind CSS with shadcn/ui components
- Wouter for routing

### Backend
- Express.js server
- OpenAI API integration
- In-memory storage for demonstration
- RESTful API endpoints

### Machine Learning Models (Visualization Only)
- Ensemble approach with CNN, DNN, and Random Forest
- Model architecture visualization
- Performance metrics comparison

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Add your OpenAI API key as an environment variable:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```
4. Start the development server:
   ```
   npm run dev
   ```

## Architecture

The system demonstrates an ensemble approach to intrusion detection combining:

1. **CNN (Convolutional Neural Network)**: Specialized in detecting spatial patterns in DoS and Probe attacks
2. **DNN (Deep Neural Network)**: Effective for subtle User-to-Root (U2R) attacks
3. **Random Forest**: Excellent for detecting Remote-to-Local (R2L) attacks through decision trees

These models work together to provide comprehensive protection against various attack vectors, presented through an intuitive dashboard interface.

## Use Cases

- Security Operations Centers (SOC) monitoring
- Network administration and threat detection
- Cybersecurity education and training
- Demonstration of ML/AI applications in cybersecurity

## Screenshots

*(Screenshots would be included here)*

## License

MIT

---

*Note: This is a demonstration project showcasing UI/UX design and integration capabilities. The intrusion detection functionality is simulated for demonstration purposes.*