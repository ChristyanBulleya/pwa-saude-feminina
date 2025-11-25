export interface PregnancyWeekData {
  week: number
  trimester: 1 | 2 | 3
  size: string
  weight: string
  description: string
}

export const pregnancyData: PregnancyWeekData[] = [
  { week: 1, trimester: 1, size: "Semente de papoula", weight: "-", description: "Início da gestação" },
  { week: 2, trimester: 1, size: "Semente de gergelim", weight: "-", description: "Fertilização" },
  { week: 3, trimester: 1, size: "Semente de chia", weight: "-", description: "Implantação" },
  { week: 4, trimester: 1, size: "Semente de papoula", weight: "< 1g", description: "Embrião se forma" },
  { week: 5, trimester: 1, size: "Semente de maçã", weight: "< 1g", description: "Coração começa a bater" },
  { week: 6, trimester: 1, size: "Ervilha", weight: "< 1g", description: "Desenvolvimento facial" },
  { week: 7, trimester: 1, size: "Mirtilo", weight: "< 1g", description: "Braços e pernas se formam" },
  { week: 8, trimester: 1, size: "Framboesa", weight: "1g", description: "Dedos começam a se formar" },
  { week: 9, trimester: 1, size: "Cereja", weight: "2g", description: "Órgãos se desenvolvem" },
  { week: 10, trimester: 1, size: "Morango", weight: "4g", description: "Fase fetal começa" },
  { week: 11, trimester: 1, size: "Figo", weight: "7g", description: "Ossos endurecem" },
  { week: 12, trimester: 1, size: "Limão", weight: "14g", description: "Reflexos se desenvolvem" },
  { week: 13, trimester: 2, size: "Vagem", weight: "23g", description: "Segundo trimestre" },
  { week: 14, trimester: 2, size: "Pêssego", weight: "43g", description: "Expressões faciais" },
  { week: 15, trimester: 2, size: "Maçã", weight: "70g", description: "Movimentos ativos" },
  { week: 16, trimester: 2, size: "Abacate", weight: "100g", description: "Audição se desenvolve" },
  { week: 17, trimester: 2, size: "Pera", weight: "140g", description: "Gordura começa a se formar" },
  { week: 18, trimester: 2, size: "Batata doce", weight: "190g", description: "Movimentos perceptíveis" },
  { week: 19, trimester: 2, size: "Manga", weight: "240g", description: "Vernix se forma" },
  { week: 20, trimester: 2, size: "Banana", weight: "300g", description: "Metade da gestação" },
  { week: 21, trimester: 2, size: "Cenoura", weight: "360g", description: "Movimentos coordenados" },
  { week: 22, trimester: 2, size: "Mamão papaia", weight: "430g", description: "Sobrancelhas e cílios" },
  { week: 23, trimester: 2, size: "Toranja", weight: "501g", description: "Audição aprimorada" },
  { week: 24, trimester: 2, size: "Melão cantalupo", weight: "600g", description: "Viabilidade fetal" },
  { week: 25, trimester: 3, size: "Couve-flor", weight: "660g", description: "Terceiro trimestre" },
  { week: 26, trimester: 3, size: "Alface", weight: "760g", description: "Olhos se abrem" },
  { week: 27, trimester: 3, size: "Brócolis", weight: "875g", description: "Ciclos de sono" },
  { week: 28, trimester: 3, size: "Berinjela", weight: "1kg", description: "Pulmões se desenvolvem" },
  { week: 29, trimester: 3, size: "Abóbora", weight: "1.15kg", description: "Músculos e pulmões" },
  { week: 30, trimester: 3, size: "Repolho", weight: "1.32kg", description: "Gordura aumenta" },
  { week: 31, trimester: 3, size: "Coco", weight: "1.5kg", description: "Movimentos fortes" },
  { week: 32, trimester: 3, size: "Jicama", weight: "1.7kg", description: "Posição para nascer" },
  { week: 33, trimester: 3, size: "Abacaxi", weight: "1.9kg", description: "Ossos endurecem" },
  { week: 34, trimester: 3, size: "Melão", weight: "2.1kg", description: "Sistema imune" },
  { week: 35, trimester: 3, size: "Melancia pequena", weight: "2.4kg", description: "Rins desenvolvidos" },
  { week: 36, trimester: 3, size: "Alface romana", weight: "2.6kg", description: "Pronto para nascer" },
  { week: 37, trimester: 3, size: "Acelga", weight: "2.9kg", description: "Termo completo" },
  { week: 38, trimester: 3, size: "Alho-poró", weight: "3kg", description: "Órgãos maduros" },
  { week: 39, trimester: 3, size: "Abóbora pequena", weight: "3.2kg", description: "Pronto para o mundo" },
  { week: 40, trimester: 3, size: "Melancia", weight: "3.4kg", description: "Data prevista" },
]

export function getPregnancyWeek(dataPrevistaParto: string): number {
  try {
    if (!dataPrevistaParto) return 14 // Valor padrão
    
    const dueDate = new Date(dataPrevistaParto)
    const today = new Date()
    
    // Validar se a data é válida
    if (isNaN(dueDate.getTime())) return 14
    
    const diffTime = dueDate.getTime() - today.getTime()
    const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7))
    const currentWeek = 40 - diffWeeks
    
    // Garantir que retorna um número válido entre 1 e 40
    const validWeek = Math.max(1, Math.min(40, currentWeek))
    return isNaN(validWeek) ? 14 : validWeek
  } catch (error) {
    console.error('Erro ao calcular semana de gravidez:', error)
    return 14 // Valor padrão seguro
  }
}

export function getPregnancyDays(dataPrevistaParto: string): number {
  try {
    if (!dataPrevistaParto) return 98 // Valor padrão (14 semanas)
    
    const dueDate = new Date(dataPrevistaParto)
    const today = new Date()
    
    // Validar se a data é válida
    if (isNaN(dueDate.getTime())) return 98
    
    const diffTime = dueDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    const pregnancyDays = 280 - diffDays
    
    // Garantir que retorna um número válido entre 1 e 280
    const validDays = Math.max(1, Math.min(280, pregnancyDays))
    return isNaN(validDays) ? 98 : validDays
  } catch (error) {
    console.error('Erro ao calcular dias de gravidez:', error)
    return 98 // Valor padrão seguro
  }
}
