'use client';

import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, ChevronDown, Loader2 } from 'lucide-react';
import { z } from 'zod';
import { useLenis } from 'lenis/react';
import { LazyMotion, domAnimation, m, AnimatePresence } from 'motion/react';
import { LocationAutocomplete } from './LocationAutocomplete';

export const reviewFormSchema = z.object({
  company: z.string().min(1, "Company name is required").max(100, "Too long"),
  role: z.string().min(1, "Role is required").max(100, "Too long"),
  platform: z.string().min(1, "Please select where you found it"),
  listingUrl: z.string().max(500, "URL too long").optional(),
  
  paymentType: z.string().min(1, "Please select payment structure"),
  stipendAmount: z.string().max(100, "Too long").optional(),
  hasFee: z.string().min(1, "Please indicate if there was a fee"),
  feeAmount: z.string().max(100, "Too long").optional(),
  certificateProvided: z.string().min(1, "Please indicate if a certificate was provided"),
  
  duration: z.string().max(50, "Too long").optional(),
  mode: z.string().optional(),
  location: z.string().max(100, "Too long").optional(),
  period: z.string().max(100, "Too long").optional(),
  
  selectionProcess: z.string().optional(),
  workDescription: z.string().max(2000, "Too long").optional(),
  unexpected: z.string().max(2000, "Too long").optional(),
  keyTakeaway: z.string().max(500, "Too long").optional(),
  
  proofLink: z.string().max(500, "URL too long").optional(),
  contactEmail: z.string().max(200, "Too long").optional(),
  confirmation: z.boolean().refine(val => val === true, "You must confirm this is truthful"),
  honeypot: z.string().max(0, "Invalid").optional(),
});

type FormData = z.infer<typeof reviewFormSchema>;

const initialData: FormData = {
  company: '',
  role: '',
  platform: '',
  listingUrl: '',
  
  paymentType: '',
  stipendAmount: '',
  hasFee: '',
  feeAmount: '',
  certificateProvided: '',
  
  duration: '',
  mode: '',
  location: '',
  period: '',
  
  selectionProcess: '',
  workDescription: '',
  unexpected: '',
  keyTakeaway: '',
  
  proofLink: '',
  contactEmail: '',
  confirmation: false,
  honeypot: '',
};

