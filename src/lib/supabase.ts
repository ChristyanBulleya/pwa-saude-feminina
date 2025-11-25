import { createClient } from '@supabase/supabase-js'

// Configuração do Supabase com fallback para desenvolvimento
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Cliente Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
})

// Tipos do banco de dados
export type UserStatus = 'tentante' | 'gravida' | 'prevenir'

export interface User {
  id: string
  nome: string
  data_ultima_menstruacao?: string
  status: UserStatus
  data_prevista_parto?: string
  created_at: string
}

export interface DailyLog {
  id: string
  user_id: string
  data: string
  humor_selecionado: 'irritada' | 'sensivel' | 'inchada' | 'dor' | 'libido'
  sintomas_fisicos?: string
  created_at: string
}

// Funções auxiliares para o banco de dados

/**
 * Criar ou atualizar usuária
 */
export async function upsertUser(userData: Partial<User>) {
  const { data, error } = await supabase
    .from('users')
    .upsert(userData)
    .select()
    .single()
  
  if (error) {
    console.error('Erro ao salvar usuária:', error)
    return { data: null, error }
  }
  
  return { data, error: null }
}

/**
 * Buscar usuária por ID
 */
export async function getUser(userId: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()
  
  if (error) {
    console.error('Erro ao buscar usuária:', error)
    return { data: null, error }
  }
  
  return { data, error: null }
}

/**
 * Salvar check-in diário
 */
export async function saveDailyLog(logData: Omit<DailyLog, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('daily_logs')
    .insert(logData)
    .select()
    .single()
  
  if (error) {
    console.error('Erro ao salvar check-in:', error)
    return { data: null, error }
  }
  
  return { data, error: null }
}

/**
 * Buscar check-ins de uma usuária
 */
export async function getDailyLogs(userId: string, startDate?: string, endDate?: string) {
  let query = supabase
    .from('daily_logs')
    .select('*')
    .eq('user_id', userId)
    .order('data', { ascending: false })
  
  if (startDate) {
    query = query.gte('data', startDate)
  }
  
  if (endDate) {
    query = query.lte('data', endDate)
  }
  
  const { data, error } = await query
  
  if (error) {
    console.error('Erro ao buscar check-ins:', error)
    return { data: null, error }
  }
  
  return { data, error: null }
}

/**
 * Verificar se Supabase está configurado
 */
export function isSupabaseConfigured() {
  return !!(supabaseUrl && supabaseAnonKey && supabaseUrl !== '' && supabaseAnonKey !== '')
}
