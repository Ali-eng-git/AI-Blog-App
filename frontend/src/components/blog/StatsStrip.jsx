import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { LuFileText, LuUsers, LuEye, LuGlobe } from "react-icons/lu";

const StatsStrip = ({ totalPosts }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const stats = [
    {
      icon: <LuFileText size={24} />,
      value: totalPosts || 0,
      suffix: "+",
      label: "Published Articles",
    },
    {
      icon: <LuUsers size={24} />,
      value: 1200,
      suffix: "+",
      label: "Community Members",
    },
    {
      icon: <LuEye size={24} />,
      value: 15000,
      suffix: "+",
      label: "Article Views",
    },
    {
      icon: <LuGlobe size={24} />,
      value: 2500,
      suffix: "+",
      label: "Monthly Readers",
    },
  ];

  return (
    <section ref={ref} className="mb-20">
      <div className="rounded-3xl bg-gradient-to-r from-sky-50 via-cyan-50 to-sky-50 p-8 md:p-10">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, index) => (
            <div
              key={index}
              className="
              group
              relative
              overflow-hidden
              rounded-3xl
              border 
             border-[#006494]
              p-6
              shadow-lg
              "
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-sky-200/30 rounded-full blur-3xl" />

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center text-sky-600 mb-4">
                  {item.icon}
                </div>

                <h3 className="text-4xl font-bold text-slate-900">
                  {inView ? (
                    <CountUp end={item.value} duration={2} separator="," />
                  ) : (
                    0
                  )}
                  {item.suffix}
                </h3>

                <p className="mt-2 text-sm font-medium text-slate-500">
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsStrip;
