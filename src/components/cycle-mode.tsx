'use client'

import { calculateCycle, formatDate } from '@/lib/cycle-calculator'
import { Calendar, Droplet, Heart, AlertCircle } from 'lucide-react'

interface CycleModeProps {
  dataUltimaMenstruacao: string
}

export function CycleMode({ dataUltimaMenstruacao }: CycleModeProps) {
  const cycle = calculateCycle(dataUltimaMenstruacao)
  
  return (
    <div className="space-y-6 pb-24">
      {/* Alerta Período Fértil */}
      {cycle.isFertile && (
        <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-3xl p-6 shadow-lg animate-in slide-in-from-top duration-500">
          <div className="flex items-center gap-3 mb-2">
            <Heart className="w-6 h-6" />
            <h3 className="text-xl font-bold">Período Fértil</h3>
          </div>
          <p className="text-pink-50">
            Você está na sua janela fértil! Este é o melhor momento para conceber.
          </p>
        </div>
      )}

      {/* Card Principal - Gráfico Circular */}
      <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 rounded-3xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Seu Ciclo</h2>
        
        {/* Círculo de Progresso */}
        <div className="relative w-64 h-64 mx-auto mb-6">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Círculo de fundo */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="8"
            />
            {/* Círculo de progresso */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="8"
              strokeDasharray={`${(cycle.currentCycleDay / 28) * 283} 283`}
              strokeLinecap="round"
              className="transition-all duration-500"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#EC4899" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Texto central */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-5xl font-bold text-gray-900">{String(cycle.currentCycleDay)}</p>
            <p className="text-sm text-gray-600 mt-1">dia do ciclo</p>
          </div>
        </div>

        {/* Informações do Ciclo */}
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                <Droplet className="w-5 h-5 text-pink-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Próxima menstruação</p>
                <p className="font-bold text-gray-900">{formatDate(cycle.nextPeriod)}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-pink-500">{String(cycle.daysUntilPeriod)}</p>
              <p className="text-xs text-gray-600">dias</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Ovulação prevista</p>
                <p className="font-bold text-gray-900">{formatDate(cycle.ovulationDate)}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-purple-500">{String(cycle.daysUntilOvulation)}</p>
              <p className="text-xs text-gray-600">dias</p>
            </div>
          </div>
        </div>
      </div>

      {/* Janela Fértil */}
      <div className="bg-white rounded-3xl p-6 shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-pink-500" />
          <h3 className="text-lg font-bold text-gray-900">Janela Fértil</h3>
        </div>
        
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl">
          <div>
            <p className="text-sm text-gray-600 mb-1">Período fértil</p>
            <p className="font-bold text-gray-900">
              {formatDate(cycle.fertileStart)} - {formatDate(cycle.fertileEnd)}
            </p>
          </div>
          {cycle.isFertile && (
            <div className="bg-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              AGORA
            </div>
          )}
        </div>
      </div>

      {/* Dicas */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-6">
        <div className="flex items-center gap-2 mb-3">
          <AlertCircle className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-bold text-gray-900">Dicas do Ciclo</h3>
        </div>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-pink-500 mt-1">•</span>
            <span>Registre seus sintomas diariamente para previsões mais precisas</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-500 mt-1">•</span>
            <span>Mantenha-se hidratada durante todo o ciclo</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-1">•</span>
            <span>Pratique exercícios leves para aliviar sintomas da TPM</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
