import mongoose from 'mongoose';

const DB_URI = process.env.DB_URI!;

if (!DB_URI) {
  throw new Error('DB_URI is not defined in environment variables');
}

/** Cache the connection across hot reloads in dev (Next.js module caching) */
declare global {
  var _mongooseCache: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

const globalCache = global._mongooseCache ?? { conn: null, promise: null };
global._mongooseCache = globalCache;

export async function connectDB(): Promise<typeof mongoose> {
  if (globalCache.conn) return globalCache.conn;

  if (!globalCache.promise) {
    globalCache.promise = mongoose.connect(DB_URI, {
      dbName: 'portfolio',
      bufferCommands: false,
    });
  }

  globalCache.conn = await globalCache.promise;
  return globalCache.conn;
}
