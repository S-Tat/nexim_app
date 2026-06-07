/**
 * Minimal Supabase Database type definitions for Nexim tables.
 * Generate full types with:
 *   npx supabase gen types typescript --project-id YOUR_REF > lib/supabase-types.ts
 */

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      assessments: {
        Row: {
          id: string;
          created_at: string;
          email: string | null;
          user_id: string | null;
          tier: string;
          locale: string;
          country_code: string;
          answers: Json;
          scores: Json | null;
          analysis: string | null;
          risks: Json | null;
          recommendations: Json | null;
          tasks: Json | null;
          mode: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          email?: string | null;
          user_id?: string | null;
          tier: string;
          locale: string;
          country_code: string;
          answers: Json;
          scores?: Json | null;
          analysis?: string | null;
          risks?: Json | null;
          recommendations?: Json | null;
          tasks?: Json | null;
          mode?: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          email?: string | null;
          user_id?: string | null;
          tier?: string;
          locale?: string;
          country_code?: string;
          answers?: Json;
          scores?: Json | null;
          analysis?: string | null;
          risks?: Json | null;
          recommendations?: Json | null;
          tasks?: Json | null;
          mode?: string;
        };
      };
      payments: {
        Row: {
          id: string;
          created_at: string;
          email: string;
          tier: string;
          stripe_session_id: string | null;
          amount_cents: number | null;
          currency: string | null;
          status: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          email: string;
          tier: string;
          stripe_session_id?: string | null;
          amount_cents?: number | null;
          currency?: string | null;
          status?: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          email?: string;
          tier?: string;
          stripe_session_id?: string | null;
          amount_cents?: number | null;
          currency?: string | null;
          status?: string;
        };
      };
      guides: {
        Row: {
          id: string;
          country: string;
          profession: string;
          lang: string;
          title: string;
          content: string;
          slug: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          country: string;
          profession: string;
          lang: string;
          title: string;
          content: string;
          slug: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          country?: string;
          profession?: string;
          lang?: string;
          title?: string;
          content?: string;
          slug?: string;
          created_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
