import React, { useState, useEffect } from 'react';
import { TICKET_PASSES, UPCOMING_EVENT, VALID_PROMO_CODES } from '../data/tedxData';
import type { TicketPass, PaymentMethod, PaymentDetails } from '../types';
import confetti from 'canvas-confetti';
import { 
  X, Check, CheckCircle2, Sparkles, QrCode, Shield, ArrowRight, 
  CreditCard, Smartphone, Building2, Lock, Tag, ArrowLeft, Printer, 
  Clock, AlertCircle, RefreshCw 
} from 'lucide-react';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (message: string, type: 'success' | 'info' | 'error') => void;
}

export const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose, onShowToast }) => {
  const [selectedPass, setSelectedPass] = useState<TicketPass>(TICKET_PASSES[1]); // General pass by default
  const [ticketCount, setTicketCount] = useState<number>(1);
  const [step, setStep] = useState<'tier' | 'details' | 'payment' | 'otp' | 'confirmed'>('tier');
  const [isProcessing, setIsProcessing] = useState(false);

  // Delegate Form Data
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    organization: 'Pimpri Chinchwad University',
    dietaryPreference: 'Standard',
  });

  // Promo Code Engine
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discountAmount: number } | null>(null);
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);

  // Payment Options State
  const [activePaymentTab, setActivePaymentTab] = useState<PaymentMethod>('upi_qr');
  const [upiSubMode, setUpiSubMode] = useState<'qr' | 'id'>('qr');
  const [vpaInput, setVpaInput] = useState('');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });

  // OTP State
  const [otpInput, setOtpInput] = useState('');
  const [otpError, setOtpError] = useState(false);

  // Completed Payment Details
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
  const [ticketId, setTicketId] = useState('');

  // Calculations
  const subtotal = selectedPass.numericPrice * ticketCount;
  const discount = appliedPromo ? appliedPromo.discountAmount : 0;
  // 18% GST calculation (standard Indian ticketing compliance)
  const taxableAmount = Math.max(0, subtotal - discount);
  const gstAmount = Math.round(taxableAmount * 0.18);
  const finalTotal = taxableAmount + gstAmount;

  // Detect Card Brand
  const getCardBrand = (number: string) => {
    const cleaned = number.replace(/\s+/g, '');
    if (cleaned.startsWith('4')) return 'Visa';
    if (cleaned.startsWith('51') || cleaned.startsWith('52') || cleaned.startsWith('53') || cleaned.startsWith('54') || cleaned.startsWith('55')) return 'Mastercard';
    if (cleaned.startsWith('60') || cleaned.startsWith('65') || cleaned.startsWith('81')) return 'RuPay';
    if (cleaned.startsWith('34') || cleaned.startsWith('37')) return 'Amex';
    return null;
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return `${v.slice(0, 2)}/${v.slice(2, 4)}`;
    }
    return v;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleApplyPromo = () => {
    const trimmed = promoInput.trim().toUpperCase();
    if (!trimmed) return;

    const found = VALID_PROMO_CODES.find((p) => p.code === trimmed);
    if (found) {
      let discountAmount = 0;
      if (found.type === 'percentage') {
        discountAmount = Math.round((subtotal * found.value) / 100);
      } else {
        discountAmount = found.value;
      }
      setAppliedPromo({ code: found.code, discountAmount });
      setPromoMessage({ text: `Code '${found.code}' applied! Saved ₹${discountAmount}`, isError: false });
      onShowToast(`Coupon ${found.code} applied! Saved ₹${discountAmount}`, 'success');
    } else {
      setPromoMessage({ text: 'Invalid promo code. Try TEDX10 or PCUSTUDENT', isError: true });
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoInput('');
    setPromoMessage(null);
  };

  // Step transitions
  const handleProceedToDetails = (pass: TicketPass) => {
    setSelectedPass(pass);
    setStep('details');
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) {
      onShowToast('Please fill in your name and email.', 'error');
      return;
    }
    setStep('payment');
  };

  // Trigger payment processing
  const handleInitiatePayment = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      // For card payments, route through 3D Secure OTP verification
      if (activePaymentTab === 'card') {
        setStep('otp');
        setOtpInput('7492'); // Pre-fill test OTP for seamless testing experience
      } else {
        completeSuccessfulPayment();
      }
    }, 1000);
  };

  const handleVerifyOtpAndPay = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpInput.length < 4) {
      setOtpError(true);
      return;
    }
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      completeSuccessfulPayment();
    }, 1200);
  };

  // Final confirmation
  const completeSuccessfulPayment = () => {
    const randomHex = Math.random().toString(36).substring(2, 8).toUpperCase();
    const generatedTicketId = `TEDX-PCU-2026-${randomHex}`;
    const generatedTxnId = `pay_TEDx_${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    const generatedOrderId = `order_TEDx_${Math.random().toString(36).substring(2, 9)}`;
    const generatedInvoice = `INV-2026-PCU-${Math.floor(1000 + Math.random() * 9000)}`;

    const details: PaymentDetails = {
      method: activePaymentTab,
      transactionId: generatedTxnId,
      orderId: generatedOrderId,
      invoiceNumber: generatedInvoice,
      bankRef: `HDFC${Math.floor(10000000 + Math.random() * 90000000)}`,
      amount: finalTotal,
      subtotal: subtotal,
      discount: discount,
      tax: gstAmount,
      paidAt: new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      vpaHandle: activePaymentTab === 'upi_vpa' ? vpaInput || `${formData.email.split('@')[0]}@okaxis` : undefined,
      cardLast4: activePaymentTab === 'card' ? cardData.number.slice(-4) || '4242' : undefined,
      bankName: activePaymentTab === 'netbanking' ? selectedBank : undefined,
    };

    setPaymentDetails(details);
    setTicketId(generatedTicketId);
    setStep('confirmed');

    try {
      confetti({
        particleCount: 110,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#EB0028', '#ffffff', '#222222']
      });
    } catch {
      // ignore
    }

    onShowToast(`Payment of ₹${finalTotal} received! Digital pass issued.`, 'success');
  };

  // Instant 1-Click Demo Pay for fast evaluation
  const handleFastTrackDemoPay = () => {
    if (!formData.fullName) {
      setFormData({
        fullName: 'Advait Kulkarni',
        email: 'advait@pcu.edu.in',
        phone: '+91 98234 56789',
        organization: 'Pimpri Chinchwad University',
        dietaryPreference: 'Standard',
      });
    }
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      completeSuccessfulPayment();
    }, 800);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleResetModal = () => {
    setStep('tier');
    setAppliedPromo(null);
    setPromoInput('');
    setPromoMessage(null);
    onClose();
  };

  const topBanks = [
    { name: 'HDFC Bank', code: 'HDFC' },
    { name: 'State Bank of India', code: 'SBI' },
    { name: 'ICICI Bank', code: 'ICICI' },
    { name: 'Axis Bank', code: 'UTIB' },
    { name: 'Kotak Mahindra', code: 'KKBK' },
    { name: 'Punjab National Bank', code: 'PUNB' }
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#0e0e12] border border-white/15 text-white p-5 sm:p-8 lg:p-10 shadow-2xl shadow-black custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-white/5 hover:bg-ted-red text-zinc-400 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* STEP 1: Pass Tier Selection */}
        {step === 'tier' && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-ted-red mb-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Conference Passes • {UPCOMING_EVENT.edition}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                Select Your Delegate Pass
              </h3>
              <p className="text-zinc-400 text-sm mt-1">
                Choose your registration tier. All tiers grant access to live talks and university networking.
              </p>
            </div>

            {/* Passes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {TICKET_PASSES.map((pass) => {
                const isSelected = selectedPass.id === pass.id;
                return (
                  <div
                    key={pass.id}
                    onClick={() => setSelectedPass(pass)}
                    className={`rounded-2xl p-5 border cursor-pointer transition-all duration-300 flex flex-col justify-between relative ${
                      isSelected
                        ? 'bg-white/10 border-ted-red shadow-xl shadow-ted-red/20 -translate-y-1'
                        : 'bg-white/[0.02] border-white/10 hover:border-white/25 hover:bg-white/[0.05]'
                    }`}
                  >
                    {pass.popular && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-ted-red text-white text-[10px] font-mono uppercase font-bold tracking-wider shadow-md">
                        {pass.badge}
                      </span>
                    )}

                    <div>
                      <h4 className="font-bold text-white text-base">
                        {pass.name}
                      </h4>
                      <div className="text-2xl font-black text-ted-red mt-2">
                        {pass.price}
                      </div>

                      <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
                        {pass.perks.map((perk, pIdx) => (
                          <div key={pIdx} className="flex items-start gap-2 text-xs text-zinc-300">
                            <Check className="w-3.5 h-3.5 text-ted-red shrink-0 mt-0.5" />
                            <span className="leading-tight">{perk}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProceedToDetails(pass);
                      }}
                      className={`mt-6 w-full py-2.5 rounded-xl text-xs font-bold font-mono tracking-wider uppercase transition-colors ${
                        isSelected
                          ? 'bg-ted-red text-white shadow-lg shadow-ted-red/30'
                          : 'bg-white/10 hover:bg-white/20 text-white'
                      }`}
                    >
                      Select Tier
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Quantity Selector */}
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-left">
                <span className="text-xs font-bold text-white block">Number of Delegate Passes</span>
                <span className="text-[11px] text-zinc-400">Max 5 passes per student / group registration</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center font-bold text-white"
                >
                  -
                </button>
                <span className="w-8 text-center font-mono font-bold text-lg text-white">
                  {ticketCount}
                </span>
                <button
                  type="button"
                  onClick={() => setTicketCount(Math.min(5, ticketCount + 1))}
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center font-bold text-white"
                >
                  +
                </button>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-500">
                Official TEDx License Rules Apply • Non-Transferable
              </span>
              <button
                onClick={() => handleProceedToDetails(selectedPass)}
                className="px-6 py-3 rounded-full bg-ted-red hover:bg-ted-crimson text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2"
              >
                <span>Continue to Delegate Info</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Delegate Information */}
        {step === 'details' && (
          <form onSubmit={handleProceedToPayment} className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <button
                  type="button"
                  onClick={() => setStep('tier')}
                  className="text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-1 mb-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Pass Selection
                </button>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                  Delegate Details
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono text-ted-red font-bold block">{selectedPass.name}</span>
                <span className="text-xs text-zinc-400">{ticketCount} {ticketCount > 1 ? 'Passes' : 'Pass'}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-zinc-300 block">
                  Delegate Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Advait Kulkarni"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-ted-red text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-zinc-300 block">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. delegate@university.edu"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-ted-red text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-zinc-300 block">
                  Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-ted-red text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-zinc-300 block">
                  Institution / Organization
                </label>
                <input
                  type="text"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-ted-red text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-ted-red hover:bg-ted-crimson text-white font-bold text-sm tracking-wider uppercase shadow-xl shadow-ted-red/30 transition-colors flex items-center justify-center gap-2"
            >
              <span>Proceed to Secure Payment (₹{finalTotal})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* STEP 3: Secure Payment Gateway Portal */}
        {step === 'payment' && (
          <div className="space-y-6">
            {/* Top Back & Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-1 mb-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Details
                </button>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
                  <Lock className="w-5 h-5 text-emerald-400" />
                  Secure Payment Gateway
                </h3>
              </div>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
                <Shield className="w-3.5 h-3.5" />
                <span>256-Bit SSL Encrypted</span>
              </div>
            </div>

            {/* Split Checkout Layout: Left Order Summary, Right Payment Rails */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Order Summary & Coupon */}
              <div className="lg:col-span-5 rounded-2xl bg-white/[0.03] border border-white/10 p-5 space-y-4">
                <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 pb-2 border-b border-white/10">
                  Order Breakdown
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-semibold text-white block">{selectedPass.name}</span>
                      <span className="text-xs text-zinc-400 font-mono">₹{selectedPass.numericPrice} × {ticketCount} {ticketCount > 1 ? 'passes' : 'pass'}</span>
                    </div>
                    <span className="font-mono text-white">₹{subtotal}</span>
                  </div>

                  {/* Applied Promo Code */}
                  {appliedPromo && (
                    <div className="flex justify-between items-center text-xs text-emerald-400 font-mono bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20">
                      <div className="flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        <span>Code '{appliedPromo.code}'</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>-₹{appliedPromo.discountAmount}</span>
                        <button
                          type="button"
                          onClick={handleRemovePromo}
                          className="text-zinc-400 hover:text-rose-400 text-[10px]"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Taxes */}
                  <div className="flex justify-between text-xs text-zinc-400 pt-1">
                    <span>GST (18% Conference Service Tax)</span>
                    <span className="font-mono text-zinc-300">₹{gstAmount}</span>
                  </div>

                  {/* Grand Total */}
                  <div className="pt-3 border-t border-white/10 flex justify-between items-center text-base">
                    <span className="font-bold text-white">Total Amount Due</span>
                    <span className="text-2xl font-black font-display text-ted-red">
                      ₹{finalTotal}
                    </span>
                  </div>
                </div>

                {/* Promo Code Input Box */}
                {!appliedPromo && (
                  <div className="pt-2">
                    <span className="text-xs font-mono uppercase text-zinc-400 block mb-1.5">Have a Promo / Student Code?</span>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g. TEDX10 or PCUSTUDENT"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-white placeholder-zinc-600 uppercase text-xs font-mono focus:outline-none focus:border-ted-red"
                      />
                      <button
                        type="button"
                        onClick={handleApplyPromo}
                        className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold uppercase transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                    {promoMessage && (
                      <p className={`text-[11px] mt-1.5 ${promoMessage.isError ? 'text-rose-400' : 'text-emerald-400'}`}>
                        {promoMessage.text}
                      </p>
                    )}
                  </div>
                )}

                {/* Convenient 1-Click Test Pay Button */}
                <div className="pt-3 border-t border-white/10">
                  <button
                    type="button"
                    onClick={handleFastTrackDemoPay}
                    disabled={isProcessing}
                    className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono text-zinc-300 hover:text-white transition-colors flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-ted-red" />
                    <span>1-Click Test Checkout (Demo Sandbox)</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Payment Rails (UPI, Cards, NetBanking) */}
              <div className="lg:col-span-7 space-y-5">
                {/* Method Navigation Tabs */}
                <div className="grid grid-cols-3 gap-2 p-1.5 rounded-xl bg-black/60 border border-white/10">
                  <button
                    type="button"
                    onClick={() => setActivePaymentTab('upi_qr')}
                    className={`py-2 rounded-lg text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 ${
                      activePaymentTab === 'upi_qr'
                        ? 'bg-ted-red text-white shadow-md'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>UPI Rail</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActivePaymentTab('card')}
                    className={`py-2 rounded-lg text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 ${
                      activePaymentTab === 'card'
                        ? 'bg-ted-red text-white shadow-md'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Cards</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActivePaymentTab('netbanking')}
                    className={`py-2 rounded-lg text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 ${
                      activePaymentTab === 'netbanking'
                        ? 'bg-ted-red text-white shadow-md'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Net Banking</span>
                  </button>
                </div>

                {/* RAIL 1: UPI Options (QR and VPA handle) */}
                {activePaymentTab === 'upi_qr' && (
                  <div className="p-6 rounded-2xl bg-[#121216] border border-white/10 text-center space-y-4">
                    {/* Sub Mode Toggle */}
                    <div className="inline-flex p-1 rounded-lg bg-black/40 border border-white/10 text-xs font-mono mb-2">
                      <button
                        type="button"
                        onClick={() => setUpiSubMode('qr')}
                        className={`px-3 py-1 rounded-md transition-colors ${upiSubMode === 'qr' ? 'bg-white/10 text-white font-bold' : 'text-zinc-400'}`}
                      >
                        Dynamic QR
                      </button>
                      <button
                        type="button"
                        onClick={() => setUpiSubMode('id')}
                        className={`px-3 py-1 rounded-md transition-colors ${upiSubMode === 'id' ? 'bg-white/10 text-white font-bold' : 'text-zinc-400'}`}
                      >
                        Enter UPI ID
                      </button>
                    </div>

                    {upiSubMode === 'qr' ? (
                      <>
                        <div className="flex items-center justify-between text-xs text-zinc-400 pb-2 border-b border-white/10">
                          <span>Scan with any UPI Application</span>
                          <span className="text-emerald-400 font-mono flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" /> Active for 09:45
                          </span>
                        </div>

                        {/* QR Graphic Box */}
                        <div className="relative inline-block p-4 rounded-2xl bg-white text-black shadow-2xl mx-auto">
                          <QrCode className="w-40 h-40" />
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <span className="w-9 h-9 rounded-full bg-ted-red text-white font-black text-xs flex items-center justify-center border-2 border-white shadow">
                              TEDx
                            </span>
                          </div>
                        </div>

                        <div className="text-xs text-zinc-300 space-y-1">
                          <p className="font-semibold text-white">Scan with Google Pay, PhonePe, Paytm, or BHIM</p>
                          <p className="text-zinc-500 font-mono text-[11px]">UPI ID: pcutedx.delegate@hdfcbank</p>
                        </div>
                      </>
                    ) : (
                      <div className="space-y-4 text-left pt-2">
                        <div>
                          <label className="text-xs font-mono uppercase text-zinc-400 block mb-1">
                            Your Virtual Payment Address (VPA / UPI ID)
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. yourname@okhdfcbank"
                            value={vpaInput}
                            onChange={(e) => setVpaInput(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white font-mono text-sm placeholder-zinc-600 focus:outline-none focus:border-ted-red"
                          />
                        </div>
                        <p className="text-xs text-zinc-400 leading-relaxed">
                          A payment request will be dispatched to your UPI app. Approve it to confirm your pass.
                        </p>
                      </div>
                    )}

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={handleInitiatePayment}
                        disabled={isProcessing}
                        className="w-full py-3.5 rounded-xl bg-ted-red hover:bg-ted-crimson text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-ted-red/30 transition-all flex items-center justify-center gap-2"
                      >
                        {isProcessing ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            <span>Verifying UPI Receipt...</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Confirm & Pay ₹{finalTotal}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* RAIL 2: Credit / Debit Card Form */}
                {activePaymentTab === 'card' && (
                  <div className="p-6 rounded-2xl bg-[#121216] border border-white/10 space-y-4">
                    <div className="flex items-center justify-between text-xs text-zinc-400 pb-2 border-b border-white/10">
                      <span>Credit or Debit Card</span>
                      {getCardBrand(cardData.number) && (
                        <span className="text-xs font-mono font-bold text-ted-red uppercase">
                          {getCardBrand(cardData.number)} Detected
                        </span>
                      )}
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-mono uppercase text-zinc-400 block mb-1">
                          Card Number
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            maxLength={19}
                            placeholder="4532 8921 0048 4242"
                            value={cardData.number}
                            onChange={(e) => setCardData({ ...cardData, number: formatCardNumber(e.target.value) })}
                            className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white font-mono text-sm placeholder-zinc-600 focus:outline-none focus:border-ted-red pr-10"
                          />
                          <CreditCard className="w-4 h-4 text-zinc-500 absolute right-3 top-1/2 -translate-y-1/2" />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-mono uppercase text-zinc-400 block mb-1">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Advait Kulkarni"
                          value={cardData.name}
                          onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-ted-red"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-mono uppercase text-zinc-400 block mb-1">
                            Expiry (MM/YY)
                          </label>
                          <input
                            type="text"
                            maxLength={5}
                            placeholder="12/28"
                            value={cardData.expiry}
                            onChange={(e) => setCardData({ ...cardData, expiry: formatExpiry(e.target.value) })}
                            className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white font-mono text-sm placeholder-zinc-600 focus:outline-none focus:border-ted-red"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-mono uppercase text-zinc-400 block mb-1">
                            CVV / CVC
                          </label>
                          <input
                            type="password"
                            maxLength={4}
                            placeholder="•••"
                            value={cardData.cvv}
                            onChange={(e) => setCardData({ ...cardData, cvv: e.target.value.replace(/\D/g, '') })}
                            className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white font-mono text-sm placeholder-zinc-600 focus:outline-none focus:border-ted-red"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleInitiatePayment}
                      disabled={isProcessing}
                      className="w-full py-3.5 rounded-xl bg-ted-red hover:bg-ted-crimson text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-ted-red/30 transition-all flex items-center justify-center gap-2"
                    >
                      {isProcessing ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Routing to 3D-Secure Gateway...</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4" />
                          <span>Authorize Card & Pay ₹{finalTotal}</span>
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* RAIL 3: Net Banking */}
                {activePaymentTab === 'netbanking' && (
                  <div className="p-6 rounded-2xl bg-[#121216] border border-white/10 space-y-4">
                    <span className="text-xs text-zinc-400 block pb-2 border-b border-white/10">
                      Select Your Preferred Bank
                    </span>

                    <div className="grid grid-cols-2 gap-2.5">
                      {topBanks.map((bank) => (
                        <button
                          key={bank.code}
                          type="button"
                          onClick={() => setSelectedBank(bank.name)}
                          className={`p-3 rounded-xl border text-left text-xs transition-colors flex items-center justify-between ${
                            selectedBank === bank.name
                              ? 'bg-ted-red/10 border-ted-red text-white font-bold'
                              : 'bg-white/[0.02] border-white/10 text-zinc-400 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <span>{bank.name}</span>
                          {selectedBank === bank.name && <Check className="w-3.5 h-3.5 text-ted-red" />}
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={handleInitiatePayment}
                      disabled={isProcessing}
                      className="w-full py-3.5 rounded-xl bg-ted-red hover:bg-ted-crimson text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-ted-red/30 transition-all flex items-center justify-center gap-2"
                    >
                      {isProcessing ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Redirecting to {selectedBank}...</span>
                        </>
                      ) : (
                        <>
                          <span>Pay ₹{finalTotal} via {selectedBank}</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Bank 3D-Secure OTP Simulation Screen */}
        {step === 'otp' && (
          <div className="max-w-md mx-auto p-6 sm:p-8 rounded-3xl bg-[#111116] border border-white/15 text-center space-y-6 animate-fade-in">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
              <Shield className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block">
                Verified by Visa / Mastercard ID Check
              </span>
              <h3 className="text-xl font-bold text-white">
                Enter Bank Security OTP
              </h3>
              <p className="text-xs text-zinc-400">
                A 4-digit authentication code was sent to registered mobile <strong className="text-white">+91 ******4321</strong> for transaction amount <strong className="text-ted-red">₹{finalTotal}</strong>.
              </p>
            </div>

            <form onSubmit={handleVerifyOtpAndPay} className="space-y-4">
              <div>
                <input
                  type="text"
                  maxLength={6}
                  value={otpInput}
                  onChange={(e) => {
                    setOtpInput(e.target.value);
                    setOtpError(false);
                  }}
                  placeholder="• • • •"
                  className="w-48 mx-auto px-4 py-3 rounded-xl bg-black border border-white/20 text-center font-mono text-2xl tracking-[0.4em] text-white focus:outline-none focus:border-ted-red"
                />
                {otpError && (
                  <p className="text-xs text-rose-400 mt-1 flex items-center justify-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> Enter valid 4-digit code
                  </p>
                )}
              </div>

              {/* Frictionless Test Button */}
              <button
                type="button"
                onClick={() => setOtpInput('7492')}
                className="text-[11px] font-mono text-zinc-400 hover:text-ted-red underline block mx-auto"
              >
                Auto-fill Demo Sandbox Code (7492)
              </button>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 rounded-xl bg-ted-red hover:bg-ted-crimson text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-ted-red/30 transition-all flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Validating with Card Issuer...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Authorize Payment of ₹{finalTotal}</span>
                  </>
                )}
              </button>
            </form>

            <button
              type="button"
              onClick={() => setStep('payment')}
              className="text-xs text-zinc-400 hover:text-white"
            >
              Cancel Transaction
            </button>
          </div>
        )}

        {/* STEP 5: Official Confirmed Paid Delegate Pass & Invoice */}
        {step === 'confirmed' && paymentDetails && (
          <div className="text-center space-y-6 animate-fade-in print:p-0">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase mb-2">
                <span>● Payment Completed • Official Receipt</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Registration Confirmed
              </h3>
              <p className="text-zinc-400 text-sm mt-1">
                Official digital badge & invoice generated for <strong className="text-white">{formData.fullName}</strong>.
              </p>
            </div>

            {/* Official Delegate Pass Mockup */}
            <div className="max-w-lg mx-auto rounded-3xl bg-gradient-to-br from-[#1c1c22] via-[#141418] to-[#0c0c0e] border-2 border-ted-red p-6 sm:p-8 text-left shadow-2xl relative overflow-hidden">
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-ted-red/20 rounded-full blur-2xl pointer-events-none" />

              {/* Pass Header */}
              <div className="flex justify-between items-start border-b border-white/10 pb-4 mb-4">
                <div>
                  <div className="flex items-baseline tracking-tighter leading-none select-none">
                    <span className="text-white font-black text-2xl tracking-tighter">TED</span>
                    <span className="text-ted-red font-black text-2xl tracking-tighter">x</span>
                    <span className="font-light text-white text-lg tracking-tight ml-1.5 pl-2 border-l border-white/20">
                      PCU
                    </span>
                  </div>
                  <span className="block text-[10px] font-mono text-zinc-400 uppercase tracking-widest mt-1">
                    Official Delegate Admission Pass
                  </span>
                </div>

                <div className="text-right">
                  <span className="px-2.5 py-1 rounded bg-ted-red text-white text-[10px] font-mono font-bold uppercase block">
                    {selectedPass.name}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 font-semibold mt-1 block">
                    PAID (₹{paymentDetails.amount})
                  </span>
                </div>
              </div>

              {/* Pass Metadata */}
              <div className="grid grid-cols-2 gap-4 font-mono text-xs">
                <div>
                  <span className="text-zinc-500 uppercase text-[10px] block">Delegate</span>
                  <span className="text-white font-bold text-sm">{formData.fullName}</span>
                  <span className="text-zinc-400 text-[11px] block">{formData.organization}</span>
                </div>
                <div>
                  <span className="text-zinc-500 uppercase text-[10px] block">Pass ID</span>
                  <span className="text-ted-red font-bold">{ticketId}</span>
                  <span className="text-zinc-400 text-[11px] block">{ticketCount} {ticketCount > 1 ? 'Admissions' : 'Admission'}</span>
                </div>

                <div>
                  <span className="text-zinc-500 uppercase text-[10px] block">Date & Venue</span>
                  <span className="text-zinc-200">{UPCOMING_EVENT.date}</span>
                  <span className="text-zinc-400 text-[11px] block">Auditorium Hall, Pune</span>
                </div>
                <div>
                  <span className="text-zinc-500 uppercase text-[10px] block">Payment Ref / Txn</span>
                  <span className="text-zinc-200 text-[11px] block truncate">{paymentDetails.transactionId}</span>
                  <span className="text-zinc-500 text-[10px] block">Inv: {paymentDetails.invoiceNumber}</span>
                </div>
              </div>

              {/* Pass Footer Bar */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-1 rounded bg-white text-black">
                    <QrCode className="w-8 h-8" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-zinc-300 block font-bold">Fast-Track Gate Entry</span>
                    <span className="text-[9px] font-mono text-zinc-500">Scan at Main Concourse</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 font-semibold uppercase">
                  ● Verified Active
                </span>
              </div>
            </div>

            {/* Print & Return Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={handlePrint}
                className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save Pass (PDF)</span>
              </button>

              <button
                onClick={handleResetModal}
                className="px-6 py-3 rounded-full bg-ted-red hover:bg-ted-crimson text-white text-xs font-mono uppercase tracking-wider transition-colors font-bold"
              >
                Done / Return to Conference
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
