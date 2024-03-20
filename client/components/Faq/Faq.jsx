import { AnimatePresence, motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";
import React, { useState } from "react";

const FAQ = () => {
  const [selected, setSelected] = useState(TABS[0]);

  return (
    <section className="overflow-hidden bg-white px-4 py-12 text-slate-800">
      <Heading />
      <Tabs selected={selected} setSelected={setSelected} />
      <Questions selected={selected} />
    </section>
  );
};

const Heading = () => {
  return (
    <>
      <div className="relative z-10 flex flex-col items-center justify-center">
        <span className="mb-8 bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text font-medium text-transparent">
          Let's answer some questions
        </span>
        <span className="mb-8 text-5xl font-bold">FAQs</span>
      </div>

      <span className="absolute -top-[350px] left-[50%] z-0 h-[500px] w-[600px] -translate-x-[50%] rounded-full bg-gradient-to-r from-violet-600/20 to-indigo-600/20 blur-3xl" />
    </>
  );
};

const Tabs = ({ selected, setSelected }) => {
  return (
    <div className="relative z-10 flex flex-wrap items-center justify-center gap-4">
      {TABS.map((tab) => (
        <button
          onClick={() => setSelected(tab)}
          className={`relative overflow-hidden whitespace-nowrap rounded-md border-[1px] px-3 py-1.5 text-sm font-medium transition-colors duration-500 ${
            selected === tab
              ? "border-violet-500 text-slate-50"
              : "border-slate-600 bg-transparent text-slate-400"
          }`}
          key={tab}>
          <span className="relative z-10">{tab}</span>
          <AnimatePresence>
            {selected === tab && (
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                exit={{ y: "100%" }}
                transition={{
                  duration: 0.5,
                  ease: "backIn",
                }}
                className="absolute inset-0 z-0 bg-gradient-to-r from-violet-600 to-indigo-600"
              />
            )}
          </AnimatePresence>
        </button>
      ))}
    </div>
  );
};

const Questions = ({ selected }) => {
  return (
    <div className="mx-auto mt-12 max-w-3xl">
      <AnimatePresence mode="wait">
        {Object.entries(QUESTIONS).map(([tab, questions]) => {
          return selected === tab ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{
                duration: 0.5,
                ease: "backIn",
              }}
              className="space-y-4"
              key={tab}>
              {questions.map((q, idx) => (
                <Question key={idx} {...q} />
              ))}
            </motion.div>
          ) : undefined;
        })}
      </AnimatePresence>
    </div>
  );
};

const Question = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      animate={open ? "open" : "closed"}
      className={`rounded-xl border-[1px] border-slate-700 px-4 transition-colors ${
        open ? "bg-slate-800" : "bg-slate-900"
      }`}>
      <button
        onClick={() => setOpen((pv) => !pv)}
        className="flex w-full items-center justify-between gap-4 py-4">
        <span
          className={`text-left text-lg font-medium transition-colors ${
            open ? "text-slate-50" : "text-slate-400"
          }`}>
          {question}
        </span>
        <motion.span
          variants={{
            open: {
              rotate: "45deg",
            },
            closed: {
              rotate: "0deg",
            },
          }}>
          <FiPlus
            className={`text-2xl transition-colors ${
              open ? "text-slate-50" : "text-slate-400"
            }`}
          />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: open ? "fit-content" : "0px",
          marginBottom: open ? "24px" : "0px",
        }}
        className="overflow-hidden text-slate-400">
        <p>{answer}</p>
      </motion.div>
    </motion.div>
  );
};
const TABS = [
  "AI Solutions",
  "Web Development",
  "Digital Storefronts",
  "General",
];

const QUESTIONS = {
  "AI Solutions": [
    {
      question: "What AI solutions do you offer?",
      answer:
        "Our AI solutions range from customer service chatbots to inventory management systems, all designed to streamline your operations and enhance customer engagement.",
    },
    {
      question: "How can AI improve my small business?",
      answer:
        "AI can automate repetitive tasks, provide personalized customer experiences, and offer actionable insights from your data, freeing you up to focus on strategic growth.",
    },
    {
      question: "Is AI expensive to implement?",
      answer:
        "We offer scalable AI solutions tailored to small businesses, ensuring you get the benefits of AI technology without breaking the bank.",
    },
  ],
  "Web Development": [
    {
      question: "Can you build a website for my business?",
      answer:
        "Absolutely! Our team specializes in creating stunning, responsive websites that reflect your brand and meet your business needs.",
    },
    {
      question: "How long does it take to build a website?",
      answer:
        "The timeline varies based on complexity and features but generally ranges from 4 to 12 weeks. We'll give you a more accurate timeline after discussing your project.",
    },
    {
      question: "Do you offer website maintenance and support?",
      answer:
        "Yes, we provide ongoing support and maintenance packages to keep your website updated, secure, and running smoothly.",
    },
  ],
  "Digital Storefronts": [
    {
      question: "What's included in a digital storefront package?",
      answer:
        "Our digital storefront package includes custom eCommerce design, product catalog integration, payment processing setup, and training on managing your online store.",
    },
    {
      question: "How can I attract customers to my new online store?",
      answer:
        "We offer digital marketing services, including SEO, content marketing, and social media strategies to help drive traffic and convert visitors into customers.",
    },
    {
      question: "Can I manage my store inventory through the website?",
      answer:
        "Yes, we integrate your site with inventory management tools that allow you to track stock levels, sales, and more, all from an easy-to-use dashboard.",
    },
  ],
  General: [
    {
      question: "How do I get started with your services?",
      answer:
        "Simply reach out to us through our contact form or give us a call. We'll schedule a consultation to understand your needs and propose a tailored solution.",
    },
    {
      question: "Do you work with businesses outside of your area?",
      answer:
        "Yes, we're equipped to work with clients remotely, ensuring we can support your business no matter where you're located.",
    },
  ],
};

export default FAQ;
