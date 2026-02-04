import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Card3D } from '@/components/three/Card3D';
import { use3DTilt } from '@/hooks/use3DTilt';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import emailjs from '@emailjs/browser';
import {
  Send,
  Mail,
  MapPin,
  Phone,
  Linkedin,
  Github,
  Twitter,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from 'lucide-react';

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  projectType: z.string().min(1, 'Please select a project type'),
  budget: z.string().min(1, 'Please select a budget range'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof formSchema>;

// 3D Form Input component
interface IconProps {
  className?: string;
}

function FormInput3D({
  label,
  error,
  children,
  icon: Icon,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  icon?: React.ComponentType<IconProps>;
}) {
  const { ref, style, handlers, isHovering } = use3DTilt({
    maxTilt: 5,
    scale: 1.01,
    glare: false,
  });

  return (
    <motion.div
      ref={ref}
      style={style}
      {...handlers}
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <label className="block text-sm font-medium text-white/70 mb-2">{label}</label>
      <div className="relative">
        {Icon ? (
          <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
        ) : null}
        <div
          className={`relative glass rounded-xl overflow-hidden transition-all duration-300 ${
            isHovering ? 'shadow-glow border-cyan/30' : ''
          } ${error ? 'border-red-500/50' : ''}`}
        >
          {children}
          {/* Focus glow effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-cyan/10 to-purple/10 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovering ? 1 : 0 }}
          />
        </div>
      </div>
      {error && (
        <motion.p
          className="text-red-400 text-xs mt-1 flex items-center gap-1"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AlertCircle className="w-3 h-3" />
          {error}
        </motion.p>
      )}
    </motion.div>
  );
}

// Success animation component
function SuccessAnimation() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-12"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="relative w-24 h-24 mb-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', damping: 10, delay: 0.2 }}
      >
        <div className="absolute inset-0 bg-cyan/20 rounded-full animate-ping" />
        <div className="relative w-full h-full bg-gradient-to-br from-cyan to-purple rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-12 h-12 text-white" />
        </div>
        {/* Particle burst */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 w-2 h-2 bg-cyan rounded-full"
            initial={{ x: 0, y: 0, opacity: 1 }}
            animate={{
              x: Math.cos((i * Math.PI) / 4) * 60,
              y: Math.sin((i * Math.PI) / 4) * 60,
              opacity: 0,
            }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        ))}
      </motion.div>
      <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
      <p className="text-white/60 text-center">
        Thank you for reaching out. I&apos;ll get back to you within 24 hours.
      </p>
    </motion.div>
  );
}

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      // Using EmailJS for form submission
      // Note: Replace with your actual EmailJS credentials
      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        {
          from_name: data.name,
          from_email: data.email,
          project_type: data.projectType,
          budget: data.budget,
          message: data.message,
        },
        'YOUR_PUBLIC_KEY'
      );

      setIsSuccess(true);
      reset();

      // Reset success state after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'utkarsh.singh@example.com',
      href: 'mailto:utkarsh.singh@example.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 98765 43210',
      href: 'tel:+919876543210',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'India',
      href: '#',
    },
  ];

  const socialLinks = [
    { icon: Linkedin, href: 'https://linkedin.com/in/utkarshsingh', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com/utkarshsingh', label: 'GitHub' },
    { icon: Twitter, href: 'https://twitter.com/utkarshsingh', label: 'Twitter' },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen py-20 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan/5 rounded-full blur-[200px]" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple/5 rounded-full blur-[200px]" />

      <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-block px-4 py-1 rounded-full glass text-cyan text-sm font-mono mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Get In Touch
          </motion.span>
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-white">Let&apos;s Work </span>
            <span className="gradient-text">Together</span>
          </motion.h2>
          <motion.p
            className="text-white/60 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Have a project in mind? Let&apos;s discuss how we can bring your ideas to life
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact info sidebar */}
          <motion.div
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card3D glowColor="cyan" intensity={8}>
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-white">Contact Information</h3>
                <div className="space-y-4">
                  {contactInfo.map((item, index) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                      whileHover={{ x: 5 }}
                      data-cursor-text="OPEN"
                    >
                      <div className="w-10 h-10 rounded-lg bg-cyan/10 flex items-center justify-center group-hover:bg-cyan/20 transition-colors">
                        <item.icon className="w-5 h-5 text-cyan" />
                      </div>
                      <div>
                        <p className="text-sm text-white/50">{item.label}</p>
                        <p className="text-white font-medium">{item.value}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </Card3D>

            {/* Social links */}
            <Card3D glowColor="purple" intensity={8}>
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">Follow Me</h3>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-xl glass flex items-center justify-center text-white/60 hover:text-cyan hover:border-cyan/50 transition-all"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                      whileHover={{ scale: 1.1, y: -5 }}
                      data-cursor-text="VISIT"
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </Card3D>

            {/* Availability status */}
            <Card3D glowColor="magenta" intensity={8}>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-4 h-4 bg-green-500 rounded-full" />
                  <div className="absolute inset-0 bg-green-500 rounded-full animate-ping" />
                </div>
                <div>
                  <p className="text-white font-medium">Available for new projects</p>
                  <p className="text-sm text-white/50">
                    Typically respond within 24 hours
                  </p>
                </div>
              </div>
            </Card3D>
          </motion.div>

          {/* Contact form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card3D glowColor="cyan" intensity={10} className="h-full">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <SuccessAnimation />
                ) : (
                  <motion.form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="grid sm:grid-cols-2 gap-6">
                      {/* Name */}
                      <FormInput3D label="Your Name" error={errors.name?.message} icon={Mail}>
                        <input
                          {...register('name')}
                          type="text"
                          placeholder="John Doe"
                          className="w-full px-4 py-3 bg-transparent text-white placeholder-white/30 focus:outline-none"
                        />
                      </FormInput3D>

                      {/* Email */}
                      <FormInput3D label="Email Address" error={errors.email?.message}>
                        <input
                          {...register('email')}
                          type="email"
                          placeholder="john@example.com"
                          className="w-full px-4 py-3 bg-transparent text-white placeholder-white/30 focus:outline-none"
                        />
                      </FormInput3D>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      {/* Project Type */}
                      <FormInput3D label="Project Type" error={errors.projectType?.message}>
                        <select
                          {...register('projectType')}
                          className="w-full px-4 py-3 bg-transparent text-white focus:outline-none appearance-none cursor-pointer"
                        >
                          <option value="" className="bg-gray-900">
                            Select project type
                          </option>
                          <option value="web-app" className="bg-gray-900">
                            Web Application
                          </option>
                          <option value="mobile-app" className="bg-gray-900">
                            Mobile Application
                          </option>
                          <option value="ecommerce" className="bg-gray-900">
                            E-Commerce Platform
                          </option>
                          <option value="landing-page" className="bg-gray-900">
                            Landing Page
                          </option>
                          <option value="other" className="bg-gray-900">
                            Other
                          </option>
                        </select>
                      </FormInput3D>

                      {/* Budget */}
                      <FormInput3D label="Budget Range" error={errors.budget?.message}>
                        <select
                          {...register('budget')}
                          className="w-full px-4 py-3 bg-transparent text-white focus:outline-none appearance-none cursor-pointer"
                        >
                          <option value="" className="bg-gray-900">
                            Select budget range
                          </option>
                          <option value="5k-10k" className="bg-gray-900">
                            $5,000 - $10,000
                          </option>
                          <option value="10k-25k" className="bg-gray-900">
                            $10,000 - $25,000
                          </option>
                          <option value="25k-50k" className="bg-gray-900">
                            $25,000 - $50,000
                          </option>
                          <option value="50k+" className="bg-gray-900">
                            $50,000+
                          </option>
                        </select>
                      </FormInput3D>
                    </div>

                    {/* Message */}
                    <FormInput3D label="Your Message" error={errors.message?.message}>
                      <textarea
                        {...register('message')}
                        rows={5}
                        placeholder="Tell me about your project..."
                        className="w-full px-4 py-3 bg-transparent text-white placeholder-white/30 focus:outline-none resize-none"
                      />
                    </FormInput3D>

                    {/* Submit button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 px-8 bg-gradient-to-r from-cyan to-cyan/80 text-black font-semibold rounded-xl flex items-center justify-center gap-2 hover:shadow-glow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      data-cursor-text="SEND"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </Card3D>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
