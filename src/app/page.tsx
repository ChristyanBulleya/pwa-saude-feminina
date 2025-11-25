'use client'

import { useState, useEffect } from 'react'
import { BottomNav } from '@/components/bottom-nav'
import { MoodCheckin } from '@/components/mood-checkin'
import { PregnancyMode } from '@/components/pregnancy-mode'
import { CycleMode } from '@/components/cycle-mode'
import { Plus, Calendar as CalendarIcon, Lightbulb, User, Heart } from 'lucide-react'
import { supabase, type UserStatus } from '@/lib/supabase'
import { toast } from 'sonner'

type Tab = 'home' | 'calendar' | 'insights' | 'profile'

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('home')
  const [showMoodCheckin, setShowMoodCheckin] = useState(false)
  const [userStatus, setUserStatus] = useState<UserStatus>('prevenir')
  const [userName, setUserName] = useState('Usuária')
  const [dataPrevistaParto, setDataPrevistaParto] = useState('')
  const [dataUltimaMenstruacao, setDataUltimaMenstruacao] = useState('')

  // Dados de exemplo (em produção, viriam do Supabase)
  useEffect(() => {
    // Simulando dados de usuária grávida
    setUserStatus('gravida')
    setUserName('Maria')
    setDataPrevistaParto('2025-08-15')
    setDataUltimaMenstruacao('2024-11-01')
  }, [])

  const handleMoodSelect = async (mood: string) => {
    try {
      // Em produção, salvaria no Supabase
      console.log('Mood selecionado:', mood, 'Data:', new Date().toISOString())
      toast.success('Registro salvo com sucesso!')
    } catch (error) {
      console.error('Erro ao salvar:', error)
      toast.error('Erro ao salvar registro')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-lg mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                FemCare
              </h1>
              <p className="text-sm text-gray-600">Olá, {userName}! 👋</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
              {userName.charAt(0)}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-lg mx-auto px-6 py-6">
        {activeTab === 'home' && (
          <div>
            {userStatus === 'gravida' && dataPrevistaParto ? (
              <PregnancyMode dataPrevistaParto={dataPrevistaParto} />
            ) : (
              <CycleMode dataUltimaMenstruacao={dataUltimaMenstruacao} />
            )}
          </div>
        )}

        {activeTab === 'calendar' && (
          <div className="pb-24">
            <div className="bg-white rounded-3xl p-8 shadow-md text-center">
              <CalendarIcon className="w-16 h-16 text-pink-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Calendário</h2>
              <p className="text-gray-600">
                Visualize seu histórico de ciclos e previsões futuras
              </p>
            </div>
          </div>
        )}

        {activeTab === 'insights' && (
          <div className="pb-24 space-y-6">
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl p-6 shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="w-6 h-6 text-purple-600" />
                <h2 className="text-2xl font-bold text-gray-900">Dicas e Insights</h2>
              </div>
              <p className="text-gray-700 mb-4">
                Aprenda mais sobre seu corpo e ciclo menstrual
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-md">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Artigos Recomendados</h3>
              <div className="space-y-3">
                {[
                  'Como identificar seu período fértil',
                  'Alimentação saudável durante a gravidez',
                  'Exercícios para aliviar cólicas menstruais',
                  'Entendendo as fases do ciclo menstrual'
                ].map((article, i) => (
                  <div key={i} className="p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl">
                    <p className="font-medium text-gray-900">{article}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="pb-24 space-y-6">
            <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-3xl p-6 shadow-md text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white text-4xl font-bold mx-auto mb-4">
                {userName.charAt(0)}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{userName}</h2>
              <p className="text-gray-600">
                {userStatus === 'gravida' ? '🤰 Grávida' : '💗 Acompanhando ciclo'}
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-md">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Configurações</h3>
              <div className="space-y-3">
                <button className="w-full text-left p-4 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-colors">
                  <p className="font-medium text-gray-900">Dados pessoais</p>
                  <p className="text-sm text-gray-600">Editar informações do perfil</p>
                </button>
                <button className="w-full text-left p-4 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-colors">
                  <p className="font-medium text-gray-900">Notificações</p>
                  <p className="text-sm text-gray-600">Gerenciar lembretes e alertas</p>
                </button>
                <button className="w-full text-left p-4 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-colors">
                  <p className="font-medium text-gray-900">Privacidade</p>
                  <p className="text-sm text-gray-600">Controle seus dados</p>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Botão Flutuante - Check-in Diário */}
      {activeTab === 'home' && (
        <button
          onClick={() => setShowMoodCheckin(true)}
          className="fixed bottom-24 right-6 w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform z-40"
        >
          <Plus className="w-8 h-8" />
        </button>
      )}

      {/* Modal de Check-in */}
      {showMoodCheckin && (
        <MoodCheckin
          onClose={() => setShowMoodCheckin(false)}
          onSelect={handleMoodSelect}
        />
      )}

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}
