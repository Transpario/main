'use client';

import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { z } from 'zod';

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

  const nextStep = () => {
    if (validateStep()) {
      setStep((s) => Math.min(s + 1, totalSteps));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const prevStep = () => {
    setStep((s) => Math.max(s - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      <div className="py-20 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-16 h-16 bg-white/[0.04] border border-white/10 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 className="w-8 h-8 text-accent" />
        </div>
        <h2 className="text-[24px] md:text-[32px] font-heading font-bold uppercase tracking-tight text-foreground mb-4">
          Thank you.
        </h2>
        <p className="text-[16px] text-foreground-muted mb-8 max-w-md mx-auto leading-relaxed">
          Thanks. Your report will be reviewed before it appears on Transpario.
        </p>
        <button
          onClick={() => {
            setData(initialData);
            setStep(1);
            setIsSuccess(false);
          }}
          className="text-[13px] font-heading font-bold uppercase tracking-[0.1em] text-foreground hover:text-accent transition-colors cursor-pointer"
        >
          Submit Another
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-12 md:py-20">
      
      {/* Progress indicator */}
      <div className="flex items-center gap-2 mb-16">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div 
            key={i} 
            className={`h-1 flex-1 transition-colors duration-300 ${i + 1 <= step ? 'bg-accent' : 'bg-white/[0.06]'}`}
          />
        ))}
      </div>

      <form onSubmit={step === totalSteps ? handleSubmit : (e) => { e.preventDefault(); nextStep(); }}>
        
        {/* Honeypot */}
        <input type="text" name="honeypot" value={data.honeypot} onChange={handleChange} className="hidden" tabIndex={-1} autoComplete="off" />

        {/* STEP 1 */}
        <div className={`space-y-10 transition-opacity duration-300 ${step === 1 ? 'block opacity-100' : 'hidden opacity-0 h-0 overflow-hidden'}`}>
          <div>
            <span className="block text-[11px] font-heading font-bold uppercase tracking-[0.14em] text-foreground-subtle mb-3">
              01 / The Basics
            </span>
            <h2 className="text-[24px] md:text-[32px] font-heading font-bold uppercase tracking-tight text-foreground mb-2">
              Where did you intern?
            </h2>
          </div>

          <div className="space-y-8">
            <InputField label="Company / Organization Name *" name="company" value={data.company} onChange={handleChange} error={errors.company} placeholder="e.g. TechCorp Global" autoFocus={step === 1} />
            <InputField label="Internship Title / Role *" name="role" value={data.role} onChange={handleChange} error={errors.role} placeholder="e.g. Software Engineering Intern" />
            <SelectField label="Where did you find it? *" name="platform" value={data.platform} onChange={handleChange} error={errors.platform} options={[
              { value: '', label: 'Select platform...' },
              { value: 'linkedin', label: 'LinkedIn' },
              { value: 'internshala', label: 'Internshala' },
              { value: 'company_website', label: 'Company Website' },
              { value: 'social', label: 'Instagram / WhatsApp / Telegram' },
              { value: 'other', label: 'Other' },
            ]} />
            <InputField label="Link to the listing (Optional)" name="listingUrl" value={data.listingUrl} onChange={handleChange} error={errors.listingUrl} placeholder="https://..." />
          </div>
        </div>

        {/* STEP 2 */}
        <div className={`space-y-10 transition-opacity duration-300 ${step === 2 ? 'block opacity-100' : 'hidden opacity-0 h-0 overflow-hidden'}`}>
          <div>
            <span className="block text-[11px] font-heading font-bold uppercase tracking-[0.14em] text-foreground-subtle mb-3">
              02 / Logistics
            </span>
            <h2 className="text-[24px] md:text-[32px] font-heading font-bold uppercase tracking-tight text-foreground mb-2">
              When & Where?
            </h2>
          </div>

          <div className="space-y-8">
            <InputField label="Duration" name="duration" value={data.duration} onChange={handleChange} error={errors.duration} placeholder="e.g. 3 Months, 6 Weeks" autoFocus={step === 2} />
            <SelectField label="Mode" name="mode" value={data.mode} onChange={handleChange} error={errors.mode} options={[
              { value: '', label: 'Select mode...' },
              { value: 'remote', label: 'Remote' },
              { value: 'onsite', label: 'On-site' },
              { value: 'hybrid', label: 'Hybrid' },
            ]} />
            <InputField label="Location (City, State)" name="location" value={data.location} onChange={handleChange} error={errors.location} placeholder="e.g. Bangalore, KA" />
            <InputField label="When did you intern?" name="period" value={data.period} onChange={handleChange} error={errors.period} placeholder="e.g. Summer 2026, May-July" />
          </div>
        </div>

        {/* STEP 3 */}
        <div className={`space-y-10 transition-opacity duration-300 ${step === 3 ? 'block opacity-100' : 'hidden opacity-0 h-0 overflow-hidden'}`}>
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
            ]} autoFocus={step === 3} />
            
            {data.paymentType === 'stipend_based' && (
              <InputField label="Stipend Amount (per month)" name="stipendAmount" value={data.stipendAmount} onChange={handleChange} error={errors.stipendAmount} placeholder="e.g. ₹5000 / month, or up to ₹10k based on sales" />
            )}

            <SelectField label="Was there any fee? (registration/training/certificate/other) *" name="hasFee" value={data.hasFee} onChange={handleChange} error={errors.hasFee} options={[
              { value: '', label: 'Select...' },
              { value: 'no', label: 'No, completely free' },
              { value: 'yes', label: 'Yes, there was a fee' },
            ]} />

            {data.hasFee === 'yes' && (
              <InputField label="Fee Amount & Reason" name="feeAmount" value={data.feeAmount} onChange={handleChange} error={errors.feeAmount} placeholder="e.g. ₹1000 for training, ₹500 for certificate" />
            )}

            <SelectField label="Was a certificate provided? *" name="certificateProvided" value={data.certificateProvided} onChange={handleChange} error={errors.certificateProvided} options={[
              { value: '', label: 'Select...' },
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
            ]} />
          </div>
        </div>

        {/* STEP 4 */}
        <div className={`space-y-10 transition-opacity duration-300 ${step === 4 ? 'block opacity-100' : 'hidden opacity-0 h-0 overflow-hidden'}`}>
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
            ]} autoFocus={step === 4} />

            <TextAreaField label="What work did you actually do?" name="workDescription" value={data.workDescription} onChange={handleChange} error={errors.workDescription} placeholder="Describe your daily tasks and main projects..." />
            <TextAreaField label="What was unexpected or challenging?" name="unexpected" value={data.unexpected} onChange={handleChange} error={errors.unexpected} placeholder="Things that surprised you, or were harder than expected..." />
            <TextAreaField label="Main takeaway (short)" name="keyTakeaway" value={data.keyTakeaway} onChange={handleChange} error={errors.keyTakeaway} placeholder="Sum up your experience in a sentence or two..." />
          </div>
        </div>

        {/* STEP 5 */}
        <div className={`space-y-10 transition-opacity duration-300 ${step === 5 ? 'block opacity-100' : 'hidden opacity-0 h-0 overflow-hidden'}`}>
          <div>
            <span className="block text-[11px] font-heading font-bold uppercase tracking-[0.14em] text-foreground-subtle mb-3">
              05 / Verification
            </span>
            <h2 className="text-[24px] md:text-[32px] font-heading font-bold uppercase tracking-tight text-foreground mb-2">
              Final details.
            </h2>
          </div>

          <div className="space-y-8">
            <InputField label="Proof link (Optional)" name="proofLink" value={data.proofLink} onChange={handleChange} error={errors.proofLink} placeholder="Link to offer letter screenshot, completion cert, etc." autoFocus={step === 5} />
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
                  {errors.confirmation && <span className="block text-[13px] text-red-500 mt-1">{errors.confirmation}</span>}
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Error State */}
        {submitError && (
          <div className="mt-8 p-4 border border-red-500/20 bg-red-500/5 rounded-[var(--radius)] text-red-400 text-[14px]">
            {submitError}
          </div>
        )}

        {/* Navigation */}
        <div className="mt-16 flex items-center justify-between pt-8 border-t border-white/[0.06]">
          {step > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              className="inline-flex items-center gap-2 text-[12px] font-heading font-bold uppercase tracking-[0.1em] text-foreground-subtle hover:text-foreground transition-colors group cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < totalSteps ? (
            <button
              type="button"
              onClick={nextStep}
              className="inline-flex items-center gap-2 h-[44px] px-6 bg-white !text-black font-heading font-bold text-[13px] uppercase tracking-[0.1em] rounded-[var(--radius)] hover:bg-white/90 transition-colors group cursor-pointer"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 h-[44px] px-6 bg-accent text-white font-heading font-bold text-[13px] uppercase tracking-[0.1em] rounded-[var(--radius)] hover:bg-accent/90 transition-colors disabled:opacity-50 cursor-pointer"
            >
              <span>{isSubmitting ? 'Submitting...' : 'Submit Notes'}</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

// Reusable Components
function InputField({ label, name, value, onChange, placeholder, autoFocus, type = 'text', error }: any) {
  return (
    <div>
      <label className="block text-[14px] font-heading font-semibold text-foreground mb-3">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className={`w-full bg-transparent border-b ${error ? 'border-red-500' : 'border-white/[0.1] focus:border-accent'} pb-3 text-[16px] text-foreground placeholder:text-foreground-subtle focus:outline-none transition-colors font-body`}
      />
      {error && <span className="block text-[13px] text-red-500 mt-2">{error}</span>}
    </div>
  );
}

function TextAreaField({ label, name, value, onChange, placeholder, autoFocus, error }: any) {
  return (
    <div>
      <label className="block text-[14px] font-heading font-semibold text-foreground mb-3">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoFocus={autoFocus}
        rows={4}
        className={`w-full bg-transparent border-b ${error ? 'border-red-500' : 'border-white/[0.1] focus:border-accent'} pb-3 text-[16px] text-foreground placeholder:text-foreground-subtle focus:outline-none transition-colors font-body resize-none`}
      />
      {error && <span className="block text-[13px] text-red-500 mt-2">{error}</span>}
    </div>
  );
}

function SelectField({ label, name, value, onChange, options, autoFocus, error }: any) {
  return (
    <div>
      <label className="block text-[14px] font-heading font-semibold text-foreground mb-3">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        autoFocus={autoFocus}
        className={`w-full bg-transparent border-b ${error ? 'border-red-500' : 'border-white/[0.1] focus:border-accent'} pb-3 text-[16px] text-foreground focus:outline-none transition-colors font-body appearance-none cursor-pointer`}
      >
        {options.map((opt: any) => (
          <option key={opt.value} value={opt.value} className="bg-surface text-foreground">
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className="block text-[13px] text-red-500 mt-2">{error}</span>}
    </div>
  );
}
