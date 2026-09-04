import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, X, ArrowUp } from 'lucide-react';
import { INTENTS, FALLBACK_RESPONSE } from '../data/chatbotKnowledge';
import { matchIntent } from '../utils/matchIntent';

interface Message {
  id: string;
  role: 'user' | 'bot';
  text: string;
}

const GREETING_RESPONSE = INTENTS.find((intent) => intent.id === 'greeting')?.response ?? '';
const QUICK_REPLIES = INTENTS.filter((intent) => intent.quickReply);

const TYPING_DELAY = 400;

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function SakiAvatar() {
  return (
    <div
      className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center font-kanit font-black text-[#D7E2EA]"
      style={{ backgroundColor: '#0C0C0C', border: '2px solid #D7E2EA', fontSize: '11px' }}
    >
      S
    </div>
  );
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasGreetedRef = useRef(false);

  useEffect(() => {
    if (isOpen && !hasGreetedRef.current) {
      hasGreetedRef.current = true;
      setMessages([{ id: createId(), role: 'bot', text: GREETING_RESPONSE }]);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const respondTo = (userText: string) => {
    const trimmed = userText.trim();
    if (!trimmed || isTyping) return;

    setMessages((prev) => [...prev, { id: createId(), role: 'user', text: trimmed }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const matched = matchIntent(trimmed, INTENTS);
      setMessages((prev) => [
        ...prev,
        {
          id: createId(),
          role: 'bot',
          text: matched ? matched.response : FALLBACK_RESPONSE,
        },
      ]);
      setIsTyping(false);
    }, TYPING_DELAY);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      respondTo(input);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? 'Close chat' : 'Open Saki, portfolio assistant'}
        aria-expanded={isOpen}
        title="Chat with Saki"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[60] w-14 h-14 rounded-full flex items-center justify-center transition-opacity duration-200 hover:opacity-90"
        style={{
          background:
            'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
          boxShadow:
            '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
        }}
      >
        {isOpen ? <X size={24} color="#fff" /> : <MessageCircle size={24} color="#fff" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed z-[60] bottom-24 left-4 right-4 sm:left-auto sm:right-6 sm:w-[340px] max-h-[480px] rounded-[24px] bg-[#0C0C0C] border-2 border-[#D7E2EA] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 flex-shrink-0"
              style={{ borderBottom: '1px solid rgba(215,226,234,0.15)' }}
            >
              <div className="flex flex-col">
                <span className="font-kanit font-medium text-[#D7E2EA] text-sm">Saki</span>
                <span className="text-xs" style={{ color: '#888' }}>
                  Sakshi's portfolio assistant
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="text-[#D7E2EA] hover:opacity-70 transition-opacity"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 min-h-0 overflow-y-auto px-4 py-3 flex flex-col gap-3">
              {messages.map((message) =>
                message.role === 'bot' ? (
                  <div key={message.id} className="self-start flex items-end gap-2 max-w-[90%]">
                    <SakiAvatar />
                    <div className="rounded-2xl px-3 py-2 text-sm font-light text-[#D7E2EA] whitespace-pre-line border border-[#D7E2EA]/30">
                      {message.text}
                    </div>
                  </div>
                ) : (
                  <div
                    key={message.id}
                    className="self-end max-w-[85%] rounded-2xl px-3 py-2 text-sm font-light text-[#D7E2EA] whitespace-pre-line bg-[#1a1a1a]"
                  >
                    {message.text}
                  </div>
                )
              )}

              {isTyping && (
                <div className="self-start flex items-end gap-2">
                  <SakiAvatar />
                  <div className="rounded-2xl px-3 py-2.5 border border-[#D7E2EA]/30 flex items-center gap-1">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-[#D7E2EA]/60 animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick replies */}
            <div
              className="flex-shrink-0 flex gap-2 overflow-x-auto px-4 py-2"
              style={{ borderTop: '1px solid rgba(215,226,234,0.1)' }}
            >
              {QUICK_REPLIES.map((intent) => (
                <button
                  key={intent.id}
                  type="button"
                  onClick={() => respondTo(intent.quickReply as string)}
                  className="flex-shrink-0 rounded-full border border-[#D7E2EA]/40 text-[#D7E2EA] text-xs uppercase tracking-wide px-3 py-1.5 whitespace-nowrap hover:bg-[#D7E2EA]/10 transition-colors"
                >
                  {intent.quickReply}
                </button>
              ))}
            </div>

            {/* Input */}
            <div
              className="flex-shrink-0 flex items-center gap-2 p-3"
              style={{ borderTop: '1px solid rgba(215,226,234,0.15)' }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask a question..."
                className="flex-1 min-w-0 rounded-full border border-[#D7E2EA]/30 bg-transparent px-4 py-2 text-sm text-[#D7E2EA] outline-none focus:border-[#D7E2EA] transition-colors placeholder:text-[#D7E2EA]/40"
              />
              <button
                type="button"
                onClick={() => respondTo(input)}
                disabled={!input.trim()}
                aria-label="Send message"
                className="flex-shrink-0 w-9 h-9 rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] flex items-center justify-center hover:bg-[#D7E2EA]/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ArrowUp size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
