export const getPricer = (sentence: string): string => {
    const words = sentence.split(' ')
    const numberOfArticle = Number(words[0])
    const priceForOneArticle = Number(words[3].replace(',', '.'))

    const device = words[4]
    const taxe = Number(words[7])
  

    const totalHT = numberOfArticle * priceForOneArticle 
    const taxePart = totalHT * (taxe/100) 
    const totalTTC = totalHT + taxePart 


    return `${totalTTC} ${device}`
}