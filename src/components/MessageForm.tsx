import { useState, type FormEvent } from 'react';

const WEB3FORMS_ACCESS_KEY = '9576e2b9-84a8-475e-ae08-e3852cd48583';

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function MessageForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Portfolio message from ${name || 'a visitor'}`,
          name,
          email,
          message,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const isSending = status === 'sending';

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl rounded-[32px] sm:rounded-[40px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-6 sm:p-10 md:p-12 flex flex-col gap-5 sm:gap-6"
    >
      <div className="text-center">
        <h3
          className="hero-heading font-black uppercase tracking-tight"
          style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)' }}
        >
          Send a Message
        </h3>
        <p
          className="text-[#D7E2EA]/60 mt-2"
          style={{ fontSize: 'clamp(0.8rem, 1.3vw, 0.95rem)' }}
        >
          Drop a note — it'll land straight in my inbox.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="contact-name"
          className="text-[#D7E2EA]/60 uppercase tracking-wide text-xs font-medium"
        >
          Name
        </label>
        <input
          id="contact-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="bg-transparent border-b border-[#D7E2EA]/30 focus:border-[#D7E2EA] outline-none text-[#D7E2EA] py-2 transition-colors placeholder:text-[#D7E2EA]/30"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="contact-email"
          className="text-[#D7E2EA]/60 uppercase tracking-wide text-xs font-medium"
        >
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="bg-transparent border-b border-[#D7E2EA]/30 focus:border-[#D7E2EA] outline-none text-[#D7E2EA] py-2 transition-colors placeholder:text-[#D7E2EA]/30"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="contact-message"
          className="text-[#D7E2EA]/60 uppercase tracking-wide text-xs font-medium"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What's on your mind?"
          className="bg-transparent border-b border-[#D7E2EA]/30 focus:border-[#D7E2EA] outline-none text-[#D7E2EA] py-2 resize-none transition-colors placeholder:text-[#D7E2EA]/30"
        />
      </div>

      <button
        type="submit"
        disabled={isSending}
        className="mt-2 self-center rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base transition-colors duration-200 hover:bg-[#D7E2EA]/10 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSending ? 'Sending…' : 'Send ↗'}
      </button>

      {status === 'success' && (
        <p className="text-center text-[#D7E2EA] text-sm">
          Thanks — your message is on its way!
        </p>
      )}
      {status === 'error' && (
        <p className="text-center text-[#D7E2EA]/70 text-sm">
          Something went wrong. Please try again, or email me directly.
        </p>
      )}
    </form>
  );
}
