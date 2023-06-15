// Ne pas toucher code appartenant aux gobelins
export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

// On peut faire ce qu'on veut
const MAX_QUALITY = 50;
const MIN_QUALITY = 0;

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  // Peut devenir statique.
  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      let qualityIncrement = 0;

      if (item.name === "Sulfuras, Hand of Ragnaros") {
        continue;
      }

      // if (item.name == "Backstage passes to a TAFKAL80ETC concert") {
      //   qualityIncrement = qualityIncrement + 1;
      //   if (item.name == "Backstage passes to a TAFKAL80ETC concert") {
      //     if (item.sellIn < 11) {
      //       qualityIncrement = qualityIncrement + 1;
      //     }
      //     if (item.sellIn < 6) {
      //       qualityIncrement = qualityIncrement + 1;
      //     }
      //   }
      // }
      // if (item.sellIn < 1) {
      //   if (item.name == "Backstage passes to a TAFKAL80ETC concert") {
      //     qualityIncrement = -item.quality;
      //   }
      // }
      
      if (
        item.name != "Aged Brie" &&
        item.name != "Backstage passes to a TAFKAL80ETC concert"
      ) {
        qualityIncrement = commonItemsStrategy(item.sellIn);
      }
      if (item.name == "Aged Brie") {
        qualityIncrement = agedBrieItemsStrategy(item.sellIn);
      }
      if (item.name == "Backstage passes to a TAFKAL80ETC concert") {
        qualityIncrement = backstageItemsStrategy(item.sellIn);
      }
      item.quality = getBoundedQualityValue(item.quality + qualityIncrement);
      item.sellIn = item.sellIn - 1;
    }
    return this.items;
  }
}
type QualityStrategy = (sellIn: number) => number;

const commonItemsStrategy: QualityStrategy = (sellIn) => (sellIn < 1 ? -2 : -1);
const agedBrieItemsStrategy: QualityStrategy = (sellIn) => (sellIn < 1 ? 2 : 1);
const backstageItemsStrategy: QualityStrategy = (sellIn) => {
  let qualityIncrement = 1;
  if (sellIn < 11) {
    qualityIncrement = qualityIncrement + 1;
  }
  if (sellIn < 6) {
    qualityIncrement = qualityIncrement + 1;
  }
  if (sellIn < 1) {
    (qualityIncrement = -MAX_QUALITY);
  }
  return qualityIncrement
};

const getBoundedQualityValue = (unboundedQuality: number) =>
  Math.min(Math.max(unboundedQuality, MIN_QUALITY), MAX_QUALITY);
