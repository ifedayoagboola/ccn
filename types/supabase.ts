export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      partnerships: {
        Row: {
          id: string
          name: string
          email: string
          organisation: string
          need: string
          status: 'pending' | 'contacted' | 'in_progress' | 'completed' | 'declined'
          phone: string | null
          website: string | null
          partnership_type: 'hiring' | 'collaboration' | 'sponsorship' | 'other' | null
          expected_timeline: string | null
          budget_range: string | null
          additional_notes: string | null
          admin_notes: string | null
          assigned_to: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          organisation: string
          need: string
          status?: 'pending' | 'contacted' | 'in_progress' | 'completed' | 'declined'
          phone?: string | null
          website?: string | null
          partnership_type?: 'hiring' | 'collaboration' | 'sponsorship' | 'other' | null
          expected_timeline?: string | null
          budget_range?: string | null
          additional_notes?: string | null
          admin_notes?: string | null
          assigned_to?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          organisation?: string
          need?: string
          status?: 'pending' | 'contacted' | 'in_progress' | 'completed' | 'declined'
          phone?: string | null
          website?: string | null
          partnership_type?: 'hiring' | 'collaboration' | 'sponsorship' | 'other' | null
          expected_timeline?: string | null
          budget_range?: string | null
          additional_notes?: string | null
          admin_notes?: string | null
          assigned_to?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      members: {
        Row: {
          id: string
          name: string
          email: string
          payment_reference: string
          payment_amount: number
          payment_currency: string
          payment_status: 'success' | 'pending' | 'failed' | 'refunded'
          membership_status: 'active' | 'inactive' | 'suspended'
          joined_at: string
          slack_invited: boolean | null
          slack_invite_sent_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          payment_reference: string
          payment_amount: number | string
          payment_currency?: string
          payment_status?: 'success' | 'pending' | 'failed' | 'refunded'
          membership_status?: 'active' | 'inactive' | 'suspended'
          joined_at?: string
          slack_invited?: boolean | null
          slack_invite_sent_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          payment_reference?: string
          payment_amount?: number | string
          payment_currency?: string
          payment_status?: 'success' | 'pending' | 'failed' | 'refunded'
          membership_status?: 'active' | 'inactive' | 'suspended'
          joined_at?: string
          slack_invited?: boolean | null
          slack_invite_sent_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}




