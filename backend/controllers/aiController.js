const { GoogleGenAI } = require("@google/genai");
const {
  blogPostIdeasPrompt,
  generateReplyPrompt,
  blogSummaryPrompt,
} = require("../utils/prompts.js");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// @desc    Generate blog contnt from title
// @route   POST /api/ai/generate
// @access  Private
const generateBlogPost = async (req, res) => {
  try {
    const {title, tone } = req.body;

    if (!title || !tone) {
        return res.status(400).json({message:"Required fields missing"})
    }

    const prompt =`Write a markdown-formatted blog post titled "${title}".
    Use a ${tone} tone. Include an introduction, subheadings, code examples if relevent and a conclusion`

    const response =await ai.models.generateContent({
        model:"gemini-2.5-flash-lite",
        contents:prompt
    });

    let rawText= (await response).text;
    return res.status(200).json(rawText)
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ message: "Failed to generate blog post", error: error.message });
  }
};

// @desc    Generate blog contnt from title
// @route   POST /api/ai/generate-ideas
// @access  Private
const generateBlogPostIdeas = async (req, res) => {
  try {
    const {topics} = req.body;
    if (!topics) {
        return res.status(400).json({message:"Missing required fields"})
    }

    const prompt = blogPostIdeasPrompt(topics)

    const response =await ai.models.generateContent({
        model:"gemini-2.5-flash-lite",
        contents:prompt
    });
    
    let rawText =  response.text

    // Clean it remove ```Json and ``` from beginning and end
    const cleanedText = rawText
          .replace(/^```json\$*/, "")
          .replace(/```$/, "")
          .trim()

        // Now safe to parse
        const data = JSON.parse(cleanedText);
        
        return res.status(200).json(data)
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to generate blog post", error: error.message });
  }
};

// @desc    Generate blog comment reply
// @route   POST /api/ai/generate-reply
// @access  Private
const generateCommentReply = async (req, res) => {
  try {
    const { author, content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = generateReplyPrompt({ author, content });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: prompt,
    });

    const rawText = response.text || response.candidates?.[0]?.content?.parts?.[0]?.text;

    return res.status(200).json({ reply: rawText });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to generate comment reply",
      error: error.message,
    });
  }
};

// @desc    Generate blog summary
// @route   POST /api/ai/generate-summary
// @access  Private
const generatePostSummary = async (req, res) => {
  try {
    const {content} = req.body;

    if (!content) {
        return res.status(400).json({mesage:"Missing required fields"})
    }

    const prompt = blogSummaryPrompt(content)

    const response = await ai.models.generateContent({
        model:"gemini-2.5-flash-lite",
        contents:prompt,
    })

    let rawText = response.text;
     
    // Clean it
  const cleanedText = rawText
          .replace(/^```json\$*/, "")
          .replace(/```$/, "")
          .trim()

          const data = JSON.parse(cleanedText);

          return res.status(200).json(data)

  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to generate blog post", error: error.message });
  }
};

module.exports ={
    generateBlogPost,
    generateBlogPostIdeas,
    generateCommentReply,
    generatePostSummary,
}
