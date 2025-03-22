# NopeNet: Intelligent Intrusion Detection System

![image](https://github.com/user-attachments/assets/712991d0-0637-4f5b-b390-745ae75b48f3)


A futuristic intrusion detection dashboard with animated UI elements, real-time visualizations, and educational components. This project combines advanced cybersecurity concepts with a modern, intuitive user interface to provide a comprehensive network security monitoring solution.

[![GitHub](https://img.shields.io/badge/GitHub-CodeByGirum-blue?logo=github)](https://github.com/CodeByGirum/nopenet)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

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
- AI- powered cybersecurity assistant
- Context-aware conversation with security focus
- Network scanning integration for real-time analysis

### Cibersecurity Resources
- Detailed information about common attack types

### Dataset & Model Visualization
- KDD Cup dataset information
- Dynamic attack category distribution visualization
- Interactive model architecture diagrams
- Detection pipeline workflow visualization (How our system works)

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

<table>
  <tr>
    <td><img src="https://github.com/CodeByGirum/nopenet/raw/main/docs/screenshots/dashboard.png" alt="Dashboard" /></td>
    <td><img src="https://github.com/CodeByGirum/nopenet/raw/main/docs/screenshots/intrusions.png" alt="Intrusions" /></td>
  </tr>
  <tr>
    <td><img src="https://github.com/CodeByGirum/nopenet/raw/main/docs/screenshots/assistant.png" alt="AI Assistant" /></td>
    <td><img src="https://github.com/CodeByGirum/nopenet/raw/main/docs/screenshots/education.png" alt="Education" /></td>
  </tr>
  <tr>
    <td><img src="https://github.com/CodeByGirum/nopenet/raw/main/docs/screenshots/dataset.png" alt="Dataset" /></td>
    <td><img src="https://github.com/CodeByGirum/nopenet/raw/main/docs/screenshots/scan.png" alt="Network Scan" /></td>
  </tr>
</table>

*Note: Placeholder images will be replaced with actual screenshots when the repository is created.*

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

*Note: This is a demonstration project showcasing UI/UX design and integration capabilities. The intrusion detection functionality is simulated for demonstration purposes.*

## Acknowledgments

- [KDD Cup Dataset](http://kdd.ics.uci.edu/databases/kddcup99/kddcup99.html) for providing the data used in model demonstrations
- [shadcn/ui](https://ui.shadcn.com/) for the excellent React component library
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [OpenAI](https://openai.com/) for the AI assistant capabilities
