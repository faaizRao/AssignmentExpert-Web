'use client';

import { useState } from 'react';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSendToWhatsApp = () => {
    if (!message.trim()) return;
    
    // Format message for WhatsApp
    const whatsappMessage = `*New Message from Website*\n\nName: ${name || 'Not provided'}\nEmail: ${email || 'Not provided'}\n\nMessage:\n${message}`;
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://api.whatsapp.com/send/?phone=447478060551&text=%2ANew+Message+from+Website%2A%0A%0AName%3A+faaiz%0AEmail%3A+Not+provided%0A%0AMessage%3A%0Ahi&type=phone_number&app_absent=0${encodedMessage}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
    
    // Reset form
    setMessage('');
    setName('');
    setEmail('');
    setIsOpen(false);
  };

  return (
    <>
      {/* Chat Button - Left Side with Text - RED */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-50 flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-full shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-red-300 group"
        aria-label="Open chat widget"
      >
        {isOpen ? (
          <>
            <svg
              className="w-7 h-7 text-yellow-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <span className="text-yellow-400 font-bold text-base drop-shadow-lg">Close</span>
          </>
        ) : (
          <>
            <svg
              className="w-8 h-8 text-yellow-400 group-hover:scale-110 transition-transform drop-shadow-lg"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <span className="text-yellow-400 font-bold text-base whitespace-nowrap drop-shadow-lg">Talk with Us</span>
          </>
        )}

        {/* Pulse animation */}
        {!isOpen && (
          <span
            className="absolute inset-0 rounded-full animate-ping opacity-75 bg-red-600"
            aria-hidden="true"
          />
        )}
      </button>

      {/* Chat Widget - Left Side */}
      {isOpen && (
        <div className="fixed bottom-24 left-6 z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-black">Talk with Us</h3>
                <p className="text-xs text-black">We&apos;re online now!</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 max-h-96 overflow-y-auto bg-gray-50">
            <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
              <p className="text-sm text-gray-600 mb-3">
                👋 Hi! Send us a message and we&apos;ll respond on WhatsApp instantly!
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label htmlFor="chat-name" className="block text-xs font-medium text-gray-700 mb-1">
                  Name (Optional)
                </label>
                <input
                  type="text"
                  id="chat-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="chat-email" className="block text-xs font-medium text-gray-700 mb-1">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  id="chat-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="chat-message" className="block text-xs font-medium text-gray-700 mb-1">
                  Your Message
                </label>
                <textarea
                  id="chat-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none text-sm"
                  placeholder="Type your message here..."
                />
              </div>

              <button
                onClick={handleSendToWhatsApp}
                disabled={!message.trim()}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center space-x-2 shadow-md"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                <span>Send via WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="border-t border-gray-200 p-3 bg-white">
            <p className="text-xs text-gray-500 mb-2 text-center">Or contact us directly:</p>
            <div className="flex gap-2">
              <a
                href="mailto:info@academicsconsulate.com"
                className="flex-1 text-center text-xs bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg px-2 py-2 transition-colors font-medium"
                title="Email us"
              >
                📧 Email
              </a>
              <a
                href="tel:+447478060551"
                className="flex-1 text-center text-xs bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg px-2 py-2 transition-colors font-medium"
                title="Call us"
              >
                📞 Call
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
