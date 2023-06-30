export const getPricer = (sentence: string): string => {
    const words = sentence.split(' ')
    const numberOfArticle = Number(words[0])
    const priceForOneArticle = Number(words[3].replace(',', '.'))

    const device = words[4]
    const taxe = Number(words[7])
  

    const totalHTbeforeDiscount = numberOfArticle * priceForOneArticle 
    if(totalHTbeforeDiscount > 5000) {
        const totalHTAfterDiscount = totalHTbeforeDiscount * 0.95
        const taxePart = totalHTAfterDiscount * (taxe/100) 
        const totalTTC = Math.round((totalHTAfterDiscount + taxePart ) * 100)

       return `${totalTTC / 100} ${device}`
    } 
    if(totalHTbeforeDiscount > 1000 && totalHTbeforeDiscount <= 5000 ) {
        const totalHTAfterDiscount = totalHTbeforeDiscount * 0.97
        const taxePart = totalHTAfterDiscount * (taxe/100) 
        const totalTTC = Math.round((totalHTAfterDiscount + taxePart ) * 100)

       return `${totalTTC / 100} ${device}`
    } 
    const taxePart = totalHTbeforeDiscount * (taxe/100) 
    const totalTTC = Math.round((totalHTbeforeDiscount + taxePart ) * 100)


    return `${totalTTC / 100} ${device}`
}