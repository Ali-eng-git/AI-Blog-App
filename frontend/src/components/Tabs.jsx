import React from "react";

const Tabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="my-2">
      <div className="flex">
       {tabs.map((tab) => (
  <button
    key={tab.value}
    className={`relative px-3 md:px-4 py-2 text-sm font-medium ${
      activeTab === tab.value
        ? "text-black"
        : "text-gray-500 hover:text-gray-700"
    }`}
    onClick={() => setActiveTab(tab.value)}
  >
    <div className="flex items-center">
      <span>{tab.label}</span>
      <span
        className={`ml-2 px-2 py-0.5 rounded-full ${
          activeTab === tab.value
            ? "bg-black text-white"
            : "bg-gray-200/70 text-gray-600"
        }`}
      >
        {tab.count}
      </span>
    </div>

    {activeTab === tab.value && (
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black" />
    )}
  </button>
))}
      </div>
    </div>
  );
};

export default Tabs;
