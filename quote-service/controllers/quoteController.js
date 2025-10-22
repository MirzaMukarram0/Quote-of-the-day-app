import Quote from "../models/Quote.js";

/**
 * Get a random quote of the day
 */
export async function getRandomQuote(req, res) {
  try {
    // Count total quotes
    const count = await Quote.countDocuments();
    
    if (count === 0) {
      return res.status(404).json({ message: "No quotes available." });
    }

    // Get random quote using aggregation for better performance
    const randomQuotes = await Quote.aggregate([
      { $sample: { size: 1 } }
    ]);

    if (randomQuotes.length === 0) {
      return res.status(404).json({ message: "No quotes available." });
    }

    res.status(200).json({
      success: true,
      quote: randomQuotes[0],
    });
  } catch (error) {
    console.error("Error fetching random quote:", error);
    res.status(500).json({ message: "Error fetching quote.", error: error.message });
  }
}

/**
 * Add a new quote (Admin only)
 */
export async function addQuote(req, res) {
  try {
    const { text, author, category, tags } = req.body;

    // Validate required fields
    if (!text || !author) {
      return res.status(400).json({ message: "Text and author are required." });
    }

    const newQuote = new Quote({
      text,
      author,
      category: category || "general",
      tags: tags || [],
    });

    await newQuote.save();

    res.status(201).json({
      success: true,
      message: "Quote added successfully.",
      quote: newQuote,
    });
  } catch (error) {
    console.error("Error adding quote:", error);
    res.status(500).json({ message: "Error adding quote.", error: error.message });
  }
}

/**
 * Update an existing quote (Admin only)
 */
export async function updateQuote(req, res) {
  try {
    const { id } = req.params;
    const { text, author, category, tags } = req.body;

    // Find and update quote
    const updatedQuote = await Quote.findByIdAndUpdate(
      id,
      {
        ...(text && { text }),
        ...(author && { author }),
        ...(category && { category }),
        ...(tags && { tags }),
      },
      { new: true, runValidators: true }
    );

    if (!updatedQuote) {
      return res.status(404).json({ message: "Quote not found." });
    }

    res.status(200).json({
      success: true,
      message: "Quote updated successfully.",
      quote: updatedQuote,
    });
  } catch (error) {
    console.error("Error updating quote:", error);
    res.status(500).json({ message: "Error updating quote.", error: error.message });
  }
}

/**
 * Delete a quote (Admin only)
 */
export async function deleteQuote(req, res) {
  try {
    const { id } = req.params;

    const deletedQuote = await Quote.findByIdAndDelete(id);

    if (!deletedQuote) {
      return res.status(404).json({ message: "Quote not found." });
    }

    res.status(200).json({
      success: true,
      message: "Quote deleted successfully.",
      quote: deletedQuote,
    });
  } catch (error) {
    console.error("Error deleting quote:", error);
    res.status(500).json({ message: "Error deleting quote.", error: error.message });
  }
}