export function ExperienceForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [direction, setDirection] = useState(1);

  const totalSteps = 5;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setData((prev) => ({ ...prev, [name]: val }));
    // Clear error on change
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    setSubmitError('');
  };

  const validateStep = () => {
    let fieldsToValidate: (keyof FormData)[] = [];
    if (step === 1) fieldsToValidate = ['company', 'role', 'platform', 'listingUrl'];
    if (step === 2) fieldsToValidate = ['duration', 'mode', 'location', 'period'];
    if (step === 3) fieldsToValidate = ['paymentType', 'stipendAmount', 'hasFee', 'feeAmount', 'certificateProvided'];
    if (step === 4) fieldsToValidate = ['selectionProcess', 'workDescription', 'unexpected', 'keyTakeaway'];
    if (step === 5) fieldsToValidate = ['proofLink', 'contactEmail', 'confirmation', 'honeypot'];

    let stepIsValid = true;
    const newErrors = { ...errors };

    fieldsToValidate.forEach(field => {
      try {
        const schema = reviewFormSchema.shape[field];
        if (schema) {
          // Conditional validation for stipendAmount
          if (field === 'stipendAmount' && data.paymentType !== 'stipend_based') return;
          // Conditional validation for feeAmount
          if (field === 'feeAmount' && data.hasFee !== 'yes') return;
          
          schema.parse(data[field]);
          newErrors[field] = '';
        }
      } catch (err) {
        if (err instanceof z.ZodError) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          newErrors[field] = (err as any).errors[0].message;
          stepIsValid = false;
        }
      }
    });

    // Special validation for email format if provided
    if (step === 5 && data.contactEmail) {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.contactEmail)) {
            newErrors.contactEmail = "Invalid email format";
            stepIsValid = false;
        }
    }

    setErrors(newErrors);
    return stepIsValid;
  };

  const lenis = useLenis();
  const formRef = React.useRef<HTMLDivElement>(null);

  const scrollToFormTop = () => {
    if (formRef.current) {
      if (lenis) {
        // Scroll slightly above the form for breathing room
        lenis.scrollTo(formRef.current, { offset: -100, immediate: false });
      } else {
        formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const nextStep = () => {
    if (validateStep()) {
      setDirection(1);
      setStep((s) => Math.min(s + 1, totalSteps));
      scrollToFormTop();
    }
  };
  
  const prevStep = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 1));
    scrollToFormTop();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;
    
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      const res = await fetch('/api/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      const result = await res.json();
      
      if (res.ok && result.success) {
        setIsSuccess(true);
      } else {
        setSubmitError(result.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Submission failed', error);
      setSubmitError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <LazyMotion features={domAnimation}>
        <div className="py-20 text-center">
          <m.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="w-20 h-20 bg-white/[0.04] border border-white/10 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <m.svg
              width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent"
            >
              <m.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                d="M20 6L9 17l-5-5"
              />
            </m.svg>
          </m.div>
          <m.h2 
            initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}
            className="text-[24px] md:text-[32px] font-heading font-bold uppercase tracking-tight text-foreground mb-4"
          >
            Thank you.
          </m.h2>
          <m.p 
            initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}
            className="text-[16px] text-foreground-muted mb-8 max-w-md mx-auto leading-relaxed"
          >
            Thanks. Your report will be reviewed before it appears on Transpario.
          </m.p>
          <m.button
            initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              setData(initialData);
              setStep(1);
              setIsSuccess(false);
            }}
            className="text-[13px] font-heading font-bold uppercase tracking-[0.1em] text-foreground hover:text-accent transition-colors cursor-pointer"
          >
            Submit Another
          </m.button>
        </div>
      </LazyMotion>
    );
  }

  const stepVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 30 : -30,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" as const }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 30 : -30,
      opacity: 0,
      transition: { duration: 0.2, ease: "easeIn" as const }
    })
  };

  return (
    <LazyMotion features={domAnimation}>
      <div ref={formRef} className="max-w-2xl mx-auto py-12 md:py-20">
        <div className="bg-black/50 backdrop-blur-md border border-white/[0.08] rounded-2xl p-6 md:p-10 relative overflow-hidden min-h-[500px] shadow-2xl">

      
      {/* Progress indicator */}
      <div className="flex items-center gap-2 mb-12">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div key={i} className="h-1 flex-1 bg-white/[0.06] rounded-full overflow-hidden relative">
            <m.div
              className="absolute inset-0 bg-accent rounded-full origin-left"
              initial={false}
              animate={{ scaleX: i + 1 <= step ? 1 : 0 }}
              transition={{ ease: "easeInOut", duration: 0.4 }}
            />
          </div>
        ))}
      </div>

      <form onSubmit={step === totalSteps ? handleSubmit : (e) => { e.preventDefault(); nextStep(); }}>
        
        {/* Honeypot */}
        <input type="text" name="honeypot" value={data.honeypot} onChange={handleChange} className="hidden" tabIndex={-1} autoComplete="off" />

        <div className="relative min-h-[350px]">
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            {step === 1 && (
              <m.div key="step1" custom={direction} variants={stepVariants} initial="enter" animate="center" exit="exit" className="space-y-10">
                <div>
                  <span className="block text-[11px] font-heading font-bold uppercase tracking-[0.14em] text-foreground-subtle mb-3">
                    01 / The Basics
                  </span>
                  <h2 className="text-[24px] md:text-[32px] font-heading font-bold uppercase tracking-tight text-foreground mb-2">
                    Where did you intern?
                  </h2>
                </div>

                <div className="space-y-8">
                  <InputField label="Company / Organization Name *" name="company" value={data.company} onChange={handleChange} error={errors.company} placeholder="e.g. TechCorp Global" autoFocus />
                  <InputField label="Internship Title / Role *" name="role" value={data.role} onChange={handleChange} error={errors.role} placeholder="e.g. Software Engineering Intern" />
                  <SelectField label="Where did you find it? *" name="platform" value={data.platform} onChange={handleChange} error={errors.platform} options={[
                    { value: '', label: 'Select platform...' },
                    { value: 'linkedin', label: 'LinkedIn' },
                    { value: 'internshala', label: 'Internshala' },
                    { value: 'company_website', label: 'Company Website' },
                    { value: 'social', label: 'Instagram / Telegram' },
                    { value: 'other', label: 'Other' },
                  ]} />
                  <InputField label="Link to the listing (Optional)" name="listingUrl" value={data.listingUrl} onChange={handleChange} error={errors.listingUrl} placeholder="https://..." />
                </div>
              </m.div>
            )}

            {step === 2 && (
              <m.div key="step2" custom={direction} variants={stepVariants} initial="enter" animate="center" exit="exit" className="space-y-10">
                <div>
                  <span className="block text-[11px] font-heading font-bold uppercase tracking-[0.14em] text-foreground-subtle mb-3">
                    02 / Logistics
                  </span>
                  <h2 className="text-[24px] md:text-[32px] font-heading font-bold uppercase tracking-tight text-foreground mb-2">
                    When & Where?
                  </h2>
                </div>

                <div className="space-y-8">
                  <InputField label="Duration" name="duration" value={data.duration} onChange={handleChange} error={errors.duration} placeholder="e.g. 3 Months, 6 Weeks" autoFocus />
                  <SelectField label="Mode" name="mode" value={data.mode} onChange={handleChange} error={errors.mode} options={[
                    { value: '', label: 'Select mode...' },
                    { value: 'remote', label: 'Remote' },
                    { value: 'onsite', label: 'On-site' },
                    { value: 'hybrid', label: 'Hybrid' },
                  ]} />
                  <LocationAutocomplete label="Location (City, State)" name="location" value={data.location} onChange={handleChange} error={errors.location} placeholder="e.g. Bangalore, KA" />
                  <InputField label="When did you intern?" name="period" value={data.period} onChange={handleChange} error={errors.period} placeholder="e.g. Summer 2026, May-July" />
                </div>
              </m.div>
            )}

            {step === 3 && (
              <m.div key="step3" custom={direction} variants={stepVariants} initial="enter" animate="center" exit="exit" className="space-y-10">
                <div>
                  <span className="block text-[11px] font-heading font-bold uppercase tracking-[0.14em] text-foreground-subtle mb-3">
                    03 / Compensation & Fees
                  </span>
                  <h2 className="text-[24px] md:text-[32px] font-heading font-bold uppercase tracking-tight text-foreground mb-2">
                    What did you receive (or pay)?
                  </h2>
                </div>

                <div className="space-y-8">
                  <SelectField label="Payment Structure *" name="paymentType" value={data.paymentType} onChange={handleChange} error={errors.paymentType} options={[
                    { value: '', label: 'Select payment type...' },
                    { value: 'paid', label: 'Paid Salary / Fixed Wage' },
                    { value: 'unpaid', label: 'Unpaid' },
                    { value: 'stipend_based', label: 'Stipend / Performance-based' },
                  ]} autoFocus />
                  
                  <AnimatePresence>
                    {data.paymentType === 'stipend_based' && (
                      <m.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="pt-2 pb-1">
                          <InputField label="Stipend Amount (per month)" name="stipendAmount" value={data.stipendAmount} onChange={handleChange} error={errors.stipendAmount} placeholder="e.g. ₹5000 / month, or up to ₹10k based on sales" />
                        </div>
                      </m.div>
                    )}
                  </AnimatePresence>

                  <SelectField label="Was there any fee? (registration/training/certificate/other) *" name="hasFee" value={data.hasFee} onChange={handleChange} error={errors.hasFee} options={[
                    { value: '', label: 'Select...' },
                    { value: 'no', label: 'No, completely free' },
                    { value: 'yes', label: 'Yes, there was a fee' },
                  ]} />

                  <AnimatePresence>
                    {data.hasFee === 'yes' && (
                      <m.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="pt-2 pb-1">
                          <InputField label="Fee Amount & Reason" name="feeAmount" value={data.feeAmount} onChange={handleChange} error={errors.feeAmount} placeholder="e.g. ₹1000 for training, ₹500 for certificate" />
                        </div>
                      </m.div>
                    )}
                  </AnimatePresence>

                  <SelectField label="Was a certificate provided? *" name="certificateProvided" value={data.certificateProvided} onChange={handleChange} error={errors.certificateProvided} options={[
                    { value: '', label: 'Select...' },
                    { value: 'yes', label: 'Yes' },
                    { value: 'no', label: 'No' },
                  ]} />
                </div>
              </m.div>
            )}

            {step === 4 && (
              <m.div key="step4" custom={direction} variants={stepVariants} initial="enter" animate="center" exit="exit" className="space-y-10">
                <div>
                  <span className="block text-[11px] font-heading font-bold uppercase tracking-[0.14em] text-foreground-subtle mb-3">
                    04 / The Experience
                  </span>
                  <h2 className="text-[24px] md:text-[32px] font-heading font-bold uppercase tracking-tight text-foreground mb-2">
                    What actually happened?
                  </h2>
                </div>

                <div className="space-y-8">
                  <SelectField label="Selection Process *" name="selectionProcess" value={data.selectionProcess} onChange={handleChange} error={errors.selectionProcess} options={[
                    { value: '', label: 'Select process...' },
                    { value: 'interview', label: 'Interview' },
                    { value: 'test', label: 'Test / Assignment' },
                    { value: 'none', label: 'Direct Entry / None' },
                    { value: 'other', label: 'Other' },
                  ]} autoFocus />

                  <TextAreaField label="What work did you actually do?" name="workDescription" value={data.workDescription} onChange={handleChange} error={errors.workDescription} placeholder="Describe your daily tasks and main projects..." />
                  <TextAreaField label="What was unexpected or challenging?" name="unexpected" value={data.unexpected} onChange={handleChange} error={errors.unexpected} placeholder="Things that surprised you, or were harder than expected..." />
                  <TextAreaField label="Main takeaway (short)" name="keyTakeaway" value={data.keyTakeaway} onChange={handleChange} error={errors.keyTakeaway} placeholder="Sum up your experience in a sentence or two..." />
                </div>
              </m.div>
            )}

            {step === 5 && (
              <m.div key="step5" custom={direction} variants={stepVariants} initial="enter" animate="center" exit="exit" className="space-y-10">
                <div>
                  <span className="block text-[11px] font-heading font-bold uppercase tracking-[0.14em] text-foreground-subtle mb-3">
                    05 / Verification
                  </span>
                  <h2 className="text-[24px] md:text-[32px] font-heading font-bold uppercase tracking-tight text-foreground mb-2">
                    Final details.
                  </h2>
                </div>

                <div className="space-y-8">
                  <InputField label="Proof link (Optional)" name="proofLink" value={data.proofLink} onChange={handleChange} error={errors.proofLink} placeholder="Link to offer letter screenshot, completion cert, etc." autoFocus />
                  <InputField label="Contact Email (Optional)" name="contactEmail" type="email" value={data.contactEmail} onChange={handleChange} error={errors.contactEmail} placeholder="Never published. We may email to verify details." />
                  
                  <div className="pt-4 border-t border-white/[0.06]">
                    <label className="flex items-start gap-4 cursor-pointer group">
                      <div className="pt-1">
                        <input type="checkbox" name="confirmation" checked={data.confirmation} onChange={handleChange} className="w-5 h-5 rounded border-white/[0.2] bg-transparent text-accent focus:ring-accent focus:ring-offset-background" />
                      </div>
                      <div>
                        <span className={`block text-[15px] ${data.confirmation ? 'text-foreground' : 'text-foreground-muted group-hover:text-foreground'} transition-colors`}>
                          I confirm this report is truthful and based on my own experience. *
                        </span>
                        <AnimatePresence>
                          {errors.confirmation && (
                            <m.span initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="block text-[13px] text-red-400 mt-1">
                              {errors.confirmation}
                            </m.span>
                          )}
                        </AnimatePresence>
                      </div>
                    </label>
                  </div>
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </div>

        {/* Error State */}
        <AnimatePresence>
          {submitError && (
            <m.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, height: 0 }} className="mt-8 p-4 border border-red-500/20 bg-red-500/5 rounded-[var(--radius)] text-red-400 text-[14px]">
              {submitError}
            </m.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-16 flex items-center justify-between pt-8 border-t border-white/[0.06]">
          {step > 1 ? (
            <m.button
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={prevStep}
              className="inline-flex items-center gap-2 text-[12px] font-heading font-bold uppercase tracking-[0.1em] text-foreground-subtle hover:text-foreground transition-colors group cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back</span>
            </m.button>
          ) : (
            <div />
          )}

          {step < totalSteps ? (
            <m.button
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={nextStep}
              className="inline-flex items-center gap-2 h-[44px] px-6 bg-white !text-black font-heading font-bold text-[13px] uppercase tracking-[0.1em] rounded-[var(--radius)] hover:bg-white/90 transition-colors group cursor-pointer"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </m.button>
          ) : (
            <m.button
              whileTap={!isSubmitting ? { scale: 0.97 } : undefined}
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 h-[44px] px-6 bg-accent text-white font-heading font-bold text-[13px] uppercase tracking-[0.1em] rounded-[var(--radius)] hover:bg-accent/90 transition-colors disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <span>Submit My Notes</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </m.button>
          )}
        </div>
      </form>
        </div>
      </div>
    </LazyMotion>
  );
}

