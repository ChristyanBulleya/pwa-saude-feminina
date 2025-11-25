'use client'

import { pregnancyData, getPregnancyWeek, getPregnancyDays } from '@/lib/pregnancy-data'
import { Baby, Calendar, Ruler, Weight } from 'lucide-react'

interface PregnancyModeProps {
  dataPrevistaParto: string
}

export function PregnancyMode({ dataPrevistaParto }: PregnancyModeProps) {
  const currentWeek = getPregnancyWeek(dataPrevistaParto)
  const pregnancyDays = getPregnancyDays(dataPrevistaParto)
  const weekData = pregnancyData.find(d => d.week === currentWeek) || pregnancyData[13]
  
  const trimesterProgress = ((currentWeek - 1) % 13) / 13 * 100
  const trimesterLabels = ['1º Trimestre', '2º Trimestre', '3º Trimestre']

  return (
    <div className="space-y-6 pb-24">
      {/* Card Principal */}
      <div className="bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 rounded-3xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-700 font-medium">Sua gestação</p>
            <h1 className="text-4xl font-bold text-gray-900">Semana {String(currentWeek)}</h1>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4">
            <Baby className="w-12 h-12 text-pink-500" />
          </div>
        </div>

        {/* Ilustração do bebê */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 mb-4 flex items-center justify-center min-h-[200px]">
          <div className="text-center">
            <div className="text-6xl mb-4">👶</div>
            <p className="text-gray-700 font-medium">{weekData.description}</p>
          </div>
        </div>

        {/* Informações */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 text-center">
            <Calendar className="w-5 h-5 text-pink-500 mx-auto mb-2" />
            <p className="text-xs text-gray-600 mb-1">Dias</p>
            <p className="text-lg font-bold text-gray-900">{String(pregnancyDays)}</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 text-center">
            <Ruler className="w-5 h-5 text-purple-500 mx-auto mb-2" />
            <p className="text-xs text-gray-600 mb-1">Tamanho</p>
            <p className="text-sm font-bold text-gray-900 leading-tight">{weekData.size}</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 text-center">
            <Weight className="w-5 h-5 text-blue-500 mx-auto mb-2" />
            <p className="text-xs text-gray-600 mb-1">Peso</p>
            <p className="text-lg font-bold text-gray-900">{weekData.weight}</p>
          </div>
        </div>
      </div>

      {/* Timeline dos Trimestres */}
      <div className="bg-white rounded-3xl p-6 shadow-md">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          {trimesterLabels[weekData.trimester - 1]}
        </h3>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Semana {String(((weekData.trimester - 1) * 13) + 1)}</span>
            <span>Semana {String(weekData.trimester * 13)}</span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-pink-400 to-purple-500 rounded-full transition-all duration-500"
              style={{ width: `${trimesterProgress}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-4">
          {[1, 2, 3].map((tri) => (
            <div
              key={tri}
              className={`text-center py-2 rounded-lg text-sm font-medium transition-colors ${
                weekData.trimester === tri
                  ? 'bg-gradient-to-r from-pink-100 to-purple-100 text-gray-900'
                  : 'bg-gray-100 text-gray-500'
              }`}
            >
              {String(tri)}º Tri
            </div>
          ))}
        </div>
      </div>

      {/* Dicas da Semana */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-3">Dicas para esta semana</h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-pink-500 mt-1">•</span>
            <span>Mantenha-se hidratada bebendo pelo menos 2 litros de água por dia</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-500 mt-1">•</span>
            <span>Pratique exercícios leves como caminhada ou yoga para gestantes</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-1">•</span>
            <span>Converse com seu bebê - ele já pode ouvir sua voz!</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
