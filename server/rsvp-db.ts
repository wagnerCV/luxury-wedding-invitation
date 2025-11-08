import { desc } from "drizzle-orm";
import { InsertRsvp, rsvps } from "../drizzle/schema";
import { getDb } from "./db";

/**
 * Create a new RSVP entry
 */
export async function createRsvp(data: InsertRsvp) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const [result] = await db.insert(rsvps).values(data);
  return result;
}

/**
 * Get all RSVPs ordered by creation date (newest first)
 */
export async function getAllRsvps() {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  return await db.select().from(rsvps).orderBy(desc(rsvps.createdAt));
}

/**
 * Get total number of guests confirmed
 */
export async function getTotalGuestsCount() {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const result = await db.select().from(rsvps);
  return result.reduce((sum, rsvp) => sum + rsvp.guestsCount, 0);
}
