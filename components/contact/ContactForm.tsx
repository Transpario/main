'use client';

import React, { useState } from 'react';
import Button from '../ui/Button';
import { AlertCircle, CheckCircle2, Send, Loader2 } from 'lucide-react';
import { CONTACT_CATEGORIES } from '@/lib/constants';

interface FormState {
  name: string;
  email: string;
  category: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  category?: string;
  message?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    category: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<keyof FormState, boolean>>({
    name: false,
    email: false,
    category: false,
    message: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const validateField = (field: keyof FormState, value: string): string | undefined => {
    switch (field) {
      case 'name':
        if (!value.trim()) return 'Name is required.';
        if (value.trim().length < 2) return 'Name must be at least 2 characters.';
        return undefined;
      case 'email':
        if (!value.trim()) return 'Email is required.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return 'Please enter a valid email address.';
        return undefined;
      case 'category':
        if (!value) return 'Please select a contact category.';
        return undefined;
      case 'message':
        if (!value.trim()) return 'Message is required.';
        if (value.trim().length < 10) return 'Message must be at least 10 characters.';
        return undefined;
      default:
        return undefined;
    }
  };

  const handleBlur = (field: keyof FormState) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const err = validateField(field, formData[field]);
    setErrors((prev) => ({ ...prev, [field]: err }));
  };

  const handleChange = (field: keyof FormState, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const err = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: err }));
    }
  };

  const validateAll = (): boolean => {
    const newErrors: FormErrors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      category: validateField('category', formData.category),
      message: validateField('message', formData.message),
    };

    setErrors(newErrors);
    setTouched({ name: true, email: true, category: true, message: true });

    return !Object.values(newErrors).some((err) => err !== undefined);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validateAll()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit form.');
      }

      setIsSubmitted(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An error occurred while submitting your message.';
      setServerError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', category: '', message: '' });
    setErrors({});
    setTouched({ name: false, email: false, category: false, message: false });
    setIsSubmitted(false);
    setServerError(null);
  };

  if (isSubmitted) {
    return (
      <div className="bg-surface border border-border p-8 sm:p-10 rounded-[var(--radius)] text-center my-4 animate-in fade-in duration-200">
        <div className="w-14 h-14 rounded-full bg-positive/10 border border-positive/30 flex items-center justify-center mx-auto mb-5 text-positive">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold font-heading uppercase text-foreground mb-3">
          MESSAGE SENT SUCCESSFULLY
        </h3>
        <p className="text-body text-foreground-muted mb-6 max-w-md mx-auto leading-relaxed">
          Thank you for reaching out to Transpario. We have received your inquiry under &quot;{formData.category}&quot; and will review it shortly.
        </p>
        <Button variant="secondary" onClick={handleReset} className="text-xs">
          SEND ANOTHER MESSAGE
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="bg-surface border border-border p-6 sm:p-8 rounded-[var(--radius)] space-y-6">
      {serverError && (
        <div className="p-4 rounded-[var(--radius)] bg-caution/10 border border-caution/30 text-caution text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <span>{serverError}</span>
        </div>
      )}

      {/* Full Name */}
      <div>
        <label htmlFor="contact-name" className="text-xs font-bold uppercase tracking-wider font-heading text-foreground mb-2 block">
          Full Name <span className="text-accent">*</span>
        </label>
        <input
          id="contact-name"
          type="text"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          onBlur={() => handleBlur('name')}
          placeholder="e.g. Alex Johnson"
          className={`block w-full h-11 px-4 text-sm bg-surface-elevated border text-foreground rounded-[var(--radius)] placeholder-foreground-subtle focus:outline-none transition-all ${
            errors.name && touched.name
              ? 'border-caution focus:border-caution focus:ring-1 focus:ring-caution'
              : 'border-border focus:border-accent focus:ring-1 focus:ring-accent focus-visible:ring-2 focus-visible:ring-accent'
          }`}
        />
        {errors.name && touched.name && (
          <p className="text-xs text-caution flex items-center gap-1.5 mt-1.5 font-medium">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{errors.name}</span>
          </p>
        )}
      </div>

      {/* Email Address */}
      <div>
        <label htmlFor="contact-email" className="text-xs font-bold uppercase tracking-wider font-heading text-foreground mb-2 block">
          Email Address <span className="text-accent">*</span>
        </label>
        <input
          id="contact-email"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          onBlur={() => handleBlur('email')}
          placeholder="e.g. alex@university.edu"
          className={`block w-full h-11 px-4 text-sm bg-surface-elevated border text-foreground rounded-[var(--radius)] placeholder-foreground-subtle focus:outline-none transition-all ${
            errors.email && touched.email
              ? 'border-caution focus:border-caution focus:ring-1 focus:ring-caution'
              : 'border-border focus:border-accent focus:ring-1 focus:ring-accent focus-visible:ring-2 focus-visible:ring-accent'
          }`}
        />
        {errors.email && touched.email && (
          <p className="text-xs text-caution flex items-center gap-1.5 mt-1.5 font-medium">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{errors.email}</span>
          </p>
        )}
      </div>

      {/* Category Dropdown */}
      <div>
        <label htmlFor="contact-category" className="text-xs font-bold uppercase tracking-wider font-heading text-foreground mb-2 block">
          Inquiry Category <span className="text-accent">*</span>
        </label>
        <select
          id="contact-category"
          value={formData.category}
          onChange={(e) => handleChange('category', e.target.value)}
          onBlur={() => handleBlur('category')}
          className={`block w-full h-11 px-4 text-sm bg-surface-elevated border text-foreground rounded-[var(--radius)] focus:outline-none cursor-pointer transition-all ${
            errors.category && touched.category
              ? 'border-caution focus:border-caution focus:ring-1 focus:ring-caution'
              : 'border-border focus:border-accent focus:ring-1 focus:ring-accent focus-visible:ring-2 focus-visible:ring-accent'
          }`}
        >
          <option value="" disabled className="bg-surface text-foreground-subtle">
            Select a category...
          </option>
          {CONTACT_CATEGORIES.map((cat) => (
            <option key={cat} value={cat} className="bg-surface text-foreground">
              {cat}
            </option>
          ))}
        </select>
        {errors.category && touched.category && (
          <p className="text-xs text-caution flex items-center gap-1.5 mt-1.5 font-medium">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{errors.category}</span>
          </p>
        )}
      </div>

      {/* Message Textarea */}
      <div>
        <label htmlFor="contact-message" className="text-xs font-bold uppercase tracking-wider font-heading text-foreground mb-2 block">
          Your Message <span className="text-accent">*</span>
        </label>
        <textarea
          id="contact-message"
          rows={6}
          value={formData.message}
          onChange={(e) => handleChange('message', e.target.value)}
          onBlur={() => handleBlur('message')}
          placeholder="How can we help you? Provide as much detail as possible..."
          className={`block w-full p-4 text-sm bg-surface-elevated border text-foreground rounded-[var(--radius)] placeholder-foreground-subtle focus:outline-none resize-y min-h-[140px] transition-all ${
            errors.message && touched.message
              ? 'border-caution focus:border-caution focus:ring-1 focus:ring-caution'
              : 'border-border focus:border-accent focus:ring-1 focus:ring-accent focus-visible:ring-2 focus-visible:ring-accent'
          }`}
        />
        {errors.message && touched.message && (
          <p className="text-xs text-caution flex items-center gap-1.5 mt-1.5 font-medium">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{errors.message}</span>
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>SENDING...</span>
            </>
          ) : (
            <>
              <span>SUBMIT MESSAGE</span>
              <Send className="w-4 h-4" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
