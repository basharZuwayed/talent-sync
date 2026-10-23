-- ============================================================
-- Simple Guidance Database Schema (PostgreSQL)
-- For demonstration, onboarding, and guidance purposes only.
-- ============================================================

CREATE TABLE IF NOT EXISTS items (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);
