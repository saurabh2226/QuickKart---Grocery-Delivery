import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore, UserRole } from '../store/authStore';
import { auth, RecaptchaVerifier, signInWithPhoneNumber, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink, GoogleAuthProvider, signInWithPopup } from '../lib/firebase';
import { Phone, Mail, MessageCircle, ArrowRight, User as UserIcon } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Login() {
  const [method, setMethod] = useState<'phone' | 'email' | 'whatsapp'>('phone');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'input' | 'verify'>('input');
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setUser, setGuest } = useAuthStore();

  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let emailForSignIn = window.localStorage.getItem('emailForSignIn');
      if (!emailForSignIn) {
        emailForSignIn = window.prompt('Please provide your email for confirmation');
      }
      if (emailForSignIn) {
        signInWithEmailLink(auth, emailForSignIn, window.location.href)
          .then((result) => {
            window.localStorage.removeItem('emailForSignIn');
            handleLoginSuccess(result.user.uid, emailForSignIn!, 'customer');
          })
          .catch((error) => {
            toast.error('Error signing in with email link');
          });
      }
    }
  }, []);

  const setupRecaptcha = () => {
    if (!(window as any).recaptchaVerifier) {
      try {
        (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
          size: 'invisible',
        });
      } catch (error) {
        console.error('Error initializing reCAPTCHA', error);
      }
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup recaptcha on unmount
      if ((window as any).recaptchaVerifier) {
        try {
          (window as any).recaptchaVerifier.clear();
          (window as any).recaptchaVerifier = null;
        } catch (e) {
          console.error(e);
        }
      }
    };
  }, []);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      handleLoginSuccess(result.user.uid, result.user.email || 'Google User', 'customer');
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || 'Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (method === 'phone') {
        setupRecaptcha();
        const appVerifier = (window as any).recaptchaVerifier;
        const formattedPhone = phone.startsWith('+') ? phone : `+91${phone}`;
        const confirmation = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
        setConfirmationResult(confirmation);
        setStep('verify');
        toast.success('OTP sent successfully via SMS');
      } else if (method === 'email') {
        const actionCodeSettings = {
          url: window.location.origin + '/login',
          handleCodeInApp: true,
        };
        await sendSignInLinkToEmail(auth, email, actionCodeSettings);
        window.localStorage.setItem('emailForSignIn', email);
        toast.success('Sign-in link sent to your email');
        setStep('verify');
      } else if (method === 'whatsapp') {
        // Simulated WhatsApp OTP (Requires Twilio/Meta API in production)
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
        console.log(`[SIMULATION] WhatsApp OTP for ${phone} is 123456`);
        toast.success('WhatsApp OTP sent! (Use 123456 for demo)');
        setStep('verify');
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || 'Failed to send OTP');
      // Reset recaptcha if it fails
      if (method === 'phone' && (window as any).recaptchaVerifier) {
        try {
          (window as any).recaptchaVerifier.clear();
          (window as any).recaptchaVerifier = null;
        } catch (e) {
          console.error(e);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (method === 'phone') {
        const result = await confirmationResult.confirm(otp);
        handleLoginSuccess(result.user.uid, phone, 'customer');
      } else if (method === 'whatsapp') {
        if (otp === '123456') {
          handleLoginSuccess(`wa_${phone}`, phone, 'customer');
        } else {
          throw new Error('Invalid WhatsApp OTP');
        }
      }
    } catch (error: any) {
      toast.error(error.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSuccess = (uid: string, identifier: string, role: UserRole) => {
    setUser({
      uid,
      name: `User ${identifier.slice(-4)}`,
      email: identifier.includes('@') ? identifier : '',
      phone: identifier.includes('@') ? '' : identifier,
      role,
      walletBalance: 0,
    });
    toast.success('Logged in successfully');
    navigate(role === 'admin' ? '/admin' : role === 'delivery' ? '/delivery' : role === 'shop_owner' ? '/shop-owner' : '/');
  };

  const demoLogin = (role: UserRole) => {
    handleLoginSuccess(`demo_${role}_123`, `demo_${role}@quickkart.com`, role);
  };

  return (
    <div className="flex-1 bg-white flex flex-col p-6 pb-24">
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-emerald-600 mb-2">QuickKart</h1>
          <p className="text-gray-500">Groceries delivered in 10 minutes</p>
        </div>

        <div className="bg-gray-50 p-1 rounded-xl flex mb-6">
          <button
            onClick={() => { setMethod('phone'); setStep('input'); }}
            className={`flex-1 py-2 text-sm font-medium rounded-lg flex items-center justify-center gap-2 ${method === 'phone' ? 'bg-white shadow-sm text-emerald-600' : 'text-gray-500'}`}
          >
            <Phone className="w-4 h-4" /> Phone
          </button>
          <button
            onClick={() => { setMethod('email'); setStep('input'); }}
            className={`flex-1 py-2 text-sm font-medium rounded-lg flex items-center justify-center gap-2 ${method === 'email' ? 'bg-white shadow-sm text-emerald-600' : 'text-gray-500'}`}
          >
            <Mail className="w-4 h-4" /> Email
          </button>
          <button
            onClick={() => { setMethod('whatsapp'); setStep('input'); }}
            className={`flex-1 py-2 text-sm font-medium rounded-lg flex items-center justify-center gap-2 ${method === 'whatsapp' ? 'bg-white shadow-sm text-emerald-600' : 'text-gray-500'}`}
          >
            <MessageCircle className="w-4 h-4" /> WhatsApp
          </button>
        </div>

        {step === 'input' ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            {method === 'email' ? (
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                required
              />
            ) : (
              <div className="flex">
                <span className="inline-flex items-center px-4 bg-gray-50 border border-r-0 border-gray-200 rounded-l-xl text-gray-500">
                  +91
                </span>
                <input
                  type="tel"
                  placeholder="Enter mobile number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-r-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                  required
                />
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 text-white font-bold py-3 rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Sending...' : method === 'email' ? 'Send Link' : 'Send OTP'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            {method === 'email' ? (
              <div className="text-center p-4 bg-emerald-50 text-emerald-700 rounded-xl">
                Check your email for the sign-in link!
              </div>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-center tracking-[0.5em] font-mono text-lg"
                  maxLength={6}
                  required
                />
                <button
                  type="submit"
                  disabled={loading || otp.length < 6}
                  className="w-full bg-emerald-600 text-white font-bold py-3 rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </button>
              </>
            )}
            <button
              type="button"
              onClick={() => setStep('input')}
              className="w-full text-sm text-gray-500 hover:text-gray-900"
            >
              Back
            </button>
          </form>
        )}

        <div id="recaptcha-container"></div>

        <div className="mt-6 space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full bg-white border border-gray-200 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-3 disabled:opacity-50"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Google
          </button>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => { setGuest(true); navigate('/'); }}
            className="text-emerald-600 font-medium flex items-center justify-center gap-2 mx-auto hover:text-emerald-700"
          >
            Skip Login & Explore App <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100">
          <p className="text-xs text-gray-400 text-center mb-4 uppercase tracking-wider font-semibold">Quick Demo Login</p>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => demoLogin('customer')} className="py-2 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 flex items-center justify-center gap-2">
              <UserIcon className="w-4 h-4" /> Customer
            </button>
            <button onClick={() => demoLogin('admin')} className="py-2 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-100 flex items-center justify-center gap-2">
              Admin
            </button>
            <button onClick={() => demoLogin('delivery')} className="py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 flex items-center justify-center gap-2">
              Delivery
            </button>
            <button onClick={() => demoLogin('shop_owner')} className="py-2 bg-orange-50 text-orange-700 rounded-lg text-sm font-medium hover:bg-orange-100 flex items-center justify-center gap-2">
              Shop Owner
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
