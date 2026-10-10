import { useState, type FormEvent } from 'react';
import { Twitter, Circle, Instagram, Linkedin } from 'lucide-react';
import SocialBtn from './SocialBtn';
import { EMAIL, SERVICES } from '../constants';
import { inputClass } from '../styles';

export default function ContactCard() {
  const [selected, setSelected] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const toggle = (service: string) => {
    setSelected((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSending(false);
    setSent(true);
  };

  return (
    <div className="w-full lg:w-[min(480px,45%)] shrink-0">
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden p-4 sm:p-6 flex flex-col gap-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-black tracking-tight">Say hello! 👋</h2>

        <div className="flex flex-row items-center justify-between gap-3 bg-gray-50 rounded-2xl px-4 py-2.5">
          <div className="min-w-0 flex flex-col">
            <span className="text-xs text-gray-500">Drop us a line</span>
            <a href={`mailto:${EMAIL}`} className="text-blue-600 font-semibold hover:underline truncate">
              {EMAIL}
            </a>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <SocialBtn label="Twitter" className="bg-gray-100 text-gray-800">
              <Twitter size={13} />
            </SocialBtn>
            <SocialBtn label="Circle" className="bg-pink-100 text-pink-500">
              <Circle size={13} />
            </SocialBtn>
            <SocialBtn label="Instagram" className="bg-orange-100 text-orange-400">
              <Instagram size={13} />
            </SocialBtn>
            <SocialBtn label="LinkedIn" className="bg-blue-100 text-blue-600">
              <Linkedin size={13} />
            </SocialBtn>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-gray-400 font-medium text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {sent ? (
          <div className="flex flex-col items-center text-center py-6 gap-3">
            <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-xl">✓</div>
            <h3 className="text-base font-semibold text-gray-900">You're all set!</h3>
            <p className="text-sm text-gray-500">Expect a reply within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label htmlFor="vision" className="text-sm font-medium text-black">
              Tell us about your vision
            </label>

            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                name="name"
                placeholder="Full name"
                aria-label="Full name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`flex-1 min-w-0 ${inputClass}`}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                aria-label="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`flex-1 min-w-0 ${inputClass}`}
              />
            </div>

            <textarea
              id="vision"
              name="message"
              rows={4}
              placeholder="What are you looking to build or improve..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={`w-full resize-none ${inputClass}`}
            />

            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-black">I need help with...</span>
              <div className="flex flex-wrap gap-1.5">
                {SERVICES.map((service) => {
                  const active = selected.includes(service);
                  return (
                    <button
                      key={service}
                      type="button"
                      aria-pressed={active}
                      onClick={() => toggle(service)}
                      className={`text-xs font-medium px-3 py-2 rounded-lg border transition-all ${
                        active
                          ? 'bg-gray-100 text-black border-black'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      {service}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              disabled={sending}
              className="w-full bg-black text-white text-sm font-semibold py-3 rounded-2xl hover:bg-gray-800 transition-colors disabled:opacity-60"
            >
              {sending ? 'Sending...' : 'Send my message'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