// Reusable Components
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function InputField({ label, name, value, onChange, placeholder, autoFocus, type = 'text', error }: any) {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <m.div animate={error ? "shake" : ""} variants={{ shake: { x: [0, -5, 5, -5, 5, 0], transition: { duration: 0.4 } } }}>
      <label className={`block text-[14px] font-heading font-semibold mb-3 ${error ? 'text-red-400' : 'text-foreground'}`}>{label}</label>
      <div className="relative">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoFocus={autoFocus}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full bg-transparent pb-3 text-[16px] text-foreground placeholder:text-foreground-muted focus:outline-none font-body border-b border-white/[0.1]"
        />
        <m.div 
          className={`absolute bottom-0 left-0 h-[2px] ${error ? 'bg-red-500' : 'bg-accent'}`}
          initial={false} animate={{ scaleX: isFocused ? 1 : 0 }} transition={{ duration: 0.2 }} style={{ originX: 0 }}
        />
      </div>
      <AnimatePresence>
        {error && (
          <m.span initial={{ opacity: 0, y: -10, height: 0 }} animate={{ opacity: 1, y: 0, height: 'auto' }} exit={{ opacity: 0, y: -10, height: 0 }} className="block text-[13px] text-red-400 mt-2">
            {error}
          </m.span>
        )}
      </AnimatePresence>
    </m.div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function TextAreaField({ label, name, value, onChange, placeholder, autoFocus, error }: any) {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <m.div animate={error ? "shake" : ""} variants={{ shake: { x: [0, -5, 5, -5, 5, 0], transition: { duration: 0.4 } } }}>
      <label className={`block text-[14px] font-heading font-semibold mb-3 ${error ? 'text-red-400' : 'text-foreground'}`}>{label}</label>
      <div className="relative">
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoFocus={autoFocus}
          rows={4}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full bg-transparent pb-3 text-[16px] text-foreground placeholder:text-foreground-muted focus:outline-none font-body resize-none border-b border-white/[0.1]"
        />
        <m.div 
          className={`absolute bottom-[3px] left-0 h-[2px] ${error ? 'bg-red-500' : 'bg-accent'}`}
          initial={false} animate={{ scaleX: isFocused ? 1 : 0 }} transition={{ duration: 0.2 }} style={{ originX: 0 }}
        />
      </div>
      <AnimatePresence>
        {error && (
          <m.span initial={{ opacity: 0, y: -10, height: 0 }} animate={{ opacity: 1, y: 0, height: 'auto' }} exit={{ opacity: 0, y: -10, height: 0 }} className="block text-[13px] text-red-400 mt-2">
            {error}
          </m.span>
        )}
      </AnimatePresence>
    </m.div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function SelectField({ label, name, value, onChange, options, autoFocus, error }: any) {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <m.div animate={error ? "shake" : ""} variants={{ shake: { x: [0, -5, 5, -5, 5, 0], transition: { duration: 0.4 } } }}>
      <label className={`block text-[14px] font-heading font-semibold mb-3 ${error ? 'text-red-400' : 'text-foreground'}`}>{label}</label>
      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          autoFocus={autoFocus}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full bg-transparent pb-3 text-[16px] focus:outline-none font-body appearance-none cursor-pointer border-b border-white/[0.1] ${value === '' ? 'text-foreground-muted' : 'text-foreground'}`}
        >
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {options.map((opt: any) => (
            <option key={opt.value} value={opt.value} className="bg-surface text-foreground">
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none mb-3">
          <ChevronDown className="w-5 h-5 text-foreground-subtle" />
        </div>
        <m.div 
          className={`absolute bottom-0 left-0 h-[2px] ${error ? 'bg-red-500' : 'bg-accent'}`}
          initial={false} animate={{ scaleX: isFocused ? 1 : 0 }} transition={{ duration: 0.2 }} style={{ originX: 0 }}
        />
      </div>
      <AnimatePresence>
        {error && (
          <m.span initial={{ opacity: 0, y: -10, height: 0 }} animate={{ opacity: 1, y: 0, height: 'auto' }} exit={{ opacity: 0, y: -10, height: 0 }} className="block text-[13px] text-red-400 mt-2">
            {error}
          </m.span>
        )}
      </AnimatePresence>
    </m.div>
  );
}
