import { pgTable, text, serial, integer, boolean, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Original user schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Attack Types
export const attackTypes = pgTable("attack_types", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  color: text("color").notNull(),
  className: text("class_name").notNull(),
  icon: text("icon").notNull(),
});

export const insertAttackTypeSchema = createInsertSchema(attackTypes).pick({
  name: true,
  description: true,
  color: true,
  className: true,
  icon: true,
});

// Intrusions
export const intrusions = pgTable("intrusions", {
  id: serial("id").primaryKey(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
  sourceIp: text("source_ip").notNull(),
  attackTypeId: integer("attack_type_id").notNull().references(() => attackTypes.id),
  confidence: integer("confidence").notNull(),
  status: text("status").notNull(),
  details: text("details"),
});

export const insertIntrusionSchema = createInsertSchema(intrusions).pick({
  sourceIp: true,
  attackTypeId: true,
  confidence: true,
  status: true,
  details: true,
});

// Security Tips
export const securityTips = pgTable("security_tips", {
  id: serial("id").primaryKey(),
  attackTypeId: integer("attack_type_id").notNull().references(() => attackTypes.id),
  tip: text("tip").notNull(),
});

export const insertSecurityTipSchema = createInsertSchema(securityTips).pick({
  attackTypeId: true,
  tip: true,
});

// Chat Messages
export const chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  role: text("role").notNull(),
  content: text("content").notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
});

export const insertChatMessageSchema = createInsertSchema(chatMessages).pick({
  sessionId: true,
  role: true,
  content: true,
});

// Stats
export const stats = pgTable("stats", {
  id: serial("id").primaryKey(),
  totalRequests: integer("total_requests").notNull(),
  attacksDetected: integer("attacks_detected").notNull(),
  modelAccuracy: integer("model_accuracy").notNull(),
  requestIncrease: integer("request_increase").notNull(),
  attackIncrease: integer("attack_increase").notNull(),
  accuracyImprovement: integer("accuracy_improvement").notNull(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertStatsSchema = createInsertSchema(stats).pick({
  totalRequests: true,
  attacksDetected: true,
  modelAccuracy: true,
  requestIncrease: true,
  attackIncrease: true,
  accuracyImprovement: true,
});

// Dataset information
export const datasetInfo = pgTable("dataset_info", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  totalRecords: integer("total_records").notNull(),
  attackClasses: integer("attack_classes").notNull(),
  features: integer("features").notNull(),
});

export const modelPerformance = pgTable("model_performance", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  accuracy: integer("accuracy").notNull(),
  precision: integer("precision").notNull(),
  recall: integer("recall").notNull(),
  f1Score: integer("f1_score").notNull(),
});

// Type exports
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertAttackType = z.infer<typeof insertAttackTypeSchema>;
export type AttackType = typeof attackTypes.$inferSelect;

export type InsertIntrusion = z.infer<typeof insertIntrusionSchema>;
export type Intrusion = typeof intrusions.$inferSelect;

export type InsertSecurityTip = z.infer<typeof insertSecurityTipSchema>;
export type SecurityTip = typeof securityTips.$inferSelect;

export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;
export type ChatMessage = typeof chatMessages.$inferSelect;

export type InsertStats = z.infer<typeof insertStatsSchema>;
export type Stats = typeof stats.$inferSelect;

export type DatasetInfo = typeof datasetInfo.$inferSelect;
export type ModelPerformance = typeof modelPerformance.$inferSelect;

// Manual Scan Results
export const manualScanResults = pgTable("manual_scan_results", {
  id: serial("id").primaryKey(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
  input: text("input").notNull(),
  result: text("result").notNull(),
  isAttack: boolean("is_attack").notNull(),
  attackType: text("attack_type"),
  confidence: integer("confidence").notNull(),
});

export const insertManualScanResultSchema = createInsertSchema(manualScanResults).pick({
  input: true,
  result: true,
  isAttack: true,
  attackType: true,
  confidence: true,
});

export type InsertManualScanResult = z.infer<typeof insertManualScanResultSchema>;
export type ManualScanResult = typeof manualScanResults.$inferSelect;
