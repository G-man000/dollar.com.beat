export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      beat_licenses: {
        Row: {
          beat_id: string
          currency: string
          id: string
          license_type: Database["public"]["Enums"]["license_type"]
          price_cents: number
        }
        Insert: {
          beat_id: string
          currency?: string
          id?: string
          license_type: Database["public"]["Enums"]["license_type"]
          price_cents: number
        }
        Update: {
          beat_id?: string
          currency?: string
          id?: string
          license_type?: Database["public"]["Enums"]["license_type"]
          price_cents?: number
        }
        Relationships: [
          {
            foreignKeyName: "beat_licenses_beat_id_fkey"
            columns: ["beat_id"]
            isOneToOne: false
            referencedRelation: "beats"
            referencedColumns: ["id"]
          },
        ]
      }
      beats: {
        Row: {
          bpm: number
          cover_url: string | null
          created_at: string
          currency: string
          description: string | null
          duration_seconds: number | null
          genre: string
          id: string
          is_exclusive_sold: boolean
          is_published: boolean
          master_format: string | null
          master_path: string | null
          musical_key: string | null
          plays: number
          preview_url: string | null
          price_cents: number
          producer_id: string
          tags: string[]
          title: string
          updated_at: string
        }
        Insert: {
          bpm: number
          cover_url?: string | null
          created_at?: string
          currency?: string
          description?: string | null
          duration_seconds?: number | null
          genre: string
          id?: string
          is_exclusive_sold?: boolean
          is_published?: boolean
          master_format?: string | null
          master_path?: string | null
          musical_key?: string | null
          plays?: number
          preview_url?: string | null
          price_cents?: number
          producer_id: string
          tags?: string[]
          title: string
          updated_at?: string
        }
        Update: {
          bpm?: number
          cover_url?: string | null
          created_at?: string
          currency?: string
          description?: string | null
          duration_seconds?: number | null
          genre?: string
          id?: string
          is_exclusive_sold?: boolean
          is_published?: boolean
          master_format?: string | null
          master_path?: string | null
          musical_key?: string | null
          plays?: number
          preview_url?: string | null
          price_cents?: number
          producer_id?: string
          tags?: string[]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      cart_items: {
        Row: {
          added_at: string
          beat_id: string
          id: string
          license_type: Database["public"]["Enums"]["license_type"] | null
          user_id: string
        }
        Insert: {
          added_at?: string
          beat_id: string
          id?: string
          license_type?: Database["public"]["Enums"]["license_type"] | null
          user_id: string
        }
        Update: {
          added_at?: string
          beat_id?: string
          id?: string
          license_type?: Database["public"]["Enums"]["license_type"] | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_beat_id_fkey"
            columns: ["beat_id"]
            isOneToOne: false
            referencedRelation: "beats"
            referencedColumns: ["id"]
          },
        ]
      }
      cookie_consents: {
        Row: {
          analytics: boolean
          created_at: string
          id: string
          ip_hash: string | null
          marketing: boolean
          necessary: boolean
          user_id: string | null
        }
        Insert: {
          analytics?: boolean
          created_at?: string
          id?: string
          ip_hash?: string | null
          marketing?: boolean
          necessary?: boolean
          user_id?: string | null
        }
        Update: {
          analytics?: boolean
          created_at?: string
          id?: string
          ip_hash?: string | null
          marketing?: boolean
          necessary?: boolean
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          display_name: string | null
          id: string
          producer_alias: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          id: string
          producer_alias?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          producer_alias?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      purchases: {
        Row: {
          amount_cents: number
          beat_id: string
          buyer_id: string
          created_at: string
          currency: string
          download_token: string
          id: string
          license_type: Database["public"]["Enums"]["license_type"] | null
          paid_at: string | null
          producer_id: string
          status: string
          stripe_session_id: string | null
        }
        Insert: {
          amount_cents: number
          beat_id: string
          buyer_id: string
          created_at?: string
          currency?: string
          download_token?: string
          id?: string
          license_type?: Database["public"]["Enums"]["license_type"] | null
          paid_at?: string | null
          producer_id: string
          status?: string
          stripe_session_id?: string | null
        }
        Update: {
          amount_cents?: number
          beat_id?: string
          buyer_id?: string
          created_at?: string
          currency?: string
          download_token?: string
          id?: string
          license_type?: Database["public"]["Enums"]["license_type"] | null
          paid_at?: string | null
          producer_id?: string
          status?: string
          stripe_session_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "purchases_beat_id_fkey"
            columns: ["beat_id"]
            isOneToOne: false
            referencedRelation: "beats"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "producer" | "buyer"
      license_type: "lease" | "premium_lease" | "exclusive"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "producer", "buyer"],
      license_type: ["lease", "premium_lease", "exclusive"],
    },
  },
} as const
