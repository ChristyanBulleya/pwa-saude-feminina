'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { supabase, saveDailyLog, isSupabaseConfigured } from '@/lib/supabase'

interface MoodCheckinProps {
  onClose: () => void
}

const moods = [
  { id: 'irritada', emoji: '😡', label: 'Irritada/TPM', color: 'bg-red-100 hover:bg-red-200 border-red-300' },
  { id: 'sensivel', emoji: '🥺', label: 'Sensível/Chorona', color: 'bg-blue-100 hover:bg-blue-200 border-blue-300' },
  { id: 'inchada', emoji: '🎈', label: 'Inchada/Retenção', color: 'bg-purple-100 hover:bg-purple-200 border-purple-300' },
  { id: 'dor', emoji: '🤒', label: 'Com Dor/Cólica', color: 'bg-orange-100 hover:bg-orange-200 border-orange-300' },
  { id: 'libido', emoji: '🔥', label: 'Libido Alta/Fogosa', color: 'bg-pink-100 hover:bg-pink-200 border-pink-300' },
] as const

export function MoodCheckin({ onClose }: MoodCheckinProps) {
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [sintomas, setSintomas] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const handleSave = async () => {
    if (!selectedMood) {
      setMessage({ type: 'error', text: 'Selecione um humor primeiro!' })
      return
    }

    setIsSaving(true)
    setMessage(null)

    try {
      // Verificar se Supabase está configurado
      if (!isSupabaseConfigured()) {
        setMessage({ 
          type: 'error', 
          text: '⚠️ Configure o Supabase para salvar seus dados. Clique no banner laranja acima!' 
        })
        setIsSaving(false)
        return
      }

      // Para desenvolvimento: usar um user_id fixo ou criar um novo
      // Em produção, isso viria da autenticação
      const userId = localStorage.getItem('temp_user_id') || crypto.randomUUID()
      localStorage.setItem('temp_user_id', userId)

      const logData = {
        user_id: userId,
        data: new Date().toISOString().split('T')[0],
        humor_selecionado: selectedMood as 'irritada' | 'sensivel' | 'inchada' | 'dor' | 'libido',
        sintomas_fisicos: sintomas || undefined,
      }

      const { data, error } = await saveDailyLog(logData)

      if (error) {
        throw error
      }

      setMessage({ type: 'success', text: '✅ Check-in salvo com sucesso!' })
      
      // Fechar após 1.5 segundos
      setTimeout(() => {
        onClose()
      }, 1500)

    } catch (error: any) {
      console.error('Erro ao salvar check-in:', error)
      setMessage({ 
        type: 'error', 
        text: `Erro ao salvar: ${error.message || 'Tente novamente'}` 
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex items-center justify-between rounded-t-3xl">
          <h2 className="text-2xl font-bold text-gray-800">Como você está hoje?</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Fechar"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Mood Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Selecione seu estado atual:
            </label>
            <div className="grid grid-cols-1 gap-3">
              {moods.map((mood) => (
                <button
                  key={mood.id}
                  onClick={() => setSelectedMood(mood.id)}
                  className={`
                    flex items-center gap-4 p-4 rounded-2xl border-2 transition-all
                    ${selectedMood === mood.id 
                      ? `${mood.color} scale-105 shadow-lg` 
                      : 'bg-white hover:bg-gray-50 border-gray-200'
                    }
                  `}
                >
                  <span className="text-4xl">{mood.emoji}</span>
                  <span className="text-lg font-medium text-gray-800">{mood.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Sintomas Físicos */}
          <div>
            <label htmlFor="sintomas" className="block text-sm font-medium text-gray-700 mb-2">
              Sintomas físicos (opcional):
            </label>
            <textarea
              id="sintomas"
              value={sintomas}
              onChange={(e) => setSintomas(e.target.value)}
              placeholder="Ex: dor de cabeça, náusea, cansaço..."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-pink-400 focus:ring-2 focus:ring-pink-200 outline-none transition-all resize-none"
              rows={3}
            />
          </div>

          {/* Message */}
          {message && (
            <div className={`
              p-4 rounded-2xl text-sm font-medium
              ${message.type === 'success' 
                ? 'bg-green-100 text-green-800 border-2 border-green-300' 
                : 'bg-red-100 text-red-800 border-2 border-red-300'
              }
            `}>
              {message.text}
            </div>
          )}

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={!selectedMood || isSaving}
            className={`
              w-full py-4 rounded-2xl font-semibold text-white text-lg
              transition-all transform
              ${selectedMood && !isSaving
                ? 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 hover:scale-105 shadow-lg hover:shadow-xl'
                : 'bg-gray-300 cursor-not-allowed'
              }
            `}
          >
            {isSaving ? 'Salvando...' : 'Salvar Check-in'}
          </button>
        </div>
      </div>
    </div>
  )
}
