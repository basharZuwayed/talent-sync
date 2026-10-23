import pg from 'pg';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import { Item, CreateItemInput } from '@talent-sync/shared';
import { config } from '../config.js';
import * as schema from './schema.js';
import { items } from './schema.js';

const { Pool } = pg;

export class GuidanceDatabase {
  public pool: pg.Pool;
  public db: NodePgDatabase<typeof schema>;

  constructor(connectionString: string = config.db.url) {
    this.pool = new Pool({ connectionString });
    this.db = drizzle(this.pool, { schema });
  }

  public async getItems(): Promise<Item[]> {
    const rows = await this.db.select().from(items);
    return rows.map((r) => ({
      id: r.id,
      title: r.title,
      description: r.description || undefined,
      createdAt: r.createdAt
    }));
  }

  public async getItemById(id: number): Promise<Item | null> {
    const rows = await this.db.select().from(items).where(eq(items.id, id)).limit(1);
    const row = rows[0];
    if (!row) return null;
    return {
      id: row.id,
      title: row.title,
      description: row.description || undefined,
      createdAt: row.createdAt
    };
  }

  public async createItem(input: CreateItemInput): Promise<Item> {
    const inserted = await this.db
      .insert(items)
      .values({
        title: input.title,
        description: input.description || null
      })
      .returning();

    const row = inserted[0];
    return {
      id: row.id,
      title: row.title,
      description: row.description || undefined,
      createdAt: row.createdAt
    };
  }

  public async close(): Promise<void> {
    await this.pool.end();
  }
}

// Default singleton instance for app runtime
export const defaultDb = new GuidanceDatabase();
