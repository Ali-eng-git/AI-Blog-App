import { FiMail } from "react-icons/fi";

const NewsletterCard = () => {
  return (
    <div className="bg-sky-700 rounded-3xl p-8 text-white">
      <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mb-6">
        <FiMail size={26} />
      </div>

      <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>

      <p className="text-sky-100 mb-6">
        Get the latest articles, tutorials, and development insights delivered
        directly to your inbox.
      </p>

      <div className="space-y-3">
        <input
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl mb-4 placeholder:text-white/50 focus:outline-none focus:bg-white/20"
          placeholder="email@example.com"
          type="email"
        ></input>

        <button className="w-full bg-white text-[#006494] font-semibold py-4 rounded-xl hover:bg-gray-100 transition">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default NewsletterCard;
