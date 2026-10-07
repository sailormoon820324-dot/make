import React, { useState } from 'react';
import { X, Check, Lock, User, Mail, ShieldCheck } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  initialMode: 'login' | 'signup';
  onClose: () => void;
  onSuccess: (email: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode,
  onClose,
  onSuccess,
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess(email || 'customer@example.com');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-[#F9F7F2] rounded-3xl shadow-2xl border-2 border-[#2D6A4F]/20 z-10 p-6 sm:p-8">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl text-[#55695C] hover:bg-[#EAE4D7] transition-colors cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Tab switch */}
        <div className="flex border-b border-[#E5DECF] mb-6">
          <button
            onClick={() => setMode('login')}
            className={`pb-3 flex-1 text-center font-black text-lg transition-colors cursor-pointer ${
              mode === 'login'
                ? 'text-[#2D6A4F] border-b-2 border-[#2D6A4F]'
                : 'text-[#84998A] hover:text-[#1E3A2B]'
            }`}
          >
            로그인
          </button>
          <button
            onClick={() => setMode('signup')}
            className={`pb-3 flex-1 text-center font-black text-lg transition-colors cursor-pointer ${
              mode === 'signup'
                ? 'text-[#2D6A4F] border-b-2 border-[#2D6A4F]'
                : 'text-[#84998A] hover:text-[#1E3A2B]'
            }`}
          >
            회원가입
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-sm font-bold text-[#1E3A2B] mb-1">이름</label>
              <div className="relative">
                <User className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[#84998A]" />
                <input
                  type="text"
                  required
                  placeholder="홍길동"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-[#D5CDBD] rounded-xl font-medium focus:border-[#2D6A4F] focus:outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-bold text-[#1E3A2B] mb-1">이메일 주소</label>
            <div className="relative">
              <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[#84998A]" />
              <input
                type="email"
                required
                placeholder="example@naver.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-[#D5CDBD] rounded-xl font-medium focus:border-[#2D6A4F] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-[#1E3A2B] mb-1">비밀번호</label>
            <div className="relative">
              <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[#84998A]" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-[#D5CDBD] rounded-xl font-medium focus:border-[#2D6A4F] focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full h-14 bg-[#2D6A4F] hover:bg-[#1E4D38] text-white rounded-xl text-lg font-bold shadow-md cursor-pointer transition-colors"
            >
              {mode === 'login' ? '로그인하기' : '회원가입 완료하기'}
            </button>
          </div>

          {mode === 'signup' && (
            <p className="text-xs text-center text-[#758A7C]">
              가입 시 신규 회원 전용 무료배송 및 5,000원 적립금 혜택이 적용됩니다.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};
