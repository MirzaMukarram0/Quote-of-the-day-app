import dotenv from "dotenv";
import { connectDB, closeDB, clearDatabase } from "../config/db.js";
import User from "../models/User.js";
import Quote from "../models/Quote.js";

// Load environment variables
dotenv.config();

// Sample quotes data
const quotesData = [
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    category: "motivation",
    tags: ["work", "passion", "success"],
  },
  {
    text: "Life is what happens when you're busy making other plans.",
    author: "John Lennon",
    category: "life",
    tags: ["life", "philosophy", "wisdom"],
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
    category: "inspiration",
    tags: ["dreams", "future", "belief"],
  },
  {
    text: "It is during our darkest moments that we must focus to see the light.",
    author: "Aristotle",
    category: "wisdom",
    tags: ["hope", "perseverance", "strength"],
  },
  {
    text: "Be yourself; everyone else is already taken.",
    author: "Oscar Wilde",
    category: "wisdom",
    tags: ["authenticity", "individuality", "self"],
  },
  {
    text: "The only impossible journey is the one you never begin.",
    author: "Tony Robbins",
    category: "motivation",
    tags: ["journey", "beginning", "action"],
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
    category: "success",
    tags: ["courage", "persistence", "success"],
  },
  {
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
    category: "motivation",
    tags: ["belief", "confidence", "achievement"],
  },
  {
    text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela",
    category: "inspiration",
    tags: ["resilience", "perseverance", "strength"],
  },
  {
    text: "In the end, it's not the years in your life that count. It's the life in your years.",
    author: "Abraham Lincoln",
    category: "life",
    tags: ["life", "quality", "meaning"],
  },
  {
    text: "Do not go where the path may lead, go instead where there is no path and leave a trail.",
    author: "Ralph Waldo Emerson",
    category: "wisdom",
    tags: ["innovation", "leadership", "courage"],
  },
  {
    text: "The best time to plant a tree was 20 years ago. The second best time is now.",
    author: "Chinese Proverb",
    category: "wisdom",
    tags: ["action", "timing", "opportunity"],
  },
  {
    text: "Your time is limited, don't waste it living someone else's life.",
    author: "Steve Jobs",
    category: "life",
    tags: ["authenticity", "time", "individuality"],
  },
  {
    text: "If you want to lift yourself up, lift up someone else.",
    author: "Booker T. Washington",
    category: "kindness",
    tags: ["kindness", "helping", "growth"],
  },
  {
    text: "Everything you've ever wanted is on the other side of fear.",
    author: "George Addair",
    category: "courage",
    tags: ["fear", "courage", "achievement"],
  },
  {
    text: "The mind is everything. What you think you become.",
    author: "Buddha",
    category: "wisdom",
    tags: ["mindset", "thoughts", "transformation"],
  },
  {
    text: "The only limit to our realization of tomorrow will be our doubts of today.",
    author: "Franklin D. Roosevelt",
    category: "motivation",
    tags: ["doubt", "belief", "potential"],
  },
  {
    text: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius",
    category: "perseverance",
    tags: ["persistence", "progress", "patience"],
  },
  {
    text: "Act as if what you do makes a difference. It does.",
    author: "William James",
    category: "inspiration",
    tags: ["impact", "action", "meaning"],
  },
  {
    text: "The purpose of our lives is to be happy.",
    author: "Dalai Lama",
    category: "life",
    tags: ["happiness", "purpose", "fulfillment"],
  },
  {
    text: "Life is really simple, but we insist on making it complicated.",
    author: "Confucius",
    category: "wisdom",
    tags: ["simplicity", "life", "philosophy"],
  },
  {
    text: "May you live every day of your life.",
    author: "Jonathan Swift",
    category: "life",
    tags: ["mindfulness", "presence", "living"],
  },
  {
    text: "You only live once, but if you do it right, once is enough.",
    author: "Mae West",
    category: "life",
    tags: ["living", "quality", "choices"],
  },
  {
    text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
    author: "Ralph Waldo Emerson",
    category: "wisdom",
    tags: ["inner strength", "character", "potential"],
  },
  {
    text: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
    category: "action",
    tags: ["action", "beginning", "execution"],
  },
];

// Sample users data
const usersData = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    role: "admin",
  },
  {
    name: "John Doe",
    email: "user@example.com",
    password: "user123",
    role: "user",
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    password: "jane123",
    role: "user",
  },
];

/**
 * Seed the database with initial data
 */
async function seedDatabase() {
  try {
    console.log("🌱 Starting database seeding...\n");

    // Connect to database
    await connectDB();

    // Clear existing data
    console.log("🗑️  Clearing existing data...");
    await clearDatabase();

    // Seed users
    console.log("\n👥 Seeding users...");
    const users = await User.insertMany(usersData);
    console.log(`✅ Created ${users.length} users`);
    users.forEach((user) => {
      console.log(`   - ${user.name} (${user.email}) [${user.role}]`);
    });

    // Seed quotes
    console.log("\n💬 Seeding quotes...");
    const quotes = await Quote.insertMany(quotesData);
    console.log(`✅ Created ${quotes.length} quotes`);
    
    // Display some sample quotes
    console.log("\n📝 Sample quotes:");
    quotes.slice(0, 3).forEach((quote, index) => {
      console.log(`   ${index + 1}. "${quote.text}" - ${quote.author}`);
    });

    console.log("\n" + "=".repeat(60));
    console.log("✅ Database seeding completed successfully!");
    console.log("=".repeat(60));
    console.log("\n📊 Summary:");
    console.log(`   👥 Users: ${users.length}`);
    console.log(`   💬 Quotes: ${quotes.length}`);
    console.log("\n🔐 Test Credentials:");
    console.log("   Admin: admin@example.com / admin123");
    console.log("   User:  user@example.com / user123");
    console.log("=".repeat(60) + "\n");

  } catch (error) {
    console.error("\n❌ Error seeding database:", error);
    process.exit(1);
  } finally {
    await closeDB();
  }
}

// Run the seed function
seedDatabase();
