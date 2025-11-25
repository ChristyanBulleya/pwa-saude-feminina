export function calculateCycle(dataUltimaMenstruacao: string) {
  try {
    if (!dataUltimaMenstruacao) {
      // Valores padrão se não houver data
      return getDefaultCycleData()
    }
    
    const lastPeriod = new Date(dataUltimaMenstruacao)
    const today = new Date()
    
    // Validar se a data é válida
    if (isNaN(lastPeriod.getTime())) {
      return getDefaultCycleData()
    }
    
    const cycleLength = 28 // Ciclo padrão
    
    const diffTime = today.getTime() - lastPeriod.getTime()
    const daysSinceLastPeriod = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    
    // Validar cálculo
    if (isNaN(daysSinceLastPeriod) || daysSinceLastPeriod < 0) {
      return getDefaultCycleData()
    }
    
    const currentCycleDay = (daysSinceLastPeriod % cycleLength) + 1
    
    // Calcular próxima menstruação
    const nextPeriod = new Date(lastPeriod)
    nextPeriod.setDate(lastPeriod.getDate() + cycleLength)
    while (nextPeriod < today) {
      nextPeriod.setDate(nextPeriod.getDate() + cycleLength)
    }
    
    // Calcular ovulação (dia 14 do ciclo)
    const ovulationDate = new Date(lastPeriod)
    ovulationDate.setDate(lastPeriod.getDate() + 14)
    while (ovulationDate < today) {
      ovulationDate.setDate(ovulationDate.getDate() + cycleLength)
    }
    
    // Janela fértil (5 dias antes da ovulação até 1 dia depois)
    const fertileStart = new Date(ovulationDate)
    fertileStart.setDate(ovulationDate.getDate() - 5)
    const fertileEnd = new Date(ovulationDate)
    fertileEnd.setDate(ovulationDate.getDate() + 1)
    
    const isFertile = today >= fertileStart && today <= fertileEnd
    
    const daysUntilPeriod = Math.ceil((nextPeriod.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    const daysUntilOvulation = Math.ceil((ovulationDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    
    // Validar todos os valores antes de retornar
    return {
      currentCycleDay: isNaN(currentCycleDay) ? 1 : Math.max(1, Math.min(28, currentCycleDay)),
      nextPeriod: isNaN(nextPeriod.getTime()) ? new Date() : nextPeriod,
      ovulationDate: isNaN(ovulationDate.getTime()) ? new Date() : ovulationDate,
      fertileStart: isNaN(fertileStart.getTime()) ? new Date() : fertileStart,
      fertileEnd: isNaN(fertileEnd.getTime()) ? new Date() : fertileEnd,
      isFertile,
      daysUntilPeriod: isNaN(daysUntilPeriod) ? 0 : Math.max(0, daysUntilPeriod),
      daysUntilOvulation: isNaN(daysUntilOvulation) ? 0 : Math.max(0, daysUntilOvulation)
    }
  } catch (error) {
    console.error('Erro ao calcular ciclo:', error)
    return getDefaultCycleData()
  }
}

function getDefaultCycleData() {
  const today = new Date()
  const nextPeriod = new Date(today)
  nextPeriod.setDate(today.getDate() + 14)
  
  const ovulationDate = new Date(today)
  ovulationDate.setDate(today.getDate() + 7)
  
  const fertileStart = new Date(ovulationDate)
  fertileStart.setDate(ovulationDate.getDate() - 5)
  
  const fertileEnd = new Date(ovulationDate)
  fertileEnd.setDate(ovulationDate.getDate() + 1)
  
  return {
    currentCycleDay: 14,
    nextPeriod,
    ovulationDate,
    fertileStart,
    fertileEnd,
    isFertile: false,
    daysUntilPeriod: 14,
    daysUntilOvulation: 7
  }
}

export function formatDate(date: Date): string {
  try {
    if (!date || isNaN(date.getTime())) {
      return new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
    }
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
  } catch (error) {
    console.error('Erro ao formatar data:', error)
    return new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
  }
}
