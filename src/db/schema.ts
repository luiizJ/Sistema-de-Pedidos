import { pgTable, serial, text, boolean, timestamp } from "drizzle-orm/pg-core";

export const storeConfig = pgTable("store_config", {
  id: serial("id").primaryKey(),
  isOpen: boolean("is_open").default(false).notNull(),
  pixKey: text("pix_key").default(""),
  contactNumber: text("contact_number").default(""),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});
