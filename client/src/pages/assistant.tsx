import AIAssistant from '@/sections/education/AIAssistant';

export default function Assistant() {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-black min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <h2 className="text-3xl font-medium mb-4">
            <span className="text-white">Security Assistant</span>
          </h2>
          <p className="text-gray-400 max-w-3xl">
            Chat with our AI security assistant to analyze threats, explain technical details, and get personalized recommendations.
          </p>
        </div>
        
        {/* AI Security Assistant */}
        <AIAssistant />
      </div>
    </section>
  );
}