import Favourite from "../models/Favourite.js";
import Quote from "../models/Quote.js";

/**
 * Get all favourites for the authenticated user
 */
export async function getFavourites(req, res) {
  try {
    const userId = req.user.id || req.user.userId;

    const favourites = await Favourite.find({ userId }).populate("quoteId");

    res.status(200).json({
      success: true,
      count: favourites.length,
      favourites: favourites.map((fav) => ({
        _id: fav._id,
        quote: fav.quoteId,
        addedAt: fav.createdAt,
      })),
    });
  } catch (error) {
    console.error("Error fetching favourites:", error);
    res.status(500).json({ message: "Error fetching favourites.", error: error.message });
  }
}

/**
 * Add a quote to user's favourites
 */
export async function addFavourite(req, res) {
  try {
    const userId = req.user.id || req.user.userId;
    const { quoteId } = req.params;

    // Verify quote exists
    const quote = await Quote.findById(quoteId);
    if (!quote) {
      return res.status(404).json({ message: "Quote not found." });
    }

    // Check if already favorited
    const existingFavourite = await Favourite.findOne({ userId, quoteId });
    if (existingFavourite) {
      return res.status(400).json({ message: "Quote already in favourites." });
    }

    const newFavourite = new Favourite({
      userId,
      quoteId,
    });

    await newFavourite.save();

    // Populate the quote data before sending response
    await newFavourite.populate("quoteId");

    res.status(201).json({
      success: true,
      message: "Quote added to favourites.",
      favourite: {
        _id: newFavourite._id,
        quote: newFavourite.quoteId,
        addedAt: newFavourite.createdAt,
      },
    });
  } catch (error) {
    console.error("Error adding favourite:", error);
    
    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({ message: "Quote already in favourites." });
    }
    
    res.status(500).json({ message: "Error adding favourite.", error: error.message });
  }
}

/**
 * Remove a quote from user's favourites
 */
export async function removeFavourite(req, res) {
  try {
    const userId = req.user.id || req.user.userId;
    const { quoteId } = req.params;

    const deletedFavourite = await Favourite.findOneAndDelete({ userId, quoteId });

    if (!deletedFavourite) {
      return res.status(404).json({ message: "Favourite not found." });
    }

    res.status(200).json({
      success: true,
      message: "Quote removed from favourites.",
    });
  } catch (error) {
    console.error("Error removing favourite:", error);
    res.status(500).json({ message: "Error removing favourite.", error: error.message });
  }
}
